"use server";

import { formDataToEnquiryBody, processEnquirySubmission } from "@/lib/enquiries/process-enquiry";
import { processJobApplicationSubmission } from "@/lib/jobs/process-application";

export async function submitContactForm(formData: FormData) {
  const body = formDataToEnquiryBody(formData);
  const result = await processEnquirySubmission(body, "server-action");

  if ("error" in result) {
    return { error: result.error };
  }

  return { success: true };
}

export async function submitJobApplication(formData: FormData) {
  const result = await processJobApplicationSubmission(formData, "server-action");

  if ("error" in result) {
    return { error: result.error };
  }

  return { success: true };
}
