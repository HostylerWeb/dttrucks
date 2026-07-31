import type { Metadata } from "next";
import { getAllSettings } from "@/lib/db/settings";
import { buildStaticPageMetadata, staticMetadata } from "@/lib/metadata";
import { formatOpeningHoursList } from "@/lib/format-opening-hours";
import { ContactPageView } from "@/components/public/ContactPageView";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata(
    staticMetadata.contact.title,
    staticMetadata.contact.description,
    "/contact"
  );
}

export default async function ContactPage() {
  const settings = await getAllSettings();
  const openingHours = formatOpeningHoursList(settings.opening_hours);

  return (
    <ContactPageView
      companyName={settings.company_name ?? "DT Trucks Limited"}
      phone={settings.company_phone ?? "020 8595 4400"}
      salesPhone={settings.sales_phone}
      salesContactName={settings.sales_contact_name}
      email={settings.company_email}
      address={settings.company_address}
      what3words={settings.what3words}
      mapsEmbedUrl={settings.google_maps_embed_url}
      openingHours={openingHours}
    />
  );
}
