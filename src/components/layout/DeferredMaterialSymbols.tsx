"use client";

import { useEffect } from "react";

/**
 * Defers Material Symbols (~320KB) until after first paint so PageSpeed/LCP
 * does not treat the icon font as a critical dependency.
 */
export function DeferredMaterialSymbols() {
  useEffect(() => {
    const id = "material-symbols-css";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "/material-symbols.css";
    document.head.appendChild(link);
  }, []);

  return null;
}
