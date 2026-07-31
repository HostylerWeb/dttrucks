import { revalidateTag, updateTag } from "next/cache";

function invalidateTag(tag: string) {
  try {
    updateTag(tag);
  } catch {
    revalidateTag(tag, "hours");
  }
}

export const cacheTags = {
  pages: () => invalidateTag("pages"),
  page: (slug: string) => invalidateTag(`page-${slug}`),
  services: () => invalidateTag("services"),
  service: (slug: string) => invalidateTag(`service-${slug}`),
  trucks: () => invalidateTag("trucks"),
  truckCategories: () => invalidateTag("truck-categories"),
  truck: (slug: string) => invalidateTag(`truck-${slug}`),
  blog: () => invalidateTag("blog"),
  blogCategories: () => invalidateTag("blog-categories"),
  blogPost: (slug: string) => invalidateTag(`blog-${slug}`),
  team: () => invalidateTag("team"),
  jobs: () => invalidateTag("jobs"),
  job: (slug: string) => invalidateTag(`job-${slug}`),
  enquiries: () => invalidateTag("enquiries"),
  settings: () => invalidateTag("settings"),
  videos: () => invalidateTag("videos"),
  videosPage: (pageSlug: string) => invalidateTag(`videos-${pageSlug}`),
  media: () => invalidateTag("media"),
  ebayListings: () => invalidateTag("ebay-listings"),
  sitemap: () => invalidateTag("sitemap"),
} as const;

export async function revalidatePage(slug: string) {
  cacheTags.pages();
  cacheTags.page(slug);
  cacheTags.sitemap();
}

export async function revalidateService(slug: string) {
  cacheTags.services();
  cacheTags.service(slug);
  cacheTags.sitemap();
}

export async function revalidateTruck(slug: string) {
  cacheTags.trucks();
  cacheTags.truck(slug);
  cacheTags.sitemap();
}

export async function revalidateBlogPost(slug: string) {
  cacheTags.blog();
  cacheTags.blogPost(slug);
  cacheTags.sitemap();
}

export async function revalidateJob(slug: string) {
  cacheTags.jobs();
  cacheTags.job(slug);
  cacheTags.sitemap();
}
