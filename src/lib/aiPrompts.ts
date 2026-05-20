import type { FieldType } from "@/types/ai-worker";

const PROMPT_TEMPLATES: Record<FieldType, string> = {
  experience:
    "Improve this resume bullet point to be more impactful with strong action verbs and measurable results:",
  summary: "Rewrite this professional summary to be more compelling and concise:",
  project: "Improve this project description to highlight technical impact:",
  education: "Improve these education highlights to be more specific and impactful:",
};

export function buildPrompt(fieldType: FieldType, text: string): string {
  return `${PROMPT_TEMPLATES[fieldType]} ${text}`;
}
