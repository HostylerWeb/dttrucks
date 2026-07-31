"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireDelete, requireWrite } from "@/lib/admin/session";
import { contentStatusSchema, parseFormData, slugSchema } from "@/lib/admin/forms";
import { revalidateBlogPost, cacheTags } from "@/lib/admin/revalidate";

const postSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  excerpt: z.string().optional(),
  content: z.string().min(1),
  featured_image: z.string().optional(),
  category_id: z.string().optional(),
  author_id: z.string().optional(),
  status: contentStatusSchema,
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  published_at: z.string().optional(),
});

const categorySchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
});

function resolvePublishedAt(
  status: string,
  publishedAtInput: string | undefined,
  existing: Date | null
) {
  if (publishedAtInput) {
    const parsed = new Date(publishedAtInput);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  if (status === "published") return existing ?? new Date();
  if (status === "draft") return null;
  return existing;
}

export async function createPost(formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(postSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const data = parsed.data;
  const post = await prisma.blog_posts.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      featured_image: data.featured_image || null,
      category_id: data.category_id || null,
      author_id: data.author_id || null,
      status: data.status,
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      published_at: resolvePublishedAt(data.status, data.published_at, null),
    },
  });

  await revalidateBlogPost(post.slug);
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${post.id}`);
}

export async function updatePost(id: string, formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(postSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const existing = await prisma.blog_posts.findUnique({ where: { id } });
  if (!existing) return { error: "Not found" };

  const data = parsed.data;
  const post = await prisma.blog_posts.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      featured_image: data.featured_image || null,
      category_id: data.category_id || null,
      author_id: data.author_id || null,
      status: data.status,
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      published_at: resolvePublishedAt(
        data.status,
        data.published_at,
        existing.published_at
      ),
    },
  });

  await revalidateBlogPost(existing.slug);
  if (existing.slug !== post.slug) await revalidateBlogPost(post.slug);
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
  return { success: true };
}

export async function deletePost(id: string): Promise<void> {
  await requireDelete();
  const post = await prisma.blog_posts.findUnique({ where: { id } });
  if (!post) return;

  await prisma.blog_posts.update({
    where: { id },
    data: { deleted_at: new Date(), status: "archived" },
  });

  await revalidateBlogPost(post.slug);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function createBlogCategory(formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(categorySchema, formData);
  if (!parsed.success) return;

  await prisma.blog_categories.create({ data: parsed.data });
  await cacheTags.blogCategories();
  revalidatePath("/admin/blog/categories");
}

export async function deleteBlogCategory(id: string): Promise<void> {
  await requireDelete();
  await prisma.blog_categories.delete({ where: { id } });
  await cacheTags.blogCategories();
  revalidatePath("/admin/blog/categories");
}
