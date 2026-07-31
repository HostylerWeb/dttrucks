import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/db/pages";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { CmsPageView } from "@/components/public/CmsPageView";

const pages = {
  "terms-conditions": { label: "Terms & Conditions" },
  "conditions-of-sale": { label: "Conditions of Sale" },
  gdpr: { label: "Privacy / GDPR" },
} as const;

type LegalSlug = keyof typeof pages;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in pages)) return {};
  return buildPageMetadata(slug);
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in pages)) notFound();

  const legalSlug = slug as LegalSlug;
  const [page, settings] = await Promise.all([
    getPageBySlug(legalSlug),
    getAllSettings(),
  ]);

  if (!page) notFound();

  return (
    <CmsPageView
      page={page}
      settings={settings}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: pages[legalSlug].label },
      ]}
      heroMinHeight="min-h-[200px]"
    />
  );
}
