"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RichTextEditor({
  name,
  defaultValue = "",
  className,
}: {
  name: string;
  defaultValue?: string;
  className?: string;
}) {
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => setHtml(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[200px] px-3 py-2 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && defaultValue && editor.isEmpty) {
      editor.commands.setContent(defaultValue);
      setHtml(defaultValue);
    }
  }, [editor, defaultValue]);

  return (
    <div className={cn("rounded-lg border border-outline-variant bg-white", className)}>
      <div className="flex flex-wrap gap-1 border-b border-outline-variant bg-surface-container-low p-2">
        <ToolbarButton
          label="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          active={editor?.isActive("heading", { level: 2 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="List"
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Link"
          active={editor?.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL");
            if (!url) return;
            editor?.chain().focus().setLink({ href: url }).run();
          }}
        />
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}

function ToolbarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded px-2 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-primary-container text-white"
          : "bg-white text-on-surface hover:bg-surface-container"
      )}
    >
      {label}
    </button>
  );
}
