import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { getMediaForPicker } from "@/lib/admin/media-picker";
import { TeamMemberForm } from "@/components/admin/team-member-form";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const [member, media] = await Promise.all([
    prisma.team_members.findUnique({ where: { id } }),
    getMediaForPicker(),
  ]);
  if (!member) notFound();
  return <TeamMemberForm mode="edit" member={member} media={media} />;
}
