"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { contactSchema } from "@mypdfcv/pdf-core";
import { FormInput } from "@/components/ui/FormInput";
import { CoverLetterData } from "@/types/coverLetter";
import { useCoverLetterForm } from "@/hooks/useCoverLetterForm";
import { resolveValidationError } from "@/lib/resolve-validation-error";

const senderSchema = z.object({
  senderName: z.string().max(100, "tooLong"),
  senderContact: contactSchema,
});

type SenderFormValues = z.infer<typeof senderSchema>;

interface Props {
  coverLetterId: string;
  data: CoverLetterData;
}

export default function SenderInfoSection({ coverLetterId, data }: Props) {
  const t = useTranslations("coverLetter");
  const te = useTranslations("editor");
  const tv = useTranslations("validation");

  const toCoverLetterData = useCallback(
    (values: SenderFormValues): Partial<CoverLetterData> => values,
    [],
  );

  const {
    register,
    formState: { errors },
  } = useCoverLetterForm<SenderFormValues>({
    coverLetterId,
    schema: senderSchema,
    defaultValues: {
      senderName: data.senderName,
      senderContact: data.senderContact,
    },
    toCoverLetterData,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-foreground font-sans text-sm font-medium tracking-widest uppercase">
        {t("senderInfo")}
      </h3>
      <FormInput
        id="senderName"
        label={t("senderName")}
        error={resolveValidationError(errors.senderName?.message, tv)}
        {...register("senderName")}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          id="senderContact.email"
          label={te("email")}
          type="email"
          error={resolveValidationError(errors.senderContact?.email?.message, tv)}
          {...register("senderContact.email")}
        />
        <FormInput
          id="senderContact.phone"
          label={te("phone")}
          error={resolveValidationError(errors.senderContact?.phone?.message, tv)}
          {...register("senderContact.phone")}
        />
        <FormInput
          id="senderContact.location"
          label={te("location")}
          error={resolveValidationError(errors.senderContact?.location?.message, tv)}
          {...register("senderContact.location")}
        />
        <FormInput
          id="senderContact.linkedin"
          label={te("linkedin")}
          error={resolveValidationError(errors.senderContact?.linkedin?.message, tv)}
          {...register("senderContact.linkedin")}
        />
        <FormInput
          id="senderContact.website"
          label={te("website")}
          error={resolveValidationError(errors.senderContact?.website?.message, tv)}
          {...register("senderContact.website")}
        />
      </div>
    </div>
  );
}
