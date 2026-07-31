import { Link, Text } from "@react-email/components";
import { EmailLayout, emailText } from "@/emails/components/EmailLayout";

type JobApplicationConfirmationData = {
  name: string;
  jobTitle: string;
};

export function JobApplicationConfirmationEmail(data: JobApplicationConfirmationData) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "DT Trucks";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dttrucks.com";

  return (
    <EmailLayout
      preview={`Application received for ${data.jobTitle}`}
      title="Application received"
    >
      <Text style={emailText}>Dear {data.name},</Text>
      <Text style={emailText}>
        Thank you for applying for the <strong>{data.jobTitle}</strong> position at {siteName}.
        We have received your application and will review it shortly.
      </Text>
      <Text style={emailText}>
        If your profile matches our requirements, a member of our team will contact you.
      </Text>
      <Text style={emailText}>
        Kind regards,<br />
        {siteName}<br />
        <Link href={siteUrl}>{siteUrl}</Link>
      </Text>
    </EmailLayout>
  );
}
