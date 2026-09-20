import { formatOpeningHoursSummary } from "@/lib/format-opening-hours";
import { UtilityBarSocialGroup } from "@/components/layout/UtilityBarSocialGroup";

type Settings = Record<string, string | undefined>;

type UtilityBarProps = {
  settings: Settings;
  socialFacebook?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
};

function IconSchedule({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function IconLocation({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

export function UtilityBar({
  settings,
  socialFacebook,
  socialLinkedin,
  socialInstagram,
}: UtilityBarProps) {
  const hours = formatOpeningHoursSummary(settings.opening_hours);

  return (
    <div className="hidden sm:block bg-surface-container-low text-on-background border-b border-outline-variant py-2 text-sm">
      <div className="page-container flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 min-w-0 flex-1 justify-center lg:justify-start">
          <span className="flex items-center gap-1.5 text-secondary">
            <IconSchedule className="w-[17px] h-[17px] shrink-0 text-primary-container" />
            {hours}
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-secondary">
            <IconLocation className="w-[17px] h-[17px] shrink-0 text-primary-container" />
            Barking, Essex · London & Essex Dealer
          </span>
        </div>

        <UtilityBarSocialGroup
          socialFacebook={socialFacebook}
          socialLinkedin={socialLinkedin}
          socialInstagram={socialInstagram}
        />
      </div>
    </div>
  );
}
