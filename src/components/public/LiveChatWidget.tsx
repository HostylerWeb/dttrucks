"use client";

import { useState } from "react";

export function LiveChatWidget({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-xl shadow-2xl border border-outline-variant overflow-hidden"
          role="dialog"
          aria-label="Live chat"
        >
          <div className="bg-primary-container text-white px-5 py-4 font-semibold">
            DT Trucks Support
          </div>
          <div className="p-5 text-sm text-secondary">
            Need help with parts, service or truck sales? Call{" "}
            <a href={phoneHref} className="text-primary-container font-semibold">{phone}</a> or
            send a message via our contact form.
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        aria-label="Open live chat"
        aria-expanded={open}
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
          chat_bubble
        </span>
      </button>
    </>
  );
}
