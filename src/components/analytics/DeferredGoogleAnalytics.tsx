"use client";

import { useEffect, useState } from "react";

export function DeferredGoogleAnalytics({ gaId }: { gaId: string }) {
  const [Analytics, setAnalytics] = useState<React.ComponentType<{ gaId: string }> | null>(
    null
  );

  useEffect(() => {
    const load = () => {
      import("@/components/analytics/GoogleAnalyticsConsent").then((mod) => {
        setAnalytics(() => mod.GoogleAnalyticsConsent);
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(load, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!Analytics) return null;
  return <Analytics gaId={gaId} />;
}
