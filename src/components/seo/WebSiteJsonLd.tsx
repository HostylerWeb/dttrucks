import { absoluteUrl, getSiteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function WebSiteJsonLd() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "DT Trucks",
        description:
          "Authorised Isuzu dealer in Barking, Essex. Truck sales, service, parts and fleet support.",
        inLanguage: "en-GB",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "DT Trucks Limited",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/media/branding/dt-icon.png"),
          width: 118,
          height: 51,
        },
      },
    ],
  };

  return <JsonLd data={data} />;
}
