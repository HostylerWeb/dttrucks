import { requireRead } from "@/lib/admin/session";
import { getMediaForPicker } from "@/lib/admin/media-picker";
import { TeamMemberForm } from "@/components/admin/team-member-form";

export default async function NewTeamMemberPage() {
  await requireRead();
  const media = await getMediaForPicker();
  return <TeamMemberForm mode="create" media={media} />;
}
