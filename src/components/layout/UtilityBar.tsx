import { formatOpeningHoursSummary } from "@/lib/format-opening-hours";

type Settings = Record<string, string | undefined>;

export function UtilityBar({ settings }: { settings: Settings }) {
  const hours = formatOpeningHoursSummary(settings.opening_hours);

  return (
    <div className="hidden sm:block bg-inverse-surface text-white py-2 text-sm">
      <div className="page-container flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-center">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[17px]">schedule</span>
          {hours}
        </span>
        <span className="hidden md:flex items-center gap-1.5 text-white/80">
          <span className="material-symbols-outlined text-[17px]">location_on</span>
          Barking, Essex  -  London & Essex Dealer
        </span>
      </div>
    </div>
  );
}
