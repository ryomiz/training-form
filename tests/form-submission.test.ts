import { test, expect } from "@playwright/test";

test.describe("Application Form Submission", () => {
  test("succeed submission and transition to complete page", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.fill('input[name="firstName"]', "Ryosuke");
    await page.fill('input[name="lastName"]', "Mizuno");
    await page.fill('input[name="email"]', "ryo@example.com");
    // Skip age because it has a default value
    const input = page.locator('label:has-text("Photo") + * input');
    await input.setInputFiles("tests/photo.jpg");

    await page.waitForSelector('table[role="grid"]');
    await page.click('button[data-day="2025-09-04"]');

    await page.waitForSelector('div[role="radiogroup"]');
    await page.click('label[for="1200"]');

    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Your application has been submitted successfully"),
    ).toBeVisible();
  });

  test("failed submission due to invalid email", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.fill('input[name="firstName"]', "Ryosuke");
    await page.fill('input[name="lastName"]', "Mizuno");
    await page.fill('input[name="email"]', "invalid email");
    // Skip age because it has a default value
    const input = page.locator('label:has-text("Photo") + * input');
    await input.setInputFiles("tests/photo.jpg");

    await page.waitForSelector('table[role="grid"]');
    await page.click('button[data-day="2025-09-04"]');

    await page.waitForSelector('div[role="radiogroup"]');
    await page.click('label[for="1200"]');

    await page.click('button[type="submit"]');
    const errorMessage = page
      .locator('input[name="email"]')
      .locator("..")
      .locator("..")
      .locator("p");
    await expect(errorMessage).toBeVisible();
  });

  test("display notice when an observance holiday si selected", async ({
    page,
  }) => {
    // It works only in September
    await page.goto("/", { waitUntil: "networkidle" });
    const nextMonthButton = await page.locator(
      'button[aria-label="Go to the Next Month"]',
    );
    await nextMonthButton.click();
    await nextMonthButton.click();
    await nextMonthButton.click();
    await page.click('button[data-day="2025-12-24"]');

    const notice = page
      .locator('[data-slot="calendar"]')
      .locator("..")
      .locator("div")
      .nth(2);
    await expect(notice).toBeVisible();
  });
});
