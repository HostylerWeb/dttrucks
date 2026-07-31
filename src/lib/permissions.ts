export type Permission = "read" | "write" | "delete" | "manage_users";

const rolePermissions: Record<string, Permission[]> = {
  admin: ["read", "write", "delete", "manage_users"],
  editor: ["read", "write"],
  viewer: ["read"],
};

export function hasPermission(role: string, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function getPermissions(role: string): Permission[] {
  return rolePermissions[role] ?? [];
}
