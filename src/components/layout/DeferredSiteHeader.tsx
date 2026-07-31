"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { StaticSiteHeader } from "@/components/layout/StaticSiteHeader";

const Header = dynamic(
  () => import("@/components/layout/Header").then((mod) => mod.Header),
  { ssr: false }
);

type DeferredSiteHeaderProps = {
  phone: string;
  phoneHref: string;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
};

export function DeferredSiteHeader(props: DeferredSiteHeaderProps) {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const enable = () => setInteractive(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(enable, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!interactive) {
    return <StaticSiteHeader phone={props.phone} phoneHref={props.phoneHref} />;
  }

  return <Header {...props} />;
}
