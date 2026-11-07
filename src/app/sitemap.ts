import type { MetadataRoute } from "next";

import { getBlogsByCategory, getCategories } from "@/lib/actions";

const SITE_URL = "https://www.makranapremium.com";

// Always build the sitemap on request so new posts and categories appear
// without a redeploy (and so the build does not need a database connection).
export const dynamic = "force-dynamic";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/collections`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/blogs/marble-slabs`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/blogs/marble-articles`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
  { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [categoryResult, slabs, articles] = await Promise.all([
      getCategories(1, undefined, 1000),
      getBlogsByCategory("marble-slab", 1, 1000),
      getBlogsByCategory("article", 1, 1000),
    ]);

    const collectionRoutes: MetadataRoute.Sitemap = categoryResult.categories.map(
      (category) => ({
        url: `${SITE_URL}/collections/${category.slug}`,
        lastModified: category.updatedAt ? new Date(category.updatedAt) : undefined,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );

    const blogRoutes: MetadataRoute.Sitemap = [
      ...slabs.blogs,
      ...articles.blogs,
    ].map((blog) => ({
      url: `${SITE_URL}/blogs/post/${blog.slug}`,
      lastModified: new Date(blog.updatedAt ?? blog.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...collectionRoutes, ...blogRoutes];
  } catch (error) {
    // If the database is unreachable, still serve the static pages.
    console.error("sitemap: failed to load dynamic routes", error);
    return staticRoutes;
  }
}
