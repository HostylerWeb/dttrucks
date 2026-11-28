import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/db/trucks";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { SalesIntroSection } from "@/components/public/SalesIntroSection";
import { SalesWhyChooseSection } from "@/components/public/SalesWhyChooseSection";
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
  const [categories, settings] = await Promise.all([getCategories(), getAllSettings()]);

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

      <section className="bg-surface border-t border-outline-variant page-section">
        <div className="page-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 items-start">
          <div className="max-w-xl">
            <h3 className="font-headline text-2xl font-bold mb-4">
              Chassis first. Body built around your work.
            </h3>
            <p className="text-secondary leading-relaxed">
              Isuzu Truck UK supplies the chassis. DT Trucks helps you choose the right GVW,
              engine and gearbox, then arranges the body and equipment your operation needs —
              from a box or tipper to a fridge, beavertail, crane or tail lift.
            </p>
            <Link
              href="/sales/body-quote"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-container px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary transition-colors"
            >
              Start a body specification
            </Link>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-label="Body types we can arrange">
            {[
              { label: "Box body", href: "/sales/body-quote?body=box" },
              { label: "Curtainsider", href: "/sales/body-quote?body=curtainsider" },
              { label: "Tipper", href: "/sales/body-quote?body=tipper" },
              { label: "Fridge / freezer", href: "/sales/body-quote?body=fridge" },
              { label: "Dropside", href: "/sales/body-quote?body=dropside" },
              { label: "Beavertail", href: "/sales/body-quote?body=beavertail" },
              { label: "Crane / Hiab", href: "/sales/body-quote" },
              { label: "Tail lift", href: "/sales/body-quote" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block h-full rounded-xl border border-outline-variant bg-white px-4 py-4 text-sm font-semibold text-on-background shadow-industrial hover:border-primary-container/40 hover:text-primary-container transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
