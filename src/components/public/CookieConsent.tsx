"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from "@/lib/cookie-consent";

function IconCookie({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-.96-.26-1.97-.4-3.02-.4-4.41 0-8 3.59-8 8 0 4.08 3.05 7.44 7 7.93.03-1.71 1.62-3.04 3.35-3.04 1 0 1.95.38 2.66 1.05.74-.16 1.42-.48 2-.94-.14-2.33 2.48-3.97 4.69-3.38zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 16.09V20H9.5v-1.91c-1.04-.24-1.89-1.01-2.19-2.01h1.71c.19.55.7.98 1.29.98.77 0 1.4-.63 1.4-1.4s-.63-1.4-1.4-1.4c-.46 0-.87.22-1.13.57H8.1c.45-1.72 2.07-2.98 3.9-2.98 2.21 0 4 1.79 4 4 0 2.09-1.6 3.81-3.59 3.99z"
      />
    </svg>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!accepted) {
      const timer = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="page-container max-w-4xl mx-auto">
        <div
          className="bg-white text-on-background border border-outline-variant px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-2xl flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <IconCookie className="w-6 h-6 shrink-0 text-primary-container mt-0.5" />
            <p className="text-sm text-secondary leading-snug">
              We use cookies to give you the best experience on our site.{" "}
              <Link href="/legal/gdpr" className="font-semibold text-primary-container hover:underline">
                Privacy policy
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-container text-white rounded-lg text-sm font-semibold hover:bg-primary shrink-0 w-full sm:w-auto"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
