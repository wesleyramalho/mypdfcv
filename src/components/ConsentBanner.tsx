"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useConsent } from "@/components/providers/ConsentProvider";

export default function ConsentBanner() {
  const { showBanner, accept, reject } = useConsent();
  const t = useTranslations("consent");

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="border-border bg-card text-card-foreground pointer-events-auto mx-auto max-w-3xl rounded-lg border p-4 shadow-lg sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex-1">
            <p className="text-foreground mb-1 font-sans text-sm font-semibold">{t("title")}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t("description")}{" "}
              <Link href="/privacy" className="hover:text-foreground underline underline-offset-2">
                {t("privacyLink")}
              </Link>{" "}
              ·{" "}
              <Link href="/cookies" className="hover:text-foreground underline underline-offset-2">
                {t("cookiesLink")}
              </Link>
            </p>
          </div>
          <div className="flex flex-row gap-2 sm:min-w-32 sm:flex-col sm:gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={reject}
              className="flex-1 font-sans text-xs tracking-widest uppercase sm:flex-none"
            >
              {t("reject")}
            </Button>
            <Button
              size="sm"
              onClick={accept}
              className="flex-1 font-sans text-xs tracking-widest uppercase sm:flex-none"
            >
              {t("accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
