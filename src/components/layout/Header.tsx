"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HeaderLogo } from "@/components/layout/SiteLogo";

const DesktopNavBar = dynamic(
  () => import("@/components/layout/DesktopNavBar").then((mod) => mod.DesktopNavBar),
  { ssr: false }
);

const MobileNavSheet = dynamic(
  () => import("@/components/layout/MobileNavSheet").then((mod) => mod.MobileNavSheet),
  { ssr: false }
);

type HeaderProps = {
  phone: string;
  phoneHref: string;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
};

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

export function Header({
  phone,
  phoneHref,
  socialFacebook,
  socialLinkedin,
  socialInstagram,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-surface border-b border-outline-variant transition-shadow duration-300",
          scrolled && "shadow-industrial"
        )}
      >
        <nav
          className="page-container h-16 lg:h-[72px] xl:h-20 flex items-center gap-3 sm:gap-4"
          aria-label="Main"
        >
          <div className="shrink-0 pr-3 sm:pr-5 lg:pr-6 max-w-[min(100%,220px)] lg:max-w-[260px] xl:max-w-[280px]">
            <HeaderLogo />
          </div>

          <div className="hidden lg:flex flex-1 items-center min-w-0 min-h-[40px]">
            {isDesktop && (
              <DesktopNavBar
                phone={phone}
                phoneHref={phoneHref}
                socialFacebook={socialFacebook}
                socialLinkedin={socialLinkedin}
                socialInstagram={socialInstagram}
              />
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2 shrink-0 ml-auto">
            <a
              href={phoneHref}
              className="flex items-center justify-center w-10 h-10 bg-primary-container text-white rounded-lg shrink-0 shadow-industrial"
              aria-label={`Call ${phone}`}
            >
              <IconCall className="w-[22px] h-[22px]" />
            </a>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-surface-container-highest hover:border-primary-container bg-white text-primary-container shadow-sm transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <MobileNavSheet
          open={menuOpen}
          onClose={closeMenu}
          phone={phone}
          phoneHref={phoneHref}
          socialFacebook={socialFacebook}
          socialLinkedin={socialLinkedin}
          socialInstagram={socialInstagram}
        />
      )}
    </>
  );
}
