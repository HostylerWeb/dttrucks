"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

function NavLabel({ item }: { item: NavItem }) {
  if (item.shortLabel) {
    return (
      <>
        <span className="xl:hidden">{item.shortLabel}</span>
        <span className="hidden xl:inline">{item.label}</span>
      </>
    );
  }
  return item.label;
}

function NavLink({ href, label, shortLabel }: { href: string; label: string; shortLabel?: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "px-1.5 lg:px-2 xl:px-2.5 py-2 text-[12px] lg:text-[13px] xl:text-sm whitespace-nowrap transition-colors",
        active
          ? "text-primary-container font-bold border-b-2 border-primary-container"
          : "text-secondary font-semibold hover:text-primary-container"
      )}
    >
      {shortLabel ? (
        <>
          <span className="xl:hidden">{shortLabel}</span>
          <span className="hidden xl:inline">{label}</span>
        </>
      ) : (
        label
      )}
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

function IconCall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1z" />
    </svg>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          className={cn(
            "px-1.5 lg:px-2 xl:px-2.5 py-2 text-[12px] lg:text-[13px] xl:text-sm whitespace-nowrap transition-colors",
            active
              ? "text-primary-container font-bold"
              : "text-secondary font-semibold hover:text-primary-container"
          )}
          aria-current={active ? "page" : undefined}
        >
          <NavLabel item={item} />
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
            "absolute left-0 top-full z-[70] min-w-[280px] max-w-[320px] transition-all duration-200 origin-top",
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
}: {
  phone: string;
  phoneHref: string;
}) {
  return (
    <div className="hidden lg:grid flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 xl:gap-4 min-w-0">
      <div className="flex items-center gap-0.5 xl:gap-1 min-w-0 overflow-visible">
        {navItems.map((item) =>
          item.children?.length ? (
            <NavDropdown key={item.href} item={item} />
          ) : (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              shortLabel={item.shortLabel}
            />
          )
        )}
      </div>

      <div className="flex items-center shrink-0 pl-2 xl:pl-3 border-l border-outline-variant/60">
        <a
          href={phoneHref}
          className="hidden lg:flex xl:hidden items-center justify-center w-10 h-10 bg-primary-container text-white rounded-lg shadow-industrial hover:bg-primary transition-all shrink-0"
          aria-label={`Call ${phone}`}
        >
          <IconCall className="w-[22px] h-[22px]" />
        </a>
        <a
          href={phoneHref}
          className="hidden xl:flex items-center gap-2 bg-primary-container text-white px-4 py-2.5 rounded-lg font-semibold text-sm shadow-industrial hover:bg-primary transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
        >
          <IconCall className="w-5 h-5" />
          {phone}
        </a>
      </div>
    </div>
  );
}
