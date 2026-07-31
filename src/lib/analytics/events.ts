"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function trackEnquirySubmitted(type: string) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", "enquiry_submitted", { enquiry_type: type });
}

export function trackJobApplicationSubmitted(jobTitle: string) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", "job_application_submitted", { job_title: jobTitle });
}

export function trackPhoneClick(context?: string) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", "phone_click", { context: context ?? "general" });
}

export function trackEmailClick(context?: string) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", "email_click", { context: context ?? "general" });
}
