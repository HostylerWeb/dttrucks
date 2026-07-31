import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { assertS3Configured, isS3Storage } from "@/lib/config";

export type StoredImage = {
  url: string;
  filename: string;
  width: number | null;
  height: number | null;
  sizeBytes: number;
};

function sanitizeBaseName(originalName: string) {
  return originalName.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-]/gi, "-");
}

function buildS3PublicUrl(filename: string) {
  const bucket = process.env.S3_BUCKET!;
  if (process.env.S3_PUBLIC_URL) {
    return `${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/uploads/${filename}`;
  }
  if (process.env.S3_ENDPOINT) {
    return `${process.env.S3_ENDPOINT.replace(/\/$/, "")}/${bucket}/uploads/${filename}`;
  }
  const region = process.env.S3_REGION ?? "eu-west-2";
  return `https://${bucket}.s3.${region}.amazonaws.com/uploads/${filename}`;
}

async function uploadToS3(key: string, body: Buffer, contentType: string) {
  assertS3Configured();
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
  const client = new S3Client({
    region: process.env.S3_REGION || "auto",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    ...(process.env.S3_ENDPOINT
      ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true }
      : {}),
  });

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function storeOptimizedImage(
  buffer: Buffer,
  originalName: string
): Promise<StoredImage> {
  const filename = `${sanitizeBaseName(originalName)}-${Date.now()}.webp`;
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const webpBuffer = await image.webp({ quality: 85 }).toBuffer();

  if (isS3Storage()) {
    await uploadToS3(`uploads/${filename}`, webpBuffer, "image/webp");

    return {
      url: buildS3PublicUrl(filename),
      filename,
      width: metadata.width ?? null,
      height: metadata.height ?? null,
      sizeBytes: webpBuffer.length,
    };
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), webpBuffer);

  return {
    url: `/uploads/${filename}`,
    filename,
    width: metadata.width ?? null,
    height: metadata.height ?? null,
    sizeBytes: webpBuffer.length,
  };
}

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function resumeExtension(mimeType: string, originalName: string) {
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType === "application/msword") return "doc";
  if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return "docx";
  }
  const ext = originalName.split(".").pop()?.toLowerCase();
  if (ext === "pdf" || ext === "doc" || ext === "docx") return ext;
  return "bin";
}

function buildResumePublicUrl(filename: string) {
  const bucket = process.env.S3_BUCKET!;
  if (process.env.S3_PUBLIC_URL) {
    return `${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/resumes/${filename}`;
  }
  if (process.env.S3_ENDPOINT) {
    return `${process.env.S3_ENDPOINT.replace(/\/$/, "")}/${bucket}/resumes/${filename}`;
  }
  const region = process.env.S3_REGION ?? "eu-west-2";
  return `https://${bucket}.s3.${region}.amazonaws.com/resumes/${filename}`;
}

export async function storeResume(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<{ url: string; filename: string; sizeBytes: number }> {
  if (buffer.length > RESUME_MAX_BYTES) {
    throw new Error("Resume must be 5MB or smaller");
  }
  if (!RESUME_ALLOWED.has(mimeType)) {
    throw new Error("Resume must be a PDF or Word document");
  }

  const ext = resumeExtension(mimeType, originalName);
  const filename = `${sanitizeBaseName(originalName)}-${Date.now()}.${ext}`;

  if (isS3Storage()) {
    await uploadToS3(`resumes/${filename}`, buffer, mimeType);

    return {
      url: buildResumePublicUrl(filename),
      filename,
      sizeBytes: buffer.length,
    };
  }

  const resumesDir = path.join(process.cwd(), "public", "uploads", "resumes");
  await mkdir(resumesDir, { recursive: true });
  await writeFile(path.join(resumesDir, filename), buffer);

  return {
    url: `/uploads/resumes/${filename}`,
    filename,
    sizeBytes: buffer.length,
  };
}
