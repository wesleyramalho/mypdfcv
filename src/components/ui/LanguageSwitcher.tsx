"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { track } from "@/lib/analytics";

const LANGUAGES = [
  { code: "en" as const, flag: "\u{1F1FA}\u{1F1F8}", label: "English" },
  { code: "pt-BR" as const, flag: "\u{1F1E7}\u{1F1F7}", label: "Portugu\u00EAs (Brasil)" },
  { code: "es" as const, flag: "\u{1F1EA}\u{1F1F8}", label: "Español" },
  { code: "it" as const, flag: "\u{1F1EE}\u{1F1F9}", label: "Italiano" },
  { code: "zh" as const, flag: "\u{1F1E8}\u{1F1F3}", label: "中文" },
  { code: "ja" as const, flag: "\u{1F1EF}\u{1F1F5}", label: "日本語" },
  { code: "de" as const, flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
  { code: "hi" as const, flag: "\u{1F1EE}\u{1F1F3}", label: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  function selectLocale(code: string) {
    if (code !== locale) {
      track("locale_changed", { from: locale, to: code });
      router.replace(pathname, { locale: code });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors"
        aria-label="Switch language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-medium uppercase">
          {current.code.split("-")[0].toUpperCase()}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-card border-border min-w-[180px]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => selectLocale(lang.code)}
            className={`gap-2.5 ${locale === lang.code ? "bg-surface-strong font-medium" : ""}`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
