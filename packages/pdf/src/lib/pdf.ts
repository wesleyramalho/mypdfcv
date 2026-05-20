import { renderToBuffer } from "@react-pdf/renderer";
import ResumePDFDocument from "../components/ResumePDFDocument";
import { Resume } from "../types/resume";
import React from "react";

export async function generateResumePDF(
  resume: Resume,
  locale: string = "en",
  messages?: Record<string, Record<string, string>>,
): Promise<Buffer> {
  const element = React.createElement(ResumePDFDocument, {
    resume,
    locale,
    messages,
  }) as unknown as React.ReactElement<import("@react-pdf/renderer").DocumentProps>;
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}
