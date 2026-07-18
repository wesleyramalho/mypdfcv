import type { Breadcrumb, BreadcrumbHint, ErrorEvent, EventHint } from "@sentry/nextjs";

// Routes whose POST bodies carry the full resume / cover-letter JSON.
// Their request.data must never reach Sentry.
const PII_BODY_ROUTE_PATTERNS = [/\/api\/pdf(\/|$)/, /\/api\/cover-letter-pdf(\/|$)/];

// Resume IDs in URLs look like /editor/<id> or /api/pdf/<id>. Replace the
// trailing segment with a literal "[id]" so error groups don't fan out per
// resume and the URL itself doesn't tie a stacktrace to a saved document.
const ID_PATH_PATTERNS = [
  /(\/editor)\/[^/?#]+/g,
  /(\/cover-letter)\/[^/?#]+/g,
  /(\/api\/pdf)\/[^/?#]+/g,
  /(\/api\/cover-letter-pdf)\/[^/?#]+/g,
];

const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
// Phone-like: 7+ digits possibly separated by spaces, dashes, dots, parens.
const PHONE_PATTERN = /(?:\+?\d[\d\s().-]{6,}\d)/g;

const HEADERS_TO_REDACT = ["authorization", "cookie", "set-cookie", "x-auth-token"];

export function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  let out = url;
  for (const pattern of ID_PATH_PATTERNS) {
    out = out.replace(pattern, "$1/[id]");
  }
  const queryIdx = out.indexOf("?");
  if (queryIdx >= 0) out = out.slice(0, queryIdx);
  const hashIdx = out.indexOf("#");
  if (hashIdx >= 0) out = out.slice(0, hashIdx);
  return out;
}

export function redactPiiString(input: string): string {
  return input.replace(EMAIL_PATTERN, "[email]").replace(PHONE_PATTERN, "[phone]");
}

function isPiiBodyRoute(url: string | undefined): boolean {
  if (!url) return false;
  return PII_BODY_ROUTE_PATTERNS.some((p) => p.test(url));
}

function redactHeaders(
  headers: Record<string, string> | undefined,
): Record<string, string> | undefined {
  if (!headers) return headers;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    out[key] = HEADERS_TO_REDACT.includes(key.toLowerCase()) ? "[redacted]" : value;
  }
  return out;
}

/**
 * Sentry `beforeSend` hook. Returns the (mutated) event or null to drop it.
 * Pure and synchronous so it can be unit-tested without the SDK.
 */
export function scrubEvent(event: ErrorEvent, _hint?: EventHint): ErrorEvent | null {
  if (event.request) {
    const url = event.request.url;
    if (isPiiBodyRoute(url)) {
      event.request.data = undefined;
    }
    event.request.cookies = undefined;
    event.request.query_string = undefined;
    event.request.headers = redactHeaders(event.request.headers);
    event.request.url = sanitizeUrl(url);
  }

  // Never identify users. Sentry's default integrations may try.
  event.user = undefined;

  if (event.message) event.message = redactPiiString(event.message);
  if (event.logentry?.message) event.logentry.message = redactPiiString(event.logentry.message);

  if (event.exception?.values) {
    for (const ex of event.exception.values) {
      if (ex.value) ex.value = redactPiiString(ex.value);
    }
  }

  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs
      .map((b) => scrubBreadcrumb(b))
      .filter((b): b is Breadcrumb => b !== null);
  }

  return event;
}

/**
 * Sentry `beforeBreadcrumb` hook. Returns the breadcrumb or null to drop it.
 */
export function scrubBreadcrumb(breadcrumb: Breadcrumb, _hint?: BreadcrumbHint): Breadcrumb | null {
  // Console breadcrumbs frequently capture resume content during development
  // (form values, store payloads) — drop them entirely.
  if (breadcrumb.category === "console") return null;

  const next: Breadcrumb = { ...breadcrumb };

  if (next.message) next.message = redactPiiString(next.message);

  if (next.data) {
    const data = { ...next.data } as Record<string, unknown>;
    // Strip request/response bodies from fetch/xhr breadcrumbs.
    delete data["body"];
    delete data["request_body_size"];
    delete data["response_body_size"];
    if (typeof data["url"] === "string") {
      data["url"] = sanitizeUrl(data["url"]);
    }
    next.data = data;
  }

  return next;
}
