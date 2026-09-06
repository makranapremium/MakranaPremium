import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_CATEGORIES, BlogRouteCategory } from "@/lib/types";
import { getBlogsByCategory } from "@/lib/actions";
import BlogCategory from "@/components/blog-category";

// import BlogCategory from "@/components/blog/blog-category";
// import { BLOG_CATEGORIES, type BlogRouteCategory } from "@/lib/blog";

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

  const categoryInfo = BLOG_CATEGORIES[category as BlogRouteCategory];

  return {
    title: `${categoryInfo.title} | Marble Premium`,
    description: categoryInfo.description,
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!(category in BLOG_CATEGORIES)) {
    notFound();
  }

  const blogCategory = BLOG_CATEGORIES[category as BlogRouteCategory];

  /*
   * Initial server-side load.
   *
   * This is NOT calling /api/blogs.
   * It queries MongoDB directly.
   */
  const response = await getBlogsByCategory(blogCategory.dbCategory, 1, 12);

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
