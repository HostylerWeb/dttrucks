import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getCategories, getDriveawayModels } from "@/lib/db/trucks";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/public/HeroSection";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { SalesIntroSection } from "@/components/public/SalesIntroSection";
import { SalesWhyChooseSection } from "@/components/public/SalesWhyChooseSection";
import { P700RangeBand } from "@/components/public/P700RangeBand";
import { CabColoursFromJson } from "@/components/public/CabColoursBand";
import { TruckCard } from "@/components/public/TruckCard";
import { Tabs } from "@/components/ui/tabs";
import { defaultSalesHero } from "@/content/sales-hero";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("sales");
}

function SalesContentSkeleton() {
  return (
    <div
      className="page-container page-section space-y-8"
      aria-hidden
    >
      <div className="h-28 max-w-3xl rounded-xl bg-surface-container animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[4/3] rounded-xl bg-surface-container animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function StaticSalesHero() {
  return (
    <HeroSection
      backgroundImage={defaultSalesHero.backgroundImage}
      imageAlt={defaultSalesHero.imageAlt}
      title={defaultSalesHero.title}
      subtitle={defaultSalesHero.subtitle}
      subtitleTag="h2"
      tagline={defaultSalesHero.tagline}
      minHeight={defaultSalesHero.minHeight}
      ctas={defaultSalesHero.ctas}
    />
  );
}

async function SalesPageContent() {
  const [categories, driveaways, settings] = await Promise.all([
    getCategories(),
    getDriveawayModels(),
    getAllSettings(),
  ]);

  const catalogueCategories = categories.filter((c) => c.slug !== "driveaway");

  const tabs = catalogueCategories.map((category) => ({
    id: category.slug,
    label: category.name,
    content: (
      <div className="space-y-6">
        {category.image_url && (
          <div className="relative overflow-hidden rounded-xl border border-outline-variant aspect-[21/9] max-h-56 bg-surface-container">
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}
        {category.description && (
          <p className="text-secondary max-w-3xl leading-relaxed">{category.description}</p>
        )}
        <CabColoursFromJson
          cabColoursJson={category.cab_colours}
          note="Standard cab colour options for this weight class. F-Series red is available on 11t and 13.5t models — confirm availability with sales."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.truck_models.map((model) => (
            <li key={model.id}>
              <TruckCard
                name={model.name}
                description={model.description}
                href={`/sales/${model.slug}`}
                imageUrl={model.image_url}
                badge={model.model_code}
              />
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <>
      <section className="page-section lg:!py-20">
        <div className="page-container">
          <div className="mb-8 sm:mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-3">
              Isuzu truck range
            </p>
            <h2 className="font-headline text-2xl lg:text-3xl font-bold mb-3">Isuzu Truck Range</h2>
            <p className="text-secondary leading-relaxed">
              Browse Isuzu chassis by gross vehicle weight — from the 3.5t Grafter through separate{" "}
              <strong className="font-semibold text-on-background">11 tonne</strong> and{" "}
              <strong className="font-semibold text-on-background">13.5 tonne</strong> F-Series tabs.
              Download{" "}
              <a href="/sales/specification-sheets" className="font-semibold text-primary-container hover:underline">
                specification sheets
              </a>{" "}
              or build a{" "}
              <a href="/sales/body-quote" className="font-semibold text-primary-container hover:underline">
                body quote request
              </a>
              .
            </p>
          </div>
          {tabs.length > 0 ? (
            <Tabs tabs={tabs} defaultTab={tabs[0]?.id} />
          ) : (
            <p className="text-secondary">No truck models published yet.</p>
          )}
        </div>
      </section>

      {driveaways.length > 0 && (
        <section className="bg-surface border-t border-outline-variant page-section">
          <div className="page-container">
            <div className="mb-8 max-w-3xl">
              <h3 className="font-headline text-2xl font-bold mb-3">Isuzu Driveaway Trucks</h3>
              <p className="text-secondary leading-relaxed">
                Ready-bodied trucks available with short lead times - tippers, dropsides,
                utilitrucks, box vans and curtainsiders. Ideal when you need a complete vehicle
                for work, not just a chassis.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {driveaways.map((model) => (
                <li key={model.id}>
                  <TruckCard
                    name={model.name}
                    description={model.description}
                    href={`/sales/${model.slug}`}
                    imageUrl={model.image_url}
                    badge={model.driveaway_type?.replace("_", " ") ?? "Driveaway"}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SalesIntroSection
        name={settings.sales_contact_name}
        phone={settings.sales_phone}
        email={settings.sales_email}
        photoUrl="/media/sales/George-Isuzu.jpg"
      />
    </>
  );
}

export default function SalesPage() {
  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Isuzu Truck Sales" }]} />
      <link rel="preload" as="image" href="/media/sales/7.5-tonnes-GVW.webp" fetchPriority="high" />
      <StaticSalesHero />
      <P700RangeBand compact />
      <Suspense fallback={<SalesContentSkeleton />}>
        <SalesPageContent />
      </Suspense>
      <SalesWhyChooseSection />
    </>
  );
}
