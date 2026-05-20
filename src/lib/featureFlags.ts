/**
 * Feature flags for the app. Flags exposed via `NEXT_PUBLIC_*` are inlined at
 * build time and safe to read in client components.
 */

/** Public flag — readable from both client and server. */
export const LINKEDIN_OAUTH_ENABLED = process.env.NEXT_PUBLIC_LINKEDIN_OAUTH_ENABLED === "true";

/** Public flag — gates the YouTube subscribe prompt shown after PDF export. */
export const YOUTUBE_PROMPT_ENABLED = process.env.NEXT_PUBLIC_YOUTUBE_PROMPT_ENABLED === "true";

/**
 * Server-side gate for LinkedIn integration. The flag must be on AND OAuth
 * credentials must be present, otherwise the server treats LinkedIn as
 * disabled — preventing crashes from misconfigured deploys.
 */
export function isLinkedInServerEnabled(): boolean {
  return (
    LINKEDIN_OAUTH_ENABLED &&
    !!process.env.LINKEDIN_CLIENT_ID &&
    !!process.env.LINKEDIN_CLIENT_SECRET
  );
}
