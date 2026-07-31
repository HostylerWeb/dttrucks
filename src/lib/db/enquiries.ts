import { prisma } from "@/lib/prisma";
import type { enquiry_type } from "@/generated/prisma/client";

export type CreateEnquiryInput = {
  type: enquiry_type;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source_page?: string;
  metadata?: Record<string, unknown>;
};

export async function createEnquiry(input: CreateEnquiryInput) {
  return prisma.enquiries.create({
    data: {
      type: input.type,
      name: input.name,
      email: input.email,
      phone: input.phone,
      subject: input.subject,
      message: input.message,
      source_page: input.source_page,
      metadata: input.metadata ? JSON.stringify(input.metadata) : null,
    },
  });
}

export async function getEnquiries() {
  return prisma.enquiries.findMany({
    orderBy: { created_at: "desc" },
    include: {
      assigned_to: { select: { id: true, name: true, email: true } },
    },
  });
}

export async function getEnquiryById(id: string) {
  return prisma.enquiries.findUnique({
    where: { id },
    include: {
      assigned_to: { select: { id: true, name: true, email: true } },
    },
  });
}
