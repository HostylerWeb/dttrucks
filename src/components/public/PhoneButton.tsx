"use client";

import { trackPhoneClick } from "@/lib/analytics/events";

export function PhoneButton({
  phone,
  className,
  showLabel = true,
  trackingContext,
}: {
  phone: string;
  className?: string;
  showLabel?: boolean;
  trackingContext?: string;
}) {
  const href = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <a
      href={href}
      onClick={() => trackPhoneClick(trackingContext)}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 bg-primary-container text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-industrial hover:bg-primary transition-all min-h-11 w-full sm:w-auto"
      }
    >
      <span className="material-symbols-outlined text-[20px]">call</span>
      {showLabel && phone}
    </a>
  );
}
