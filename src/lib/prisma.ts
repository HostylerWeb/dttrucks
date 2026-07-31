import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pgPool: pg.Pool;
};

function createPrismaClient() {
  const pool =
    globalForPrisma.pgPool ??
    new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

function getPrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;

  // Dev hot-reload can keep an old PrismaClient instance after schema changes.
  if (cached && typeof cached.ebay_listings?.count !== "function") {
    globalForPrisma.prisma = createPrismaClient();
    return globalForPrisma.prisma;
  }

  if (!cached) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = getPrismaClient();
