"use server";

import { prisma } from "@/lib/prisma";

type SortableRow = { id: string; sort_order: number };

export async function reorderBySortOrder(
  items: SortableRow[],
  id: string,
  direction: "up" | "down",
  updateFn: (id: string, sortOrder: number) => Promise<void>
) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;

  const current = items[index];
  const swap = items[swapIndex];
  if (!current || !swap) return;

  await updateFn(current.id, swap.sort_order);
  await updateFn(swap.id, current.sort_order);
}

export async function reorderServices(id: string, direction: "up" | "down") {
  const items = await prisma.services.findMany({
    where: { deleted_at: null },
    orderBy: { sort_order: "asc" },
    select: { id: true, sort_order: true },
  });

  await reorderBySortOrder(
    items,
    id,
    direction,
    async (rowId, sortOrder) => {
      await prisma.services.update({ where: { id: rowId }, data: { sort_order: sortOrder } });
    }
  );
}

export async function reorderTeamMembers(id: string, direction: "up" | "down") {
  const items = await prisma.team_members.findMany({
    orderBy: { sort_order: "asc" },
    select: { id: true, sort_order: true },
  });

  await reorderBySortOrder(
    items,
    id,
    direction,
    async (rowId, sortOrder) => {
      await prisma.team_members.update({ where: { id: rowId }, data: { sort_order: sortOrder } });
    }
  );
}

export async function reorderVideos(id: string, direction: "up" | "down") {
  const items = await prisma.videos.findMany({
    orderBy: { sort_order: "asc" },
    select: { id: true, sort_order: true },
  });

  await reorderBySortOrder(
    items,
    id,
    direction,
    async (rowId, sortOrder) => {
      await prisma.videos.update({ where: { id: rowId }, data: { sort_order: sortOrder } });
    }
  );
}

export async function reorderTruckCategories(id: string, direction: "up" | "down") {
  const items = await prisma.truck_categories.findMany({
    orderBy: { sort_order: "asc" },
    select: { id: true, sort_order: true },
  });

  await reorderBySortOrder(
    items,
    id,
    direction,
    async (rowId, sortOrder) => {
      await prisma.truck_categories.update({ where: { id: rowId }, data: { sort_order: sortOrder } });
    }
  );
}
