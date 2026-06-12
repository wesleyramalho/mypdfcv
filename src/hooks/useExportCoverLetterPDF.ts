"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { track } from "@/lib/analytics";
import { notifyExportSuccess } from "@/lib/subscribePrompt";

export function useExportCoverLetterPDF() {
  const [exporting, setExporting] = useState(false);
  const incrementExportCount = useCoverLetterStore((s) => s.incrementExportCount);
  const locale = useLocale();

  async function exportPDF(coverLetter: CoverLetter) {
    setExporting(true);
    try {
      const { generateCoverLetterPDFBlob } = await import("@mypdfcv/pdf-core/client");
      const blob = await generateCoverLetterPDFBlob(coverLetter, locale);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${coverLetter.name.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      incrementExportCount(coverLetter.id);
      track("cover_letter_pdf_exported", { templateId: coverLetter.templateId, locale });
      notifyExportSuccess();
    } catch (err) {
      console.error("Export Cover Letter PDF error:", err);
    } finally {
      setExporting(false);
    }
  }

  return { exportPDF, exporting };
}
