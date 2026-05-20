"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { recipientSchema } from "@mypdfcv/pdf-core";
import { FormInput } from "@/components/ui/FormInput";
import { CoverLetterData } from "@/types/coverLetter";
import { useCoverLetterForm } from "@/hooks/useCoverLetterForm";
import { resolveValidationError } from "@/lib/resolve-validation-error";

import { z } from "zod";

const formSchema = z.object({
  recipient: recipientSchema,
});

type RecipientFormValues = z.infer<typeof formSchema>;

interface Props {
  coverLetterId: string;
  data: CoverLetterData;
}

export default function RecipientSection({ coverLetterId, data }: Props) {
  const t = useTranslations("coverLetter");
  const tv = useTranslations("validation");

  const toCoverLetterData = useCallback(
    (values: RecipientFormValues): Partial<CoverLetterData> => values,
    [],
  );

  const {
    register,
    formState: { errors },
  } = useCoverLetterForm<RecipientFormValues>({
    coverLetterId,
    schema: formSchema,
    defaultValues: {
      recipient: data.recipient,
    },
    toCoverLetterData,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-foreground font-sans text-sm font-medium tracking-widest uppercase">
        {t("recipient")}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          id="recipient.name"
          label={t("recipientName")}
          placeholder={t("recipientNamePlaceholder")}
          error={resolveValidationError(errors.recipient?.name?.message, tv)}
          {...register("recipient.name")}
        />
        <FormInput
          id="recipient.title"
          label={t("recipientTitle")}
          placeholder={t("recipientTitlePlaceholder")}
          error={resolveValidationError(errors.recipient?.title?.message, tv)}
          {...register("recipient.title")}
        />
        <FormInput
          id="recipient.company"
          label={t("recipientCompany")}
          placeholder={t("recipientCompanyPlaceholder")}
          error={resolveValidationError(errors.recipient?.company?.message, tv)}
          {...register("recipient.company")}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
}
