"use client";

import { trackEmailClick } from "@/lib/analytics/events";

export function TrackedEmailLink({
  email,
  children,
  className,
  trackingContext,
}: {
  email: string;
  children: React.ReactNode;
  className?: string;
  trackingContext?: string;
}) {
  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={() => trackEmailClick(trackingContext)}
    >
      {children}
    </a>
  );
}
