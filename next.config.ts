import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ebayimg.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "dttrucks.com" },
      { protocol: "https", hostname: "www.dttrucks.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  experimental: {
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/isuzu-truck-sales", destination: "/sales", permanent: true },
      { source: "/isuzu-truck-sales/", destination: "/sales", permanent: true },
      { source: "/barking-trucks-isuzu", destination: "/service", permanent: true },
      { source: "/barking-trucks-isuzu/", destination: "/service", permanent: true },
      { source: "/tachograph-calibrations", destination: "/service/tachograph-calibrations", permanent: true },
      { source: "/tachograph-calibrations/", destination: "/service/tachograph-calibrations", permanent: true },
      { source: "/ebay-listings", destination: "/ebay", permanent: true },
      { source: "/ebay-listings/", destination: "/ebay", permanent: true },
      { source: "/contact/", destination: "/contact", permanent: true },
      { source: "/gdpr", destination: "/legal/gdpr", permanent: true },
      { source: "/gdpr/", destination: "/legal/gdpr", permanent: true },
      { source: "/terms-conditions-dt-trucks-ltd", destination: "/legal/terms-conditions", permanent: true },
      { source: "/terms-conditions-dt-trucks-ltd/", destination: "/legal/terms-conditions", permanent: true },
      { source: "/terms-conditions", destination: "/legal/terms-conditions", permanent: true },
      { source: "/terms-conditions/", destination: "/legal/terms-conditions", permanent: true },
      { source: "/conditions-of-sale", destination: "/legal/conditions-of-sale", permanent: true },
      { source: "/conditions-of-sale/", destination: "/legal/conditions-of-sale", permanent: true },
      { source: "/legal/privacy", destination: "/legal/gdpr", permanent: true },
      { source: "/legal/terms", destination: "/legal/terms-conditions", permanent: true },
      { source: "/jobs", destination: "/careers", permanent: true },
      { source: "/jobs/", destination: "/careers", permanent: true },
      {
        source: "/isuzu-for-small-business",
        destination: "/blog/isuzu-for-small-business",
        permanent: true,
      },
      {
        source: "/isuzu-for-small-business/",
        destination: "/blog/isuzu-for-small-business",
        permanent: true,
      },
      {
        source: "/exclusive-discount-on-ac-regassing",
        destination: "/blog/exclusive-discount-on-ac-regassing",
        permanent: true,
      },
      {
        source: "/exclusive-discount-on-ac-regassing/",
        destination: "/blog/exclusive-discount-on-ac-regassing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
