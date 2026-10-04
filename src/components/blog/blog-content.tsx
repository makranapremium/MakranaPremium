"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TiptapContent } from "@/lib/types";

interface BlogContentProps {
  content: TiptapContent;
}

export default function BlogContent({ content }: BlogContentProps) {
  const editor = useEditor({
    immediatelyRender: false,

    editable: false,

    extensions: [
      StarterKit,

      Underline,

      Image.configure({
        inline: false,
        allowBase64: false,
      }),

      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],

    content,

    editorProps: {
      attributes: {
        class: "blog-content",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="blog-content-wrapper">
      <EditorContent editor={editor} />
    </div>
  );
}
