"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  corporateNavItems,
  navItems,
  salesNavChildren,
  serviceNavChildren,
} from "@/lib/nav";
import { cn } from "@/lib/utils";
import { HeaderLogo } from "@/components/layout/SiteLogo";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { Sheet } from "@/components/ui/sheet";

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function IconCall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1z" />
    </svg>
  );
}

function NavRow({
  href,
  label,
  onNavigate,
  active,
  sub,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  active: boolean;
  sub?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "block border-b border-outline-variant py-3.5 font-bold uppercase tracking-wide text-[13px] transition-colors",
        sub ? "pl-4 text-secondary font-semibold normal-case tracking-normal text-sm" : "text-on-background",
        active && !sub && "text-corporate-dark",
        !active && "hover:text-corporate-dark"
      )}
    >
      {label}
    </Link>
  );
}

export function MobileNavSheet({
  open,
  onClose,
  phone,
  phoneHref,
  salesPhone,
  salesPhoneHref,
  hoursSummary,
  socialFacebook,
  socialLinkedin,
  socialInstagram,
}: {
  open: boolean;
  onClose: () => void;
  phone: string;
  phoneHref: string;
  salesPhone: string;
  salesPhoneHref: string;
  hoursSummary?: string;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
}) {
  const pathname = usePathname();
  const showSalesLine = salesPhone.replace(/\s/g, "") !== phone.replace(/\s/g, "");

  const productsItem = navItems.find((i) => i.href === "/sales");
  const aftersalesItem = navItems.find((i) => i.href === "/service");

  return (
    <Sheet open={open} onClose={onClose} side="right" panelClassName="max-w-full sm:max-w-md p-0">
      <div className="flex flex-col h-full bg-surface">
        <div className="flex items-center justify-between gap-3 bg-corporate-dark text-white px-5 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-white/30 hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <IconClose className="w-[22px] h-[22px]" />
          </button>
        </div>

        <div className="px-5 py-4 border-b border-outline-variant bg-isuzu-hero">
          <HeaderLogo onNavigate={onClose} className="flex items-center" />
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-2" aria-label="Mobile">
          {corporateNavItems.map((item) => {
            const active =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            if (item.href === "/sales" && productsItem?.children?.length) {
              return (
                <details key={item.href} className="group border-b border-outline-variant" open={active}>
                  <summary
                    className={cn(
                      "flex cursor-pointer list-none items-center justify-between py-3.5 font-bold uppercase tracking-wide text-[13px] [&::-webkit-details-marker]:hidden",
                      active ? "text-corporate-dark" : "text-on-background"
                    )}
                  >
                    {item.label}
                    <span className="text-secondary text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="pb-2">
                    <NavRow href="/sales" label="Browse truck range" onNavigate={onClose} active={pathname === "/sales"} sub />
                    {salesNavChildren.map((child) => (
                      <NavRow
                        key={child.href}
                        href={child.href}
                        label={child.label}
                        onNavigate={onClose}
                        active={pathname === child.href}
                        sub
                      />
                    ))}
                  </div>
                </details>
              );
            }

            if (item.href === "/service" && aftersalesItem?.children?.length) {
              return (
                <details key={item.href} className="group border-b border-outline-variant" open={active}>
                  <summary
                    className={cn(
                      "flex cursor-pointer list-none items-center justify-between py-3.5 font-bold uppercase tracking-wide text-[13px] [&::-webkit-details-marker]:hidden",
                      active ? "text-corporate-dark" : "text-on-background"
                    )}
                  >
                    {item.label}
                    <span className="text-secondary text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="pb-2 max-h-[40vh] overflow-y-auto">
                    <NavRow href="/service" label="All services & parts" onNavigate={onClose} active={pathname === "/service"} sub />
                    {serviceNavChildren.slice(0, 8).map((child) => (
                      <NavRow
                        key={child.href}
                        href={child.href}
                        label={child.label}
                        onNavigate={onClose}
                        active={pathname === child.href}
                        sub
                      />
                    ))}
                  </div>
                </details>
              );
            }

            return (
              <NavRow
                key={`${item.href}-${item.label}`}
                href={item.href}
                label={item.label}
                onNavigate={onClose}
                active={active}
              />
            );
          })}
        </nav>

        <div className="mt-auto border-t border-outline-variant bg-surface-container-low px-5 py-5 space-y-3">
          {hoursSummary && (
            <p className="text-xs text-secondary leading-relaxed">{hoursSummary}</p>
          )}
          <a
            href={phoneHref}
            className="flex items-center justify-center gap-2 w-full border border-outline-variant bg-white text-on-background py-3 font-semibold text-sm uppercase tracking-wide hover:border-corporate-dark transition-colors"
          >
            <IconCall className="w-5 h-5 shrink-0" />
            Office · {phone}
          </a>
          {showSalesLine && (
            <a
              href={salesPhoneHref}
              className="flex items-center justify-center gap-2 w-full bg-corporate-dark text-white py-3.5 font-bold text-sm uppercase tracking-wide hover:bg-black transition-colors"
            >
              <IconCall className="w-5 h-5 shrink-0" />
              Sales · {salesPhone}
            </a>
          )}
          {(socialFacebook || socialLinkedin || socialInstagram) && (
            <div className="flex justify-center gap-3 pt-1">
              {socialFacebook && (
                <SocialIcon href={socialFacebook} label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialIcon>
              )}
              {socialLinkedin && (
                <SocialIcon href={socialLinkedin} label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.567H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.484v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
              )}
              {socialInstagram && (
                <SocialIcon href={socialInstagram} label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272 1.273 1.69 1.073 6.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 1.618 5.78 5.98 5.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </SocialIcon>
              )}
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
}
