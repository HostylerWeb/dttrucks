"use client";

import { useEffect } from "react";
import { loadMaterialSymbols } from "@/lib/material-symbols-loader";

const INTERACTION_EVENTS = ["scroll", "click", "touchstart", "keydown"] as const;

/**
 * Defers Material Symbols (~320KB) until idle or first interaction.
 * Fixed UI (contact FAB, scroll-to-top) uses inline SVGs so it stays crisp before this loads.
 */
export function DeferredMaterialSymbols() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      loadMaterialSymbols();
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
      const idleId = window.requestIdleCallback(load, { timeout: 2500 });
      return () => {
        window.cancelIdleCallback(idleId);
        for (const eventName of INTERACTION_EVENTS) {
          window.removeEventListener(eventName, onInteract);
        }
      };
    }

    const timeoutId = setTimeout(load, 2500);
    return () => {
      clearTimeout(timeoutId);
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteract);
      }
    };
  }, []);

  return null;
}
