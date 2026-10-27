"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { corporateNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function DesktopNavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-0 min-w-0" aria-label="Primary">
      {corporateNavItems.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const label = item.shortLabel ?? item.label;
        return (
          <span key={`${item.href}-${item.label}`} className="nav-slash-item inline-flex items-center">
            <Link
              href={item.href}
              className={cn(
                "px-1 py-1 text-[11px] xl:text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors",
                active ? "text-corporate-dark" : "text-on-background hover:text-corporate-dark"
              )}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
