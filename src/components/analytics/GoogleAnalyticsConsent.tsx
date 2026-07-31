"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const COOKIE_KEY = "dttrucks-cookie-consent";
const CONSENT_EVENT = "dttrucks-cookie-consent";

function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(COOKIE_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function GoogleAnalyticsConsent({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" && hasAnalyticsConsent()
  );

  useEffect(() => {
    const onConsent = () => setEnabled(hasAnalyticsConsent());
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!enabled) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
