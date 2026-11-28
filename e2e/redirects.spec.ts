import { test, expect } from "@playwright/test";

const redirects: { from: string; to: string }[] = [
  { from: "/about-us", to: "/about" },
  { from: "/isuzu-truck-sales", to: "/sales" },
  { from: "/barking-trucks-isuzu", to: "/service" },
  { from: "/ebay-listings", to: "/ebay" },
  { from: "/jobs", to: "/careers" },
  { from: "/gdpr", to: "/legal/gdpr" },
  { from: "/terms-conditions-dt-trucks-ltd", to: "/legal/terms-conditions" },
  { from: "/sales/n35-125-grafter", to: "/sales?range=3-5t-gvw" },
  { from: "/sales/n65-150", to: "/sales" },
  { from: "/sales/n75-190-forward", to: "/sales/n75-190" },
  { from: "/sales/f135-240", to: "/sales/f135-240-amt" },
];

test.describe("Legacy URL redirects", () => {
  for (const { from, to } of redirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      const response = await page.goto(from);
      expect(response?.status()).toBeLessThan(400);
      const url = new URL(page.url());
      expect(`${url.pathname}${url.search}`).toBe(to);
    });
  }
});
