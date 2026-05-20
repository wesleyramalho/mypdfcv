"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import GitHubIcon from "@/components/icons/GitHubIcon";
import { track } from "@/lib/analytics";

export default function Footer() {
  const t = useTranslations("footer");

  const LEGAL_LINKS = [
    { href: "/privacy" as const, label: t("privacyPolicy") },
    { href: "/terms" as const, label: t("termsOfService") },
    { href: "/cookies" as const, label: t("cookiePolicy") },
    { href: "/contact" as const, label: t("contact") },
    { href: "/mcp" as const, label: t("mcp") },
  ];

  return (
    <footer className="border-border border-t px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <a
          href="https://wesleyramalho.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("creator_site_clicked", { location: "footer" })}
          className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 text-sm transition-colors"
        >
          <Image
            src="/pixel-me.png"
            alt="Wesley Ramalho"
            width={28}
            height={28}
            className="rounded bg-black"
          />
          {t("createdBy")}
        </a>

        <nav className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-2 md:flex md:items-center md:gap-4">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-center text-xs transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/wesleyramalho/mypdfcv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1 text-center text-xs transition-colors"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            {t("openSource")}
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-4 max-w-7xl">
        <p className="text-muted-foreground/60 text-center text-[10px] md:text-left">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
