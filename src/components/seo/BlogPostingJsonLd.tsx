import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  publishedAt,
  authorName,
  imageUrl,
}: {
  title: string;
  description?: string | null;
  slug: string;
  publishedAt?: Date | null;
  authorName?: string | null;
  imageUrl?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description ?? undefined,
    url: absoluteUrl(`/blog/${slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    inLanguage: "en-GB",
    datePublished: publishedAt?.toISOString(),
    dateModified: publishedAt?.toISOString(),
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@type": "Organization", name: "DT Trucks" },
    publisher: {
      "@type": "Organization",
      name: "DT Trucks",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og.png"),
      },
    },
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return <JsonLd data={data} />;
}
