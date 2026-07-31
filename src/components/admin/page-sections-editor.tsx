"use client";

import { useState } from "react";
import {
  createPageSection,
  deletePageSection,
  reorderPageSection,
} from "@/app/admin/(dashboard)/pages/actions";
import { FormField, inputClassName, selectClassName, textareaClassName } from "@/components/admin/form-field";
import { AdminButton } from "@/components/admin/page-header";
import { ReorderButtons } from "@/components/admin/reorder-buttons";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";
import type { page_sections } from "@/generated/prisma/client";

export function PageSectionsEditor({
  pageId,
  sections,
}: {
  pageId: string;
  sections: page_sections[];
}) {
  const [sectionType, setSectionType] = useState("text_block");

  return (
    <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-6">
      <h2 className="font-headline text-lg font-semibold">Page sections</h2>

      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id} className="rounded-lg border border-outline-variant p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium capitalize">
                {section.section_type.replace("_", " ")}
                {section.title ? `  -  ${section.title}` : ""}
              </p>
              <div className="flex items-center gap-2">
                <ReorderButtons
                  moveUpAction={reorderPageSection.bind(null, section.id, pageId, "up")}
                  moveDownAction={reorderPageSection.bind(null, section.id, pageId, "down")}
                />
                <ConfirmDeleteForm
                  action={deletePageSection.bind(null, section.id, pageId)}
                  label="Remove"
                />
              </div>
            </div>
            {section.content && (
              <pre className="mt-2 max-h-24 overflow-auto rounded bg-surface-container p-2 text-xs">
                {section.content.slice(0, 500)}
              </pre>
            )}
          </li>
        ))}
      </ul>

      <form action={createPageSection.bind(null, pageId)} className="space-y-3 border-t border-outline-variant pt-4">
        <h3 className="text-sm font-semibold">Add section</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Type" name="section_type">
            <select
              id="section_type"
              name="section_type"
              value={sectionType}
              onChange={(e) => setSectionType(e.target.value)}
              className={selectClassName}
            >
              <option value="hero">Hero</option>
              <option value="text_block">Text block</option>
              <option value="feature_grid">Feature grid</option>
              <option value="image_gallery">Image gallery</option>
              <option value="video_embed">Video embed</option>
              <option value="cta_banner">CTA banner</option>
              <option value="team_members">Team members</option>
              <option value="faq">FAQ</option>
              <option value="contact_info">Contact info</option>
            </select>
          </FormField>
          <FormField label="Title" name="title">
            <input name="title" className={inputClassName} />
          </FormField>
        </div>
        <FormField label="Content (HTML or JSON)" name="content">
          <textarea
            name="content"
            className={textareaClassName}
            rows={4}
            placeholder='e.g. {"youtube_id":"..."} or HTML'
          />
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_visible" defaultChecked />
          Visible
        </label>
        <AdminButton type="submit">Add section</AdminButton>
      </form>
    </section>
  );
}
