import type { content_status } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

const statusStyles: Record<content_status, string> = {
  draft: "bg-surface-container text-secondary border-outline-variant",
  published: "bg-tertiary-container/15 text-tertiary border-tertiary-container/30",
  archived: "bg-surface-container-highest text-secondary border-outline-variant",
};

export function StatusBadge({
  status,
  className,
}: {
  status: content_status | string;
  className?: string;
}) {
  const style =
    statusStyles[status as content_status] ?? statusStyles.draft;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        style,
        className
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
