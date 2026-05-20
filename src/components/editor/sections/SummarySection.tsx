"use client";

import { useCallback } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeForm } from "@/hooks/useResumeForm";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import { z } from "zod";
import { useTranslations } from "next-intl";
import AIImproveButton from "@/components/ui/AIImproveButton";

const summarySchema = z.object({
  summary: z.string().max(5000, "tooLong"),
});

type SummaryFormValues = z.infer<typeof summarySchema>;

interface Props {
  resumeId: string;
  data: ResumeData;
}

export default function SummarySection({ resumeId, data }: Props) {
  const t = useTranslations("editor");
  const tv = useTranslations("validation");

  const toResumeData = useCallback((values: SummaryFormValues): Partial<ResumeData> => values, []);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useResumeForm<SummaryFormValues>({
    resumeId,
    schema: summarySchema,
    defaultValues: {
      summary: data.summary,
    },
    toResumeData,
  });

  const summary = watch("summary");

  return (
    <AccordionItem value="summary" className="border-border">
      <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4 font-sans text-sm tracking-widest uppercase hover:no-underline">
        {t("summary")}
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-6">
        <FormTextarea
          id="summary"
          label={t("professionalSummary")}
          placeholder={t("summaryPlaceholder")}
          rows={3}
          maxLength={5000}
          error={resolveValidationError(errors.summary?.message, tv)}
          {...register("summary")}
          action={
            <AIImproveButton
              text={summary}
              fieldType="summary"
              onAccept={(v) => setValue("summary", v)}
            />
          }
        />
      </AccordionContent>
    </AccordionItem>
  );
}
