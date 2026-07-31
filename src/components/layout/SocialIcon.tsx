export function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg flex items-center justify-center text-secondary border border-surface-container-highest hover:border-primary-container hover:bg-surface-container hover:text-primary-container transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}
