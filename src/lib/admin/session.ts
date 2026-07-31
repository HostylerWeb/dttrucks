import { auth } from "@/lib/auth";
import {
  hasPermission,
  type Permission,
} from "@/lib/permissions";

export class AdminError extends Error {
  constructor(
    message: string,
    public readonly code: "unauthorized" | "forbidden" = "forbidden"
  ) {
    super(message);
    this.name = "AdminError";
  }
}

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new AdminError("You must be signed in.", "unauthorized");
  }
  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await requireSession();
  if (!hasPermission(session.user.role, permission)) {
    throw new AdminError("You do not have permission for this action.");
  }
  return session;
}

export async function requireRead() {
  return requirePermission("read");
}

export async function requireWrite() {
  return requirePermission("write");
}

export async function requireDelete() {
  return requirePermission("delete");
}

export async function requireManageUsers() {
  return requirePermission("manage_users");
}
