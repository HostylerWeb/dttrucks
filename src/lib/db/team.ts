"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getTeamMembers() {
  cacheTag("team");
  cacheLife("hours");

  return prisma.team_members.findMany({
    where: { is_visible: true },
    orderBy: { sort_order: "asc" },
  });
}
