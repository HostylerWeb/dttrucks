"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Truck,
  Newspaper,
  Users,
  Briefcase,
  MessageSquare,
  ImageIcon,
  Video,
  Settings,
  ShoppingBag,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/trucks", label: "Trucks", icon: Truck },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/ebay", label: "eBay Listings", icon: ShoppingBag },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: UserCog, adminOnly: true },
];

export function AdminSidebar({
  canManageUsers,
}: {
  canManageUsers: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-outline-variant bg-white">
      <div className="border-b border-outline-variant px-5 py-5">
        <p className="font-headline text-lg font-bold text-primary-container">
          DT Trucks
        </p>
        <p className="text-xs text-secondary">Content management</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems
          .filter((item) => !item.adminOnly || canManageUsers)
          .map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-container text-white"
                    : "text-on-surface hover:bg-surface-container"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
      </nav>
      <div className="border-t border-outline-variant p-3">
        <Link
          href="/"
          className="text-xs text-secondary hover:text-primary-container"
        >
          View public site →
        </Link>
      </div>
    </aside>
  );
}
