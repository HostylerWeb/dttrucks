import { Link, Text } from "@react-email/components";
import { EmailLayout, emailText } from "@/emails/components/EmailLayout";

type EnquiryConfirmationData = {
  name: string;
  type: string;
};

export function EnquiryConfirmationEmail(data: EnquiryConfirmationData) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "DT Trucks";
  const typeLabel = data.type.replace(/_/g, " ");

  return (
    <EmailLayout
      preview={`We received your ${typeLabel} enquiry`}
      title="Thank you for contacting us"
    >
      <Text style={emailText}>Dear {data.name},</Text>
      <Text style={emailText}>
        Thank you for your {typeLabel} enquiry to {siteName}. We have received your message and
        will respond within one business day.
      </Text>
      <Text style={emailText}>
        If your matter is urgent, please call us on{" "}
        <Link href="tel:02085954400">020 8595 4400</Link> (service & parts) or{" "}
        <Link href="tel:07450444888">07450 444 888</Link> (sales).
      </Text>
      <Text style={emailText}>Kind regards,<br />The {siteName} team</Text>
    </EmailLayout>
  );
}
