import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendViaResend({
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
  const resend = getResendClient();
  if (!resend) {
    console.info("[email] RESEND_API_KEY not set  -  skipping:", subject);
    return false;
  }

  const { error } = await resend.emails.send({
    from,
    to,
    cc,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("[email] Resend failed to send:", subject, error);
    return false;
  }

  return true;
}
