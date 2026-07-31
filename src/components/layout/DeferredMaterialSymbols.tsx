"use client";

import { useEffect } from "react";

const INTERACTION_EVENTS = ["scroll", "click", "touchstart", "keydown"] as const;

/**
 * Defers Material Symbols (~320KB) until after idle or first user interaction.
 */
export function DeferredMaterialSymbols() {
  useEffect(() => {
    const id = "material-symbols-css";
    let loaded = false;

    const load = () => {
      if (loaded || document.getElementById(id)) {
        loaded = true;
        return;
      }
      loaded = true;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "/material-symbols.css";
      document.head.appendChild(link);
    };

    const onInteract = () => {
      load();
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteract);
      }
    };

    for (const eventName of INTERACTION_EVENTS) {
      window.addEventListener(eventName, onInteract, { passive: true });
    }

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 5000 });
      return () => {
        window.cancelIdleCallback(idleId);
        for (const eventName of INTERACTION_EVENTS) {
          window.removeEventListener(eventName, onInteract);
        }
      };
    }

    const timeoutId = setTimeout(load, 4000);
    return () => {
      clearTimeout(timeoutId);
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteract);
      }
    };
  }, []);

  return null;
}
