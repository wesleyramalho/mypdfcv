"use client";

import * as Sentry from "@sentry/nextjs";
import { CLIENT_DSN, getCommonSentryOptions } from "./config";

let initialized = false;

/**
 * Initialise Sentry in the browser. Idempotent and safe to call multiple times.
 * No-op when the DSN env var is unset, which keeps local dev quiet.
 */
export function initSentryClient(): void {
  if (initialized) return;
  if (!CLIENT_DSN) return;

  Sentry.init({
    ...getCommonSentryOptions(),
    dsn: CLIENT_DSN,
    // Replay is intentionally disabled — resume editor fields would leak PII
    // even with masking heuristics.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
  });
  initialized = true;
}

/**
 * Tear down the active client. After this call any captureException calls
 * become no-ops until initSentryClient() runs again.
 */
export function disableSentryClient(): void {
  if (!initialized) return;
  const client = Sentry.getClient();
  // close() flushes pending events then disables future sends.
  void client?.close(0);
  initialized = false;
}

export function isSentryClientInitialized(): boolean {
  return initialized;
}
