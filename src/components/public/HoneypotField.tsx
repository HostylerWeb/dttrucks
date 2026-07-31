"use client";

export function HoneypotField() {
  return (
    <div
      className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor="company_url">Company website</label>
      <input
        id="company_url"
        name="company_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value=""
        onChange={() => {}}
      />
    </div>
  );
}
