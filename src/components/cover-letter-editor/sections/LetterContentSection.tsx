"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import { CoverLetterData } from "@/types/coverLetter";
import { useCoverLetterForm } from "@/hooks/useCoverLetterForm";
import { track } from "@/lib/analytics";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import AIImproveButton from "@/components/ui/AIImproveButton";

const contentSchema = z.object({
  date: z.string(),
  salutation: z.string().max(200, "tooLong"),
  bodyParagraphs: z.array(z.string().max(5000, "tooLong")),
  closing: z.string().max(200, "tooLong"),
});

type ContentFormValues = z.infer<typeof contentSchema>;

interface Props {
  coverLetterId: string;
  data: CoverLetterData;
}

export default function LetterContentSection({ coverLetterId, data }: Props) {
  const t = useTranslations("coverLetter");
  const tv = useTranslations("validation");

  const toCoverLetterData = useCallback(
    (values: ContentFormValues): Partial<CoverLetterData> => values,
    [],
  );

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useCoverLetterForm<ContentFormValues>({
    coverLetterId,
    schema: contentSchema,
    defaultValues: {
      date: data.date,
      salutation: data.salutation,
      bodyParagraphs: data.bodyParagraphs,
      closing: data.closing,
    },
    toCoverLetterData,
  });

  const paragraphs = watch("bodyParagraphs");

  function addParagraph() {
    setValue("bodyParagraphs", [...paragraphs, ""]);
    track("cover_letter_paragraph_added");
  }

  function removeParagraph(index: number) {
    if (paragraphs.length <= 1) return;
    setValue(
      "bodyParagraphs",
      paragraphs.filter((_, i) => i !== index),
    );
    track("cover_letter_paragraph_removed");
  }

  return (
    <div className="space-y-4">
      <h3 className="text-foreground font-sans text-sm font-medium tracking-widest uppercase">
        {t("letterContent")}
      </h3>

      <FormInput
        id="date"
        label={t("date")}
        type="date"
        error={resolveValidationError(errors.date?.message, tv)}
        {...register("date")}
      />

      <FormInput
        id="salutation"
        label={t("salutation")}
        placeholder={t("salutationPlaceholder")}
        error={resolveValidationError(errors.salutation?.message, tv)}
        {...register("salutation")}
      />

      {paragraphs.map((paragraph, index) => (
        <div key={index} className="space-y-1">
          <FormTextarea
            id={`bodyParagraphs.${index}`}
            label={`${t("bodyParagraph")} ${index + 1}`}
            placeholder={t("bodyPlaceholder")}
            rows={4}
            maxLength={5000}
            error={resolveValidationError(errors.bodyParagraphs?.[index]?.message, tv)}
            {...register(`bodyParagraphs.${index}`)}
            action={
              <div className="flex items-center gap-1">
                <AIImproveButton
                  text={paragraph}
                  fieldType="summary"
                  onAccept={(v) => setValue(`bodyParagraphs.${index}`, v)}
                />
                {paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(index)}
                    className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                    aria-label={t("removeParagraph")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            }
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addParagraph}
        className="gap-1.5 font-sans text-xs tracking-widest uppercase"
      >
        <Plus className="h-3.5 w-3.5" />
        {t("addParagraph")}
      </Button>

      <FormInput
        id="closing"
        label={t("closing")}
        placeholder={t("closingPlaceholder")}
        error={resolveValidationError(errors.closing?.message, tv)}
        {...register("closing")}
      />
    </div>
  );
}
