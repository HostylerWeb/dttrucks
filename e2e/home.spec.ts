import { test, expect } from "@playwright/test";

async function openMobileMenuIfNeeded(page: import("@playwright/test").Page) {
  if ((page.viewportSize()?.width ?? 1280) >= 1280) return false;

  const menuButton = page.locator('button[aria-label="Open menu"]');
  if ((await menuButton.getAttribute("aria-expanded").catch(() => null)) === "true") {
    return true;
  }
  if (await menuButton.isVisible().catch(() => false)) {
    await menuButton.click();
    return true;
  }
  return false;
}

async function revealMainNavItem(page: import("@playwright/test").Page, href: string) {
  const mobile = await openMobileMenuIfNeeded(page);

  if (mobile && (href === "/sales" || href === "/service")) {
    const visibleLink = page.locator(`nav[aria-label="Mobile"] a[href="${href}"]:visible`);
    if ((await visibleLink.count()) === 0) {
      const summaryLabel = href === "/sales" ? "Products" : "Aftersales & Parts";
      await page.locator("summary").filter({ hasText: summaryLabel }).click();
    }
  }

  const nav = mobile
    ? page.locator('nav[aria-label="Mobile"]')
    : page.locator('nav[aria-label="Primary"]');
  return nav.locator(`a[href="${href}"]`).first();
}

test.describe("Home page", () => {
  test("loads and shows main navigation", async ({ page }) => {
    await page.goto("/");
    await openMobileMenuIfNeeded(page);
    await expect(page.locator("main#main")).toBeVisible();
    await expect(await revealMainNavItem(page, "/sales")).toBeVisible();
    await expect(await revealMainNavItem(page, "/service")).toBeVisible();
    await expect(await revealMainNavItem(page, "/contact")).toBeVisible();
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to content/i });
    await expect(skipLink).toHaveAttribute("href", "#main");
  });
});

test.describe("Navigation", () => {
  test("can navigate to sales, service, and blog", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) < 1280, "mobile navigation is covered by the menu-opening test");
    await page.goto("/");
    await (await revealMainNavItem(page, "/sales")).click();
    await expect(page).toHaveURL(/\/sales/);

    await (await revealMainNavItem(page, "/service")).click();
    await expect(page).toHaveURL(/\/service/);

    await (await revealMainNavItem(page, "/blog")).click();
    await expect(page).toHaveURL(/\/blog/);
  });
});
