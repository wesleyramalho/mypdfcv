"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <div className="bg-background flex min-h-screen flex-col overflow-x-hidden">
      <SiteNav />

      <main className="mx-auto max-w-3xl flex-1 px-6 pt-24 pb-12">
        <h1 className="text-foreground mb-2 font-sans text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mb-8 text-sm">{t("lastUpdated")}</p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <Section heading={t("s1h")} content={t("s1")} />
          <Section heading={t("s2h")} content={t("s2")} />
          <Section heading={t("s3h")} content={t("s3")} />
          <Section heading={t("s4h")} content={t("s4")} />

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s5h")}</h2>
            <p>{t("s5")}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {(t.raw("s5libs") as string[]).map((lib, i) => (
                <li key={i}>{lib}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm">{t("s5note")}</p>
          </section>

          <Section heading={t("s6h")} content={t("s6")} />
          <Section heading={t("s7h")} content={t("s7")} />
          <Section heading={t("s8h")} content={t("s8")} />
          <Section heading={t("s9h")} content={t("s9")} />
          <Section heading={t("s10h")} content={t("s10")} />
          <Section heading={t("s11h")} content={t("s11")} />
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
