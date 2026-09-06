import mongoose, { Document } from "mongoose";

export interface CategoryType {
  id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: {
    id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
  };
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type BlogCategory = "marble-slab" | "article";

/**
 * Tiptap JSON document
 */
export interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
}

export interface TiptapContent {
  type: "doc";
  content: TiptapNode[];
}

/**
 * Blog document
 */
export interface IBlog {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  featuredImage: string;
  publishedAt: Date;
  content: TiptapContent;
  createdAt: Date;
  updatedAt: Date;
}


export const BLOG_CATEGORIES = {
  "marble-slabs": {
    dbCategory: "marble-slab",
    title: "Marble Slabs",
    description:
      "Explore our guides, ideas, and expert insights about marble slabs, finishes, applications, maintenance, and selection.",
  },

  "marble-articles": {
    dbCategory: "article",
    title: "Marble Articles",
    description:
      "Discover helpful articles, marble inspiration, craftsmanship insights, and everything you need to know about Makrana marble.",
  },
} as const;

export type BlogRouteCategory = keyof typeof BLOG_CATEGORIES;

export type BlogDbCategory =
  (typeof BLOG_CATEGORIES)[BlogRouteCategory]["dbCategory"];
