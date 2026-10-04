import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    category: "marble-slab" | "article";
    featuredImage: string;
    publishedAt: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm backdrop-blur">
              {blog.category === "marble-slab"
                ? "Marble Slab"
                : "Article"}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>

        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-amber-600">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-5 inline-flex items-center text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
        >
          Read Article
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
