"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function SiteNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <nav className="border-border bg-background/85 fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-4 py-4 backdrop-blur-md md:px-12">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-foreground font-sans text-sm font-bold tracking-widest uppercase"
        >
          {t("appName")}
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs tracking-widest uppercase"
        >
          <span className="sm:hidden">{session ? t("resumes") : t("start")}</span>
          <span className="hidden sm:inline">
            {session ? t("myResumes") : t("buildYourResume")}
          </span>
        </Button>
      </div>
    </nav>
  );
}
