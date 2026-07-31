"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 w-12 h-12 bg-white rounded-full shadow-industrial border border-outline-variant flex items-center justify-center text-primary-container hover:bg-surface-container transition-all ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Go to top"
    >
      <span className="material-symbols-outlined">expand_less</span>
    </button>
  );
}
