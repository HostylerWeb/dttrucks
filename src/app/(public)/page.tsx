import { Suspense } from "react";
import type { Metadata } from "next";
import { getHomepageVideos } from "@/lib/db/videos";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { StaticHomeHero } from "@/components/public/StaticHomeHero";
import { HomePageView } from "@/components/public/HomePageView";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

async function HomePageContent() {
  const [videos, settings] = await Promise.all([getHomepageVideos(), getAllSettings()]);

  return (
    <HomePageView
      videos={videos}
      phone={settings.company_phone ?? "020 8595 4400"}
      salesPhone={settings.sales_phone ?? "07450 444 888"}
      salesName={settings.sales_contact_name ?? "George Smith"}
      salesEmail={settings.sales_email}
      companyAddress={settings.company_address}
      what3words={settings.what3words}
    />
  );
}

function HomeContentSkeleton() {
  return (
    <div className="page-container page-section space-y-8" aria-hidden>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="h-10 max-w-md rounded-lg bg-surface-container animate-pulse" />
          <div className="h-24 rounded-xl bg-surface-container animate-pulse" />
        </div>
        <div className="h-64 sm:h-80 rounded-xl bg-surface-container animate-pulse" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-48 rounded-xl bg-surface-container animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/media/home/hero-3-in-range-640.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/media/home/hero-3-in-range.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <StaticHomeHero />
      <Suspense fallback={<HomeContentSkeleton />}>
        <HomePageContent />
      </Suspense>
    </>
  );
}
