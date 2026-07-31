import { test, expect } from "@playwright/test";

test.describe("Public content pages", () => {
  test("sales index loads truck listings", async ({ page }) => {
    await page.goto("/sales");
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("can open a truck detail page from sales", async ({ page }) => {
    await page.goto("/sales");
    const truckLink = page.locator("main a[href^='/sales/']").first();
    await expect(truckLink).toBeVisible();
    await truckLink.click();
    await expect(page).toHaveURL(/\/sales\/[^/]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("service detail page loads", async ({ page }) => {
    await page.goto("/service");
    const serviceLink = page.locator("main a[href^='/service/']").first();
    await expect(serviceLink).toBeVisible();
    await serviceLink.click();
    await expect(page).toHaveURL(/\/service\/[^/]+$/);
  });

  test("blog post detail loads", async ({ page }) => {
    await page.goto("/blog");
    const postLink = page.locator("main a[href^='/blog/']").first();
    await expect(postLink).toBeVisible();
    await postLink.click();
    await expect(page).toHaveURL(/\/blog\/[^/]+$/);
    await expect(page.getByRole("article").filter({ has: page.getByRole("heading", { level: 1 }) })).toBeVisible();
  });

  test("careers detail loads", async ({ page }) => {
    await page.goto("/careers");
    const jobLink = page.locator("main a[href^='/careers/']").first();
    if (await jobLink.count() === 0) {
      test.skip();
      return;
    }
    await jobLink.click();
    await expect(page).toHaveURL(/\/careers\/[^/]+$/);
  });
});
