import { p700LaunchMedia } from "@/content/p700-launch-assets";
import { oemHeroMedia } from "@/content/oem-hero-assets";

export type HomeHeroSlide = {
  id: string;
  tagline: string;
  rangeEyebrow: string;
  title: string;
  subtitle?: string;
  headlineTag: "h1" | "h2";
  truckImage: string;
  truckImageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

/** Matches isuzutruck.co.uk hero carousel slide order and copy. */
export const homeHeroSlides: HomeHeroSlide[] = [
  {
    id: "n75",
    tagline: "Moving the world for you",
    rangeEyebrow: "Range",
    title: "N-Series",
    subtitle: "N75 Range",
    headlineTag: "h2",
    truckImage: oemHeroMedia.trucks.nSeries75.src,
    truckImageAlt: oemHeroMedia.trucks.nSeries75.alt,
    ctaLabel: "Discover the 7.5t range",
    ctaHref: "/sales?range=7-5t-gvw",
  },
  {
    id: "f-series",
    tagline: "Moving the world for you",
    rangeEyebrow: "Range",
    title: "F-Series",
    subtitle: "F110 & F135 Range",
    headlineTag: "h1",
    truckImage: oemHeroMedia.trucks.fSeries.src,
    truckImageAlt: oemHeroMedia.trucks.fSeries.alt,
    ctaLabel: "Discover the 11 & 13.5t range",
    ctaHref: "/sales?range=11t-gvw",
  },
  {
    id: "grafter",
    tagline: "Moving the world for you",
    rangeEyebrow: "Range",
    title: "N-Series",
    subtitle: "N35 Grafter",
    headlineTag: "h1",
    truckImage: oemHeroMedia.trucks.grafter.src,
    truckImageAlt: oemHeroMedia.trucks.grafter.alt,
    ctaLabel: "Discover the 3.5t Grafter range",
    ctaHref: "/sales?range=3-5t-gvw",
  },
  {
    id: "range",
    tagline: "Moving the world for you",
    rangeEyebrow: "Range",
    title: "Range",
    subtitle: "N-Series & F-Series",
    headlineTag: "h2",
    truckImage: oemHeroMedia.trucks.rangeLineup.src,
    truckImageAlt: oemHeroMedia.trucks.rangeLineup.alt,
    ctaLabel: "Explore the Isuzu truck range",
    ctaHref: "/sales",
  },
];

export const homeQuickLinks = [
  {
    title: "Aftersales & Support",
    href: "/service",
    icon: "tools",
  },
  {
    title: "Visit our dealership",
    href: "/contact",
    icon: "dealer",
  },
  {
    title: "Customer care",
    href: "/contact",
    icon: "care",
  },
  {
    title: "Fleet sales",
    href: "/sales",
    icon: "fleet",
  },
  {
    title: "Specification sheets",
    href: "/sales/specification-sheets",
    icon: "spec",
  },
  {
    title: "Body quote request",
    href: "/sales/body-quote",
    icon: "quote",
  },
] as const;

/** Lower homepage promos — ITUK dealer artwork (aftersales/parts messaging). */
export const homePromoBanners = [
  {
    id: "range",
    image: p700LaunchMedia.p700Range.hero,
    alt: p700LaunchMedia.p700Range.alt,
    href: "/sales",
    cta: "View the range",
  },
  {
    id: "parts",
    image: p700LaunchMedia.parts.hero,
    alt: p700LaunchMedia.parts.alt,
    href: "/service",
    cta: "Parts & service",
  },
  {
    id: "aftersales",
    image: p700LaunchMedia.aftersales.hero,
    alt: p700LaunchMedia.aftersales.alt,
    href: "/service",
    cta: "Aftersales support",
  },
] as const;
