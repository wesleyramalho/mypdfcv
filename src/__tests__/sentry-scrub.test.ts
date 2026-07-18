import { describe, expect, it } from "vitest";
import type { ErrorEvent } from "@sentry/nextjs";
import { redactPiiString, sanitizeUrl, scrubBreadcrumb, scrubEvent } from "@/lib/sentry/scrub";

function baseEvent(overrides: Partial<ErrorEvent> = {}): ErrorEvent {
  return {
    type: undefined,
    event_id: "abc",
    ...overrides,
  } as ErrorEvent;
}

describe("sanitizeUrl", () => {
  it("redacts resume ids in /editor paths", () => {
    expect(sanitizeUrl("https://mypdfcv.com/editor/abc123xyz")).toBe(
      "https://mypdfcv.com/editor/[id]",
    );
  });

  it("redacts cover-letter and pdf api ids", () => {
    expect(sanitizeUrl("/cover-letter/resume_99")).toBe("/cover-letter/[id]");
    expect(sanitizeUrl("/api/pdf/foo-bar")).toBe("/api/pdf/[id]");
    expect(sanitizeUrl("/api/cover-letter-pdf/zzz")).toBe("/api/cover-letter-pdf/[id]");
  });

  it("strips query strings and hashes", () => {
    expect(sanitizeUrl("/editor/abc?token=secret#x")).toBe("/editor/[id]");
  });

  it("returns undefined unchanged", () => {
    expect(sanitizeUrl(undefined)).toBeUndefined();
  });
});

describe("redactPiiString", () => {
  it("replaces email-like substrings", () => {
    expect(redactPiiString("contact me at jane.doe+test@example.com please")).toBe(
      "contact me at [email] please",
    );
  });

  it("replaces phone-like sequences", () => {
    expect(redactPiiString("call +55 11 99999-1234 now")).toBe("call [phone] now");
  });

  it("handles strings with no PII", () => {
    expect(redactPiiString("nothing sensitive here")).toBe("nothing sensitive here");
  });
});

describe("scrubEvent", () => {
  it("drops request.data for PDF route POST bodies", () => {
    const event = baseEvent({
      request: {
        url: "https://mypdfcv.com/api/pdf/abc123",
        method: "POST",
        data: { fullName: "Jane Doe", email: "jane@example.com" },
      },
    });
    const out = scrubEvent(event);
    expect(out?.request?.data).toBeUndefined();
  });

  it("drops request.data for cover-letter PDF routes", () => {
    const event = baseEvent({
      request: {
        url: "https://mypdfcv.com/api/cover-letter-pdf/xyz",
        data: { body: "Dear hiring manager…" },
      },
    });
    const out = scrubEvent(event);
    expect(out?.request?.data).toBeUndefined();
  });

  it("keeps request.data for non-PII routes", () => {
    const event = baseEvent({
      request: {
        url: "https://mypdfcv.com/api/something-else",
        data: { foo: "bar" },
      },
    });
    const out = scrubEvent(event);
    expect(out?.request?.data).toEqual({ foo: "bar" });
  });

  it("redacts cookies, query strings, and sensitive headers", () => {
    const event = baseEvent({
      request: {
        url: "/api/x?token=secret",
        cookies: { session: "value" },
        query_string: "token=secret",
        headers: {
          authorization: "Bearer 123",
          cookie: "session=value",
          "x-other": "ok",
        },
      },
    });
    const out = scrubEvent(event);
    expect(out?.request?.cookies).toBeUndefined();
    expect(out?.request?.query_string).toBeUndefined();
    expect(out?.request?.headers?.authorization).toBe("[redacted]");
    expect(out?.request?.headers?.cookie).toBe("[redacted]");
    expect(out?.request?.headers?.["x-other"]).toBe("ok");
    expect(out?.request?.url).toBe("/api/x");
  });

  it("drops the user object entirely", () => {
    const event = baseEvent({
      user: { email: "jane@example.com", ip_address: "1.2.3.4" },
    });
    const out = scrubEvent(event);
    expect(out?.user).toBeUndefined();
  });

  it("redacts email/phone in exception values", () => {
    const event = baseEvent({
      exception: {
        values: [{ type: "Error", value: "Failed for jane@example.com calling +55 11 99999-1234" }],
      },
    });
    const out = scrubEvent(event);
    expect(out?.exception?.values?.[0]?.value).toBe("Failed for [email] calling [phone]");
  });

  it("redacts message and logentry", () => {
    const event = baseEvent({
      message: "user jane@example.com hit error",
      logentry: { message: "boom for jane@example.com" },
    });
    const out = scrubEvent(event);
    expect(out?.message).toBe("user [email] hit error");
    expect(out?.logentry?.message).toBe("boom for [email]");
  });

  it("removes console breadcrumbs and sanitizes others", () => {
    const event = baseEvent({
      breadcrumbs: [
        { category: "console", message: "log: jane@example.com" },
        { category: "fetch", data: { url: "/api/pdf/abc?token=x", body: "PII" } },
      ],
    });
    const out = scrubEvent(event);
    expect(out?.breadcrumbs).toHaveLength(1);
    const crumb = out!.breadcrumbs![0];
    expect(crumb.category).toBe("fetch");
    expect(crumb.data?.url).toBe("/api/pdf/[id]");
    expect(crumb.data?.body).toBeUndefined();
  });
});

describe("scrubBreadcrumb", () => {
  it("drops console breadcrumbs entirely", () => {
    expect(scrubBreadcrumb({ category: "console", message: "log" })).toBeNull();
  });

  it("strips body and sanitizes url on fetch breadcrumbs", () => {
    const out = scrubBreadcrumb({
      category: "fetch",
      data: { url: "/editor/abc?secret=1", body: "x" },
    });
    expect(out?.data?.url).toBe("/editor/[id]");
    expect(out?.data?.body).toBeUndefined();
  });

  it("redacts email/phone in message", () => {
    const out = scrubBreadcrumb({ category: "ui.click", message: "clicked jane@example.com" });
    expect(out?.message).toBe("clicked [email]");
  });
});
