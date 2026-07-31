import { describe, expect, it } from "vitest";
import { slugFromTitle } from "@/lib/admin/slug";

describe("slugFromTitle", () => {
  it("lowercases and hyphenates titles", () => {
    expect(slugFromTitle("Isuzu Truck Sales")).toBe("isuzu-truck-sales");
  });

  it("removes special characters", () => {
    expect(slugFromTitle("Terms & Conditions!")).toBe("terms-and-conditions");
  });

  it("handles multiple spaces", () => {
    expect(slugFromTitle("Hello   World")).toBe("hello-world");
  });
});
