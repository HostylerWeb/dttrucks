import { test, expect } from "@playwright/test";

const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@dttrucks.com";
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "changeme";

test.describe("Admin", () => {
  test("login page loads", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("rejects invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("admin can sign in and reach dashboard", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(adminEmail);
    await page.getByLabel("Password").fill(adminPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
});

test.describe("Mobile navigation", () => {
  test("hamburger menu opens on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
  });
});
