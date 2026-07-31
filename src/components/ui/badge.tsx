import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "success" | "warning";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "default" && "bg-surface-container text-secondary",
        variant === "success" && "bg-tertiary-container/15 text-tertiary-container",
        variant === "warning" && "bg-primary-fixed-dim/30 text-primary",
        className
      )}
      {...props}
    />
  );
}
