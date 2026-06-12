"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Resume } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { track } from "@/lib/analytics";
import { notifyExportSuccess } from "@/lib/subscribePrompt";

export function useExportPDF() {
  const [exporting, setExporting] = useState(false);
  const incrementExportCount = useResumeStore((s) => s.incrementExportCount);
  const locale = useLocale();

  async function exportPDF(resume: Resume) {
    setExporting(true);
    try {
      const { generateResumePDFBlob } = await import("@mypdfcv/pdf-core/client");
      const blob = await generateResumePDFBlob(resume, locale);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.name.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      incrementExportCount(resume.id);
      track("pdf_exported", { templateId: resume.templateId, locale });
      notifyExportSuccess();
    } catch (err) {
      console.error("Export PDF error:", err);
    } finally {
      setExporting(false);
    }
  }

  return { exportPDF, exporting };
}
