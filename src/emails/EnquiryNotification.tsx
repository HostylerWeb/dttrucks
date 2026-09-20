import { Link, Text } from "@react-email/components";
import { EmailLayout, emailLabel, emailText } from "@/emails/components/EmailLayout";

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

function formatMetadata(metadata: Record<string, unknown>): string[] {
  const lines: string[] = [];
  const kind = metadata.enquiry_kind;
  if (kind === "body_quote") {
    if (metadata.chassis_model) lines.push(`Chassis: ${metadata.chassis_model}`);
    if (metadata.body_type) lines.push(`Body type: ${metadata.body_type}`);
    const dimensions = metadata.dimensions;
    if (dimensions && typeof dimensions === "object") {
      const d = dimensions as Record<string, unknown>;
      const parts = ["length_m", "width_m", "height_m"]
        .map((key) => (d[key] ? `${key.replace("_m", "")}: ${d[key]}m` : null))
        .filter(Boolean);
      if (parts.length) lines.push(`Dimensions: ${parts.join(", ")}`);
    }
    if (metadata.payload_notes) lines.push(`Payload notes: ${metadata.payload_notes}`);
    const options = metadata.options;
    if (Array.isArray(options) && options.length) {
      lines.push(`Options: ${options.join(", ")}`);
    }
    return lines;
  }

  for (const [key, value] of Object.entries(metadata)) {
    if (value === null || value === undefined || value === "") continue;
    lines.push(`${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`);
  }
  return lines;
}

export function EnquiryNotificationEmail(data: EnquiryEmailData) {
  const typeLabel = data.type.replace(/_/g, " ");
  const metaLines =
    data.metadata && Object.keys(data.metadata).length > 0
      ? formatMetadata(data.metadata)
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
