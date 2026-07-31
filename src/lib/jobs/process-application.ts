import { prisma } from "@/lib/prisma";
import { storeResume } from "@/lib/storage";
import { sendJobApplicationEmails } from "@/lib/email";
import { checkRateLimit, hashIp } from "@/lib/rate-limit";
import { isHoneypotFilled } from "@/lib/spam";
import { jobApplicationSchema } from "@/lib/validations/enquiry";
import { content_status } from "@/generated/prisma/client";

export type ProcessJobApplicationResult =
  | { success: true }
  | { error: string; status?: number };

export async function processJobApplicationSubmission(
  formData: FormData,
  ip: string
): Promise<ProcessJobApplicationResult> {
  const honeypot = formData.get("company_url");
  if (isHoneypotFilled(typeof honeypot === "string" ? honeypot : undefined)) {
    return { error: "Submission rejected", status: 400 };
  }

  const ipHash = hashIp(ip);
  const rate = await checkRateLimit(ipHash, "job_application", 3);
  if (!rate.allowed) {
    return {
      error: "Too many applications submitted. Please try again later or contact us directly.",
      status: 429,
    };
  }

  const parsed = jobApplicationSchema.safeParse({
    job_id: formData.get("job_id"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    cover_letter: formData.get("cover_letter") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data", status: 400 };
  }

  const job = await prisma.job_listings.findFirst({
    where: {
      id: parsed.data.job_id,
      status: content_status.published,
      deleted_at: null,
    },
  });

  if (!job) {
    return { error: "This job listing is no longer available", status: 404 };
  }

  let resumeUrl: string | undefined;
  const resumeFile = formData.get("resume");

  if (resumeFile instanceof File && resumeFile.size > 0) {
    try {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const stored = await storeResume(buffer, resumeFile.name, resumeFile.type);
      resumeUrl = stored.url;
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Could not upload resume",
        status: 400,
      };
    }
  }

  await prisma.job_applications.create({
    data: {
      job_id: job.id,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      cover_letter: parsed.data.cover_letter,
      resume_url: resumeUrl,
    },
  });

  await sendJobApplicationEmails({
    jobTitle: job.title,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    coverLetter: parsed.data.cover_letter,
    resumeUrl,
  });

  return { success: true };
}
