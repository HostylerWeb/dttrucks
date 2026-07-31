import { getAllServices } from "@/content/services";

export type NavItemLink = {
  label: string;
  href: string;
};

export type NavItem = NavItemLink & {
  children?: NavItemLink[];
};

export const serviceNavChildren: NavItemLink[] = getAllServices().map((service) => ({
  label: service.title,
  href: `/service/${service.slug}`,
}));

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Isuzu Truck Sales", href: "/sales" },
  {
    label: "Service & Parts",
    href: "/service",
    children: serviceNavChildren,
  },
  { label: "Specialist Applications", href: "/specialist-applications" },
  { label: "eBay Listings", href: "/ebay" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Isuzu Truck Sales", href: "/sales" },
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
