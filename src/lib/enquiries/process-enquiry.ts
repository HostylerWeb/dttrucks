import { createEnquiry } from "@/lib/db/enquiries";
import { cacheTags } from "@/lib/admin/revalidate";
import { sendEnquiryEmails } from "@/lib/email";
import { checkRateLimit, hashIp } from "@/lib/rate-limit";
import { isHoneypotFilled } from "@/lib/spam";
import { enquirySchema } from "@/lib/validations/enquiry";
import type { enquiry_type } from "@/generated/prisma/client";

function parseMetadata(raw: unknown): Record<string, unknown> | undefined {
  if (!raw) return undefined;
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw === "string" && raw.trim()) {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return { note: raw };
    }
  }
  return undefined;
}

export type ProcessEnquiryResult =
  | { success: true }
  | { error: string; status?: number };

export async function processEnquirySubmission(
  body: Record<string, unknown>,
  ip: string
): Promise<ProcessEnquiryResult> {
  if (isHoneypotFilled(body.company_url as string | undefined)) {
    return { error: "Submission rejected", status: 400 };
  }

  const ipHash = hashIp(ip);
  const rate = await checkRateLimit(ipHash, "enquiry");
  if (!rate.allowed) {
    return {
      error: "Too many submissions. Please try again in an hour or call us directly.",
      status: 429,
    };
  }

  const parsed = enquirySchema.safeParse({
    type: body.type ?? "general",
    name: body.name,
    email: body.email,
    phone: body.phone || undefined,
    subject: body.subject || undefined,
    message: body.message,
    source_page: body.source_page || undefined,
    metadata: undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data", status: 400 };
  }

  const metadata = parseMetadata(body.metadata);

  await createEnquiry({
    type: parsed.data.type as enquiry_type,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    source_page: parsed.data.source_page,
    metadata,
  });

  await sendEnquiryEmails({
    type: parsed.data.type as enquiry_type,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    source_page: parsed.data.source_page,
    metadata,
  });

  await cacheTags.enquiries();

  return { success: true };
}

export function formDataToEnquiryBody(formData: FormData): Record<string, unknown> {
  const metadataRaw = formData.get("metadata");
  let metadata: unknown = undefined;
  if (metadataRaw && typeof metadataRaw === "string") {
    try {
      metadata = JSON.parse(metadataRaw);
    } catch {
      metadata = metadataRaw;
    }
  }

  return {
    type: formData.get("type"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    source_page: formData.get("source_page"),
    company_url: formData.get("company_url"),
    metadata,
  };
}
