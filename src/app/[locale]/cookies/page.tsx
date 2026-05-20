"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import ManageConsentButton from "@/components/ManageConsentButton";

export default function CookiesPage() {
  const t = useTranslations("cookies");
  const tConsent = useTranslations("consent");

  return (
    <div className="bg-background flex min-h-screen flex-col overflow-x-hidden">
      <SiteNav />

      <main className="mx-auto max-w-3xl flex-1 px-6 pt-24 pb-12">
        <h1 className="text-foreground mb-2 font-sans text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mb-8 text-sm">{t("lastUpdated")}</p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s1h")}</h2>
            <p>{t("s1intro")}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {(t.raw("s1items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">{t("s1note")}</p>
          </section>

          <Section heading={t("s2h")} content={t("s2")} />

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s3h")}</h2>
            <p>{t("s3intro")}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {(t.raw("s3items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">{t("s3note")}</p>
          </section>

          <Section heading={t("s4h")} content={t("s4")} />
          <Section heading={t("s5h")} content={t("s5")} />

          <section>
            <h2 className="text-foreground text-lg font-semibold">
              {tConsent("managePreferences")}
            </h2>
            <p className="mb-3">{tConsent("managePreferencesDescription")}</p>
            <ManageConsentButton />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ heading, content }: { heading: string; content: string }) {
  return (
    <section>
      <h2 className="text-foreground text-lg font-semibold">{heading}</h2>
      <p>{content}</p>
    </section>
  );
}
