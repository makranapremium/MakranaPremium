import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import BlogContent from "@/components/blog/blog-content";
import { getBlogBySlug } from "@/lib/actions";
import type { TiptapContent, TiptapNode } from "@/lib/types";

const SITE_URL = "https://www.makranapremium.com";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Collects the plain text of a Tiptap node (and its children).
 */
function nodeText(node: TiptapNode): string {
  if (typeof node.text === "string") return node.text;
  return (node.content ?? []).map(nodeText).join("");
}

/**
 * Builds a unique meta description from the first paragraphs of a post.
 * Returns "" when no usable text is found, so callers can fall back.
 */
function getExcerpt(content?: TiptapContent, maxLength = 155): string {
  const paragraphs = (content?.content ?? []).filter(
    (node) => node.type === "paragraph",
  );

  let text = "";
  for (const paragraph of paragraphs) {
    const value = nodeText(paragraph).replace(/\s+/g, " ").trim();
    if (!value) continue;
    text = text ? `${text} ${value}` : value;
    if (text.length >= 120) break;
  }

  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: { absolute: "Blog Post Not Found | Makrana Premium" },
      description: "The requested Makrana marble article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    getExcerpt(blog.content) ||
    `${blog.title}. Discover expert insights, detailed guides, design inspiration, and useful information about Makrana marble, marble slabs, and handcrafted marble products.`;

  // Use the stored (lowercase) slug so URL case variants share one canonical.
  const canonicalUrl = `${SITE_URL}/blogs/post/${blog.slug}`;

  return {
    // `absolute` skips the "Makrana Premium - %s" template from the root layout,
    // so the brand name is not repeated in the title.
    title: { absolute: `${blog.title} | Makrana Premium` },
    description,
    keywords: [
      blog.title,
      "Makrana marble",
      "Makrana marble articles",
      "marble guides",
      "marble slab information",
      "marble design ideas",
      "marble craftsmanship",
      "Rajasthan marble",
      "premium marble products",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${blog.title} | Makrana Premium`,
      description,
      url: canonicalUrl,
      siteName: "Makrana Premium",
      type: "article",
      publishedTime: new Date(blog.publishedAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      images: blog.featuredImage
        ? [
            {
              url: blog.featuredImage,
              alt: `${blog.title} - Makrana Premium`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Makrana Premium`,
      description,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const categoryPath =
    blog.category === "marble-slab" ? "marble-slabs" : "marble-articles";

  const categoryTitle =
    blog.category === "marble-slab" ? "Marble Slabs" : "Marble Articles";

  const postUrl = `${SITE_URL}/blogs/post/${blog.slug}`;

  // Structured data for search engines (invisible to visitors).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: blog.title,
        description: getExcerpt(blog.content) || undefined,
        image: blog.featuredImage ? [blog.featuredImage] : undefined,
        datePublished: new Date(blog.publishedAt).toISOString(),
        dateModified: new Date(blog.updatedAt).toISOString(),
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        author: {
          "@type": "Organization",
          name: "Makrana Premium",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Makrana Premium",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryTitle,
            item: `${SITE_URL}/blogs/${categoryPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: blog.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/40" />

        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20 lg:pt-36">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>

            <span className="mx-2">/</span>

            <Link
              href={`/blogs/${categoryPath}`}
              className="transition-colors hover:text-white"
            >
              {categoryTitle}
            </Link>

            <span className="mx-2">/</span>

            <span className="text-amber-400">{blog.title}</span>
          </nav>

          {/* Category */}
          <div className="mb-6">
            <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
              {categoryTitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          {/* Divider */}
          <div className="mt-7 h-1 w-20 rounded-full bg-amber-500" />

          {/* Date */}
          <div className="mt-7 flex items-center gap-2 text-sm text-gray-400">
            <CalendarDays className="h-4 w-4 text-amber-500" />

            <time dateTime={blog.publishedAt.toString()}>
              {formatDate(blog.publishedAt.toString())}
            </time>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FEATURED IMAGE */}
      {/* ====================================================== */}

      <section className="mx-auto -mt-6 max-w-5xl px-6 lg:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </section>

      {/* ====================================================== */}
      {/* ARTICLE */}
      {/* ====================================================== */}

      <article className="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-20">
        <BlogContent content={blog.content} />

        {/* Back */}
        <div className="mt-14 border-t border-gray-200 pt-8">
          <Link
            href={`/blogs/${categoryPath}`}
            className="inline-flex items-center font-medium text-gray-700 transition-colors hover:text-amber-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {categoryTitle}
          </Link>
        </div>
      </article>
    </main>
  );
}
