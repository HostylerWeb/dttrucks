import Link from "next/link";
import { FooterYear } from "@/components/layout/FooterYear";
import { FooterLogo } from "@/components/layout/SiteLogo";
import {
  footerLegalLinks,
  footerQuickLinks,
  footerServiceLinks,
  socialLinks,
} from "@/lib/nav";
import { formatOpeningHoursList } from "@/lib/format-opening-hours";

type Settings = Record<string, string | undefined>;

const footerLinkClass =
  "inline-flex items-center min-h-11 py-2 text-secondary hover:text-primary-container transition-colors";

function SocialIconLink({
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
      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-secondary hover:text-primary-container hover:bg-surface-container transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}

export function Footer({ settings }: { settings: Settings }) {
  const facebook = settings.social_facebook || socialLinks.facebook;
  const linkedin = settings.social_linkedin || socialLinks.linkedin;
  const instagram = settings.social_instagram || socialLinks.instagram;
  const openingHours = formatOpeningHoursList(settings.opening_hours);

  return (
    <footer className="bg-surface-container-low text-on-background border-t border-outline-variant">
      <div className="page-container py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        <div className="lg:col-span-1">
          <FooterLogo />
          <p className="text-secondary text-sm leading-relaxed mb-4">
            Authorised Isuzu Dealer for London & Essex. Sales, parts and service since 1995.
          </p>
          {settings.company_address && (
            <p className="text-secondary text-sm mb-3">{settings.company_address}</p>
          )}
          <p className="text-secondary text-sm space-y-2">
            {settings.company_email && (
              <a
                href={`mailto:${settings.company_email}`}
                className="inline-block py-1 hover:text-primary-container min-h-6"
              >
                {settings.company_email}
              </a>
            )}
            {settings.company_phone && (
              <a
                href={`tel:${settings.company_phone.replace(/\s/g, "")}`}
                className="inline-block py-1 hover:text-primary-container min-h-6"
              >
                {settings.company_phone}
              </a>
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold mb-4 text-on-background">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-4 text-on-background">Opening Hours</p>
          <ul className="space-y-1.5 text-sm text-secondary">
            {openingHours.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span className="text-on-background font-medium">{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-4 text-on-background">Services</p>
          <ul className="space-y-2 text-sm">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-4 text-on-background">Legal</p>
          <ul className="space-y-2 text-sm">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <SocialIconLink href={facebook} label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialIconLink>
            <SocialIconLink href={linkedin} label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.567H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.484v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialIconLink>
            <SocialIconLink href={instagram} label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272 1.273 1.69 1.073 6.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 1.618 5.78 5.98 5.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </SocialIconLink>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant py-6 page-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary text-center md:text-left">
          <p>
            © <FooterYear /> {settings.company_name ?? "DT Trucks Limited"}. Registered in England No.{" "}
            {settings.company_registration ?? "9501804"}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 py-2 hover:text-primary-container"
            >
              Facebook
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 py-2 hover:text-primary-container"
            >
              LinkedIn
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 py-2 hover:text-primary-container"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
