"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("@/components/public/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);

const ScrollToTop = dynamic(
  () => import("@/components/public/ScrollToTop").then((m) => m.ScrollToTop),
  { ssr: false }
);

export function DeferredPublicWidgets() {
  return (
    <>
      <CookieConsent />
      <ScrollToTop />
    </>
  );
}
