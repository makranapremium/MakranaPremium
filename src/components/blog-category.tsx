"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Loader2,
  AlertCircle,
  PartyPopper,
} from "lucide-react";

import { fetchBlogs } from "@/lib/api";
import { BlogRouteCategory } from "@/lib/types";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: "marble-slab" | "article";
  featuredImage: string;
  publishedAt: string;
  updatedAt?: string;
}

interface CategoryInfo {
  dbCategory: "marble-slab" | "article";
  title: string;
  description: string;
}

interface BlogCategoryProps {
  category: BlogRouteCategory;
  categoryInfo: CategoryInfo;
  initialBlogs: Blog[];
  total: number;
  hasMore: boolean;
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

export default function BlogCategory({
  category,
  categoryInfo,
  initialBlogs,
  total,
  hasMore: initialHasMore,
}: BlogCategoryProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(initialHasMore);

  /*
   * Current page.
   *
   * Page 1 was already loaded by the Server Component.
   */
  const pageRef = useRef(1);

  /*
   * Prevent duplicate requests.
   */
  const loadingRef = useRef(false);

  /*
   * Used by IntersectionObserver.
   */
  const observerRef = useRef<HTMLDivElement | null>(null);

  /*
   * Keep hasMore available to the observer
   * without causing stale closure issues.
   */
  const hasMoreRef = useRef(initialHasMore);

  /*
   * Used to invalidate old requests.
   */
  const requestIdRef = useRef(0);

  /*
   * Reset state if category changes.
   */
  useEffect(() => {
    pageRef.current = 1;
    loadingRef.current = false;

    hasMoreRef.current = initialHasMore;

    setBlogs(initialBlogs);
    setHasMore(initialHasMore);
    setIsLoading(false);
    setError(null);

    requestIdRef.current += 1;
  }, [category, initialBlogs, initialHasMore]);

  /**
   * Load next page.
   */
  const fetchMoreBlogs = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) {
      return;
    }

    loadingRef.current = true;

    setIsLoading(true);
    setError(null);

    const nextPage = pageRef.current + 1;

    const currentRequestId = requestIdRef.current;

    try {
      const response = await fetchBlogs(categoryInfo.dbCategory, nextPage, 12);

      /*
       * Category changed while request was running.
       */
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      const newBlogs: Blog[] = response?.blogs ?? [];

      if (newBlogs.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
        return;
      }

      setBlogs((previousBlogs) => {
        const existingIds = new Set(previousBlogs.map((blog) => blog.id));

        const uniqueBlogs = newBlogs.filter(
          (blog) => !existingIds.has(blog.id),
        );

        const updatedBlogs = [...previousBlogs, ...uniqueBlogs];

        /*
         * Stop once we've loaded everything.
         */
        if (updatedBlogs.length >= total) {
          hasMoreRef.current = false;
          setHasMore(false);
        }

        return updatedBlogs;
      });

      /*
       * Only move the page forward
       * after a successful request.
       */
      pageRef.current = nextPage;
    } catch (error) {
      console.error("[BlogCategory] Failed to load more blogs:", error);

      setError("Unable to load more articles. Please try again.");
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [categoryInfo.dbCategory, total]);

  /**
   * IntersectionObserver.
   */
  useEffect(() => {
    const element = observerRef.current;

    if (!element || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        if (loadingRef.current || !hasMoreRef.current) {
          return;
        }

        fetchMoreBlogs();
      },
      {
        /*
         * Start loading before the user
         * reaches the bottom.
         */
        rootMargin: "500px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchMoreBlogs, hasMore]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/40" />

        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>

            <span className="mx-2">/</span>

            <span className="text-amber-400">{categoryInfo.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
              Makrana Premium
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {categoryInfo.title}
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-amber-500" />

            <p className="mt-6 text-lg leading-8 text-gray-300">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* BLOGS */}
      {/* ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        {blogs.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">No posts yet</h2>

              <p className="mt-2 text-gray-500">
                We&apos;re working on some great content. Check back soon.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Latest Articles
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing {blogs.length} of {total} posts
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <Link href={`/blogs/post/${blog.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4 text-amber-600" />

                      <time dateTime={blog.publishedAt}>
                        {formatDate(blog.publishedAt)}
                      </time>
                    </div>

                    <h2 className="line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-amber-600">
                      <Link href={`/blogs/post/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <div className="mt-6">
                      <Link
                        href={`/blogs/post/${blog.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-gray-900 transition-colors hover:text-amber-600"
                      >
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ================================================= */}
            {/* INFINITE SCROLL */}
            {/* ================================================= */}

            {hasMore && (
              <div
                ref={observerRef}
                className="mt-10 flex min-h-[100px] items-center justify-center"
                aria-live="polite"
                aria-busy={isLoading}
              >
                {isLoading && (
                  <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-gray-200">
                    <Loader2 className="h-5 w-5 animate-spin text-amber-600" />

                    <span className="text-sm font-medium text-gray-600">
                      Loading more articles...
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center">
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />

                  {error}
                </div>

                <button
                  type="button"
                  onClick={fetchMoreBlogs}
                  disabled={isLoading}
                  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {isLoading ? "Retrying..." : "Try Again"}
                </button>
              </div>
            )}

            {/* ================================================= */}
            {/* END */}
            {/* ================================================= */}

            {!isLoading && !hasMore && blogs.length > 0 && (
              <div className="py-8 text-center sm:py-12">
                <div className="inline-flex items-center rounded-full bg-gray-100 px-5 py-3 text-sm text-gray-600">
                  <PartyPopper className="mr-2 h-4 w-4" />
                  You&apos;ve seen all articles in this category.
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
