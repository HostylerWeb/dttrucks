"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onClose,
  title,
  children,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" aria-hidden={!open}>
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Panel"}
        className={cn(
          "absolute top-0 h-full w-full max-w-[min(100%,20rem)] bg-surface shadow-2xl flex flex-col p-5 sm:p-6",
          side === "right" ? "right-0" : "left-0"
        )}
      >
        {title && (
          <div className="flex justify-between items-center mb-6">
            <span className="font-headline font-bold text-primary-container">{title}</span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-surface-container"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
