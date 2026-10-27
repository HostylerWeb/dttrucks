import Link from "next/link";
import { homeQuickLinks } from "@/content/home-carousel";

function QuickLinkIcon({ type }: { type: string }) {
  const className = "w-8 h-8 text-on-background";
  switch (type) {
    case "tools":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      );
    case "dealer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );
    case "care":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "fleet":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5zm-10 0A1.5 1.5 0 016 17a1.5 1.5 0 011.5-1.5A1.5 1.5 0 019 17 1.5 1.5 0 017.5 18.5zM20 8h-3V6H6v2H3c-1.1 0-2 .9-2 2v8h2a3 3 0 006 0h6a3 3 0 006 0h2v-5l-3-5z" />
        </svg>
      );
    case "spec":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      );
  }
}

export function HomeQuickLinksRow() {
  return (
    <section className="bg-isuzu-hero border-b border-outline-variant">
      <div className="page-container py-8 sm:py-10">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4">
          {homeQuickLinks.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="flex flex-col items-center text-center gap-3 group"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-outline-variant bg-white group-hover:border-corporate-dark/30 transition-colors">
                  <QuickLinkIcon type={item.icon} />
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide leading-snug group-hover:text-corporate-dark transition-colors">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
