export * from "./index";

import { pdf, type DocumentProps } from "@react-pdf/renderer";
import React from "react";
import ResumePDFDocument from "./components/ResumePDFDocument";
import CoverLetterPDFDocument from "./components/CoverLetterPDFDocument";
import { Resume } from "./types/resume";
import { CoverLetter } from "./types/coverLetter";

export async function generateResumePDFBlob(
  resume: Resume,
  locale: string = "en",
  messages?: Record<string, Record<string, string>>,
): Promise<Blob> {
  const element = React.createElement(ResumePDFDocument, {
    resume,
    locale,
    messages,
  }) as unknown as React.ReactElement<DocumentProps>;
  return pdf(element).toBlob();
}

export async function generateCoverLetterPDFBlob(
  coverLetter: CoverLetter,
  locale: string = "en",
): Promise<Blob> {
  const element = React.createElement(CoverLetterPDFDocument, {
    coverLetter,
    locale,
  }) as unknown as React.ReactElement<DocumentProps>;
  return pdf(element).toBlob();
}

export { default as ResumePDFDocument } from "./components/ResumePDFDocument";
export { default as CoverLetterPDFDocument } from "./components/CoverLetterPDFDocument";
