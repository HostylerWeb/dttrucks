import { Suspense } from "react";
import type { Metadata } from "next";
import { getCategories, getDriveawayModels } from "@/lib/db/trucks";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { SalesIntroSection } from "@/components/public/SalesIntroSection";
import { SalesWhyChooseSection } from "@/components/public/SalesWhyChooseSection";
import { TruckCard } from "@/components/public/TruckCard";
import {
  SalesRangeHeader,
  type SalesCategoryTab,
} from "@/components/public/sales/SalesRangeHeader";
import { salesRangeQueryKey } from "@/lib/trucks/sales-range-banner";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("sales");
}

function SalesContentSkeleton() {
  return (
    <div className="page-container page-section space-y-8" aria-hidden>
      <div className="h-28 max-w-3xl rounded-xl bg-surface-container animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[4/3] rounded-xl bg-surface-container animate-pulse" />
        ))}
      </div>
    </div>
  );
}

async function SalesPageContent({ initialRange }: { initialRange?: string }) {
  const [categories, driveaways, settings] = await Promise.all([
    getCategories(),
    getDriveawayModels(),
    getAllSettings(),
  ]);

  const catalogueCategories: SalesCategoryTab[] = categories
    .filter((c) => c.slug !== "driveaway")
    .map((category) => ({
      id: category.slug,
      label: category.name,
      description: category.description,
      cabColoursJson: category.cab_colours,
      models: category.truck_models.map((model) => ({
        id: model.id,
        name: model.name,
        description: model.description,
        slug: model.slug,
        image_url: model.image_url,
        model_code: model.model_code,
      })),
    }));

  return (
    <>
      <SalesRangeHeader categories={catalogueCategories} initialRange={initialRange} />

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

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawRange = params[salesRangeQueryKey];
  const initialRange = typeof rawRange === "string" ? rawRange : undefined;

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Isuzu Truck Sales" }]} />
      <Suspense fallback={<SalesContentSkeleton />}>
        <SalesPageContent initialRange={initialRange} />
      </Suspense>
      <SalesWhyChooseSection />
    </>
  );
}
