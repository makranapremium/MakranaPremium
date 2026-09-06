import { getCategory, getCategoryBySlug } from "@/lib/actions";
import { getProducts } from "@/lib/actions";
import Products from "@/components/products";
import mongoose from "mongoose";
import { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";

// import BlogCategory from "@/components/blog/blog-category";
// import { BLOG_CATEGORIES, type BlogRouteCategory } from "@/lib/blog";

interface PageProps {
  params: Promise<{
    ctg: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { ctg } = await params;

  const category = await getCategoryBySlug(ctg);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you're looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const formattedCategory = category.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${formattedCategory} - Buy the Best Products Online`,
    description: `Explore top-quality ${formattedCategory} at unbeatable prices. Shop now and enjoy fast delivery!`,
    keywords: [
      `${formattedCategory} online`,
      `best ${formattedCategory}`,
      `buy ${formattedCategory}`,
    ],
    openGraph: {
      title: `${formattedCategory} - Shop Now`,
      description: `Find the best deals on ${formattedCategory}. Wide selection and great prices!`,
      images: category.imageUrl ? [{ url: category.imageUrl }] : undefined,
      url: `${process.env.BASE_URL}/categories/${ctg}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedCategory} - Best Deals Online`,
      description: `Looking for ${formattedCategory}? Check out our latest collection at amazing prices!`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { ctg } = await params;
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const category = await getCategoryBySlug(ctg);

  if (!category) {
    notFound();
  }

  const { products, productCount } = await getProducts(category.id);

  /*
   * Initial server-side load.
   *
   * This is NOT calling /api/blogs.
   * It queries MongoDB directly.
   */

  return (
    <Products
      categoryId={category.id.toString()}
      initialProducts={products}
      productCount={productCount}
    />
  );
}
