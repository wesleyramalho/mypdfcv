"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { Globe } from "lucide-react";
import GitHubIcon from "@/components/icons/GitHubIcon";

export default function ContactPage() {
  const t = useTranslations("contactPage");

  return (
    <div className="bg-background flex min-h-screen flex-col overflow-x-hidden">
      <SiteNav />

      <main className="mx-auto max-w-3xl flex-1 px-6 pt-24 pb-12">
        <h1 className="text-foreground mb-2 font-sans text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mb-8 text-sm">{t("subtitle")}</p>

        <div className="space-y-6">
          <div className="bg-card border-border space-y-4 rounded-lg border p-6">
            <div className="flex items-center gap-3">
              <Image
                src="/pixel-me.png"
                alt="Wesley Ramalho"
                width={40}
                height={40}
                className="rounded-lg bg-black"
              />
              <h2 className="text-foreground font-sans text-lg font-semibold">Wesley Ramalho</h2>
            </div>

            <div className="space-y-3">
              <a
                href="https://wesleyramalho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-sm transition-colors"
              >
                <Globe className="h-4 w-4 shrink-0" />
                wesleyramalho.com
              </a>
              <a
                href="https://github.com/wesleyramalho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-sm transition-colors"
              >
                <GitHubIcon className="h-4 w-4 shrink-0" />
                github.com/wesleyramalho
              </a>
              <a
                href="https://www.linkedin.com/in/wesley-ramalho-245bb5b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-sm transition-colors"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0" />
                Linkedin - Wesley Ramalho
              </a>
            </div>
          </div>

          <div className="bg-card border-border rounded-lg border p-6">
            <h2 className="text-foreground mb-2 font-sans text-lg font-semibold">
              {t("generalInquiries")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("generalInquiriesDesc")}{" "}
              <a
                href="https://www.wesleyramalho.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                www.wesleyramalho.com/contact
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
