"use client";

import { useEffect, useState } from "react";
import { COOKIE_CONSENT_EVENT, hasCookieConsent } from "@/lib/cookie-consent";

export function useCookieConsentVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(!hasCookieConsent());
    sync();

    const onConsent = () => setVisible(false);
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    const timer = window.setTimeout(sync, 900);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
      window.clearTimeout(timer);
    };
  }, []);

  return visible;
}
