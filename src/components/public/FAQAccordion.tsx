"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FAQAccordion({
  items,
  variant = "light",
}: {
  items: { question: string; answer: string }[];
  variant?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = variant === "dark";

  return (
    <dl
      className={cn(
        "divide-y rounded-xl border shadow-industrial",
        isDark
          ? "divide-white/10 border-white/10 bg-white/5"
          : "divide-outline-variant border-outline-variant bg-white"
      )}
    >
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question} className="p-4 lg:p-5">
            <dt>
              <button
                id={buttonId}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between gap-4 text-left font-semibold",
                  isDark ? "text-white" : "text-on-surface"
                )}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                {item.question}
                <span className="material-symbols-outlined text-primary-fixed-dim shrink-0" aria-hidden>
                  {open ? "expand_less" : "expand_more"}
                </span>
              </button>
            </dt>
            <dd
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className={cn(
                "mt-3 text-sm leading-relaxed",
                isDark ? "text-inverse-on-surface/80" : "text-secondary"
              )}
            >
              {item.answer}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
