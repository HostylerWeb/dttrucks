import { p700LaunchMedia } from "@/content/p700-launch-assets";

export type RangeBanner = { src: string; alt: string };

/** ITUK P700 launch hero artwork keyed by sales GVW category slug. */
function toBanner(entry: { hero: string; alt: string }): RangeBanner {
  return { src: entry.hero, alt: entry.alt };
}

export function bannerForCategorySlug(slug: string | null | undefined): RangeBanner {
  switch (slug) {
    case "3-5t-gvw":
      return toBanner(p700LaunchMedia.grafter);
    case "5-5-6-5t-gvw":
    case "7-5t-gvw":
      return toBanner(p700LaunchMedia.nSeries);
    case "11t-gvw":
    case "13-5t-gvw":
      return toBanner(p700LaunchMedia.fSeries);
    default:
      return toBanner(p700LaunchMedia.p700Range);
  }
}

export const salesRangeQueryKey = "range";
