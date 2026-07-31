import type { Metadata } from "next";
import { originalPageSeo } from "@/content/original-seo";
import { getPageBySlug } from "@/lib/db/pages";
import { getServiceBySlug } from "@/content/services";
import { getModelBySlug } from "@/lib/db/trucks";
import { getPostBySlug } from "@/lib/db/blog";
import { getJobBySlug } from "@/lib/db/jobs";
import { pagePathFromSlug } from "@/lib/page-path";
import { absoluteUrl, SEO, getSiteUrl } from "@/lib/site";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "DT Trucks";

function defaultOgImage() {
  return absoluteUrl(SEO.defaultOgPath);
}

function buildMetadata(
  title: string,
  path: string,
  description?: string,
  image?: string | null,
  type: "website" | "article" = "website"
): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? defaultOgImage();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      locale: SEO.locale,
      type,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function buildPageMetadata(slug: string): Promise<Metadata> {
  const original =
    slug in originalPageSeo
      ? originalPageSeo[slug as keyof typeof originalPageSeo]
      : undefined;
  const page = await getPageBySlug(slug);
  if (!page && !original) return {};

  const title = original?.title ?? page?.meta_title ?? page?.title ?? "";
  const description = original?.description ?? page?.meta_description ?? undefined;
  return buildMetadata(title, pagePathFromSlug(slug), description);
}

export async function buildServiceMetadata(slug: string): Promise<Metadata> {
  return buildStaticServiceMetadata(slug);
}

export function buildStaticServiceMetadata(slug: string): Metadata {
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata(
    service.metaTitle,
    `/service/${slug}`,
    service.metaDescription
  );
}

export async function buildTruckMetadata(slug: string): Promise<Metadata> {
  const model = await getModelBySlug(slug);
  if (!model) return {};
  const title = `${model.name}  -  Isuzu Truck Sales`;
  const description = model.description.replace(/<[^>]+>/g, "").slice(0, 160);
  return buildMetadata(title, `/sales/${slug}`, description, model.image_url);
}

export async function buildBlogMetadata(slug: string): Promise<Metadata> {
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.meta_title ?? post.title;
  const description = post.meta_description ?? post.excerpt ?? undefined;
  return buildMetadata(
    title,
    `/blog/${slug}`,
    description,
    post.featured_image,
    "article"
  );
}

export async function buildJobMetadata(slug: string): Promise<Metadata> {
  const job = await getJobBySlug(slug);
  if (!job) return {};
  const title = `${job.title}  -  Careers`;
  const description = job.description.replace(/<[^>]+>/g, "").slice(0, 160);
  return buildMetadata(title, `/careers/${slug}`, description);
}

export function buildStaticPageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return buildMetadata(title, path, description);
}

export const staticMetadata = {
  contact: originalPageSeo.contact,
  sales: originalPageSeo.sales,
  service: originalPageSeo.service,
  ebay: originalPageSeo.ebay,
  blog: originalPageSeo.blog,
  careers: originalPageSeo.careers,
} as const;

export function siteMetadataDefaults(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
  };
}
