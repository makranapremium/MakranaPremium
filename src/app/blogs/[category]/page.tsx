import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_CATEGORIES, BlogRouteCategory } from "@/lib/types";
import { getBlogsByCategory } from "@/lib/actions";
import BlogCategory from "@/components/blog-category";


interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;

  if (!(category in BLOG_CATEGORIES)) {
    return {
      title: "Blog Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryInfo =
    BLOG_CATEGORIES[category as BlogRouteCategory];

  const url = `https://www.makranapremium.com/blogs/${category}`;

  return {
    // The root layout template already adds "Makrana Premium - ".
    title: `${categoryInfo.title} - Makrana Marble Guides & Articles`,
    description: categoryInfo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${categoryInfo.title} | Makrana Premium`,
      description: categoryInfo.description,
      url,
      siteName: "Makrana Premium",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryInfo.title} | Makrana Premium`,
      description: categoryInfo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: PageProps) {
  const { category } = await params;

  if (!(category in BLOG_CATEGORIES)) {
    notFound();
  }

  const blogCategory =
    BLOG_CATEGORIES[category as BlogRouteCategory];

  /*
   * Initial server-side load.
   *
   * This is NOT calling /api/blogs.
   * It queries MongoDB directly.
   */
  const response = await getBlogsByCategory(
    blogCategory.dbCategory,
    1,
    12,
  );

  return (
    <BlogCategory
      category={category as BlogRouteCategory}
      categoryInfo={blogCategory}
      initialBlogs={response.blogs}
      total={response.total}
      hasMore={response.hasMore}
    />
  );
}
