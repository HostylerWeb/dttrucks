"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("@/components/public/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);

export function DeferredPublicWidgets() {
  return <CookieConsent />;
}
