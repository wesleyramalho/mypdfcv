import { renderToBuffer } from "@react-pdf/renderer";
import CoverLetterPDFDocument from "../components/CoverLetterPDFDocument";
import { CoverLetter } from "../types/coverLetter";
import React from "react";

export async function generateCoverLetterPDF(
  coverLetter: CoverLetter,
  locale: string = "en",
): Promise<Buffer> {
  const element = React.createElement(CoverLetterPDFDocument, {
    coverLetter,
    locale,
  }) as unknown as React.ReactElement<import("@react-pdf/renderer").DocumentProps>;
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}
