import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface shadow-sm focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface shadow-sm focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface shadow-sm focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("block text-sm font-medium text-on-surface", className)}
      {...props}
    />
  );
}
