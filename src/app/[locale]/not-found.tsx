"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1
        className="text-foreground font-sans font-bold tracking-tight"
        style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
      >
        {t("title")}
      </h1>
      <p className="text-muted-foreground mb-2 font-sans text-xs tracking-[0.2em] uppercase">
        {t("subtitle")}
      </p>
      <p className="text-muted-foreground mb-8 max-w-sm">{t("description")}</p>
      <Link
        href="/dashboard"
        className={buttonVariants({
          className:
            "bg-foreground text-background hover:bg-foreground/90 font-sans text-xs tracking-widest uppercase",
        })}
      >
        {t("goToDashboard")}
      </Link>
    </div>
  );
}
