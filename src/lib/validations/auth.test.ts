import { describe, expect, it } from "vitest";
import { loginSchema } from "@/lib/validations/auth";

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "admin@dttrucks.com",
      password: "changeme",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-valid",
      password: "changeme",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      email: "admin@dttrucks.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});
