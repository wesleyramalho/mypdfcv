"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { skillGroupSchema } from "@/lib/schemas";
import { resolveValidationError } from "@/lib/resolve-validation-error";
import { useTranslations } from "next-intl";
import { Plus, Trash2, X } from "lucide-react";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  skillGroups: z.array(skillGroupSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function SkillsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const t = useTranslations("editor");
  const tv = useTranslations("validation");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResumeRef = useRef(updateResume);
  updateResumeRef.current = updateResume;
  const resumeIdRef = useRef(resumeId);
  resumeIdRef.current = resumeId;
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const lastSyncedJson = useRef(JSON.stringify(data.skillGroups));

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { skillGroups: structuredClone(data.skillGroups) },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skillGroups" });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.skillGroups) {
          lastSyncedJson.current = JSON.stringify(values.skillGroups);
          updateResumeRef.current(resumeIdRef.current, {
            skillGroups: structuredClone(values.skillGroups) as ResumeData["skillGroups"],
          });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeJson = JSON.stringify(data.skillGroups);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ skillGroups: structuredClone(data.skillGroups) });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  function addSkill(groupIdx: number) {
    const groupId = fields[groupIdx]?.id;
    if (!groupId) return;
    const val = (newSkills[groupId] ?? "").trim();
    if (!val) return;
    const current = watch(`skillGroups.${groupIdx}.skills`) ?? [];
    setValue(`skillGroups.${groupIdx}.skills`, [...current, val]);
    setNewSkills((prev) => ({ ...prev, [groupId]: "" }));
  }

  function removeSkill(groupIdx: number, skill: string) {
    const current = watch(`skillGroups.${groupIdx}.skills`) ?? [];
    setValue(
      `skillGroups.${groupIdx}.skills`,
      current.filter((s) => s !== skill),
    );
  }

  const totalSkills = fields.reduce((sum, _, idx) => {
    const skills = watch(`skillGroups.${idx}.skills`);
    return sum + (skills?.length ?? 0);
  }, 0);

  return (
    <AccordionItem value="skills" className="border-border">
      <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4 font-sans text-sm tracking-widest uppercase hover:no-underline">
        {t("skills")}
        <span className="text-muted-foreground mr-2 ml-auto text-xs font-normal">
          {t("skillsCount", { count: totalSkills })}
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-6">
        {fields.map((field, idx) => {
          const skills = watch(`skillGroups.${idx}.skills`) ?? [];
          return (
            <div key={field.id} className="border-border bg-card space-y-3 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <FormInput
                  id={`skillCat-${field.id}`}
                  label={t("category")}
                  placeholder={t("categoryPlaceholder")}
                  className="flex-1"
                  maxLength={50}
                  error={resolveValidationError(errors.skillGroups?.[idx]?.category?.message, tv)}
                  {...register(`skillGroups.${idx}.category`)}
                />
                <button
                  onClick={() => remove(idx)}
                  className="text-muted-foreground hover:text-destructive mt-5 transition-colors"
                  aria-label={t("removeSkillGroup")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, si) => (
                  <span
                    key={`${si}-${skill}`}
                    className="bg-surface-soft border-border flex items-center gap-1 rounded border px-2 py-0.5 font-sans text-xs"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(idx, skill)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add skill */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkills[field.id] ?? ""}
                  onChange={(e) =>
                    setNewSkills((prev) => ({ ...prev, [field.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(idx);
                    }
                  }}
                  maxLength={50}
                  placeholder={t("typeSkillEnter")}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring flex-1 rounded-md border px-3 py-1.5 text-xs transition-colors focus:outline-none"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addSkill(idx)}
                  className="border-border hover:bg-muted h-8 border text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}

        <Button
          variant="ghost"
          onClick={() => append({ id: generateId(), category: "", skills: [] })}
          className="border-border hover:border-brand-secondary/60 hover:bg-surface-soft h-10 w-full gap-2 border border-dashed font-sans text-xs tracking-widest uppercase"
        >
          <Plus className="h-4 w-4" />
          {t("addSkillGroup")}
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
