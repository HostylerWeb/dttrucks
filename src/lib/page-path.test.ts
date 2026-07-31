import { describe, expect, it } from "vitest";
import { pagePathFromSlug } from "@/lib/page-path";

describe("pagePathFromSlug", () => {
  it("maps home to root", () => {
    expect(pagePathFromSlug("home")).toBe("/");
  });

  it("maps legal slugs", () => {
    expect(pagePathFromSlug("gdpr")).toBe("/legal/gdpr");
    expect(pagePathFromSlug("terms-conditions")).toBe("/legal/terms-conditions");
  });

  it("maps standard pages", () => {
    expect(pagePathFromSlug("about")).toBe("/about");
    expect(pagePathFromSlug("contact")).toBe("/contact");
  });
});
