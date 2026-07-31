export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const SEO = {
  locale: "en_GB",
  defaultOgPath: "/og.jpg",
} as const;

/** Castle Works, 721 Ripple Road, Barking IG11 0SN */
export const BUSINESS_GEO = {
  latitude: 51.5369,
  longitude: 0.0812,
  mapUrl:
    "https://maps.google.com/maps?q=Castle+Works,+721+Ripple+Road,+Barking,+IG11+0SN",
} as const;

export const BUSINESS_ADDRESS = {
  streetAddress: "Castle Works, 721 Ripple Road",
  addressLocality: "Barking",
  addressRegion: "Essex",
  postalCode: "IG11 0SN",
  addressCountry: "GB",
} as const;
