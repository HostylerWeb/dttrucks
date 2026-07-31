import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  speed: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" aria-hidden>
      <path d="M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.3l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-8.94-11.43zM10.59 15.41a2 2 0 002.83 0l5.66-8.49-8.49 5.66a2 2 0 000 2.83z" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" aria-hidden>
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.6 6.6 9 3 5.4 1.4 7l3.6 3.6L3 12.4l1.4 1.4 3.6-3.6 2.4 2.4-1.3 2.4c-1.1 2.4-.7 5.4 1.3 7.4 1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.5z" />
    </svg>
  ),
  contact_support: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  ),
};

export function FeatureIcon({ name }: { name: string }) {
  return ICONS[name] ?? (
    <span className="material-symbols-outlined text-3xl" aria-hidden>{name}</span>
  );
}
