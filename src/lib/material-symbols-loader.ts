const STYLESHEET_ID = "material-symbols-css";

/** Injects self-hosted Material Symbols CSS (idempotent). */
export function loadMaterialSymbols(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLESHEET_ID)) return;

  const link = document.createElement("link");
  link.id = STYLESHEET_ID;
  link.rel = "stylesheet";
  link.href = "/material-symbols.css";
  document.head.appendChild(link);
}
