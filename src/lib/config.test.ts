import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  getEmailProvider,
  getStorageType,
  isS3Storage,
  defaultMailFrom,
} from "@/lib/config";

describe("config", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("reads email provider from env", () => {
    process.env.EMAIL_PROVIDER = "resend";
    expect(getEmailProvider()).toBe("resend");
    process.env.EMAIL_PROVIDER = "smtp";
    expect(getEmailProvider()).toBe("smtp");
  });

  it("reads storage type from env", () => {
    process.env.STORAGE_TYPE = "s3";
    expect(getStorageType()).toBe("s3");
    expect(isS3Storage()).toBe(true);
    process.env.STORAGE_TYPE = "local";
    expect(getStorageType()).toBe("local");
    expect(isS3Storage()).toBe(false);
  });

  it("defaults storage to local", () => {
    delete process.env.STORAGE_TYPE;
    expect(getStorageType()).toBe("local");
  });

  it("resolves mail from address", () => {
    process.env.MAIL_FROM = "Test <test@example.com>";
    expect(defaultMailFrom()).toBe("Test <test@example.com>");
  });
});
