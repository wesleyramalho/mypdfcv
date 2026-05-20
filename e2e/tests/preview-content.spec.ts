import { test, expect } from "@playwright/test";
import { seedResumes } from "../fixtures/seed-localstorage";
import { TEST_RESUME, EXPECTED } from "../fixtures/test-resume";
import { assertResumeContent } from "../helpers/content-assertions";

test.describe("Preview Content", () => {
  test.beforeEach(async ({ page }) => {
    await seedResumes(page, [TEST_RESUME]);
    await page.goto(`/editor/${TEST_RESUME.id}`);
    // Wait for Zustand hydration — the name should appear in the preview
    await page.waitForSelector(`text=${EXPECTED.fullName}`, {
      timeout: 15_000,
    });
  });

  test("displays the full name and headline", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    expect(text.toLowerCase()).toContain(EXPECTED.fullName.toLowerCase());
    expect(text.toLowerCase()).toContain(EXPECTED.headline.toLowerCase());
  });

  test("displays all experience entries", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    for (const company of EXPECTED.companies) {
      expect(text.toLowerCase()).toContain(company.toLowerCase());
    }
  });

  test("displays education", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    for (const school of EXPECTED.schools) {
      expect(text.toLowerCase()).toContain(school.toLowerCase());
    }
  });

  test("displays skills", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    for (const skill of EXPECTED.skills) {
      expect(text.toLowerCase()).toContain(skill.toLowerCase());
    }
  });

  test("displays contact information", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    expect(text.toLowerCase()).toContain(EXPECTED.contactEmail.toLowerCase());
    expect(text.toLowerCase()).toContain(EXPECTED.location.toLowerCase());
  });

  test("displays projects", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    for (const project of EXPECTED.projectNames) {
      expect(text.toLowerCase()).toContain(project.toLowerCase());
    }
  });

  test("contains all expected content (comprehensive check)", async ({ page }) => {
    const preview = page.locator(".bg-white.shadow-lg");
    const text = await preview.innerText();
    assertResumeContent(text, EXPECTED, "Preview");
  });
});
