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

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Isuzu Truck Sales", shortLabel: "Truck Sales", href: "/sales", childrenOverviewLabel: "Browse truck range", children: salesNavChildren },
  {
    label: "Service & Parts",
    href: "/service",
    children: serviceNavChildren,
  },
  {
    label: "Specialist Applications",
    shortLabel: "Specialist",
    href: "/specialist-applications",
  },
  { label: "eBay Listings", shortLabel: "eBay", href: "/ebay" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Isuzu Truck Sales", href: "/sales" },
  { label: "Specification sheets", href: "/sales/specification-sheets" },
  { label: "Body quote", href: "/sales/body-quote" },
  { label: "Service & Parts", href: "/service" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServiceLinks: NavItemLink[] = [
  { label: "All services", href: "/service" },
  ...serviceNavChildren,
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
