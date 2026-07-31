import { describe, expect, it } from "vitest";
import { storeResume } from "@/lib/storage";

describe("storeResume", () => {
  it("rejects files over 5MB", async () => {
    const large = Buffer.alloc(5 * 1024 * 1024 + 1);
    await expect(
      storeResume(large, "resume.pdf", "application/pdf")
    ).rejects.toThrow("5MB");
  });

  it("rejects invalid mime types", async () => {
    const buffer = Buffer.from("not a resume");
    await expect(
      storeResume(buffer, "resume.exe", "application/octet-stream")
    ).rejects.toThrow("PDF or Word");
  });
});
