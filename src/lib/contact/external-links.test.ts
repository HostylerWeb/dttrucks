import { describe, expect, it } from "vitest";
import {
  buildMailtoHref,
  buildTelHref,
  buildWhatsAppHref,
  phoneToWhatsAppDigits,
} from "@/lib/contact/external-links";

describe("phoneToWhatsAppDigits", () => {
  it("converts UK mobile to international", () => {
    expect(phoneToWhatsAppDigits("07450 444 888")).toBe("447450444888");
  });

  it("keeps existing country code", () => {
    expect(phoneToWhatsAppDigits("+44 7450 444888")).toBe("447450444888");
  });
});

describe("buildWhatsAppHref", () => {
  it("includes pre-filled message", () => {
    const href = buildWhatsAppHref("07450 444 888", "Hello");
    expect(href).toMatch(/^https:\/\/wa\.me\/447450444888\?text=/);
    expect(decodeURIComponent(href.split("?text=")[1]!)).toBe("Hello");
  });
});

describe("buildTelHref", () => {
  it("strips spaces for dialling", () => {
    expect(buildTelHref("07450 444 888")).toBe("tel:07450444888");
  });
});

describe("buildMailtoHref", () => {
  it("adds subject and body with RFC-style encoding (spaces as %20, not +)", () => {
    const href = buildMailtoHref("George.Smith@dttrucks.com", {
      subject: "Truck enquiry",
      body: "Hello DT Trucks, I'd like to enquire.",
    });
    expect(href.startsWith("mailto:George.Smith@dttrucks.com?")).toBe(true);
    expect(href).not.toContain("+");
    expect(href).toContain("subject=Truck%20enquiry");
    expect(href).toContain("body=Hello%20DT%20Trucks%2C%20I'd%20like%20to%20enquire.");
  });
});
