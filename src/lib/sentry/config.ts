import type { BrowserOptions, NodeOptions } from "@sentry/nextjs";
import { scrubBreadcrumb, scrubEvent } from "./scrub";

/**
 * Shared Sentry options used by the client, server, and edge runtimes.
 *
 * Privacy posture:
 *   - sendDefaultPii: false                — no IP, cookies, or auth headers
 *   - tracesSampleRate / replaysSampleRate — disabled entirely
 *   - beforeSend / beforeBreadcrumb        — strip PII before any send
 *
 * Sample rate sits at 1.0 for errors because we already scrub PII. Free-plan
 * volume (5K errors/mo) is the natural ceiling.
 */
export function getCommonSentryOptions(): BrowserOptions & NodeOptions {
  return {
    environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
    sendDefaultPii: false,
    tracesSampleRate: 0,
    sampleRate: 1.0,
    beforeSend: scrubEvent,
    beforeBreadcrumb: scrubBreadcrumb,
    // Suppress noisy SDK logs in dev so the scrub pipeline is auditable from
    // tests/manual runs without console clutter.
    debug: false,
  };
}

export const CLIENT_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
export const SERVER_DSN = process.env.SENTRY_DSN;
