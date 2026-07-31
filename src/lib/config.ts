export type EmailProvider = "resend" | "smtp";
export type StorageType = "local" | "s3";

export function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();
  if (provider === "smtp") return "smtp";
  if (provider === "resend") return "resend";
  return "smtp";
}

export function getStorageType(): StorageType {
  const type = process.env.STORAGE_TYPE?.toLowerCase();
  if (type === "s3") return "s3";
  return "local";
}

export function isS3Storage() {
  return getStorageType() === "s3";
}

export function assertS3Configured() {
  if (
    !process.env.S3_BUCKET ||
    !process.env.S3_ACCESS_KEY_ID ||
    !process.env.S3_SECRET_ACCESS_KEY
  ) {
    throw new Error(
      "STORAGE_TYPE=s3 requires S3_BUCKET, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY"
    );
  }
}

export function defaultMailFrom() {
  return (
    process.env.MAIL_FROM ??
    process.env.RESEND_FROM ??
    "DT Trucks <enquiries@dttrucks.com>"
  );
}
