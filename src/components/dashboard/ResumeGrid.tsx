"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Resume } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { getTemplate } from "@/lib/resumeTemplates";
import { getLocalizedSampleData } from "@/lib/localizedSampleData";
import ResumeCard from "./ResumeCard";
import TemplatePicker from "./TemplatePicker";

interface Props {
  resumes: Resume[];
}

export default function ResumeGrid({ resumes }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const createResume = useResumeStore((s) => s.createResume);
  const [pickerOpen, setPickerOpen] = useState(false);
  const t = useTranslations("dashboard");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || resumes.length === 0) return;

    gsap.fromTo(
      ".resume-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.1,
      },
    );
  }, [resumes.length]);

  function handleTemplateSelect(templateId: string) {
    setPickerOpen(false);
    if (templateId === "blank") {
      const resume = createResume();
      router.push(`/editor/${resume.id}`);
      return;
    }
    const tmpl = getTemplate(templateId);
    const sampleData = getLocalizedSampleData(templateId, locale) ?? tmpl?.sampleData;
    const resume = createResume(tmpl?.name ?? t("untitledResume"), sampleData, templateId);
    router.push(`/editor/${resume.id}`);
  }

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <div key={resume.id} className="resume-card opacity-0">
            <ResumeCard resume={resume} />
          </div>
        ))}

        <button
          onClick={() => setPickerOpen(true)}
          className="group border-border hover:border-brand-secondary/60 hover:bg-surface-soft text-muted-foreground hover:text-foreground flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-lg border border-dashed transition-all"
        >
          <div className="border-border group-hover:border-brand-secondary/60 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
            <Plus className="h-5 w-5" />
          </div>
          <div className="text-center">
            <p className="font-sans text-sm font-medium">{t("newCareerPath")}</p>
            <p className="text-muted-foreground/60 mt-1 font-sans text-[10px] tracking-widest uppercase">
              {t("chooseTemplateToStart")}
            </p>
          </div>
        </button>
      </div>

      <TemplatePicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={handleTemplateSelect}
      />
    </>
  );
}
