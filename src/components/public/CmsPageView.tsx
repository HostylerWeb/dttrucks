import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { HeroSection } from "@/components/public/HeroSection";
import { PageSectionsRenderer } from "@/components/public/PageSectionsRenderer";
import type { pages, page_sections } from "@/generated/prisma/client";

type CmsPage = pages & { sections: page_sections[] };

export async function CmsPageView({
  page,
  breadcrumbs,
  settings = {},
  heroMinHeight,
}: {
  page: CmsPage;
  breadcrumbs?: { label: string; href?: string }[];
  settings?: Record<string, string | undefined>;
  heroMinHeight?: string;
}) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbsBar items={breadcrumbs} />}
      <HeroSection
        title={page.title}
        subtitle={page.subtitle}
        minHeight={heroMinHeight ?? "min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]"}
        ctas={[]}
      />
      <section className="page-section page-container">
        <div
          className="prose max-w-none prose-headings:font-headline"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
        {page.sections.length > 0 && (
          <div className="mt-10 sm:mt-12 space-y-10 sm:space-y-12 border-t border-outline-variant pt-10 sm:pt-12">
            <PageSectionsRenderer sections={page.sections} settings={settings} />
          </div>
        )}
      </section>
    </>
  );
}
