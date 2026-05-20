import type { ResumeData } from "@/types/resume";
import { extractTextFromPDF, extractTextFromDOCX } from "./extractText";
import { parseResumeText } from "./parseResume";

export async function importResumeFromFile(file: File): Promise<{
  data: Partial<ResumeData>;
  textLength: number;
}> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  let text: string;
  if (ext === "pdf") {
    text = await extractTextFromPDF(file);
  } else if (ext === "docx" || ext === "doc") {
    text = await extractTextFromDOCX(file);
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
  }

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error(
      "Could not extract text from this file. It may be a scanned document or image-only PDF.",
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[resume-import] Extracted text:\n", trimmed.slice(0, 2000));
  }

  const data = parseResumeText(trimmed);

  if (process.env.NODE_ENV === "development") {
    console.log("[resume-import] Parsed data:", JSON.stringify(data, null, 2).slice(0, 2000));
  }

  return { data, textLength: trimmed.length };
}
