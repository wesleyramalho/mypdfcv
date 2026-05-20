import { expect } from "@playwright/test";
import { normalizeText, pdfContains } from "./pdf-extractor";

interface ExpectedContent {
  fullName: string;
  companies: string[];
  schools: string[];
  skills: string[];
  projectNames?: string[];
}

/**
 * Asserts that a text blob (from preview innerText or PDF extraction)
 * contains all expected resume content.
 * For PDF text, uses space-stripping comparison to handle letter-spacing artifacts.
 */
export function assertResumeContent(
  rawText: string,
  expected: ExpectedContent,
  label: string,
): void {
  const isPdf = label.toLowerCase().includes("pdf");

  function contains(text: string, term: string): boolean {
    if (isPdf) return pdfContains(text, term);
    return normalizeText(text).includes(term.toLowerCase());
  }

  expect(contains(rawText, expected.fullName), `${label}: should contain full name`).toBe(true);

  for (const company of expected.companies) {
    expect(contains(rawText, company), `${label}: should contain company "${company}"`).toBe(true);
  }

  for (const school of expected.schools) {
    expect(contains(rawText, school), `${label}: should contain school "${school}"`).toBe(true);
  }

  for (const skill of expected.skills) {
    expect(contains(rawText, skill), `${label}: should contain skill "${skill}"`).toBe(true);
  }

  if (expected.projectNames) {
    for (const project of expected.projectNames) {
      expect(contains(rawText, project), `${label}: should contain project "${project}"`).toBe(
        true,
      );
    }
  }
}
