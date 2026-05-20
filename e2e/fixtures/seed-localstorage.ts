import type { Page } from "@playwright/test";
import type { TestResume } from "./test-resume";

/**
 * Seeds the Zustand resume store via localStorage before the app hydrates.
 * Must be called before navigating to the editor page.
 *
 * Zustand persist middleware stores data under "architect-suite-resumes" with shape:
 * { state: { resumes: Resume[] }, version: 0 }
 */
export async function seedResumes(page: Page, resumes: TestResume[]): Promise<void> {
  // Navigate to a page so we have access to localStorage
  await page.goto("/");
  await page.evaluate((data) => {
    localStorage.setItem(
      "architect-suite-resumes",
      JSON.stringify({
        state: { resumes: data },
        version: 0,
      }),
    );
  }, resumes);
}
