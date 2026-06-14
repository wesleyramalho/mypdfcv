/**
 * Post-export 1–5 star rating prompt.
 *
 * Reuses the EXPORT_SUCCESS_EVENT broadcast from subscribePrompt.ts — both
 * modals listen to the same event but have independent localStorage gates and
 * feature flags, so they coexist without coordination.
 */

export const RATING_PROMPT_STORAGE_KEY = "architect-suite-rating-prompt";

export type RatingPromptAction = "rated" | "dismissed";

interface PromptRecord {
  action: RatingPromptAction;
  timestamp: number;
}

export function hasShownRatingPrompt(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !!window.localStorage.getItem(RATING_PROMPT_STORAGE_KEY);
  } catch {
    return true;
  }
}

export function markRatingPromptShown(action: RatingPromptAction): void {
  if (typeof window === "undefined") return;
  const record: PromptRecord = { action, timestamp: Date.now() };
  try {
    window.localStorage.setItem(RATING_PROMPT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage may be unavailable (private mode, quota) — ignore.
  }
}
