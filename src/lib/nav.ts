import { getAllServices } from "@/content/services";

export type NavItemLink = {
  label: string;
  href: string;
  shortLabel?: string;
};

export type NavItem = NavItemLink & {
  children?: NavItemLink[];
  /** First link in dropdown/details when `children` is set */
  childrenOverviewLabel?: string;
};

export const salesNavChildren: NavItemLink[] = [
  { label: "Specification sheets", href: "/sales/specification-sheets" },
  { label: "Body quote request", href: "/sales/body-quote" },
  { label: "P700 range overview", href: "/blog/p700-isuzu-range-at-dt-trucks" },
];

export const serviceNavChildren: NavItemLink[] = getAllServices().map((service) => ({
  label: service.title,
  href: `/service/${service.slug}`,
}));

/** Top bar — aligned with isuzutruck.co.uk (dealer-adapted labels) */
export const corporateNavItems: NavItemLink[] = [
  { label: "Products", href: "/sales" },
  { label: "Industries", href: "/specialist-applications" },
  { label: "Aftersales & Parts", href: "/service", shortLabel: "Aftersales" },
  { label: "News & Events", href: "/blog", shortLabel: "News" },
  { label: "Customer Care", href: "/contact", shortLabel: "Care" },
  { label: "About Us", href: "/about", shortLabel: "About" },
  { label: "Visit Us", href: "/contact", shortLabel: "Visit" },
  { label: "Contact Us", href: "/contact", shortLabel: "Contact" },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", shortLabel: "About", href: "/about" },
  {
    label: "Products",
    shortLabel: "Products",
    href: "/sales",
    childrenOverviewLabel: "Browse truck range",
    children: salesNavChildren,
  },
  {
    label: "Aftersales & Parts",
    shortLabel: "Aftersales",
    href: "/service",
    children: serviceNavChildren,
  },
  {
    label: "Industries",
    shortLabel: "Industries",
    href: "/specialist-applications",
  },
  { label: "News & Events", shortLabel: "News", href: "/blog" },
  { label: "Customer Care", shortLabel: "Care", href: "/contact" },
  { label: "eBay Listings", shortLabel: "eBay", href: "/ebay" },
  { label: "Contact Us", shortLabel: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "About", href: "/about" },
  { label: "Truck sales", href: "/sales" },
  { label: "Spec sheets", href: "/sales/specification-sheets" },
  { label: "Service & parts", href: "/service" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

/** Short list for footer — full list lives on /service */
export const footerServiceLinks: NavItemLink[] = [
  { label: "All services", href: "/service" },
  ...serviceNavChildren.slice(0, 3),
];

export const footerLegalLinks = [
  { label: "Terms & Conditions", href: "/legal/terms-conditions" },
  { label: "Conditions of Sale", href: "/legal/conditions-of-sale" },
  { label: "Privacy / GDPR", href: "/legal/gdpr" },
] as const;

export const socialLinks = {
  facebook: "https://www.facebook.com/dttrucksuk",
  linkedin: "https://www.linkedin.com/company/dt-trucks-ltd/",
  instagram: "https://www.instagram.com/dttrucksltd/",
} as const;
