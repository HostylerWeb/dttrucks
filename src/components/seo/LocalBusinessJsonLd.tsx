import { getAllSettings } from "@/lib/db/settings";
import {
  absoluteUrl,
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  getSiteUrl,
} from "@/lib/site";
import { openingHoursToSchemaStrings, openingHoursToSpecifications } from "@/lib/json-ld/opening-hours";
import { JsonLd } from "@/components/seo/JsonLd";
import { socialLinks } from "@/lib/nav";

export async function LocalBusinessJsonLd() {
  const settings = await getAllSettings();
  const siteUrl = getSiteUrl();

  const sameAs = [
    settings.social_facebook || socialLinks.facebook,
    settings.social_linkedin || socialLinks.linkedin,
    settings.social_instagram || socialLinks.instagram,
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#localbusiness`,
    name: settings.company_name ?? "DT Trucks Limited",
    url: siteUrl,
    telephone: settings.company_phone ?? "020 8595 4400",
    email: settings.company_email ?? "enquiries@dttrucks.com",
    image: absoluteUrl("/og.jpg"),
    logo: absoluteUrl("/media/branding/dt-icon.webp"),
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: BUSINESS_GEO.mapUrl,
    openingHours: openingHoursToSchemaStrings(settings.opening_hours),
    openingHoursSpecification: openingHoursToSpecifications(settings.opening_hours),
    sameAs,
    priceRange: "££",
    areaServed: [
      { "@type": "AdministrativeArea", name: "London" },
      { "@type": "AdministrativeArea", name: "Essex" },
      { "@type": "AdministrativeArea", name: "South East England" },
    ],
    parentOrganization: { "@id": `${siteUrl}/#organization` },
  };

  return <JsonLd data={data} />;
}
