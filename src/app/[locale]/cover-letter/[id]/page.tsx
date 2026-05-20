"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { track } from "@/lib/analytics";
import { Pencil, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import CoverLetterToolbar from "@/components/cover-letter-editor/CoverLetterToolbar";
import SenderInfoSection from "@/components/cover-letter-editor/sections/SenderInfoSection";
import RecipientSection from "@/components/cover-letter-editor/sections/RecipientSection";
import LetterContentSection from "@/components/cover-letter-editor/sections/LetterContentSection";
import ResumeLinkSection from "@/components/cover-letter-editor/sections/ResumeLinkSection";
import CoverLetterPreview from "@/components/cover-letter-editor/preview/CoverLetterPreview";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CoverLetterEditorPage({ params }: Props) {
  const { id } = use(params);
  const coverLetter = useCoverLetterStore((s) => s.coverLetters.find((cl) => cl.id === id));
  const t = useTranslations("editor");

  useEffect(() => {
    if (coverLetter) track("cover_letter_opened", { id });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!coverLetter) {
    notFound();
  }

  const data = coverLetter.data;

  const formContent = (
    <div className="space-y-8">
      <ResumeLinkSection coverLetterId={id} data={data} />
      <div className="bg-border h-px" />
      <SenderInfoSection coverLetterId={id} data={data} />
      <div className="bg-border h-px" />
      <RecipientSection coverLetterId={id} data={data} />
      <div className="bg-border h-px" />
      <LetterContentSection coverLetterId={id} data={data} />
    </div>
  );

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <CoverLetterToolbar coverLetter={coverLetter} />

      {/* Desktop: two-column layout */}
      <div className="hidden flex-1 lg:grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Left: form */}
        <div className="border-border bg-card flex flex-col overflow-hidden border-r">
          <ScrollArea className="flex-1">
            <div className="px-6 py-6">{formContent}</div>
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
            <CoverLetterPreview data={data} templateId={coverLetter.templateId} />
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
            <div className="px-3 py-4 sm:px-4">{formContent}</div>
          </TabsContent>
          <TabsContent value="preview" className="mt-0 h-full flex-1 overflow-hidden">
            <CoverLetterPreview data={data} templateId={coverLetter.templateId} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
