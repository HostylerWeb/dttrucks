import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRelatedServices, getServiceBySlug, getServiceSlugs } from "@/content/services";
import { buildStaticServiceMetadata } from "@/lib/metadata";
import { getAllSettings } from "@/lib/db/settings";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { HeroSection } from "@/components/public/HeroSection";
import { ServiceDetailView } from "@/components/public/ServiceDetailView";
import { FAQPageJsonLd } from "@/components/seo/FAQPageJsonLd";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildStaticServiceMetadata(slug);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const [related, settings] = await Promise.all([
    Promise.resolve(getRelatedServices(slug)),
    getAllSettings(),
  ]);
  const phone = settings.company_phone ?? "020 8595 4400";

  return (
    <>
      {service.faqs && service.faqs.length > 0 && <FAQPageJsonLd faqs={service.faqs} />}
      <BreadcrumbsBar
        items={[
          { label: "Home", href: "/" },
          { label: "Service & Parts", href: "/service" },
          { label: service.title },
        ]}
      />
      <HeroSection
        title={service.title}
        subtitle={service.heroSubtitle ?? service.shortDescription}
        badge={service.badge}
        minHeight="min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
        ctas={[
          {
            label: "Call workshop",
            href: `tel:${phone.replace(/\s/g, "")}`,
            variant: "primary",
          },
          {
            label: "Send enquiry",
            href: "#service-enquiry",
            variant: "secondary",
          },
        ]}
      />
      <ServiceDetailView service={service} related={related} phone={phone} />
    </>
  );
}
