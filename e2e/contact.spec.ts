import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows all required fields", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: "Name", exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email", exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Message", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("submits a valid enquiry", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("E2E Test User");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill(`e2e-${Date.now()}@example.com`);
    await page.getByRole("textbox", { name: "Message", exact: true }).fill("This is an automated end-to-end test enquiry message.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Thank you")).toBeVisible({ timeout: 15000 });
  });
});
