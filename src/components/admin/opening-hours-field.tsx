"use client";

import { useMemo, useState } from "react";
import { inputClassName } from "@/components/admin/form-field";

type DayHours = { open?: string; close?: string; closed?: boolean };

type OpeningHours = Record<string, DayHours>;

const DAYS = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const;

function parseHours(json: string | undefined): OpeningHours {
  if (!json) {
    return {};
  }
  try {
    return JSON.parse(json) as OpeningHours;
  } catch {
    return {};
  }
}

export function OpeningHoursField({ defaultValue }: { defaultValue?: string }) {
  const initial = useMemo(() => parseHours(defaultValue), [defaultValue]);
  const [hours, setHours] = useState<OpeningHours>(initial);

  function updateDay(
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) {
    setHours((prev) => {
      const current = prev[day] ?? {};
      if (field === "closed") {
        return {
          ...prev,
          [day]: value ? { closed: true } : { open: "07:00", close: "17:00" },
        };
      }
      return {
        ...prev,
        [day]: { ...current, closed: false, [field]: value },
      };
    });
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="opening_hours" value={JSON.stringify(hours)} />
      {DAYS.map(({ key, label }) => {
        const day = hours[key] ?? { open: "07:00", close: "17:00" };
        const closed = Boolean(day.closed);

        return (
          <div
            key={key}
            className="grid gap-2 sm:grid-cols-[120px_1fr_1fr_auto] sm:items-center"
          >
            <span className="text-sm font-medium">{label}</span>
            <input
              type="time"
              value={day.open ?? "07:00"}
              disabled={closed}
              onChange={(e) => updateDay(key, "open", e.target.value)}
              className={inputClassName}
            />
            <input
              type="time"
              value={day.close ?? "17:00"}
              disabled={closed}
              onChange={(e) => updateDay(key, "close", e.target.value)}
              className={inputClassName}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={closed}
                onChange={(e) => updateDay(key, "closed", e.target.checked)}
              />
              Closed
            </label>
          </div>
        );
      })}
    </div>
  );
}
