import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function ProductJsonLd({
  name,
  description,
  slug,
  imageUrl,
  modelCode,
}: {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string | null;
  modelCode?: string | null;
}) {
  const plainDescription = description.replace(/<[^>]+>/g, "").slice(0, 500);

  const data = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name,
    description: plainDescription,
    vehicleIdentificationNumber: modelCode ?? undefined,
    brand: {
      "@type": "Brand",
      name: "Isuzu",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Isuzu",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/sales/${slug}`),
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
      seller: {
        "@type": "AutoDealer",
        name: "DT Trucks",
        url: absoluteUrl("/"),
      },
    },
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return <JsonLd data={data} />;
}
