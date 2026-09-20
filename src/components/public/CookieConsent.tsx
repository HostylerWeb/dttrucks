"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_KEY = "dttrucks-cookie-consent";
const CONSENT_EVENT = "dttrucks-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      const timer = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-[100] p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="page-container !px-0 sm:!px-[var(--spacing-margin-mobile)]">
        <div className="bg-white text-on-background border border-outline-variant p-4 sm:p-6 rounded-xl shadow-2xl flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary-container text-2xl shrink-0" aria-hidden>
              cookie
            </span>
            <p className="text-sm text-secondary leading-relaxed">
              We use cookies to ensure that we give you the best experience on our website. If you
              continue to use this site we will assume that you are happy with it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:shrink-0">
            <Link
              href="/legal/gdpr"
              className="inline-flex items-center justify-center px-5 py-3 border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface-container min-h-11"
            >
              Privacy
            </Link>
            <button
              type="button"
              onClick={accept}
              className="inline-flex items-center justify-center px-5 py-3 bg-primary-container text-white rounded-lg text-sm font-semibold hover:bg-primary min-h-11"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
