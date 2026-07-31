"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(
  () => import("@/components/public/ContactForm").then((mod) => mod.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[280px] rounded-lg bg-surface-container-low animate-pulse" aria-hidden />
    ),
  }
);

export function DeferredHomeContactForm({
  sourcePage,
  title,
}: {
  sourcePage: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[280px]">
      {shouldLoad ? <ContactForm sourcePage={sourcePage} title={title} /> : null}
    </div>
  );
}
