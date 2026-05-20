import { test, expect } from "@playwright/test";
import { seedResumes } from "../fixtures/seed-localstorage";
import { TEST_RESUME, EXPECTED } from "../fixtures/test-resume";
import { extractTextFromDownload, normalizeText, pdfContains } from "../helpers/pdf-extractor";

test.describe("Preview ↔ PDF Consistency", () => {
  test("preview and PDF contain the same resume content", async ({ page }) => {
    await seedResumes(page, [TEST_RESUME]);
    await page.goto(`/editor/${TEST_RESUME.id}`);
    await page.waitForSelector(`text=${EXPECTED.fullName}`, { timeout: 15_000 });

    // Extract text from the HTML preview
    const previewText = await page.locator(".bg-white.shadow-lg").innerText();

    // Export PDF and extract text
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;
    const pdfText = await extractTextFromDownload(download);

    // Both surfaces should contain all key content
    const terms = [
      EXPECTED.fullName,
      ...EXPECTED.companies,
      ...EXPECTED.schools,
      ...EXPECTED.skills,
      ...EXPECTED.projectNames,
    ];

    const normalizedPreview = normalizeText(previewText);

    for (const term of terms) {
      const lower = term.toLowerCase();
      expect(normalizedPreview, `Preview should contain "${term}"`).toContain(lower);
      expect(pdfContains(pdfText, term), `PDF should contain "${term}"`).toBe(true);
    }
  });

  test("experience descriptions appear in both surfaces", async ({ page }) => {
    await seedResumes(page, [TEST_RESUME]);
    await page.goto(`/editor/${TEST_RESUME.id}`);
    await page.waitForSelector(`text=${EXPECTED.fullName}`, { timeout: 15_000 });

    const previewText = normalizeText(await page.locator(".bg-white.shadow-lg").innerText());

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;
    const pdfText = await extractTextFromDownload(download);

    // Check that key phrases from experience descriptions appear in both
    const keyPhrases = ["billing dashboard", "deployment infrastructure", "50K+ merchants"];

    for (const phrase of keyPhrases) {
      expect(previewText, `Preview should contain "${phrase}"`).toContain(phrase.toLowerCase());
      expect(pdfContains(pdfText, phrase), `PDF should contain "${phrase}"`).toBe(true);
    }
  });
});
