import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-container text-white shadow-industrial hover:bg-primary",
        secondary:
          "border border-outline-variant bg-white text-on-surface hover:bg-surface-container",
        outline:
          "border border-outline-variant text-on-surface hover:bg-surface-container",
        ghost: "text-primary-container hover:bg-surface-container",
      },
      size: {
        sm: "px-3 py-2 text-xs min-h-9",
        md: "px-4 py-2.5 min-h-11",
        lg: "px-6 py-3 text-base min-h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export function buttonClassName(
  variant?: VariantProps<typeof buttonVariants>["variant"],
  size?: VariantProps<typeof buttonVariants>["size"]
) {
  return buttonVariants({ variant, size });
}
