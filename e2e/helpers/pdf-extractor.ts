import fs from "fs";
import type { Download } from "@playwright/test";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

/**
 * Extracts all text content from a Playwright Download object (PDF).
 * Uses pdfjs-dist directly for reliable parsing of modern PDFs.
 */
export async function extractTextFromDownload(download: Download): Promise<string> {
  const filePath = await download.path();
  if (!filePath) throw new Error("Download has no file path");

  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let fullText = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageText = textContent.items.map((item: any) => item.str).join("");
    fullText += pageText;
  }

  return fullText;
}

/**
 * Normalizes text for comparison: collapses whitespace and lowercases.
 * Use for HTML preview text where spacing is reliable.
 */
export function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * Normalizes PDF text by stripping ALL whitespace then lowercasing.
 * PDF renderers like @react-pdf add letter-spacing that pdfjs extracts as
 * spaces between characters (e.g. "a l e x" instead of "alex").
 */
export function normalizePdfText(text: string): string {
  return text.replace(/\s+/g, "").toLowerCase();
}

/**
 * Checks if normalized PDF text contains the expected term (also space-stripped).
 */
export function pdfContains(pdfText: string, term: string): boolean {
  return normalizePdfText(pdfText).includes(normalizePdfText(term));
}
