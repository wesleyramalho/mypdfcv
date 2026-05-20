"use client";

import { Suspense, use, useState } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronUp, ChevronDown, Pencil, Eye } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditorNav from "@/components/editor/EditorNav";
import EditorToolbar from "@/components/editor/EditorToolbar";
import PersonalInfoSection from "@/components/editor/sections/PersonalInfoSection";
import ExperienceSection from "@/components/editor/sections/ExperienceSection";
import EducationSection from "@/components/editor/sections/EducationSection";
import SkillsSection from "@/components/editor/sections/SkillsSection";
import ProjectsSection from "@/components/editor/sections/ProjectsSection";
import SummarySection from "@/components/editor/sections/SummarySection";
import ResumePreview from "@/components/editor/preview/ResumePreview";
import Footer from "@/components/Footer";
import type { ResumeData } from "@/types/resume";

const SECTION_COMPONENTS: Record<string, React.FC<{ resumeId: string; data: ResumeData }>> = {
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
};

const DEFAULT_ORDER = ["summary", "experience", "education", "skills", "projects"];

interface Props {
  params: Promise<{ id: string }>;
}

const SECTION_DESC_KEYS: Record<string, string> = {
  personal: "sectionDescPersonal",
  experience: "sectionDescExperience",
  education: "sectionDescEducation",
  skills: "sectionDescSkills",
  projects: "sectionDescProjects",
  summary: "sectionDescSummary",
};

export default function EditorPage({ params }: Props) {
  const { id } = use(params);
  const resume = useResumeStore((s) => s.resumes.find((r) => r.id === id));
  const [activeSection, setActiveSection] = useState<string | null>("personal");
  const t = useTranslations("editor");

  if (!resume) {
    notFound();
  }

  const data = resume.data;

  const sectionOrder = data.sectionOrder?.length ? data.sectionOrder : DEFAULT_ORDER;

  const formContent = (
    <Accordion
      value={activeSection ? [activeSection] : []}
      onValueChange={(v: string[]) => setActiveSection(v.length ? v[v.length - 1] : null)}
      className="divide-border divide-y"
    >
      <PersonalInfoSection resumeId={id} data={data} />
      {sectionOrder.map((key) => {
        const Section = SECTION_COMPONENTS[key];
        return Section ? <Section key={key} resumeId={id} data={data} /> : null;
      })}
    </Accordion>
  );

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Suspense>
        <EditorToolbar resume={resume} />
      </Suspense>

      {/* Desktop: three-column layout */}
      <div className="hidden flex-1 lg:grid" style={{ gridTemplateColumns: "240px 1fr 1fr" }}>
        {/* Left: nav sidebar */}
        <aside className="border-border bg-surface-soft/60 sticky top-0 flex h-screen flex-col overflow-auto border-r px-3">
          <div className="mt-3 mb-2">
            <p className="text-text-subtle px-3 font-sans text-[10px] tracking-[0.2em] uppercase">
              {t("professionalDraft")}
            </p>
          </div>
          <EditorNav
            resumeId={id}
            sectionOrder={data.sectionOrder ?? []}
            activeSection={activeSection ?? ""}
            onSelect={setActiveSection}
          />
        </aside>

        {/* Center: form */}
        <div className="border-border bg-card flex flex-col overflow-hidden border-r">
          <div className="border-border bg-card sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-6 py-4">
            <div>
              <p className="text-text-subtle font-sans text-[10px] tracking-[0.2em] uppercase">
                {activeSection
                  ? `Section 01 — ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`
                  : t("allSections")}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {activeSection ? t(SECTION_DESC_KEYS[activeSection]) : t("clickToExpand")}
              </p>
            </div>
            <button
              onClick={() => setActiveSection(activeSection ? null : "personal")}
              title={activeSection ? "Collapse all" : "Expand"}
              className="text-muted-foreground hover:text-foreground mt-0.5 shrink-0 transition-colors"
            >
              {activeSection ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">{formContent}</div>
          </ScrollArea>
        </div>

        {/* Right: live preview */}
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="border-border bg-card flex items-center gap-2 border-b px-4 py-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <p className="text-text-subtle font-sans text-[10px] tracking-widest uppercase">
              {t("livePreviewRendering")}
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ResumePreview data={data} templateId={resume.templateId} />
          </div>
        </div>
      </div>

      {/* Mobile: tabs */}
      <div className="flex-1 lg:hidden">
        <Tabs defaultValue="edit" className="flex h-full flex-col">
          <TabsList className="border-border bg-background sticky top-0 z-20 h-12 w-full gap-0 rounded-none border-b p-0">
            <TabsTrigger
              value="edit"
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:tab-glow-border flex h-full flex-1 items-center justify-center gap-2 rounded-none font-sans text-xs tracking-widest uppercase transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              {t("tabEdit")}
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:tab-glow-border flex h-full flex-1 items-center justify-center gap-2 rounded-none font-sans text-xs tracking-widest uppercase transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              {t("tabPreview")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="mt-0 flex-1 overflow-auto">
            <div className="px-3 py-3 sm:px-4 sm:py-4">{formContent}</div>
          </TabsContent>
          <TabsContent value="preview" className="mt-0 h-full flex-1 overflow-hidden">
            <ResumePreview data={data} templateId={resume.templateId} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
