import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows all required fields", async ({ page }) => {
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("submits a valid enquiry", async ({ page }) => {
    await page.getByLabel("Name").fill("E2E Test User");
    await page.getByLabel("Email").fill(`e2e-${Date.now()}@example.com`);
    await page.getByLabel("Message").fill("This is an automated end-to-end test enquiry message.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Thank you")).toBeVisible({ timeout: 15000 });
  });
});
