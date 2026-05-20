"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import {
  ConsentStatus,
  clearConsent,
  isAnalyticsEnabled,
  readConsent,
  setAnalyticsEnabled,
  writeConsent,
} from "@/lib/consent";

interface ConsentContextValue {
  status: ConsentStatus;
  country: string | null;
  showBanner: boolean;
  accept: () => void;
  reject: () => void;
  revoke: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let posthogInitialized = false;

function initPostHog() {
  if (posthogInitialized) {
    posthog.opt_in_capturing();
    return;
  }
  if (!POSTHOG_KEY) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    person_profiles: "identified_only",
    ip: false,
    persistence: "localStorage",
  });
  posthogInitialized = true;
}

function disablePostHog() {
  if (!posthogInitialized) return;
  posthog.opt_out_capturing();
  posthog.reset();
}

interface ConsentProviderProps {
  country: string | null;
  children: React.ReactNode;
}

export function ConsentProvider({ country, children }: ConsentProviderProps) {
  const [status, setStatus] = useState<ConsentStatus>("unset");
  const [mounted, setMounted] = useState(false);

  const isBR = country === "BR";

  useEffect(() => {
    const stored = readConsent();
    const dnt = navigator.doNotTrack === "1";

    setStatus(stored);
    setMounted(true);

    if (dnt) {
      setAnalyticsEnabled(false);
      return;
    }

    if (!isBR) {
      // Non-BR users keep the prior behaviour: PostHog initialises on boot.
      initPostHog();
      setAnalyticsEnabled(true);
      return;
    }

    // BR users: only init when consent was previously granted.
    if (stored === "accepted") {
      initPostHog();
      setAnalyticsEnabled(true);
    } else {
      setAnalyticsEnabled(false);
    }
  }, [isBR]);

  const accept = useCallback(() => {
    writeConsent("accepted");
    setStatus("accepted");
    if (navigator.doNotTrack !== "1") {
      initPostHog();
      setAnalyticsEnabled(true);
    }
  }, []);

  const reject = useCallback(() => {
    writeConsent("rejected");
    setStatus("rejected");
    setAnalyticsEnabled(false);
    disablePostHog();
  }, []);

  const revoke = useCallback(() => {
    clearConsent();
    setStatus("unset");
    setAnalyticsEnabled(false);
    disablePostHog();
  }, []);

  const showBanner =
    mounted &&
    isBR &&
    status === "unset" &&
    typeof navigator !== "undefined" &&
    navigator.doNotTrack !== "1";

  const value = useMemo<ConsentContextValue>(
    () => ({ status, country, showBanner, accept, reject, revoke }),
    [status, country, showBanner, accept, reject, revoke],
  );

  return (
    <ConsentContext.Provider value={value}>
      <PHProvider client={posthog}>{children}</PHProvider>
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used inside ConsentProvider");
  }
  return ctx;
}

/** Read-only access for components that need to know but aren't required to be inside the provider. */
export function useConsentOptional() {
  return useContext(ConsentContext);
}

// Re-export for callers that previously imported from PostHogProvider —
// keeps the diff smaller if the import path is reused anywhere.
export { isAnalyticsEnabled };
