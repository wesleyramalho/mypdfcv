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
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { educationEntrySchema } from "@/lib/schemas";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import AIImproveButton from "@/components/ui/AIImproveButton";
import MonthYearPicker from "@/components/ui/MonthYearPicker";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  education: z.array(educationEntrySchema),
});

type FormValues = z.infer<typeof formSchema>;

interface SortableEduItemProps {
  field: { id: string };
  idx: number;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  remove: (idx: number) => void;
  errors: FieldErrors<FormValues>;
  tv: (key: string) => string;
}

function SortableEduItem({
  field,
  idx,
  register,
  setValue,
  watch,
  remove,
  errors,
  tv,
}: SortableEduItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });
  const t = useTranslations("editor");
  const tc = useTranslations("common");

  const edu = watch(`education.${idx}`);
  const fieldErrors = errors.education?.[idx];

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
            {edu?.school || t("educationFallback", { idx: idx + 1 })}
          </p>
        </div>
        <button
          onClick={() => remove(idx)}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label={t("removeEducation")}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormInput
          id={`school-${field.id}`}
          label={t("school")}
          placeholder={t("schoolPlaceholder")}
          maxLength={100}
          error={resolveValidationError(fieldErrors?.school?.message, tv)}
          {...register(`education.${idx}.school`)}
        />
        <FormInput
          id={`degree-${field.id}`}
          label={t("degree")}
          placeholder={t("degreePlaceholder")}
          maxLength={100}
          error={resolveValidationError(fieldErrors?.degree?.message, tv)}
          {...register(`education.${idx}.degree`)}
        />
        <FormInput
          id={`field-${field.id}`}
          label={t("fieldOfStudy")}
          placeholder={t("fieldPlaceholder")}
          maxLength={100}
          error={resolveValidationError(fieldErrors?.field?.message, tv)}
          {...register(`education.${idx}.field`)}
        />
        <FormInput
          id={`gpa-${field.id}`}
          label={t("gpaOptional")}
          placeholder={t("gpaPlaceholder")}
          maxLength={10}
          error={resolveValidationError(fieldErrors?.gpa?.message, tv)}
          {...register(`education.${idx}.gpa`)}
        />
        <MonthYearPicker
          id={`eduStart-${field.id}`}
          label={t("startDate")}
          value={edu?.startDate ?? ""}
          onChange={(v) => setValue(`education.${idx}.startDate`, v)}
        />
        <MonthYearPicker
          id={`eduEnd-${field.id}`}
          label={t("endDate")}
          value={edu?.endDate ?? ""}
          onChange={(v) => setValue(`education.${idx}.endDate`, v || null)}
        />
      </div>
      <FormTextarea
        id={`eduHighlights-${field.id}`}
        label={t("highlightsOptional")}
        placeholder={t("highlightsPlaceholder")}
        rows={2}
        maxLength={2000}
        error={resolveValidationError(fieldErrors?.highlights?.message, tv)}
        {...register(`education.${idx}.highlights`)}
        action={
          <AIImproveButton
            text={edu?.highlights ?? ""}
            fieldType="education"
            onAccept={(v) => setValue(`education.${idx}.highlights`, v)}
          />
        }
      />
    </div>
  );
}

export default function EducationSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const t = useTranslations("editor");
  const tc = useTranslations("common");
  const tv = useTranslations("validation");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResumeRef = useRef(updateResume);
  updateResumeRef.current = updateResume;
  const resumeIdRef = useRef(resumeId);
  resumeIdRef.current = resumeId;

  const lastSyncedJson = useRef(JSON.stringify(data.education));

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { education: structuredClone(data.education) },
    mode: "onTouched",
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "education" });

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
        if (values.education) {
          lastSyncedJson.current = JSON.stringify(values.education);
          updateResumeRef.current(resumeIdRef.current, {
            education: structuredClone(values.education) as ResumeData["education"],
          });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeJson = JSON.stringify(data.education);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ education: structuredClone(data.education) });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="education" className="border-border">
      <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4 font-sans text-sm tracking-widest uppercase hover:no-underline">
        {t("education")}
        <span className="text-muted-foreground mr-2 ml-auto text-xs font-normal">
          {fields.length} {fields.length === 1 ? tc("entry") : tc("entries")}
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {fields.map((field, idx) => (
              <SortableEduItem
                key={field.id}
                field={field}
                idx={idx}
                register={register}
                setValue={setValue}
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
              school: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: null,
              gpa: "",
              highlights: "",
            })
          }
          className="border-border hover:border-brand-secondary/60 hover:bg-surface-soft h-10 w-full gap-2 border border-dashed font-sans text-xs tracking-widest uppercase"
        >
          <Plus className="h-4 w-4" />
          {t("addEducation")}
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
