"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import ResumePreview from "@/components/editor/preview/ResumePreview";
import { Badge } from "@/components/ui/badge";
import { TEMPLATES, getTemplate } from "@/lib/resumeTemplates";
import { getLocalizedSampleData } from "@/lib/localizedSampleData";
import { createEmptyResumeData } from "@/lib/resumeDefaults";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeData } from "@/types/resume";

function getSampleData(templateId: string, locale: string): ResumeData {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  const localizedData = getLocalizedSampleData(templateId, locale);
  return {
    ...createEmptyResumeData(),
    ...(localizedData ?? tmpl?.sampleData),
    photo: tmpl?.previewPhoto,
  } as ResumeData;
}

export default function LandingTemplates() {
  const router = useRouter();
  const createResume = useResumeStore((s) => s.createResume);
  const locale = useLocale();
  const t = useTranslations("landing");
  const tt = useTranslations("templates");

  function handleUseTemplate(templateId: string) {
    const tmpl = getTemplate(templateId);
    const resume = createResume(tmpl?.name ?? "Untitled Resume", tmpl?.sampleData, templateId);
    router.push(`/editor/${resume.id}`);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    ScrollTrigger.batch(".template-card", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
          },
        ),
      once: true,
      start: "top 85%",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionHeading className="mb-3">{t("templatesLabel")}</SectionHeading>
          <h2
            className="text-foreground font-sans font-bold"
            style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
          >
            {t("templatesHeading")}
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md">{t("templatesDesc")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="template-card group border-border hover:border-ring cursor-pointer rounded-lg border p-3 opacity-0 transition-colors"
              onClick={() => handleUseTemplate(tmpl.id)}
            >
              <div className="relative mb-2 aspect-3/4 overflow-hidden rounded">
                <div className="pointer-events-none absolute inset-0">
                  <ResumePreview data={getSampleData(tmpl.id, locale)} templateId={tmpl.id} />
                </div>
                <div className="bg-foreground/60 absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="bg-background text-foreground rounded-md px-4 py-2 font-sans text-xs tracking-widest uppercase">
                    {t("useTemplate")}
                  </span>
                </div>
                {tmpl.badge && (
                  <Badge
                    variant={tmpl.badge === "mostPopular" ? "default" : "secondary"}
                    className="absolute top-2 right-2 z-20"
                  >
                    {tt(tmpl.badge)}
                  </Badge>
                )}
              </div>

              <p className="text-foreground text-xs font-semibold">{tt(tmpl.id)}</p>
              <p className="text-muted-foreground mt-0.5 text-[9px] leading-relaxed">
                {tt(`${tmpl.id}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
