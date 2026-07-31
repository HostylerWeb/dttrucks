import Link from "next/link";
import { HeroSection } from "@/components/public/HeroSection";
import { VideoEmbed } from "@/components/public/VideoEmbed";
import { ImageGallery } from "@/components/public/ImageGallery";
import { FeatureGrid } from "@/components/public/FeatureGrid";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { TeamGrid } from "@/components/public/TeamGrid";
import { CTABanner } from "@/components/public/CTABanner";
import { DealerStats } from "@/components/public/DealerStats";
import { ThreePillarsSection } from "@/components/public/ThreePillarsSection";
import { SpecialistServicesGrid } from "@/components/public/SpecialistServicesGrid";
import { BlogCard } from "@/components/public/BlogCard";
import { VideoGalleryGrid } from "@/components/public/VideoGalleryGrid";
import {
  CompanyTimeline,
  HomeContactSection,
  HomeIntroSection,
  HomeTeamPreview,
  type TimelineItem,
} from "@/components/public/HomeSections";
import { getTeamMembers } from "@/lib/db/team";
import type { page_sections } from "@/generated/prisma/client";
import type { getPosts } from "@/lib/db/blog";
import type { getHomepageVideos } from "@/lib/db/videos";

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

type HeroData = {
  backgroundImage?: string;
  imageAlt?: string;
  badge?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  ctas?: { label: string; href: string; variant?: "primary" | "secondary" | "link" }[];
};

type HomeDynamic = {
  posts: Awaited<ReturnType<typeof getPosts>>;
  team: Awaited<ReturnType<typeof getTeamMembers>>;
  videos: Awaited<ReturnType<typeof getHomepageVideos>>;
  settings: Record<string, string | undefined>;
};

export function HomeHeroFromSection({ section }: { section: page_sections | undefined }) {
  if (!section?.content) return null;
  const data = parseJson<HeroData>(section.content, {});
  if (!data.title) return null;

  return (
    <HeroSection
      backgroundImage={data.backgroundImage}
      imageAlt={data.imageAlt}
      badge={data.badge}
      eyebrow={data.eyebrow}
      title={data.title}
      subtitle={data.subtitle}
      tagline={data.tagline}
      ctas={data.ctas ?? []}
    />
  );
}

export async function PageSectionsRenderer({
  sections,
  settings,
  homeDynamic,
  featureGridVariant,
}: {
  sections: page_sections[];
  settings: Record<string, string | undefined>;
  homeDynamic?: HomeDynamic;
  featureGridVariant?: "cards" | "glass";
}) {
  const team = sections.some((s) => s.section_type === "team_members")
    ? await getTeamMembers()
    : [];

  return (
    <>
      {sections.map((section) => {
        switch (section.section_type) {
          case "text_block": {
            const componentData = parseJson<{ component?: string } & Record<string, unknown>>(
              section.content,
              {}
            );

            if (componentData.component === "intro_split" && homeDynamic) {
              const highlights = (componentData.highlights as {
                icon: string;
                title: string;
                description: string;
              }[]) ?? [];
              return (
                <HomeIntroSection
                  key={section.id}
                  title={section.title ?? "Your Trusted Commercial Vehicle Partner"}
                  body={String(componentData.body ?? "")}
                  highlights={highlights}
                  image={String(componentData.image ?? "")}
                  imageAlt={String(componentData.imageAlt ?? "DT Trucks")}
                  statBadge={
                    componentData.statBadge as { value: string; label: string } | undefined
                  }
                />
              );
            }

            if (componentData.component === "dealer_stats") {
              return <DealerStats key={section.id} />;
            }

            if (componentData.component === "three_pillars") {
              return <ThreePillarsSection key={section.id} />;
            }

            if (componentData.component === "specialist_services") {
              return <SpecialistServicesGrid key={section.id} />;
            }

            if (componentData.component === "blog_preview" && homeDynamic) {
              const posts = homeDynamic.posts;
              if (posts.length === 0) return null;
              return (
                <section
                  key={section.id}
                  className="bg-surface-container-low border-y border-outline-variant page-section"
                >
                  <div className="page-container">
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <h2 className="font-headline text-2xl font-bold">Latest news</h2>
                      <Link
                        href="/blog"
                        className="text-sm font-semibold text-primary-container hover:underline"
                      >
                        View all posts
                      </Link>
                    </div>
                    <ul className="grid gap-4 md:grid-cols-2">
                      {posts.map((post) => (
                        <li key={post.id}>
                          <BlogCard
                            title={post.title}
                            excerpt={post.excerpt}
                            href={`/blog/${post.slug}`}
                            publishedAt={post.published_at}
                            featuredImage={post.featured_image}
                            category={post.category?.name}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            }

            if (componentData.component === "video_gallery" && homeDynamic) {
              const videos = homeDynamic.videos;
              if (videos.length === 0) return null;
              return (
                <section
                  key={section.id}
                  className="page-container page-section"
                >
                  <h2 className="font-headline text-2xl font-bold mb-8 text-center">
                    Check out some of our Isuzu Videos below!
                  </h2>
                  <VideoGalleryGrid videos={videos} />
                </section>
              );
            }

            if (componentData.component === "team_preview" && homeDynamic) {
              return <HomeTeamPreview key={section.id} team={homeDynamic.team} />;
            }

            if (componentData.component === "contact_cta" && homeDynamic) {
              return (
                <HomeContactSection
                  key={section.id}
                  phone={homeDynamic.settings.company_phone ?? "020 8595 4400"}
                  salesPhone={homeDynamic.settings.sales_phone ?? "07450 444 888"}
                  salesName={homeDynamic.settings.sales_contact_name ?? "George Smith"}
                  salesEmail={homeDynamic.settings.sales_email}
                  companyAddress={homeDynamic.settings.company_address}
                  what3words={homeDynamic.settings.what3words}
                />
              );
            }

            if (componentData.component === "company_timeline") {
              const items = (componentData.items as TimelineItem[]) ?? [];
              if (items.length === 0) return null;
              return <CompanyTimeline key={section.id} items={items} />;
            }

            return (
              <div
                key={section.id}
                className="prose prose-lg max-w-none prose-headings:font-headline"
                dangerouslySetInnerHTML={{ __html: section.content ?? "" }}
              />
            );
          }

          case "video_embed": {
            const data = parseJson<{ youtube_id?: string }>(section.content, {});
            if (!data.youtube_id) return null;
            return (
              <div key={section.id}>
                {section.title && (
                  <h2 className="font-headline text-2xl font-bold mb-6">{section.title}</h2>
                )}
                <VideoEmbed youtubeId={data.youtube_id} title={section.title ?? "Video"} />
              </div>
            );
          }

          case "image_gallery": {
            const images = parseJson<{ url: string; alt?: string }[]>(section.content, []);
            if (images.length === 0) return null;
            return (
              <div key={section.id}>
                {section.title && (
                  <h2 className="font-headline text-2xl font-bold mb-6">{section.title}</h2>
                )}
                <ImageGallery images={images.map((img) => ({ url: img.url, alt: img.alt }))} />
              </div>
            );
          }

          case "feature_grid": {
            const items = parseJson<
              { icon?: string; title: string; description: string; href?: string; linkLabel?: string }[]
            >(section.content, []);
            if (items.length === 0) return null;
            return (
              <section
                key={section.id}
                className={
                  featureGridVariant === "glass"
                    ? "py-14 lg:py-16 bg-white bg-grid-pattern"
                    : undefined
                }
              >
                <div className="page-container">
                  {section.title && (
                    <h2 className="font-headline text-2xl font-bold mb-8">{section.title}</h2>
                  )}
                  <FeatureGrid
                    variant={featureGridVariant === "glass" ? "glass" : "cards"}
                    items={items.map((item) => ({
                      icon: item.icon ?? "star",
                      title: item.title,
                      description: item.description,
                      href: item.href,
                      linkLabel: item.linkLabel,
                    }))}
                  />
                </div>
              </section>
            );
          }

          case "faq": {
            const faqs = parseJson<{ question: string; answer: string }[]>(section.content, []);
            if (faqs.length === 0) return null;
            return (
              <div key={section.id}>
                {section.title && (
                  <h2 className="font-headline text-2xl font-bold mb-6">{section.title}</h2>
                )}
                <FAQAccordion items={faqs} />
              </div>
            );
          }

          case "cta_banner": {
            const data = parseJson<{ description?: string; button_label?: string; button_href?: string }>(
              section.content,
              {}
            );
            if (!section.title || !data.button_href) return null;
            return (
              <CTABanner
                key={section.id}
                title={section.title}
                description={data.description}
                buttonLabel={data.button_label ?? "Contact us"}
                buttonHref={data.button_href}
              />
            );
          }

          case "team_members":
            return (
              <div key={section.id}>
                {section.title && (
                  <h2 className="font-headline text-2xl font-bold mb-8 text-center">{section.title}</h2>
                )}
                <TeamGrid members={team} />
              </div>
            );

          case "contact_info":
            return (
              <div
                key={section.id}
                className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial grid sm:grid-cols-2 gap-4 text-sm"
              >
                {section.title && (
                  <h2 className="font-headline text-lg font-semibold sm:col-span-2">{section.title}</h2>
                )}
                {settings.company_phone && (
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href={`tel:${settings.company_phone.replace(/\s/g, "")}`}
                      className="text-primary-container"
                    >
                      {settings.company_phone}
                    </a>
                  </p>
                )}
                {settings.company_email && (
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href={`mailto:${settings.company_email}`} className="text-primary-container">
                      {settings.company_email}
                    </a>
                  </p>
                )}
                {settings.company_address && (
                  <p className="sm:col-span-2">
                    <span className="font-semibold">Address:</span> {settings.company_address}
                  </p>
                )}
              </div>
            );

          case "hero": {
            const data = parseJson<HeroData>(section.content, {});
            if (!data.title) return null;
            return (
              <HeroSection
                key={section.id}
                backgroundImage={data.backgroundImage}
                imageAlt={data.imageAlt}
                badge={data.badge}
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                tagline={data.tagline}
                ctas={data.ctas ?? []}
              />
            );
          }

          default:
            return section.content ? (
              <div
                key={section.id}
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            ) : null;
        }
      })}
    </>
  );
}
