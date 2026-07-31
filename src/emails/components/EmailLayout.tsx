import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function EmailLayout({
  preview,
  title,
  children,
}: {
  preview: string;
  title: string;
  children: React.ReactNode;
}) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "DT Trucks";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dttrucks.com";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>{siteName}</Heading>
          </Section>
          <Section style={content}>
            <Heading as="h2" style={heading}>{title}</Heading>
            {children}
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            {siteName} ·{" "}
            <Link href={siteUrl} style={link}>{siteUrl}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "Inter, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "24px 0",
  maxWidth: "560px",
};

const header = {
  backgroundColor: "#c8102e",
  padding: "20px 24px",
  borderRadius: "8px 8px 0 0",
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "0 0 8px 8px",
  border: "1px solid #e5e7eb",
};

const heading = {
  color: "#1a1a2e",
  fontSize: "18px",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0 16px",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  textAlign: "center" as const,
};

const link = {
  color: "#c8102e",
};

export const emailText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 12px",
};

export const emailLabel = {
  color: "#1a1a2e",
  fontSize: "13px",
  fontWeight: "600",
  margin: "16px 0 4px",
};
