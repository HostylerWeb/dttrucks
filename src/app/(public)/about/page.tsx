import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AboutPageView } from "@/components/public/AboutPageView";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("about");
}

export default function AboutPage() {
  return <AboutPageView />;
}
