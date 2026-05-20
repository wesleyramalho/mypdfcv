"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

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
            <p>{t("s5intro")}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {(t.raw("s5items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s6h")}</h2>
            <p>{t("s6intro")}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {(t.raw("s6items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <Section heading={t("s7h")} content={t("s7")} />
          <Section heading={t("s8h")} content={t("s8")} />
          <Section heading={t("s9h")} content={t("s9")} />
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
