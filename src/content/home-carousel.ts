import { p700LaunchMedia } from "@/content/p700-launch-assets";

export type HomeHeroSlide = {
  id: string;
  /** Screen-reader label — marketing headline is in the artwork */
  imageAlt: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

/** Homepage hero — official ITUK P700 dealer composites (copy is baked into images). */
export const homeHeroSlides: HomeHeroSlide[] = [
  {
    id: "n-series",
    image: p700LaunchMedia.nSeries.hero,
    imageAlt: p700LaunchMedia.nSeries.alt,
    ctaLabel: "Discover the N-Series range",
    ctaHref: "/sales",
  },
  {
    id: "f-series",
    image: p700LaunchMedia.fSeries.hero,
    imageAlt: p700LaunchMedia.fSeries.alt,
    ctaLabel: "Discover the F-Series range",
    ctaHref: "/sales",
  },
  {
    id: "grafter",
    image: p700LaunchMedia.grafter.hero,
    imageAlt: p700LaunchMedia.grafter.alt,
    ctaLabel: "Discover the Grafter range",
    ctaHref: "/sales",
  },
  {
    id: "p700-range",
    image: p700LaunchMedia.p700Range.hero,
    imageAlt: p700LaunchMedia.p700Range.alt,
    ctaLabel: "Explore the full truck range",
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

/** Full-width promo banners — official artwork only, no duplicate headings */
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
