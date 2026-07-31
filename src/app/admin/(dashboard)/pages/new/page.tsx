import { PageForm } from "@/components/admin/page-form";
import { requireRead } from "@/lib/admin/session";

export default async function NewPagePage() {
  await requireRead();
  return <PageForm mode="create" />;
}
