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
            : "aspect-[16/9] w-full min-h-[min(52vw,200px)] max-h-[min(72vh,720px)]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn(
            aspect === "band"
              ? "object-cover object-center"
              : "object-contain object-center"
          )}
          sizes="100vw"
          unoptimized
        />
      </div>
    </section>
  );
}
