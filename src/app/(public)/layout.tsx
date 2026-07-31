import { Suspense } from "react";
import Script from "next/script";
import { getAllSettings } from "@/lib/db/settings";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DeferredPublicWidgets } from "@/components/public/DeferredPublicWidgets";
import { LiveChatWidget } from "@/components/public/LiveChatWidget";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { socialLinks } from "@/lib/nav";

async function PublicSiteHeader() {
  const settings = await getAllSettings();
  const phone = settings.company_phone ?? "020 8595 4400";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <UtilityBar settings={settings} />
      <Header
        phone={phone}
        phoneHref={phoneHref}
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

async function LiveChatLoader() {
  const settings = await getAllSettings();
  const phone = settings.company_phone ?? "020 8595 4400";
  const liveChatEnabled = settings.live_chat_enabled === "true";
  const liveChatId = settings.live_chat_id || process.env.LIVE_CHAT_ID;

  if (!liveChatEnabled) return null;

  return (
    <>
      <LiveChatWidget phone={phone} />
      {liveChatId && (
        <Script
          id="live-chat-widget"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var d=document;try{if(!w.__dtLiveChat){w.__dtLiveChat=true;var s=d.createElement('script');s.src='https://embed.tawk.to/${liveChatId}/default';s.async=true;s.charset='UTF-8';s.setAttribute('crossorigin','*');d.body.appendChild(s);}}catch(e){}})();`,
          }}
        />
      )}
    </>
  );
}

function HeaderFallback() {
  return (
    <>
      <div className="h-8 bg-inverse-surface animate-pulse" />
      <div className="h-[72px] border-b border-outline-variant bg-surface animate-pulse" />
    </>
  );
}

function FooterFallback() {
  return <div className="h-64 bg-inverse-surface animate-pulse" />;
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
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </main>
      <Suspense fallback={<FooterFallback />}>
        <PublicSiteFooter />
      </Suspense>
      <Suspense fallback={null}>
        <LiveChatLoader />
      </Suspense>
      <DeferredPublicWidgets />
    </div>
  );
}
