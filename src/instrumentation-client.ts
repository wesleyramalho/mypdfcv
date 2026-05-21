import posthog from "posthog-js";
import * as Sentry from "@sentry/nextjs";
import { isAnalyticsEnabled } from "@/lib/consent";

// PostHog and Sentry are initialised by ConsentProvider, not here. Brazilian
// users must accept the LGPD banner before init runs; non-BR users have it
// initialised on mount in the provider. This file keeps the Next.js client
// instrumentation hook alive — page-view capture and Sentry navigation
// breadcrumbs are gated on the cached analytics flag.

export function onRouterTransitionStart(
  url: string,
  navigationType: "push" | "replace" | "traverse",
) {
  if (!isAnalyticsEnabled()) return;
  posthog.capture("$pageview", { $current_url: url });
  Sentry.captureRouterTransitionStart(url, navigationType);
}
