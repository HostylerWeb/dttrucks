import nodemailer from "nodemailer";

function getSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure =
    process.env.SMTP_SECURE === "true" || (process.env.SMTP_SECURE !== "false" && port === 465);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD ?? "",
        }
      : undefined,
  });
}

export async function sendViaSmtp({
  from,
  to,
  cc,
  subject,
  html,
  text,
}: {
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const transporter = getSmtpTransporter();
  if (!transporter) {
    console.info("[email] SMTP_HOST not set — skipping:", subject);
    return false;
  }

  try {
    await transporter.sendMail({
      from,
      to,
      cc,
      subject,
      html,
      text,
    });
    return true;
  } catch (error) {
    console.error("[email] SMTP failed to send:", subject, error);
    return false;
  }
}
