import Link from "next/link";
import Image from "next/image";

const HEADER_LOGO = {
  standard: "/media/branding/dt-trucks-logo.webp",
  retina: "/media/branding/dt-trucks-logo-retina.webp",
  standardPng: "/media/branding/dt-trucks-logo.png",
  retinaPng: "/media/branding/dt-trucks-logo-retina.png",
  width: 300,
  height: 71,
  alt: "DT Trucks - Isuzu Dealership",
} as const;

const FOOTER_LOGO = {
  src: "/media/branding/dt-icon.png",
  width: 118,
  height: 51,
  alt: "DT Trucks - Isuzu Dealership",
} as const;

export function HeaderLogo({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      className={className ?? "flex items-center shrink-0"}
      onClick={onNavigate}
    >
      {/* Lossless WebP from source PNGs  -  sharper than indexed PNG + Next image optimizer */}
      <picture>
        <source
          type="image/webp"
          srcSet={`${HEADER_LOGO.standard} 300w, ${HEADER_LOGO.retina} 433w`}
          sizes="(max-width: 1024px) 220px, 300px"
        />
        <img
          src={HEADER_LOGO.standardPng}
          srcSet={`${HEADER_LOGO.standardPng} 300w, ${HEADER_LOGO.retinaPng} 433w`}
          sizes="(max-width: 1024px) 220px, 300px"
          alt={HEADER_LOGO.alt}
          width={HEADER_LOGO.width}
          height={HEADER_LOGO.height}
          className="h-11 sm:h-12 lg:h-14 w-auto max-w-[220px] lg:max-w-[300px] object-contain object-left"
          fetchPriority="high"
        />
      </picture>
    </Link>
  );
}

export function FooterLogo() {
  return (
    <Link href="/" className="inline-block mb-4">
      <Image
        src={FOOTER_LOGO.src}
        alt={FOOTER_LOGO.alt}
        width={FOOTER_LOGO.width}
        height={FOOTER_LOGO.height}
        className="h-10 w-auto"
      />
    </Link>
  );
}
