import Link from "next/link";
import { HeaderLogo } from "@/components/layout/SiteLogo";
import { navItems } from "@/lib/nav";

function IconCall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1z" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

/** Server-safe header shell for Suspense fallback — matches Header layout without client hooks. */
export function StaticSiteHeader({
  phone,
  phoneHref,
}: {
  phone: string;
  phoneHref: string;
}) {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-outline-variant overflow-visible">
      <nav
        className="page-container h-16 lg:h-[72px] xl:h-20 flex items-center gap-3 sm:gap-4"
        aria-label="Main"
      >
        <div className="shrink-0 pr-3 sm:pr-5 lg:pr-6 max-w-[min(100%,220px)] lg:max-w-[260px] xl:max-w-[280px]">
          <HeaderLogo />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-between min-w-0 gap-4 xl:gap-8 min-h-[40px]">
          <div className="flex items-center gap-0.5 xl:gap-1 min-w-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 xl:px-2.5 py-2 text-[13px] xl:text-sm whitespace-nowrap text-secondary font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0 pl-2 xl:pl-4 border-l border-outline-variant/60">
            <a
              href={phoneHref}
              className="hidden xl:flex items-center gap-2 bg-primary-container text-white px-4 py-2.5 rounded-lg font-semibold text-sm shadow-industrial whitespace-nowrap shrink-0"
            >
              <IconCall className="w-5 h-5" />
              {phone}
            </a>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2 shrink-0 ml-auto">
          <a
            href={phoneHref}
            className="flex items-center justify-center w-10 h-10 bg-primary-container text-white rounded-lg shrink-0 shadow-industrial"
            aria-label={`Call ${phone}`}
          >
            <IconCall className="w-[22px] h-[22px]" />
          </a>
          <span
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-surface-container-highest bg-white text-primary-container shadow-sm"
            aria-hidden
          >
            <IconMenu className="w-6 h-6" />
          </span>
        </div>
      </nav>
    </header>
  );
}
