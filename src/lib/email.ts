import { render } from "@react-email/render";
import type { enquiry_type } from "@/generated/prisma/client";
import { EnquiryNotificationEmail } from "@/emails/EnquiryNotification";
import { EnquiryConfirmationEmail } from "@/emails/EnquiryConfirmation";
import { JobApplicationNotificationEmail } from "@/emails/JobApplicationNotification";
import { JobApplicationConfirmationEmail } from "@/emails/JobApplicationConfirmation";
import { getAllSettings } from "@/lib/db/settings";
import { defaultMailFrom, getEmailProvider } from "@/lib/config";
import { sendViaResend } from "@/lib/email/resend";
import { sendViaSmtp } from "@/lib/email/smtp";

function defaultEnquiriesEmail() {
  return process.env.ENQUIRY_EMAIL ?? process.env.CONTACT_EMAIL ?? "enquiries@dttrucks.com";
}

async function getEnquiryRouting(type: enquiry_type) {
  const settings = await getAllSettings();
  const enquiriesEmail = defaultEnquiriesEmail();
  const salesEmail = settings.sales_email ?? "George.Smith@dttrucks.com";

  if (type === "sales") {
    return { to: [salesEmail], cc: [enquiriesEmail] };
  }

  return { to: [enquiriesEmail], cc: undefined };
}

async function sendEmail({
  to,
  cc,
  subject,
  html,
  text,
}: {
  to: string[];
  cc?: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const from = defaultMailFrom();
  const provider = getEmailProvider();
  const payload = { from, to, cc, subject, html, text };

  if (provider === "resend") {
    return sendViaResend(payload);
  }

  return sendViaSmtp(payload);
}

export type EnquiryEmailPayload = {
  type: enquiry_type;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  source_page?: string | null;
  metadata?: Record<string, unknown> | null;
};

export async function sendEnquiryEmails(data: EnquiryEmailPayload) {
  const routing = await getEnquiryRouting(data.type);
  const typeLabel = data.type.replace(/_/g, " ");

  const notificationHtml = await render(EnquiryNotificationEmail(data));
  const notificationText = [
    `New ${typeLabel} enquiry`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.subject ? `Subject: ${data.subject}` : null,
    data.source_page ? `Source: ${data.source_page}` : null,
    `Message: ${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendEmail({
    to: routing.to,
    cc: routing.cc,
    subject: `New enquiry: ${typeLabel} — ${data.name}`,
    html: notificationHtml,
    text: notificationText,
  });

  const confirmationHtml = await render(
    EnquiryConfirmationEmail({ name: data.name, type: data.type })
  );
  const confirmationText = `Dear ${data.name}, thank you for your enquiry. We will respond within one business day.`;

  await sendEmail({
    to: [data.email],
    subject: `We received your enquiry — ${process.env.NEXT_PUBLIC_SITE_NAME ?? "DT Trucks"}`,
    html: confirmationHtml,
    text: confirmationText,
  });
}

export type JobApplicationEmailPayload = {
  jobTitle: string;
  name: string;
  email: string;
  phone?: string | null;
  coverLetter?: string | null;
  resumeUrl?: string | null;
};

export async function sendJobApplicationEmails(data: JobApplicationEmailPayload) {
  const adminEmail = defaultEnquiriesEmail();

  const notificationHtml = await render(JobApplicationNotificationEmail(data));
  const notificationText = [
    `New job application: ${data.jobTitle}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.coverLetter ? `Cover letter: ${data.coverLetter}` : null,
    data.resumeUrl ? `Resume: ${data.resumeUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await sendEmail({
    to: [adminEmail],
    subject: `Job application: ${data.jobTitle} — ${data.name}`,
    html: notificationHtml,
    text: notificationText,
  });

  const confirmationHtml = await render(
    JobApplicationConfirmationEmail({ name: data.name, jobTitle: data.jobTitle })
  );
  const confirmationText = `Dear ${data.name}, thank you for applying for ${data.jobTitle}. We have received your application.`;

  await sendEmail({
    to: [data.email],
    subject: `Application received — ${data.jobTitle}`,
    html: confirmationHtml,
    text: confirmationText,
  });
}
