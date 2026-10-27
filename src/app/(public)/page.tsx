import { Suspense } from "react";
import type { Metadata } from "next";
import { preload } from "react-dom";
import { getHomepageVideos } from "@/lib/db/videos";
import { getAllSettings } from "@/lib/db/settings";
import { getCategories } from "@/lib/db/trucks";
import { getPosts } from "@/lib/db/blog";
import { buildPageMetadata } from "@/lib/metadata";
import { HomePageView } from "@/components/public/HomePageView";
import { HomeHeroCarousel } from "@/components/public/isuzu/HomeHeroCarousel";
import { homeHeroSlides } from "@/content/home-carousel";

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
  if (firstSlide) {
    preload(firstSlide.image, {
      as: "image",
      fetchPriority: "high",
    });
  }

  return (
    <>
      <HomeHeroCarousel slides={homeHeroSlides} />
      <Suspense fallback={<HomeContentSkeleton />}>
        <HomePageContent />
      </Suspense>
    </>
  );
}
