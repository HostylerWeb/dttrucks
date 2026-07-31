import { Link, Text } from "@react-email/components";
import { EmailLayout, emailLabel, emailText } from "@/emails/components/EmailLayout";

type JobApplicationEmailData = {
  jobTitle: string;
  name: string;
  email: string;
  phone?: string | null;
  coverLetter?: string | null;
  resumeUrl?: string | null;
};

export function JobApplicationNotificationEmail(data: JobApplicationEmailData) {
  return (
    <EmailLayout
      preview={`Job application: ${data.jobTitle}  -  ${data.name}`}
      title="New job application"
    >
      <Text style={emailText}>
        A new application was submitted for <strong>{data.jobTitle}</strong>.
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
      {data.coverLetter && (
        <>
          <Text style={emailLabel}>Cover letter</Text>
          <Text style={emailText}>{data.coverLetter}</Text>
        </>
      )}
      {data.resumeUrl && (
        <>
          <Text style={emailLabel}>Resume</Text>
          <Text style={emailText}>
            <Link href={data.resumeUrl}>Download resume</Link>
          </Text>
        </>
      )}
    </EmailLayout>
  );
}
