import { DealerStats } from "@/components/public/DealerStats";
import { FeatureGrid } from "@/components/public/FeatureGrid";
import { HomeContactSection, HomeIntroSection } from "@/components/public/HomeSections";
import { HomePillarsBand } from "@/components/public/HomePillarsBand";
import { HomeSpecialistGrid } from "@/components/public/HomeSpecialistGrid";
import { VideoGalleryGrid } from "@/components/public/VideoGalleryGrid";
import type { getHomepageVideos } from "@/lib/db/videos";
import {
  homeHighlightFeatures,
  homeIntro,
  homeIntroHighlights,
  homeIntroImage,
  homeIntroImageAlt,
  homeIntroTitle,
  homeStatBadge,
} from "@/content/home";

type Video = Awaited<ReturnType<typeof getHomepageVideos>>[number];

export function HomePageView({
  videos,
  phone,
  salesPhone,
  salesName,
  salesEmail,
  companyAddress,
  what3words,
}: {
  videos: Video[];
  phone: string;
  salesPhone: string;
  salesName: string;
  salesEmail?: string | null;
  companyAddress?: string | null;
  what3words?: string | null;
}) {
  return (
    <>
      <HomeIntroSection
        title={homeIntroTitle}
        body={homeIntro}
        highlights={homeIntroHighlights}
        image={homeIntroImage}
        imageAlt={homeIntroImageAlt}
        statBadge={homeStatBadge}
      />

      <section className="page-section bg-white bg-grid-pattern border-y border-outline-variant">
        <div className="page-container">
          <FeatureGrid items={homeHighlightFeatures} variant="glass" />
        </div>
      </section>

      <DealerStats />

      <HomePillarsBand />

      <HomeSpecialistGrid />

      <HomeContactSection
        phone={phone}
        salesPhone={salesPhone}
        salesName={salesName}
        salesEmail={salesEmail}
        companyAddress={companyAddress}
        what3words={what3words}
      />

      {videos.length > 0 && (
        <section className="page-section page-container bg-surface border-t border-outline-variant">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center leading-snug">
            Check out some of our Isuzu Videos below!
          </h2>
          <VideoGalleryGrid videos={videos} />
        </section>
      )}
    </>
  );
}
