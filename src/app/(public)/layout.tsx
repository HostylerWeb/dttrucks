import { Suspense } from "react";
import { getAllSettings } from "@/lib/db/settings";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { StaticSiteHeader } from "@/components/layout/StaticSiteHeader";
import { Footer } from "@/components/layout/Footer";
import { DeferredPublicWidgets } from "@/components/public/DeferredPublicWidgets";
import { QuickContactWidgetLoader } from "@/components/public/QuickContactWidgetLoader";
import { DeferredMaterialSymbols } from "@/components/layout/DeferredMaterialSymbols";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { socialLinks } from "@/lib/nav";
import { formatOpeningHoursSummary } from "@/lib/format-opening-hours";

async function PublicSiteHeader() {
  const settings = await getAllSettings();
  const companyPhone = settings.company_phone ?? "020 8595 4400";
  const salesPhone = settings.sales_phone?.trim() || companyPhone;
  const phoneHref = `tel:${companyPhone.replace(/\s/g, "")}`;
  const salesPhoneHref = `tel:${salesPhone.replace(/\s/g, "")}`;
  const hoursSummary = formatOpeningHoursSummary(settings.opening_hours);

  return (
    <>
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <UtilityBar
        settings={settings}
        socialFacebook={settings.social_facebook || socialLinks.facebook}
        socialLinkedin={settings.social_linkedin || socialLinks.linkedin}
        socialInstagram={settings.social_instagram || socialLinks.instagram}
      />
      <Header
        phone={companyPhone}
        phoneHref={phoneHref}
        salesPhone={salesPhone}
        salesPhoneHref={salesPhoneHref}
        hoursSummary={hoursSummary}
        socialFacebook={settings.social_facebook || socialLinks.facebook}
        socialLinkedin={settings.social_linkedin || socialLinks.linkedin}
        socialInstagram={settings.social_instagram || socialLinks.instagram}
      />
    </>
  );
}

async function PublicSiteFooter() {
  const settings = await getAllSettings();
  return <Footer settings={settings} />;
}

function HeaderFallback() {
  return (
    <>
      <div className="hidden sm:block bg-surface-container-low text-secondary py-2 text-sm border-b border-outline-variant">
        <div className="page-container text-center" aria-hidden>
          Loading site information…
        </div>
      </div>
      <StaticSiteHeader phone="020 8595 4400" phoneHref="tel:02085954400" />
    </>
  );
}

function FooterFallback() {
  return <div className="h-64 bg-surface-container-low animate-pulse border-t border-outline-variant" />;
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col min-h-full">
      <a className="skip-link" href="#main">Skip to content</a>
      <Suspense fallback={<HeaderFallback />}>
        <PublicSiteHeader />
      </Suspense>
      <main id="main" className="flex-1">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Suspense fallback={<FooterFallback />}>
        <PublicSiteFooter />
      </Suspense>
      <DeferredMaterialSymbols />
      <Suspense fallback={null}>
        <QuickContactWidgetLoader />
      </Suspense>
      <DeferredPublicWidgets />
    </div>
  );
}
