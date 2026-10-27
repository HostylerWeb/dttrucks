export type HomeHeroSlide = {
  id: string;
  rangeLabel: string;
  headline: string;
  subline?: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

/** Homepage hero slides — product-led, aligned with isuzutruck.co.uk structure */
export const homeHeroSlides: HomeHeroSlide[] = [
  {
    id: "n75",
    rangeLabel: "N-Series",
    headline: "Moving the world for you",
    subline: "N75 Range",
    ctaLabel: "Discover the 7.5t range",
    ctaHref: "/sales",
    image: "/media/sales/7.5-tonnes-GVW.webp",
    imageAlt: "Isuzu N-Series 7.5 tonne range",
  },
  {
    id: "f-series",
    rangeLabel: "F-Series",
    headline: "Moving the world for you",
    subline: "F110 & F135 Range",
    ctaLabel: "Discover the 11 & 13.5t range",
    ctaHref: "/sales",
    image: "/media/sales/11-13.5-tonnes-GVW.jpg",
    imageAlt: "Isuzu F-Series 11 and 13.5 tonne range",
  },
  {
    id: "grafter",
    rangeLabel: "N-Series",
    headline: "Moving the world for you",
    subline: "N35 Grafter",
    ctaLabel: "Discover the 3.5t Grafter range",
    ctaHref: "/sales",
    image: "/media/sales/3.5-tonnes-GVW.jpg",
    imageAlt: "Isuzu Grafter 3.5 tonne",
  },
  {
    id: "range",
    rangeLabel: "Range",
    headline: "Moving the world for you",
    subline: "N-Series & F-Series",
    ctaLabel: "Explore the Isuzu truck range",
    ctaHref: "/sales",
    image: "/media/home/hero-3-in-range.webp",
    imageAlt: "Isuzu truck range at DT Trucks",
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

export const homePromoPanels = [
  {
    eyebrow: "Discover",
    title: "The Isuzu truck range",
    body: "From our popular 3.5 tonne Isuzu Grafter through to our largest 13.5 tonne F-Series — supplied and supported by DT Trucks in London, Essex & Kent.",
    cta: "View the range",
    href: "/sales",
    image: "/media/home/hero-3-in-range.webp",
    imageAlt: "Isuzu truck range",
  },
  {
    eyebrow: "We care",
    title: "Isuzu parts",
    body: "Genuine OE parts engineered to factory specification — fitted by our Isuzu-trained team with a 96% first-time pick rate.",
    cta: "Service & parts",
    href: "/service",
    image: "/media/about/eastley-commercials.jpg",
    imageAlt: "DT Trucks workshop and parts",
  },
  {
    eyebrow: "Complete service",
    title: "Aftersales support",
    body: "Workshop, MOT, tachograph and warranty support for your fleet — all under one authorised Isuzu dealership.",
    cta: "Read more",
    href: "/service",
    image: "/media/about/dt-trucks-new.jpg",
    imageAlt: "DT Trucks aftersales",
  },
] as const;
