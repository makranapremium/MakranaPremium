import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import BlogContent from "@/components/blog/blog-content";
import { getBlogBySlug } from "@/lib/actions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The blog post you're looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${blog.title} | Makrana Premium`,
    description: `${blog.title} - Expert insights, guides, and articles about Makrana marble.`,

    openGraph: {
      title: blog.title,
      description: `${blog.title} - Expert insights, guides, and articles about Makrana marble.`,
      type: "article",
      publishedTime: blog.publishedAt.toString(),
      modifiedTime: blog.updatedAt.toString(),
      images: [
        {
          url: blog.featuredImage,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: `${blog.title} - Expert insights about Makrana marble.`,
      images: [blog.featuredImage],
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
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
