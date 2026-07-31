import { defaultHomeHero } from "@/content/home-hero";
import { HeroSection } from "@/components/public/HeroSection";

export function StaticHomeHero() {
  return (
    <HeroSection
      backgroundImage={defaultHomeHero.backgroundImage}
      backgroundImageMobile={defaultHomeHero.backgroundImageMobile}
      imageAlt={defaultHomeHero.imageAlt}
      badge={defaultHomeHero.badge}
      eyebrow={defaultHomeHero.eyebrow}
      title={defaultHomeHero.title}
      subtitle={defaultHomeHero.subtitle}
      tagline={defaultHomeHero.tagline}
      ctas={defaultHomeHero.ctas}
    />
  );
}
