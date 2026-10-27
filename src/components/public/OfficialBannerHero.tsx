import Image from "next/image";
import { cn } from "@/lib/utils";

/** Full-width official ITUK dealer composite — headline is in the artwork. */
export function OfficialBannerHero({
  src,
  alt,
  priority,
  aspect = "hero",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** hero = 16:9 launch creative; band = shorter 1980×620 strip */
  aspect?: "hero" | "band";
}) {
  return (
    <section className="relative w-full bg-isuzu-hero border-b border-outline-variant">
      <div
        className={cn(
          "relative w-full",
          aspect === "band"
            ? "aspect-[1980/620] min-h-[200px] max-h-[420px]"
            : "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[min(65vw,440px)] sm:min-h-[320px] max-h-[min(75vh,720px)]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-[left_center] lg:object-center"
          sizes="100vw"
          unoptimized
        />
      </div>
    </section>
  );
}
