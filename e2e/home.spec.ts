import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows main navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.getByRole("link", { name: /isuzu truck sales/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /service & parts/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to content/i });
    await expect(skipLink).toHaveAttribute("href", "#main");
  });
});

test.describe("Navigation", () => {
  test("can navigate to sales, service, and blog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /isuzu truck sales/i }).first().click();
    await expect(page).toHaveURL(/\/sales/);

    await page.getByRole("link", { name: /service & parts/i }).first().click();
    await expect(page).toHaveURL(/\/service/);

    await page.getByRole("link", { name: /blog/i }).first().click();
    await expect(page).toHaveURL(/\/blog/);
  });
});
