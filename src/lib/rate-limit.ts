import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export async function checkRateLimit(
  ipHash: string,
  action: string,
  limit = DEFAULT_LIMIT,
  windowMs = WINDOW_MS
): Promise<{ allowed: boolean; remaining: number }> {
  const since = new Date(Date.now() - windowMs);

  const count = await prisma.form_rate_limits.count({
    where: {
      ip_hash: ipHash,
      action,
      created_at: { gte: since },
    },
  });

  if (count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await prisma.form_rate_limits.create({
    data: { ip_hash: ipHash, action },
  });

  // Prune old entries occasionally (keep table small)
  if (count === 0) {
    await prisma.form_rate_limits.deleteMany({
      where: { created_at: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    });
  }

  return { allowed: true, remaining: limit - count - 1 };
}
