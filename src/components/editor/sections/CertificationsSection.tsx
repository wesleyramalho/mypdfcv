"use client";

import { useEffect, useRef } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { certificationEntrySchema } from "@/lib/schemas";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  certifications: z.array(certificationEntrySchema),
});

type FormValues = z.infer<typeof formSchema>;

interface SortableCertItemProps {
  field: { id: string };
  idx: number;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  remove: (idx: number) => void;
  errors: FieldErrors<FormValues>;
  tv: (key: string) => string;
}

function SortableCertItem({
  field,
  idx,
  register,
  watch,
  remove,
  errors,
  tv,
}: SortableCertItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });
  const t = useTranslations("editor");
  const tc = useTranslations("common");

  const cert = watch(`certifications.${idx}`);
  const fieldErrors = errors.certifications?.[idx];

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`border-border bg-card space-y-3 rounded-lg border p-4 ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            {...listeners}
            {...attributes}
            tabIndex={-1}
            aria-label={tc("dragToReorder")}
            className="text-muted-foreground/40 hover:text-muted-foreground shrink-0 cursor-grab p-1 active:cursor-grabbing"
          >
            <GripVertical className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
          <p className="text-text-subtle font-sans text-xs">
            {cert?.name || t("certificationFallback", { idx: idx + 1 })}
          </p>
        </div>
        <button
          onClick={() => remove(idx)}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label={t("removeCertification")}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormInput
            id={`certName-${field.id}`}
            label={t("certificationName")}
            placeholder={t("certificationNamePlaceholder")}
            maxLength={150}
            error={resolveValidationError(fieldErrors?.name?.message, tv)}
            {...register(`certifications.${idx}.name`)}
          />
        </div>
        <FormInput
          id={`certIssuer-${field.id}`}
          label={t("certificationIssuer")}
          placeholder={t("certificationIssuerPlaceholder")}
          maxLength={100}
          error={resolveValidationError(fieldErrors?.issuer?.message, tv)}
          {...register(`certifications.${idx}.issuer`)}
        />
        <FormInput
          id={`certYear-${field.id}`}
          label={t("certificationYear")}
          placeholder={t("certificationYearPlaceholder")}
          maxLength={4}
          inputMode="numeric"
          pattern="\d{4}"
          error={resolveValidationError(fieldErrors?.year?.message, tv)}
          {...register(`certifications.${idx}.year`)}
        />
        <FormInput
          id={`certId-${field.id}`}
          label={t("certificationId")}
          placeholder={t("certificationIdPlaceholder")}
          maxLength={100}
          error={resolveValidationError(fieldErrors?.credentialId?.message, tv)}
          {...register(`certifications.${idx}.credentialId`)}
        />
        <FormInput
          id={`certUrl-${field.id}`}
          label={t("certificationUrl")}
          placeholder={t("certificationUrlPlaceholder")}
          maxLength={200}
          error={resolveValidationError(fieldErrors?.credentialUrl?.message, tv)}
          {...register(`certifications.${idx}.credentialUrl`)}
        />
      </div>
    </div>
  );
}

export default function CertificationsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const t = useTranslations("editor");
  const tc = useTranslations("common");
  const tv = useTranslations("validation");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResumeRef = useRef(updateResume);
  updateResumeRef.current = updateResume;
  const resumeIdRef = useRef(resumeId);
  resumeIdRef.current = resumeId;

  const lastSyncedJson = useRef(JSON.stringify(data.certifications));

  const {
    register,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { certifications: structuredClone(data.certifications) },
    mode: "onTouched",
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "certifications" });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    move(oldIndex, newIndex);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.certifications) {
          lastSyncedJson.current = JSON.stringify(values.certifications);
          updateResumeRef.current(resumeIdRef.current, {
            certifications: structuredClone(values.certifications) as ResumeData["certifications"],
          });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeJson = JSON.stringify(data.certifications);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ certifications: structuredClone(data.certifications) });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="certifications" className="border-border">
      <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4 font-sans text-sm tracking-widest uppercase hover:no-underline">
        {t("certifications")}
        <span className="text-muted-foreground mr-2 ml-auto text-xs font-normal">
          {fields.length} {fields.length === 1 ? tc("entry") : tc("entries")}
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {fields.map((field, idx) => (
              <SortableCertItem
                key={field.id}
                field={field}
                idx={idx}
                register={register}
                watch={watch}
                remove={remove}
                errors={errors}
                tv={tv}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          variant="ghost"
          onClick={() =>
            append({
              id: generateId(),
              name: "",
              issuer: "",
              year: "",
              credentialId: "",
              credentialUrl: "",
            })
          }
          className="border-border hover:border-brand-secondary/60 hover:bg-surface-soft h-10 w-full gap-2 border border-dashed font-sans text-xs tracking-widest uppercase"
        >
          <Plus className="h-4 w-4" />
          {t("addCertification")}
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
