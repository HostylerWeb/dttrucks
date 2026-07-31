import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  full_time: "FULL_TIME",
  part_time: "PART_TIME",
  contract: "CONTRACTOR",
  apprenticeship: "INTERN",
};

export function JobPostingJsonLd({
  title,
  description,
  slug,
  location,
  employmentType,
  datePosted,
}: {
  title: string;
  description: string;
  slug: string;
  location: string;
  employmentType: string;
  datePosted?: Date | null;
}) {
  const plainDescription = description.replace(/<[^>]+>/g, "").slice(0, 2000);
  const schemaEmploymentType =
    EMPLOYMENT_TYPE_MAP[employmentType] ?? "FULL_TIME";

  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description: plainDescription,
    url: absoluteUrl(`/careers/${slug}`),
    datePosted: datePosted?.toISOString() ?? new Date().toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: "DT Trucks Limited",
      sameAs: absoluteUrl("/"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressCountry: "GB",
      },
    },
    employmentType: schemaEmploymentType,
  };

  return <JsonLd data={data} />;
}
