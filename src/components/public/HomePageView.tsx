import { DealerStats } from "@/components/public/DealerStats";
import { HomeContactSection, HomeIntroSection } from "@/components/public/HomeSections";
import { HomePillarsBand } from "@/components/public/HomePillarsBand";
import { VideoGalleryGrid } from "@/components/public/VideoGalleryGrid";
import { HomeChooseTruckSection } from "@/components/public/isuzu/HomeChooseTruckSection";
import type { ChooseTruckCard } from "@/components/public/isuzu/HomeChooseTruckSection";
import { HomeQuickLinksRow } from "@/components/public/isuzu/HomeQuickLinksRow";
import { HomeNewsSection } from "@/components/public/isuzu/HomeNewsSection";
import { HomePromoPanels } from "@/components/public/isuzu/HomePromoPanels";
import type { getHomepageVideos } from "@/lib/db/videos";
import {
  homeIntro,
  homeIntroHighlights,
  homeIntroImage,
  homeIntroImageAlt,
  homeIntroTitle,
  homeStatBadge,
} from "@/content/home";

type Video = Awaited<ReturnType<typeof getHomepageVideos>>[number];

type Category = {
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
};

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: Date | null;
  featured_image: string | null;
};

function buildChooseTruckCards(categories: Category[]): ChooseTruckCard[] {
  return categories
    .filter((c) => c.slug !== "driveaway")
    .map((c) => ({
      slug: c.slug,
      title: c.name.replace(/tonnes GVW/i, "Tonne").replace(/GVW/i, "").trim(),
      description: c.description ?? "",
      imageUrl: c.image_url,
      href: "/sales",
    }));
}

export function HomePageView({
  videos,
  categories,
  posts,
  phone,
  salesPhone,
  salesName,
  salesEmail,
  companyAddress,
  what3words,
}: {
  videos: Video[];
  categories: Category[];
  posts: Post[];
  phone: string;
  salesPhone: string;
  salesName: string;
  salesEmail?: string | null;
  companyAddress?: string | null;
  what3words?: string | null;
}) {
  const chooseTruckCards = buildChooseTruckCards(categories);

  return (
    <>
      {chooseTruckCards.length > 0 && (
        <div className="content-defer">
          <HomeChooseTruckSection cards={chooseTruckCards} />
        </div>
      )}

      <HomeQuickLinksRow />

      <div className="content-defer">
        <HomeNewsSection posts={posts} />
      </div>

      <HomePromoPanels />

      <div className="content-defer">
        <HomeIntroSection
          title={homeIntroTitle}
          body={homeIntro}
          highlights={homeIntroHighlights}
          image={homeIntroImage}
          imageAlt={homeIntroImageAlt}
          statBadge={homeStatBadge}
        />
      </div>

      <div className="content-defer">
        <DealerStats />
      </div>

      <div className="content-defer">
        <HomePillarsBand />
      </div>

      <div className="content-defer">
        <HomeContactSection
          phone={phone}
          salesPhone={salesPhone}
          salesName={salesName}
          salesEmail={salesEmail}
          companyAddress={companyAddress}
          what3words={what3words}
        />
      </div>

      {videos.length > 0 && (
        <section className="page-section page-container bg-surface border-t border-outline-variant content-defer">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-8 sm:mb-10 text-center leading-snug">
            Isuzu videos
          </h2>
          <VideoGalleryGrid videos={videos} />
        </section>
      )}
    </>
  );
}
