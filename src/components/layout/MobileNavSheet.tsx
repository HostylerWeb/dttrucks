"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { HeaderLogo } from "@/components/layout/SiteLogo";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { Sheet } from "@/components/ui/sheet";

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function IconExpandMore({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function IconLocalShipping({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h4.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function IconBuild({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 6.6.9 9.5 2.9 11.5c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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

const mobileQuickLinks = [
  { label: "Sales", href: "/sales", Icon: IconLocalShipping },
  { label: "Service", href: "/service", Icon: IconBuild },
  { label: "Contact", href: "/contact", Icon: IconMail },
] as const;

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
          <IconChevronRight className="w-5 h-5 text-secondary shrink-0" />
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
          <IconExpandMore
            className="w-[22px] h-[22px] text-secondary shrink-0 transition-transform group-open/details:rotate-180"
          />
        </summary>
        <div className="border-t border-outline-variant bg-surface-container-low px-2 py-2">
          <Link
            href={item.href}
            className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-primary-container hover:bg-white"
            onClick={onNavigate}
          >
            {item.childrenOverviewLabel ?? "All services & parts"}
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

export function MobileNavSheet({
  open,
  onClose,
  phone,
  phoneHref,
  socialFacebook,
  socialLinkedin,
  socialInstagram,
}: {
  open: boolean;
  onClose: () => void;
  phone: string;
  phoneHref: string;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
}) {
  return (
    <Sheet open={open} onClose={onClose} side="right">
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-outline-variant">
        <HeaderLogo onNavigate={onClose} className="flex items-center shrink-0 min-w-0 mr-0" />
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container shrink-0"
          aria-label="Close menu"
        >
          <IconClose className="w-[22px] h-[22px]" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {mobileQuickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-outline-variant bg-surface-container-low px-2 py-3 text-center hover:border-primary-container/40 hover:bg-primary-container/5 transition-colors"
          >
            <link.Icon className="w-[22px] h-[22px] text-primary-container shrink-0" />
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
            <MobileNavItem key={item.href} item={item} onNavigate={onClose} />
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-5 border-t border-outline-variant space-y-4">
        <a
          href={phoneHref}
          className="flex items-center justify-center gap-2 w-full bg-primary-container text-white py-3.5 rounded-xl font-semibold shadow-industrial hover:bg-primary transition-colors"
        >
          <IconCall className="w-5 h-5 shrink-0" />
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
  );
}
