"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/layout/SocialIcon";

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

function IconChevronDown({ className, open }: { className?: string; open?: boolean }) {
  return (
    <svg
      className={cn("w-[18px] h-[18px] transition-transform", open && "rotate-180", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
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
          <IconChevronDown open={open} />
        </button>
      </div>

      {item.children && item.children.length > 0 && (
        <div
          className={cn(
            "absolute left-0 top-full z-[60] min-w-[280px] max-w-[320px] transition-all duration-200 origin-top",
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-1 pointer-events-none"
          )}
        >
          <div className="pt-2">
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
        </div>
      )}
    </div>
  );
}

export function DesktopNavBar({
  phone,
  phoneHref,
  socialFacebook,
  socialLinkedin,
  socialInstagram,
}: {
  phone: string;
  phoneHref: string;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
}) {
  return (
    <>
      <div className="hidden lg:flex flex-1 items-center justify-between min-w-0 gap-4 xl:gap-8">
        <div className="flex items-center gap-0.5 xl:gap-1 min-w-0">
          {navItems.map((item) =>
            item.children?.length ? (
              <NavDropdown key={item.href} item={item} />
            ) : (
              <NavLink key={item.href} href={item.href} label={item.label} />
            )
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 pl-2 xl:pl-4 border-l border-outline-variant/60">
          <div className="hidden xl:flex items-center gap-1">
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
            className="hidden lg:flex xl:hidden items-center justify-center w-10 h-10 bg-primary-container text-white rounded-lg shadow-industrial hover:bg-primary transition-all shrink-0"
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
        </div>
      </div>
    </>
  );
}
