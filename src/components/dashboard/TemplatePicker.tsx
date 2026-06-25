"use client";

import { useTranslations, useLocale } from "next-intl";
import { TEMPLATES } from "@/lib/resumeTemplates";
import { getLocalizedSampleData } from "@/lib/localizedSampleData";
import { createEmptyResumeData } from "@/lib/resumeDefaults";
import type { ResumeData } from "@/types/resume";
import ResumeThumbnail from "@/components/dashboard/ResumeThumbnail";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (templateId: string) => void;
  hideBlank?: boolean;
}

function getSampleData(templateId: string, locale: string): ResumeData {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  const localizedData = getLocalizedSampleData(templateId, locale);
  return {
    ...createEmptyResumeData(),
    ...(localizedData ?? tmpl?.sampleData),
    photo: tmpl?.previewPhoto,
  } as ResumeData;
}

export default function TemplatePicker({ open, onOpenChange, onSelect, hideBlank }: Props) {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tt = useTranslations("templates");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("chooseTemplate")}</DialogTitle>
          <DialogDescription>{t("chooseTemplateDesc")}</DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {!hideBlank && (
              <button
                onClick={() => onSelect("blank")}
                className="border-border hover:border-ring hover:bg-surface-soft cursor-pointer rounded-lg border border-dashed p-3 text-left transition-colors"
              >
                <div className="bg-surface-soft mb-2 flex aspect-[3/4] items-center justify-center rounded">
                  <span className="text-muted-foreground/40 text-2xl">+</span>
                </div>
                <p className="text-foreground text-xs font-semibold">{t("blank")}</p>
                <p className="text-muted-foreground mt-0.5 text-[9px] leading-relaxed">
                  {t("startFromScratch")}
                </p>
              </button>
            )}

            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => onSelect(tmpl.id)}
                className="border-border hover:border-ring hover:bg-surface-soft cursor-pointer rounded-lg border p-3 text-left transition-colors"
              >
                <div className="relative mb-2">
                  <ResumeThumbnail data={getSampleData(tmpl.id, locale)} templateId={tmpl.id} />
                  {tmpl.badge && (
                    <Badge
                      variant={tmpl.badge === "mostPopular" ? "default" : "secondary"}
                      className="absolute top-1 right-1 h-auto px-1.5 py-0.5 text-[9px]"
                    >
                      {tt(tmpl.badge)}
                    </Badge>
                  )}
                </div>
                <p className="text-foreground text-xs font-semibold">{tt(tmpl.id)}</p>
                <p className="text-muted-foreground mt-0.5 text-[9px] leading-relaxed">
                  {tt(`${tmpl.id}Desc`)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
