"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Resume, ResumeData, ResumeStatus } from "@/types/resume";
import { generateId } from "@/lib/utils";
import { createEmptyResumeData } from "@/lib/resumeDefaults";
import { track } from "@/lib/analytics";

function computeStatus(data: ResumeData): ResumeStatus {
  return data.fullName.trim() && data.experience.length > 0 ? "complete" : "draft";
}

interface ResumeStore {
  resumes: Resume[];
  createResume: (name?: string, initialData?: Partial<ResumeData>, templateId?: string) => Resume;
  updateResume: (id: string, data: Partial<ResumeData>) => void;
  updateResumeName: (id: string, name: string) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => Resume | null;
  incrementExportCount: (id: string) => void;
  reorderSections: (id: string, newOrder: string[]) => void;
  updateTemplateId: (id: string, templateId: string) => void;
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    immer((set, get) => ({
      resumes: [],

      createResume: (name = "Untitled Resume", initialData = {}, templateId?: string) => {
        const data: ResumeData = { ...createEmptyResumeData(), ...initialData };
        const resume: Resume = {
          id: generateId(),
          name,
          templateId,
          status: computeStatus(data),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          exportCount: 0,
          data,
        };
        set((state) => {
          state.resumes.unshift(resume);
        });
        const hasData = initialData && Object.keys(initialData).length > 0;
        const source = hasData ? "import" : templateId ? "template" : "blank";
        track("resume_created", { templateId, source });
        return resume;
      },

      updateResume: (id, data) => {
        set((state) => {
          const idx = state.resumes.findIndex((r) => r.id === id);
          if (idx === -1) return;
          Object.assign(state.resumes[idx].data, data);
          state.resumes[idx].updatedAt = new Date().toISOString();
          state.resumes[idx].status = computeStatus(state.resumes[idx].data);
        });
      },

      updateResumeName: (id, name) => {
        set((state) => {
          const r = state.resumes.find((r) => r.id === id);
          if (r) {
            r.name = name;
            r.updatedAt = new Date().toISOString();
          }
        });
      },

      deleteResume: (id) => {
        set((state) => {
          state.resumes = state.resumes.filter((r) => r.id !== id);
        });
        track("resume_deleted");
      },

      duplicateResume: (id) => {
        const source = get().resumes.find((r) => r.id === id);
        if (!source) return null;
        const copy: Resume = {
          ...source,
          data: JSON.parse(JSON.stringify(source.data)),
          id: generateId(),
          name: `${source.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          exportCount: 0,
        };
        set((state) => {
          state.resumes.unshift(copy);
        });
        track("resume_duplicated");
        return copy;
      },

      incrementExportCount: (id) => {
        set((state) => {
          const r = state.resumes.find((r) => r.id === id);
          if (r) r.exportCount += 1;
        });
      },

      reorderSections: (id, newOrder) => {
        set((state) => {
          const r = state.resumes.find((r) => r.id === id);
          if (r) {
            r.data.sectionOrder = newOrder;
            r.updatedAt = new Date().toISOString();
          }
        });
      },

      updateTemplateId: (id, templateId) => {
        set((state) => {
          const r = state.resumes.find((r) => r.id === id);
          if (r) {
            r.templateId = templateId;
            r.updatedAt = new Date().toISOString();
          }
        });
      },
    })),
    {
      name: "architect-suite-resumes",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage,
      ),
    },
  ),
);
