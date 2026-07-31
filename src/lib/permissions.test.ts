import { describe, expect, it } from "vitest";
import { getPermissions, hasPermission } from "@/lib/permissions";

describe("hasPermission", () => {
  it("grants admin all permissions", () => {
    expect(hasPermission("admin", "read")).toBe(true);
    expect(hasPermission("admin", "write")).toBe(true);
    expect(hasPermission("admin", "delete")).toBe(true);
    expect(hasPermission("admin", "manage_users")).toBe(true);
  });

  it("grants editor read and write only", () => {
    expect(hasPermission("editor", "read")).toBe(true);
    expect(hasPermission("editor", "write")).toBe(true);
    expect(hasPermission("editor", "delete")).toBe(false);
    expect(hasPermission("editor", "manage_users")).toBe(false);
  });

  it("grants viewer read only", () => {
    expect(hasPermission("viewer", "read")).toBe(true);
    expect(hasPermission("viewer", "write")).toBe(false);
  });

  it("denies unknown roles", () => {
    expect(hasPermission("guest", "read")).toBe(false);
  });
});

describe("getPermissions", () => {
  it("returns permissions for known roles", () => {
    expect(getPermissions("editor")).toEqual(["read", "write"]);
  });

  it("returns empty array for unknown roles", () => {
    expect(getPermissions("unknown")).toEqual([]);
  });
});
