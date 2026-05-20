"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CoverLetter, CoverLetterData, CoverLetterStatus } from "@/types/coverLetter";
import { generateId } from "@/lib/utils";
import { createEmptyCoverLetterData } from "@/lib/coverLetterDefaults";
import { track } from "@/lib/analytics";

function computeStatus(data: CoverLetterData): CoverLetterStatus {
  return data.senderName.trim() && data.bodyParagraphs.some((p) => p.trim()) ? "complete" : "draft";
}

interface CoverLetterStore {
  coverLetters: CoverLetter[];
  createCoverLetter: (
    name?: string,
    initialData?: Partial<CoverLetterData>,
    templateId?: string,
  ) => CoverLetter;
  updateCoverLetter: (id: string, data: Partial<CoverLetterData>) => void;
  updateCoverLetterName: (id: string, name: string) => void;
  deleteCoverLetter: (id: string) => void;
  duplicateCoverLetter: (id: string) => CoverLetter | null;
  incrementExportCount: (id: string) => void;
  updateTemplateId: (id: string, templateId: string) => void;
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useCoverLetterStore = create<CoverLetterStore>()(
  persist(
    immer((set, get) => ({
      coverLetters: [],

      createCoverLetter: (
        name = "Untitled Cover Letter",
        initialData = {},
        templateId?: string,
      ) => {
        const data: CoverLetterData = { ...createEmptyCoverLetterData(), ...initialData };
        const coverLetter: CoverLetter = {
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
          state.coverLetters.unshift(coverLetter);
        });
        track("cover_letter_created", { templateId });
        return coverLetter;
      },

      updateCoverLetter: (id, data) => {
        set((state) => {
          const idx = state.coverLetters.findIndex((cl) => cl.id === id);
          if (idx === -1) return;
          Object.assign(state.coverLetters[idx].data, data);
          state.coverLetters[idx].updatedAt = new Date().toISOString();
          state.coverLetters[idx].status = computeStatus(state.coverLetters[idx].data);
        });
      },

      updateCoverLetterName: (id, name) => {
        set((state) => {
          const cl = state.coverLetters.find((cl) => cl.id === id);
          if (cl) {
            cl.name = name;
            cl.updatedAt = new Date().toISOString();
          }
        });
      },

      deleteCoverLetter: (id) => {
        set((state) => {
          state.coverLetters = state.coverLetters.filter((cl) => cl.id !== id);
        });
        track("cover_letter_deleted");
      },

      duplicateCoverLetter: (id) => {
        const source = get().coverLetters.find((cl) => cl.id === id);
        if (!source) return null;
        const copy: CoverLetter = {
          ...source,
          data: JSON.parse(JSON.stringify(source.data)),
          id: generateId(),
          name: `${source.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          exportCount: 0,
        };
        set((state) => {
          state.coverLetters.unshift(copy);
        });
        track("cover_letter_duplicated");
        return copy;
      },

      incrementExportCount: (id) => {
        set((state) => {
          const cl = state.coverLetters.find((cl) => cl.id === id);
          if (cl) cl.exportCount += 1;
        });
      },

      updateTemplateId: (id, templateId) => {
        set((state) => {
          const cl = state.coverLetters.find((cl) => cl.id === id);
          if (cl) {
            cl.templateId = templateId;
            cl.updatedAt = new Date().toISOString();
          }
        });
        track("cover_letter_template_changed", { templateId });
      },
    })),
    {
      name: "architect-suite-cover-letters",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage,
      ),
    },
  ),
);
