import { test, expect } from "@playwright/test";

const redirects: { from: string; to: string }[] = [
  { from: "/about-us", to: "/about" },
  { from: "/isuzu-truck-sales", to: "/sales" },
  { from: "/barking-trucks-isuzu", to: "/service" },
  { from: "/ebay-listings", to: "/ebay" },
  { from: "/jobs", to: "/careers" },
  { from: "/gdpr", to: "/legal/gdpr" },
  { from: "/terms-conditions-dt-trucks-ltd", to: "/legal/terms-conditions" },
];

test.describe("Legacy URL redirects", () => {
  for (const { from, to } of redirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      const response = await page.goto(from);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveURL(new RegExp(`${to.replace("/", "\\/")}$`));
    });
  }
});
