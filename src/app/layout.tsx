import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalyticsConsent } from "@/components/analytics/GoogleAnalyticsConsent";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c8102e",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "DT Trucks - Isuzu Sales, Parts and Servicing - Official Isuzu Dealer",
  description:
    "Looking for reliable van and truck servicing, repairs, or replacement vehicles? DT Trucks Limited offers professional commercial vehicle solutions for fleets ranging from 3.5 tonne to 44 tonne and beyond! Trust our experienced team to keep your vehicles roadworthy and efficient.",
  applicationName: "DT Trucks",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "DT Trucks",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "DT Trucks - Authorised Isuzu Dealer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en-GB"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background font-body">
        {children}
        {gaId && <GoogleAnalyticsConsent gaId={gaId} />}
      </body>
    </html>
  );
}
