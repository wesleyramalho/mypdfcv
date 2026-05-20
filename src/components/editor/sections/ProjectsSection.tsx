"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { projectEntrySchema } from "@/lib/schemas";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import { Plus, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import AIImproveButton from "@/components/ui/AIImproveButton";
import MonthYearPicker from "@/components/ui/MonthYearPicker";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  projects: z.array(projectEntrySchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const t = useTranslations("editor");
  const tv = useTranslations("validation");
  const [newTechs, setNewTechs] = useState<Record<string, string>>({});

  function addTech(idx: number) {
    const fieldId = fields[idx]?.id;
    if (!fieldId) return;
    const val = (newTechs[fieldId] ?? "").trim();
    if (!val) return;
    const current = watch(`projects.${idx}.technologies`) ?? [];
    setValue(`projects.${idx}.technologies`, [...current, val]);
    setNewTechs((prev) => ({ ...prev, [fieldId]: "" }));
  }

  function removeTech(idx: number, tech: string) {
    const current = watch(`projects.${idx}.technologies`) ?? [];
    setValue(
      `projects.${idx}.technologies`,
      current.filter((t) => t !== tech),
    );
  }
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResumeRef = useRef(updateResume);
  const resumeIdRef = useRef(resumeId);

  useEffect(() => {
    updateResumeRef.current = updateResume;
    resumeIdRef.current = resumeId;
  });

  const lastSyncedJson = useRef(JSON.stringify(data.projects));

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { projects: structuredClone(data.projects) },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  useEffect(() => {
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.projects) {
          lastSyncedJson.current = JSON.stringify(values.projects);
          updateResumeRef.current(resumeIdRef.current, {
            projects: structuredClone(values.projects) as ResumeData["projects"],
          });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeJson = JSON.stringify(data.projects);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ projects: structuredClone(data.projects) });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="projects" className="border-border border-b-0">
      <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4 font-sans text-sm tracking-widest uppercase hover:no-underline">
        {t("projects")}
        <span className="text-muted-foreground mr-2 ml-auto text-xs font-normal">
          {fields.length} {fields.length === 1 ? "project" : "projects"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-6">
        {fields.map((field, idx) => {
          const proj = watch(`projects.${idx}`);
          const fieldErrors = errors.projects?.[idx];
          return (
            <div key={field.id} className="border-border bg-card space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-text-subtle font-sans text-xs">
                  {proj?.name || t("projectFallback", { idx: idx + 1 })}
                </p>
                <button
                  onClick={() => remove(idx)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={t("removeProject")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormInput
                  id={`projName-${field.id}`}
                  label={t("projectName")}
                  placeholder={t("projectPlaceholder")}
                  maxLength={100}
                  error={resolveValidationError(fieldErrors?.name?.message, tv)}
                  {...register(`projects.${idx}.name`)}
                />
                <FormInput
                  id={`projUrl-${field.id}`}
                  label={t("urlOptional")}
                  placeholder={t("urlPlaceholder")}
                  maxLength={200}
                  error={resolveValidationError(fieldErrors?.url?.message, tv)}
                  {...register(`projects.${idx}.url`)}
                />
                <div className="space-y-2 sm:col-span-2">
                  <p className="text-text-subtle font-sans text-xs tracking-widest uppercase">
                    {t("technologies")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(proj?.technologies ?? []).map((tech, ti) => (
                      <span
                        key={`${ti}-${tech}`}
                        className="bg-surface-soft border-border flex items-center gap-1 rounded border px-2 py-0.5 font-sans text-xs"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(idx, tech)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove ${tech}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechs[field.id] ?? ""}
                      onChange={(e) =>
                        setNewTechs((prev) => ({ ...prev, [field.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTech(idx);
                        }
                      }}
                      maxLength={50}
                      placeholder={t("typeTechEnter")}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring flex-1 rounded-md border px-3 py-1.5 text-xs transition-colors focus:outline-none"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addTech(idx)}
                      className="border-border hover:bg-muted h-8 border text-xs"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <MonthYearPicker
                  id={`projStart-${field.id}`}
                  label={t("startDate")}
                  value={proj?.startDate ?? ""}
                  onChange={(v) => setValue(`projects.${idx}.startDate`, v)}
                />
                <MonthYearPicker
                  id={`projEnd-${field.id}`}
                  label={t("endDate")}
                  value={proj?.endDate ?? ""}
                  onChange={(v) => setValue(`projects.${idx}.endDate`, v || null)}
                />
              </div>
              <FormTextarea
                id={`projDesc-${field.id}`}
                label={t("description")}
                rows={3}
                maxLength={3000}
                placeholder={t("projectDescPlaceholder")}
                error={resolveValidationError(fieldErrors?.description?.message, tv)}
                {...register(`projects.${idx}.description`)}
                action={
                  <AIImproveButton
                    text={proj?.description ?? ""}
                    fieldType="project"
                    onAccept={(v) => setValue(`projects.${idx}.description`, v)}
                  />
                }
              />
            </div>
          );
        })}

        <Button
          variant="ghost"
          onClick={() =>
            append({
              id: generateId(),
              name: "",
              description: "",
              url: "",
              technologies: [],
              startDate: "",
              endDate: null,
            })
          }
          className="border-border hover:border-brand-secondary/60 hover:bg-surface-soft h-10 w-full gap-2 border border-dashed font-sans text-xs tracking-widest uppercase"
        >
          <Plus className="h-4 w-4" />
          {t("addProject")}
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
