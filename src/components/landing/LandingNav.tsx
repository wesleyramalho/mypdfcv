"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { LINKEDIN_OAUTH_ENABLED } from "@/lib/featureFlags";

export default function LandingNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("landing");
  const tc = useTranslations("common");
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  async function handleLinkedInImport() {
    setLinkedInError(null);

    if (!LINKEDIN_OAUTH_ENABLED) {
      setLinkedInError(t("linkedInNotConfigured"));
      return;
    }

    try {
      await signIn("linkedin", { callbackUrl: "/dashboard?intent=import" });
    } catch {
      setLinkedInError(t("linkedInUnavailable"));
    }
  }

  return (
    <nav className="border-border bg-background/85 fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-4 py-4 backdrop-blur-md md:px-12">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-foreground font-sans text-sm font-bold tracking-widest uppercase"
        >
          {tc("appName")}
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        {!session && LINKEDIN_OAUTH_ENABLED && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void handleLinkedInImport()}
            className="hidden gap-2 font-sans text-xs tracking-widest uppercase md:flex"
          >
            <LinkedInIcon className="h-4 w-4" />
            {t("startWithLinkedIn")}
          </Button>
        )}
        <Button
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs tracking-widest uppercase"
        >
          <span className="sm:hidden">{session ? tc("resumes") : tc("start")}</span>
          <span className="hidden sm:inline">
            {session ? tc("myResumes") : tc("buildYourResume")}
          </span>
        </Button>
      </div>

      {linkedInError ? (
        <p className="text-destructive absolute top-full right-6 mt-2 font-sans text-[10px] tracking-wider uppercase">
          {linkedInError}
        </p>
      ) : null}
    </nav>
  );
}
