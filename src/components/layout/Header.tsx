"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { HeaderLogo } from "@/components/layout/SiteLogo";
import { Sheet } from "@/components/ui/sheet";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "px-2 xl:px-2.5 py-2 text-[13px] xl:text-sm whitespace-nowrap transition-colors",
        active
          ? "text-primary-container font-bold border-b-2 border-primary-container"
          : "text-secondary font-semibold hover:text-primary-container"
      )}
    >
      {label}
    </Link>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          className={cn(
            "px-2 xl:px-2.5 py-2 text-[13px] xl:text-sm whitespace-nowrap transition-colors",
            active
              ? "text-primary-container font-bold"
              : "text-secondary font-semibold hover:text-primary-container"
          )}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className={cn(
            "p-1 rounded-md transition-colors",
            active ? "text-primary-container" : "text-secondary hover:text-primary-container"
          )}
          aria-label={`${item.label} menu`}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={cn(
              "material-symbols-outlined text-[18px] transition-transform",
              open && "rotate-180"
            )}
          >
            expand_more
          </span>
        </button>
      </div>

      {item.children && item.children.length > 0 && (
        <div
          className={cn(
            "absolute left-0 top-full pt-2 min-w-[280px] max-w-[320px] transition-all duration-200 origin-top",
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-1 pointer-events-none"
          )}
        >
          <div
            className="rounded-xl border border-outline-variant bg-white shadow-[0_12px_40px_rgba(17,24,39,0.12)] py-2 overflow-hidden"
            role="menu"
          >
            <Link
              href={item.href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-semibold text-primary-container border-b border-outline-variant/80 hover:bg-surface-container-low"
              onClick={() => setOpen(false)}
            >
              All services & parts
            </Link>
            <ul className="py-1 max-h-[min(70vh,420px)] overflow-y-auto">
              {item.children.map((child) => {
                const childActive = pathname === child.href;
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      role="menuitem"
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors hover:bg-surface-container-low",
                        childActive
                          ? "text-primary-container font-semibold bg-primary-container/5"
                          : "text-on-background hover:text-primary-container"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  if (!item.children?.length) {
    return (
      <li>
        <Link
          href={item.href}
          className={cn(
            "flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors",
            active
              ? "bg-primary-container/10 text-primary-container"
              : "text-on-background hover:bg-surface-container"
          )}
          onClick={onNavigate}
        >
          {item.label}
          <span className="material-symbols-outlined text-[20px] text-secondary" aria-hidden>
            chevron_right
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <details className="group/details rounded-xl border border-outline-variant bg-white overflow-hidden">
        <summary
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-3.5 font-semibold cursor-pointer list-none [&::-webkit-details-marker]:hidden",
            active ? "text-primary-container" : "text-on-background"
          )}
        >
          <span className="text-[15px]">{item.label}</span>
          <span
            className="material-symbols-outlined text-[22px] text-secondary transition-transform group-open/details:rotate-180"
            aria-hidden
          >
            expand_more
          </span>
        </summary>
        <div className="border-t border-outline-variant bg-surface-container-low px-2 py-2">
          <Link
            href={item.href}
            className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-primary-container hover:bg-white"
            onClick={onNavigate}
          >
            All services & parts
          </Link>
          <ul className="mt-1 space-y-0.5">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                    pathname === child.href
                      ? "bg-white text-primary-container font-semibold"
                      : "text-secondary hover:bg-white hover:text-primary-container"
                  )}
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg flex items-center justify-center text-secondary border border-surface-container-highest hover:border-primary-container hover:bg-surface-container hover:text-primary-container transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}

type HeaderProps = {
  phone: string;
  phoneHref: string;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
};

const mobileQuickLinks = [
  { label: "Sales", href: "/sales", icon: "local_shipping" },
  { label: "Service", href: "/service", icon: "build" },
  { label: "Contact", href: "/contact", icon: "mail" },
] as const;

export function Header({
  phone,
  phoneHref,
  socialFacebook,
  socialLinkedin,
  socialInstagram,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          className="page-container h-16 lg:h-[72px] xl:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-x-3 sm:gap-x-4"
          aria-label="Main"
        >
          <div className="shrink-0 pr-4 sm:pr-6 lg:pr-10 xl:pr-14 max-w-[min(100%,240px)] lg:max-w-[300px]">
            <HeaderLogo />
          </div>

          <div className="hidden lg:flex items-center justify-start gap-0.5 xl:gap-1 min-w-0 pl-2 xl:pl-4">
            {navItems.map((item) =>
              item.children?.length ? (
                <NavDropdown key={item.href} item={item} />
              ) : (
                <NavLink key={item.href} href={item.href} label={item.label} />
              )
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 justify-end col-start-3">
            <div className="hidden xl:flex items-center gap-0.5">
              {socialFacebook && (
                <SocialIcon href={socialFacebook} label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialIcon>
              )}
              {socialLinkedin && (
                <SocialIcon href={socialLinkedin} label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.567H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.484v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
              )}
              {socialInstagram && (
                <SocialIcon href={socialInstagram} label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272 1.273 1.69 1.073 6.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 1.618 5.78 5.98 5.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </SocialIcon>
              )}
            </div>
            <a
              href={phoneHref}
              className="hidden sm:flex xl:hidden items-center justify-center w-10 h-10 bg-primary-container text-white rounded-lg shadow-industrial hover:bg-primary transition-all shrink-0"
              aria-label={`Call ${phone}`}
            >
              <span className="material-symbols-outlined text-[22px]">call</span>
            </a>
            <a
              href={phoneHref}
              className="hidden xl:flex items-center gap-2 bg-primary-container text-white px-4 py-2.5 rounded-lg font-semibold text-sm shadow-industrial hover:bg-primary transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              {phone}
            </a>
            <a
              href={phoneHref}
              className="flex sm:hidden items-center justify-center w-10 h-10 bg-primary-container text-white rounded-lg shrink-0 shadow-industrial"
              aria-label={`Call ${phone}`}
            >
              <span className="material-symbols-outlined text-[22px]">call</span>
            </a>
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-surface-container-highest hover:border-primary-container bg-white text-primary-container shadow-sm transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </nav>
      </header>

      <Sheet open={menuOpen} onClose={closeMenu} side="right">
        <div className="flex items-center justify-between gap-3 pb-5 border-b border-outline-variant">
          <HeaderLogo onNavigate={closeMenu} className="flex items-center shrink-0 min-w-0 mr-0" />
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container shrink-0"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {mobileQuickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-outline-variant bg-surface-container-low px-2 py-3 text-center hover:border-primary-container/40 hover:bg-primary-container/5 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px] text-primary-container" aria-hidden>
                {link.icon}
              </span>
              <span className="text-xs font-semibold text-on-background">{link.label}</span>
            </Link>
          ))}
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto" aria-label="Mobile">
          <p className="px-1 text-xs font-bold uppercase tracking-widest text-secondary mb-3">
            Browse
          </p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <MobileNavItem key={item.href} item={item} onNavigate={closeMenu} />
            ))}
          </ul>
        </nav>

        <div className="mt-6 pt-5 border-t border-outline-variant space-y-4">
          <a
            href={phoneHref}
            className="flex items-center justify-center gap-2 w-full bg-primary-container text-white py-3.5 rounded-xl font-semibold shadow-industrial hover:bg-primary transition-colors"
          >
            <span className="material-symbols-outlined">call</span>
            {phone}
          </a>
          {(socialFacebook || socialLinkedin || socialInstagram) && (
            <div className="flex justify-center gap-2">
              {socialFacebook && (
                <SocialIcon href={socialFacebook} label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialIcon>
              )}
              {socialLinkedin && (
                <SocialIcon href={socialLinkedin} label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.567H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.484v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
              )}
              {socialInstagram && (
                <SocialIcon href={socialInstagram} label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272 1.273 1.69 1.073 6.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 1.618 5.78 5.98 5.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </SocialIcon>
              )}
            </div>
          )}
        </div>
      </Sheet>
    </>
  );
}
