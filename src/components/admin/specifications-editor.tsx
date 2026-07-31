"use client";

import { useState } from "react";
import { inputClassName } from "@/components/admin/form-field";

export function SpecificationsEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const initial = (() => {
    if (!defaultValue) return [{ key: "", value: "" }];
    try {
      const parsed = JSON.parse(defaultValue) as Record<string, string>;
      return Object.entries(parsed).map(([key, value]) => ({ key, value }));
    } catch {
      return [{ key: "", value: "" }];
    }
  })();

  const [rows, setRows] = useState(initial);
  const json = JSON.stringify(
    Object.fromEntries(
      rows.filter((r) => r.key.trim()).map((r) => [r.key.trim(), r.value])
    )
  );

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          <input
            placeholder="Engine"
            value={row.key}
            onChange={(e) => {
              const next = [...rows];
              next[i] = { ...next[i]!, key: e.target.value };
              setRows(next);
            }}
            className={inputClassName}
          />
          <input
            placeholder="3.0L diesel"
            value={row.value}
            onChange={(e) => {
              const next = [...rows];
              next[i] = { ...next[i]!, value: e.target.value };
              setRows(next);
            }}
            className={inputClassName}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setRows([...rows, { key: "", value: "" }])}
        className="text-sm text-primary-container font-medium"
      >
        + Add row
      </button>
      <input type="hidden" name={name} value={json} readOnly />
    </div>
  );
}
