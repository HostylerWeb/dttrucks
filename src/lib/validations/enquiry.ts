import { z } from "zod";

export const enquiryTypes = [
  "general",
  "sales",
  "service",
  "parts",
  "tachograph",
  "specialist",
  "careers",
] as const;

export const enquirySchema = z.object({
  type: z.enum(enquiryTypes).default("general"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Valid email is required"),
  phone: z.string().max(30).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  source_page: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const enquiryJsonSchema = enquirySchema.extend({
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const jobApplicationSchema = z.object({
  job_id: z.string().min(1),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Valid email is required"),
  phone: z.string().min(1, "Phone is required").max(30),
  cover_letter: z.string().max(5000).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
