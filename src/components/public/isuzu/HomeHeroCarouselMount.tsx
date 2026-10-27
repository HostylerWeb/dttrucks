"use client";

import { useEffect } from "react";
import { HomeHeroCarousel } from "@/components/public/isuzu/HomeHeroCarousel";
import type { HomeHeroSlide } from "@/content/home-carousel";

export function HomeHeroCarouselMount({ slides }: { slides: HomeHeroSlide[] }) {
  useEffect(() => {
    document.getElementById("home-hero-static")?.remove();
  }, []);

  return <HomeHeroCarousel slides={slides} />;
}
