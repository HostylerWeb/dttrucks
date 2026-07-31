"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  defaultTab,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? "");

  return (
    <div>
      <div className="mobile-bleed-x sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex gap-1 min-w-max border-b border-outline-variant">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 px-3 sm:px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px min-h-11",
                active === tab.id
                  ? "border-primary-container text-primary-container"
                  : "border-transparent text-secondary hover:text-on-surface"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-5 sm:pt-6">
        {tabs.find((tab) => tab.id === active)?.content}
      </div>
    </div>
  );
}
