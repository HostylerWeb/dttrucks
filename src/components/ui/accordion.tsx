"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { title: string; content: React.ReactNode }[];
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-outline-variant rounded-xl border border-outline-variant bg-white shadow-industrial">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.title} className="p-4">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left font-semibold text-on-surface"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              {item.title}
              <span className="material-symbols-outlined text-primary-container">
                {open ? "expand_less" : "expand_more"}
              </span>
            </button>
            <div className={cn("mt-3 text-sm text-secondary", !open && "hidden")}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
