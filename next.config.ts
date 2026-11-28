import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["ddtrucks.local", "www.ddtrucks.local"],
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
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/empty-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/empty-polyfill.js",
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": false,
      "next/dist/build/polyfills/polyfill-module": false,
    };
    return config;
  },
  async redirects() {
    return [
      { source: "/sales/n35-125-grafter", destination: "/sales?range=3-5t-gvw", permanent: true },
      { source: "/sales/n35-125-grafter/", destination: "/sales?range=3-5t-gvw", permanent: true },
      { source: "/sales/n35-150-grafter", destination: "/sales?range=3-5t-gvw", permanent: true },
      { source: "/sales/n35-150-grafter/", destination: "/sales?range=3-5t-gvw", permanent: true },
      { source: "/sales/n65-150", destination: "/sales", permanent: true },
      { source: "/sales/n65-150/", destination: "/sales", permanent: true },
      { source: "/sales/n75-190-forward", destination: "/sales/n75-190", permanent: true },
      { source: "/sales/n75-190-forward/", destination: "/sales/n75-190", permanent: true },
      { source: "/sales/f135-240", destination: "/sales/f135-240-amt", permanent: true },
      { source: "/sales/f135-240/", destination: "/sales/f135-240-amt", permanent: true },
      { source: "/sales/driveaway-3-5t-tipper", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-3-5t-tipper/", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-tipper", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-tipper/", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-3-5t-dropside", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-3-5t-dropside/", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-3-5t-utilitruck", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-3-5t-utilitruck/", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-dropside", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-dropside/", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-box", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-box/", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-curtainsider", destination: "/sales/body-quote", permanent: true },
      { source: "/sales/driveaway-7-5t-curtainsider/", destination: "/sales/body-quote", permanent: true },
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
      {
        source: "/sales/f110-210",
        destination: "/sales/f110-240",
        permanent: true,
      },
      {
        source: "/sales/f110-210/",
        destination: "/sales/f110-240",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
