import { cn } from "@/lib/utils";

export function FormField({
  label,
  name,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  name?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-on-surface"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-secondary">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-primary" role="alert">{error}</p>
      )}
    </div>
  );
}

export const inputClassName =
  "w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface shadow-sm focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20";

export const selectClassName = inputClassName;

export const textareaClassName = inputClassName + " min-h-[120px]";
