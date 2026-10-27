import { Suspense } from "react";
import type { Metadata } from "next";
import { getHomepageVideos } from "@/lib/db/videos";
import { getAllSettings } from "@/lib/db/settings";
import { getCategories } from "@/lib/db/trucks";
import { getPosts } from "@/lib/db/blog";
import { buildPageMetadata } from "@/lib/metadata";
import { HomePageView } from "@/components/public/HomePageView";
import { HomeHeroCarouselStatic } from "@/components/public/isuzu/HomeHeroCarouselStatic";
import { HomeHeroCarouselMount } from "@/components/public/isuzu/HomeHeroCarouselMount";
import { homeHeroSlides } from "@/content/home-carousel";
import { oemHeroMedia } from "@/content/oem-hero-assets";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

async function HomePageContent() {
  const [videos, settings, categories, posts] = await Promise.all([
    getHomepageVideos(),
    getAllSettings(),
    getCategories(),
    getPosts(3),
  ]);

  return (
    <HomePageView
      videos={videos}
      categories={categories}
      posts={posts}
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
      <div className="h-64 rounded-none bg-isuzu-hero animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-48 border border-outline-variant bg-surface-container animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const firstSlide = homeHeroSlides[0];

  return (
    <>
      {firstSlide && (
        <>
          <link rel="preload" as="image" href={firstSlide.truckImage} fetchPriority="high" />
          <link rel="preload" as="image" href={oemHeroMedia.gridBackground} />
        </>
      )}
      <div className="relative">
        <HomeHeroCarouselStatic />
        <div className="absolute inset-0 z-[1]">
          <HomeHeroCarouselMount slides={homeHeroSlides} />
        </div>
      </div>
      <Suspense fallback={<HomeContentSkeleton />}>
        <HomePageContent />
      </Suspense>
    </>
  );
}
