import { test, expect } from "@playwright/test";
import { seedResumes } from "../fixtures/seed-localstorage";
import { TEMPLATE_EXPECTATIONS, type TestResume } from "../fixtures/test-resume";
import { extractTextFromDownload, normalizeText, pdfContains } from "../helpers/pdf-extractor";

/**
 * Builds a full TestResume from a template's expected data.
 * Uses the same sampleData structure that the app uses when creating
 * a resume from a template — we inline the key fields here to avoid
 * importing from src/ (path alias issues).
 */
function buildResumeForTemplate(templateId: string): TestResume {
  const expected = TEMPLATE_EXPECTATIONS[templateId];
  return {
    id: `test-${templateId}`,
    name: `Test ${templateId}`,
    templateId,
    status: "complete",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    exportCount: 0,
    data: {
      fullName: expected.fullName,
      headline: "Test Headline",
      summary: "Test summary for template validation.",
      contact: {
        email: "test@example.com",
        phone: "+1 (555) 000-0000",
        location: "Test City, TC",
        linkedin: "",
        website: "",
      },
      experience: expected.companies.map((company, i) => ({
        id: `exp-${templateId}-${i}`,
        company,
        title: `Role at ${company}`,
        location: "Test City, TC",
        startDate: "2020-01",
        endDate: i === 0 ? null : "2022-01",
        current: i === 0,
        description: `Worked on key projects at ${company}.`,
      })),
      education: expected.schools.map((school, i) => ({
        id: `edu-${templateId}-${i}`,
        school,
        degree: "B.S.",
        field: "Test Field",
        startDate: "2015-08",
        endDate: "2019-05",
        highlights: "",
      })),
      skillGroups: [
        {
          id: `skill-${templateId}`,
          category: "Core",
          skills: expected.skills,
        },
      ],
      projects: [],
      sections: {
        summary: true,
        experience: true,
        education: true,
        skills: true,
        projects: false,
      },
      sectionOrder: ["experience", "education", "skills", "projects"],
    },
  };
}

const templateIds = Object.keys(TEMPLATE_EXPECTATIONS);

for (const templateId of templateIds) {
  test.describe(`Template: ${templateId}`, () => {
    const expected = TEMPLATE_EXPECTATIONS[templateId];
    const resume = buildResumeForTemplate(templateId);

    test.beforeEach(async ({ page }) => {
      await seedResumes(page, [resume]);
      await page.goto(`/editor/${resume.id}`);
      await page.waitForSelector(`text=${expected.fullName}`, {
        timeout: 15_000,
      });
    });

    test("preview shows correct content", async ({ page }) => {
      const previewText = normalizeText(await page.locator(".bg-white.shadow-lg").innerText());

      expect(previewText).toContain(expected.fullName.toLowerCase());
      for (const company of expected.companies) {
        expect(previewText).toContain(company.toLowerCase());
      }
      for (const school of expected.schools) {
        expect(previewText).toContain(school.toLowerCase());
      }
      for (const skill of expected.skills) {
        expect(previewText).toContain(skill.toLowerCase());
      }
    });

    test("PDF contains correct content", async ({ page }) => {
      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("button", { name: /export/i }).click();
      const download = await downloadPromise;
      const pdfText = await extractTextFromDownload(download);

      expect(pdfContains(pdfText, expected.fullName)).toBe(true);
      for (const company of expected.companies) {
        expect(pdfContains(pdfText, company), `PDF missing "${company}"`).toBe(true);
      }
      for (const school of expected.schools) {
        expect(pdfContains(pdfText, school), `PDF missing "${school}"`).toBe(true);
      }
      for (const skill of expected.skills) {
        expect(pdfContains(pdfText, skill), `PDF missing "${skill}"`).toBe(true);
      }
    });

    test("preview and PDF are consistent", async ({ page }) => {
      const previewText = normalizeText(await page.locator(".bg-white.shadow-lg").innerText());

      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("button", { name: /export/i }).click();
      const download = await downloadPromise;
      const pdfText = await extractTextFromDownload(download);

      const terms = [
        expected.fullName,
        ...expected.companies,
        ...expected.schools,
        ...expected.skills,
      ];

      for (const term of terms) {
        const lower = term.toLowerCase();
        expect(previewText, `Preview missing "${term}"`).toContain(lower);
        expect(pdfContains(pdfText, term), `PDF missing "${term}"`).toBe(true);
      }
    });
  });
}
