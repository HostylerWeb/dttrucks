import { cn } from "@/lib/utils";

type SocialIconProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  variant?: "default" | "inverse";
};

export function SocialIcon({
  href,
  label,
  children,
  variant = "default",
}: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-md flex items-center justify-center transition-colors shrink-0",
        variant === "inverse"
          ? "w-8 h-8 text-white/75 border border-white/20 hover:text-white hover:bg-white/10 hover:border-white/35"
          : "w-9 h-9 text-secondary border border-surface-container-highest hover:border-primary-container hover:bg-surface-container hover:text-primary-container"
      )}
      aria-label={label}
    >
      {children}
    </a>
  );
}
