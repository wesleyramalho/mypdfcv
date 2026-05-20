"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCallback, useRef, useState } from "react";
import { FormInput } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumeForm } from "@/hooks/useResumeForm";
import { personalInfoSchema, PersonalInfoFormValues } from "@/lib/schemas";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import { useTranslations } from "next-intl";
import PhotoEditor from "@/components/ui/PhotoEditor";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const MAX_PHOTO_SIZE = 500 * 1024; // 500KB

export default function PersonalInfoSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const t = useTranslations("editor");
  const tc = useTranslations("common");
  const tv = useTranslations("validation");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSrc, setEditorSrc] = useState("");

  const toResumeData = useCallback(
    (values: PersonalInfoFormValues): Partial<ResumeData> => values,
    [],
  );

  const {
    register,
    formState: { errors },
  } = useResumeForm<PersonalInfoFormValues>({
    resumeId,
    schema: personalInfoSchema,
    defaultValues: {
      fullName: data.fullName,
      headline: data.headline,
      contact: { ...data.contact },
    },
    toResumeData,
  });

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_PHOTO_SIZE) {
      toast.error(t("photoTooLarge"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditorSrc(reader.result as string);
      setEditorOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handlePhotoSave(croppedDataUrl: string) {
    updateResume(resumeId, { photo: croppedDataUrl });
  }

  return (
    <AccordionItem value="personal" className="border-border">
      <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4 font-sans text-sm tracking-widest uppercase hover:no-underline">
        {t("personalInfo")}
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-6">
        {/* Photo upload */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-border hover:border-ring bg-surface-soft relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors"
          >
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photo} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <Camera className="text-muted-foreground h-5 w-5" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />
          <div className="flex flex-col gap-1">
            <p className="text-text-subtle font-sans text-xs tracking-widest uppercase">
              {t("profilePhoto")}
            </p>
            <p className="text-muted-foreground text-[10px]">{t("photoOptional")}</p>
            {data.photo && (
              <div className="mt-0.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditorSrc(data.photo!);
                    setEditorOpen(true);
                  }}
                  className="text-muted-foreground hover:text-foreground text-[10px] transition-colors"
                >
                  {tc("edit")}
                </button>
                <button
                  type="button"
                  onClick={() => updateResume(resumeId, { photo: undefined })}
                  className="text-destructive hover:text-destructive/80 inline-flex items-center gap-1 text-[10px] transition-colors"
                >
                  <X className="h-3 w-3" />
                  {tc("remove")}
                </button>
              </div>
            )}
          </div>
        </div>

        <PhotoEditor
          open={editorOpen}
          onOpenChange={setEditorOpen}
          imageSrc={editorSrc}
          onSave={handlePhotoSave}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="fullName"
            label={t("fullName")}
            placeholder={t("fullNamePlaceholder")}
            maxLength={100}
            error={resolveValidationError(errors.fullName?.message, tv)}
            {...register("fullName")}
          />
          <FormInput
            id="headline"
            label={t("headline")}
            placeholder={t("headlinePlaceholder")}
            maxLength={150}
            error={resolveValidationError(errors.headline?.message, tv)}
            {...register("headline")}
          />
        </div>

        <div className="border-border border-t pt-4">
          <p className="text-text-subtle mb-3 font-sans text-xs tracking-widest uppercase">
            {t("contact")}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              id="email"
              label={t("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              maxLength={255}
              error={resolveValidationError(errors.contact?.email?.message, tv)}
              {...register("contact.email")}
            />
            <FormInput
              id="phone"
              label={t("phone")}
              type="tel"
              placeholder={t("phonePlaceholder")}
              maxLength={30}
              error={resolveValidationError(errors.contact?.phone?.message, tv)}
              {...register("contact.phone")}
            />
            <FormInput
              id="location"
              label={t("location")}
              placeholder={t("locationPlaceholder")}
              maxLength={100}
              error={resolveValidationError(errors.contact?.location?.message, tv)}
              {...register("contact.location")}
            />
            <FormInput
              id="linkedin"
              label={t("linkedin")}
              placeholder={t("linkedinPlaceholder")}
              maxLength={200}
              error={resolveValidationError(errors.contact?.linkedin?.message, tv)}
              {...register("contact.linkedin")}
            />
            <FormInput
              id="website"
              label={t("website")}
              placeholder={t("websitePlaceholder")}
              className="sm:col-span-2"
              maxLength={200}
              error={resolveValidationError(errors.contact?.website?.message, tv)}
              {...register("contact.website")}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
