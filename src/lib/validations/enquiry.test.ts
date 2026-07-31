import { describe, expect, it } from "vitest";
import { enquirySchema, jobApplicationSchema } from "@/lib/validations/enquiry";

describe("enquirySchema", () => {
  const valid = {
    type: "general" as const,
    name: "John Smith",
    email: "john@example.com",
    message: "I would like more information about your trucks.",
  };

  it("accepts valid enquiry data", () => {
    const result = enquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = enquirySchema.safeParse({ ...valid, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = enquirySchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = enquirySchema.safeParse({ ...valid, message: "short" });
    expect(result.success).toBe(false);
  });

  it("accepts all enquiry types", () => {
    for (const type of ["general", "sales", "service", "parts", "tachograph", "specialist", "careers"]) {
      const result = enquirySchema.safeParse({ ...valid, type });
      expect(result.success).toBe(true);
    }
  });
});

describe("jobApplicationSchema", () => {
  const valid = {
    job_id: "job-123",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "020 1234 5678",
  };

  it("accepts valid application data", () => {
    const result = jobApplicationSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("requires phone", () => {
    const result = jobApplicationSchema.safeParse({ ...valid, phone: "" });
    expect(result.success).toBe(false);
  });

  it("requires job_id", () => {
    const result = jobApplicationSchema.safeParse({ ...valid, job_id: "" });
    expect(result.success).toBe(false);
  });
});
