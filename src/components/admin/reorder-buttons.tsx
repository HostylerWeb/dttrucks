import { AdminButton } from "@/components/admin/page-header";

export function ReorderButtons({
  moveUpAction,
  moveDownAction,
}: {
  moveUpAction: () => Promise<void>;
  moveDownAction: () => Promise<void>;
}) {
  return (
    <div className="flex gap-1">
      <form action={moveUpAction}>
        <AdminButton type="submit" variant="secondary" className="!px-2 !py-1">
          ↑
        </AdminButton>
      </form>
      <form action={moveDownAction}>
        <AdminButton type="submit" variant="secondary" className="!px-2 !py-1">
          ↓
        </AdminButton>
      </form>
    </div>
  );
}
