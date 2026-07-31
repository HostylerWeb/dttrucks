type DayHours = { open?: string; close?: string; closed?: boolean };

const DAY_LABELS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export function formatOpeningHoursSummary(json: string | null | undefined) {
  if (!json) {
    return "Mon–Fri 07:00–17:00 · Sat 07:00–12:00 · Sunday Closed";
  }

  try {
    const hours = JSON.parse(json) as Record<string, DayHours>;
    const parts: string[] = [];

    for (const [key, label] of Object.entries(DAY_LABELS)) {
      const day = hours[key];
      if (!day) continue;
      if (day.closed) {
        if (key === "sunday") parts.push(`${label} Closed`);
        continue;
      }
      if (day.open && day.close) {
        parts.push(`${label} ${day.open}–${day.close}`);
      }
    }

    if (parts.length === 0) {
      return "Mon–Fri 07:00–17:00 · Sat 07:00–12:00 · Sunday Closed";
    }

    return parts.join(" · ");
  } catch {
    return "Mon–Fri 07:00–17:00 · Sat 07:00–12:00 · Sunday Closed";
  }
}

const FULL_DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export type OpeningHoursRow = { day: string; hours: string };

export function formatOpeningHoursList(json: string | null | undefined): OpeningHoursRow[] {
  const defaults = [
    { day: "Monday", hours: "07:00 – 17:00" },
    { day: "Tuesday", hours: "07:00 – 17:00" },
    { day: "Wednesday", hours: "07:00 – 17:00" },
    { day: "Thursday", hours: "07:00 – 17:00" },
    { day: "Friday", hours: "07:00 – 17:00" },
    { day: "Saturday", hours: "07:00 – 12:00" },
    { day: "Sunday", hours: "Closed" },
  ];

  if (!json) return defaults;

  try {
    const parsed = JSON.parse(json) as Record<string, DayHours>;
    return Object.entries(FULL_DAY_LABELS).map(([key, day]) => {
      const entry = parsed[key];
      if (!entry) return { day, hours: "-" };
      if (entry.closed) return { day, hours: "Closed" };
      if (entry.open && entry.close) {
        return { day, hours: `${entry.open} – ${entry.close}` };
      }
      return { day, hours: "-" };
    });
  } catch {
    return defaults;
  }
}
