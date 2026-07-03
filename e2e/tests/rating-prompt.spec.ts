import { test, expect } from "@playwright/test";
import { seedResumes } from "../fixtures/seed-localstorage";
import { TEST_RESUME, EXPECTED } from "../fixtures/test-resume";

test.describe("Rating prompt modal", () => {
  test("reappears on editor mount when already exported and not yet rated", async ({ page }) => {
    // User exported once in a previous visit, the dialog was shown, and
    // they navigated away without rating. Just landing on the editor
    // should re-open the modal — no further export needed.
    await seedResumes(page, [{ ...TEST_RESUME, exportCount: 1 }]);
    await page.evaluate(() => localStorage.setItem("architect-suite-rating-pending", "true"));
    await page.goto(`/editor/${TEST_RESUME.id}`);
    await page.waitForSelector(`text=${EXPECTED.fullName}`, { timeout: 15_000 });

    await expect(page.getByRole("dialog", { name: /how was your experience/i })).toBeVisible();
  });

  test("appears after the first export", async ({ page }) => {
    await seedResumes(page, [{ ...TEST_RESUME, exportCount: 0 }]);
    await page.goto(`/editor/${TEST_RESUME.id}`);
    await page.waitForSelector(`text=${EXPECTED.fullName}`, { timeout: 15_000 });

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    await downloadPromise;

    await expect(page.getByRole("dialog", { name: /how was your experience/i })).toBeVisible();
  });

  test.describe("after the first export", () => {
    test.beforeEach(async ({ page }) => {
      await seedResumes(page, [{ ...TEST_RESUME, exportCount: 0 }]);
      await page.goto(`/editor/${TEST_RESUME.id}`);
      await page.waitForSelector(`text=${EXPECTED.fullName}`, { timeout: 15_000 });

      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("button", { name: /export/i }).click();
      await downloadPromise;

      await expect(page.getByRole("dialog", { name: /how was your experience/i })).toBeVisible();
    });

    test("renders without a close button or 'Maybe later'", async ({ page }) => {
      const dialog = page.getByRole("dialog", { name: /how was your experience/i });
      await expect(dialog.getByRole("button", { name: /close/i })).toHaveCount(0);
      await expect(dialog.getByRole("button", { name: /maybe later/i })).toHaveCount(0);
    });

    test("does not close on Escape or backdrop click", async ({ page }) => {
      const dialog = page.getByRole("dialog", { name: /how was your experience/i });

      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
      await expect(dialog).toBeVisible();

      // Click outside the popup (top-left of the viewport, well clear of the modal).
      await page.mouse.click(5, 5);
      await page.waitForTimeout(200);
      await expect(dialog).toBeVisible();
    });

    test("submit is disabled until a star is selected, then closes the modal", async ({ page }) => {
      const dialog = page.getByRole("dialog", { name: /how was your experience/i });
      const submit = dialog.getByRole("button", { name: /submit/i });
      await expect(submit).toBeDisabled();

      await dialog.getByRole("radio", { name: "4" }).click();
      await expect(submit).toBeEnabled();
      await submit.click();

      await expect(dialog).toBeHidden();

      const record = await page.evaluate(() =>
        localStorage.getItem("architect-suite-rating-prompt"),
      );
      expect(record).not.toBeNull();
      expect(JSON.parse(record!)).toMatchObject({ action: "rated" });
    });
  });
});
