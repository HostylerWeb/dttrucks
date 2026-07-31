import type { Metadata } from "next";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { SpecialistApplicationsView } from "@/components/public/SpecialistApplicationsView";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("specialist-applications");
}

export default async function SpecialistApplicationsPage() {
  const settings = await getAllSettings();

  return (
    <SpecialistApplicationsView
      phone={settings.company_phone ?? "020 8595 4400"}
      companyName={settings.company_name ?? "DT Trucks Limited"}
      companyAddress={
        settings.company_address ?? "Castle Works, 721 Ripple Road, Barking, Essex IG11 0SN"
      }
    />
  );
}
