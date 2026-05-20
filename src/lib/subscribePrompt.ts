/**
 * Post-export "subscribe to our YouTube channel" prompt.
 *
 * The two PDF export hooks fire a window CustomEvent on success; a global
 * SubscribePromptModal listens and opens once per browser. The decision is
 * persisted in localStorage so the user is never asked twice.
 */

export const SUBSCRIBE_PROMPT_STORAGE_KEY = "architect-suite-subscribe-prompt";
export const EXPORT_SUCCESS_EVENT = "mypdfcv:export-success";
export const YOUTUBE_URL = "https://www.youtube.com/@canalwescode";

export type SubscribePromptAction = "subscribed" | "dismissed";

interface PromptRecord {
  action: SubscribePromptAction;
  timestamp: number;
}

export function hasShownPrompt(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !!window.localStorage.getItem(SUBSCRIBE_PROMPT_STORAGE_KEY);
  } catch {
    return true;
  }
}

export function markPromptShown(action: SubscribePromptAction): void {
  if (typeof window === "undefined") return;
  const record: PromptRecord = { action, timestamp: Date.now() };
  try {
    window.localStorage.setItem(SUBSCRIBE_PROMPT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage may be unavailable (private mode, quota) — ignore.
  }
}

/** Fire-and-forget broadcast from export hooks to the global modal listener. */
export function notifyExportSuccess(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EXPORT_SUCCESS_EVENT));
}
