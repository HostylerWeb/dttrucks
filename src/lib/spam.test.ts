import { describe, expect, it } from "vitest";
import { isHoneypotFilled } from "@/lib/spam";

describe("isHoneypotFilled", () => {
  it("returns false for empty values", () => {
    expect(isHoneypotFilled(null)).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
    expect(isHoneypotFilled("")).toBe(false);
    expect(isHoneypotFilled("   ")).toBe(false);
  });

  it("returns true when honeypot has content", () => {
    expect(isHoneypotFilled("spam")).toBe(true);
    expect(isHoneypotFilled("  bot  ")).toBe(true);
  });
});
