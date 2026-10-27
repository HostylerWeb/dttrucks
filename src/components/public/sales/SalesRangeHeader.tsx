"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OfficialBannerHero } from "@/components/public/OfficialBannerHero";
import { P700RangeBand } from "@/components/public/P700RangeBand";
import { Tabs } from "@/components/ui/tabs";
import { CabColoursFromJson } from "@/components/public/CabColoursBand";
import { TruckCard } from "@/components/public/TruckCard";
import { cabColourNoteForCategory } from "@/lib/trucks/cab-colour-copy";
import {
  bannerForCategorySlug,
  salesRangeQueryKey,
} from "@/lib/trucks/sales-range-banner";

export type SalesCategoryTab = {
  id: string;
  label: string;
  description: string | null;
  cabColoursJson: string | null;
  models: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    image_url: string | null;
    model_code: string | null;
  }[];
};

export function SalesRangeHeader({
  categories,
  initialRange,
}: {
  categories: SalesCategoryTab[];
  initialRange?: string | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const validIds = useMemo(() => new Set(categories.map((c) => c.id)), [categories]);
  const defaultTab = categories[0]?.id ?? "";

  const rangeFromUrl = searchParams.get(salesRangeQueryKey);
  const resolvedInitial =
    initialRange && validIds.has(initialRange)
      ? initialRange
      : rangeFromUrl && validIds.has(rangeFromUrl)
        ? rangeFromUrl
        : defaultTab;

  const [activeTab, setActiveTab] = useState(resolvedInitial);

  useEffect(() => {
    const fromUrl = searchParams.get(salesRangeQueryKey);
    if (fromUrl && validIds.has(fromUrl)) {
      setActiveTab(fromUrl);
      return;
    }
    if (initialRange && validIds.has(initialRange)) {
      setActiveTab(initialRange);
    }
  }, [searchParams, initialRange, validIds]);

  const syncUrl = useCallback(
    (tabId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tabId === defaultTab) {
        params.delete(salesRangeQueryKey);
      } else {
        params.set(salesRangeQueryKey, tabId);
      }
      const qs = params.toString();
      router.replace(qs ? `/sales?${qs}` : "/sales", { scroll: false });
    },
    [defaultTab, router, searchParams]
  );

  const onTabChange = (tabId: string) => {
    setActiveTab(tabId);
    syncUrl(tabId);
  };

  const banner = bannerForCategorySlug(activeTab);

  const tabs = categories.map((category) => ({
    id: category.id,
    label: category.label,
    content: (
      <div className="space-y-6">
        {category.description && (
          <p className="text-secondary max-w-3xl leading-relaxed">{category.description}</p>
        )}
        <CabColoursFromJson
          cabColoursJson={category.cabColoursJson}
          note={cabColourNoteForCategory(category.id)}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.models.map((model) => (
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
      <OfficialBannerHero src={banner.src} alt={banner.alt} priority />
      <P700RangeBand compact />

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
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
          ) : (
            <p className="text-secondary">No truck models published yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
