type DayHours = { open?: string; close?: string; closed?: boolean };

type OpeningHoursSpec = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens?: string;
  closes?: string;
};

const DAY_MAP: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const DEFAULT_SPECS: OpeningHoursSpec[] = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "07:00",
    closes: "12:00",
  },
];

/** Schema.org opening hours strings e.g. Mo-Fr 07:00-17:00 */
export function openingHoursToSchemaStrings(json: string | null | undefined): string[] {
  if (!json) {
    return ["Mo-Fr 07:00-17:00", "Sa 07:00-12:00"];
  }

  try {
    const hours = JSON.parse(json) as Record<string, DayHours>;
    const shortDay: Record<string, string> = {
      monday: "Mo",
      tuesday: "Tu",
      wednesday: "We",
      thursday: "Th",
      friday: "Fr",
      saturday: "Sa",
      sunday: "Su",
    };

    const lines: string[] = [];
    for (const [key, label] of Object.entries(shortDay)) {
      const day = hours[key];
      if (!day || day.closed) continue;
      if (day.open && day.close) {
        lines.push(`${label} ${day.open}-${day.close}`);
      }
    }
    return lines.length > 0 ? lines : ["Mo-Fr 07:00-17:00", "Sa 07:00-12:00"];
  } catch {
    return ["Mo-Fr 07:00-17:00", "Sa 07:00-12:00"];
  }
}

export function openingHoursToSpecifications(
  json: string | null | undefined
): OpeningHoursSpec[] {
  if (!json) {
    return DEFAULT_SPECS;
  }

  try {
    const hours = JSON.parse(json) as Record<string, DayHours>;
    const specs: OpeningHoursSpec[] = [];
    const weekdays: string[] = [];

    for (const [key, label] of Object.entries(DAY_MAP)) {
      const day = hours[key];
      if (!day || day.closed) continue;
      if (key === "saturday" || key === "sunday") {
        if (day.open && day.close) {
          specs.push({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: label,
            opens: day.open,
            closes: day.close,
          });
        }
      } else if (day.open && day.close) {
        weekdays.push(label);
      }
    }

    if (weekdays.length > 0) {
      const first = hours.monday ?? hours.tuesday;
      if (first?.open && first?.close) {
        specs.unshift({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: weekdays,
          opens: first.open,
          closes: first.close,
        });
      }
    }

    return specs.length > 0 ? specs : DEFAULT_SPECS;
  } catch {
    return DEFAULT_SPECS;
  }
}
