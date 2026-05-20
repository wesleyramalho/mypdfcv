export function generateId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);
}

/** Map an app locale code to a BCP 47 locale tag for Intl APIs */
export function toLocaleTag(locale: string): string {
  const map: Record<string, string> = {
    "pt-BR": "pt-BR",
    hi: "hi-IN",
    zh: "zh-CN",
    ja: "ja-JP",
    de: "de-DE",
    es: "es-ES",
    it: "it-IT",
    en: "en-US",
  };
  return map[locale] ?? locale;
}

/** Format a "YYYY-MM" date string to a localized short month + year */
export function formatMonthYear(
  ym: string | null,
  locale: string = "en-US",
  presentLabel: string = "Present",
): string {
  if (!ym) return presentLabel;
  const [year, month] = ym.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
}
