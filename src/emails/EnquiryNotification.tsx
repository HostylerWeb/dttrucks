import { Link, Text } from "@react-email/components";
import { EmailLayout, emailLabel, emailText } from "@/emails/components/EmailLayout";
import { formatEnquiryMetadataLines } from "@/lib/enquiries/format-metadata";

type EnquiryEmailData = {
  type: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  source_page?: string | null;
  metadata?: Record<string, unknown> | null;
};

export function EnquiryNotificationEmail(data: EnquiryEmailData) {
  const typeLabel = data.type.replace(/_/g, " ");
  const metaLines =
    data.metadata && Object.keys(data.metadata).length > 0
      ? formatEnquiryMetadataLines(data.metadata)
      : [];

  return (
    <EmailLayout preview={`New ${typeLabel} enquiry from ${data.name}`} title="New enquiry received">
      <Text style={emailText}>
        A new <strong>{typeLabel}</strong> enquiry was submitted on the website.
      </Text>
      <Text style={emailLabel}>Name</Text>
      <Text style={emailText}>{data.name}</Text>
      <Text style={emailLabel}>Email</Text>
      <Text style={emailText}>
        <Link href={`mailto:${data.email}`}>{data.email}</Link>
      </Text>
      {data.phone && (
        <>
          <Text style={emailLabel}>Phone</Text>
          <Text style={emailText}>{data.phone}</Text>
        </>
      )}
      {data.subject && (
        <>
          <Text style={emailLabel}>Subject</Text>
          <Text style={emailText}>{data.subject}</Text>
        </>
      )}
      {data.source_page && (
        <>
          <Text style={emailLabel}>Source page</Text>
          <Text style={emailText}>{data.source_page}</Text>
        </>
      )}
      <Text style={emailLabel}>Message</Text>
      <Text style={emailText}>{data.message}</Text>
      {metaLines.length > 0 && (
        <>
          <Text style={emailLabel}>Additional details</Text>
          {metaLines.map((line) => (
            <Text key={line} style={emailText}>
              {line}
            </Text>
          ))}
        </>
      )}
    </EmailLayout>
  );
}
