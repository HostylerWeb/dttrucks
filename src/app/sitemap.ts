import type { MetadataRoute } from "next";
import { getSitemapPaths } from "@/lib/db/sitemap";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = await getSitemapPaths();

  return paths.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
