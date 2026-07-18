"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { isAnalyticsEnabled } from "@/lib/consent";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (isAnalyticsEnabled()) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred. You can try reloading the page.</p>
          <button onClick={reset} style={{ marginTop: "1rem" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
