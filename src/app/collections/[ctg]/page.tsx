import { getCategory, getCategoryBySlug } from "@/lib/actions";
import { getProducts } from "@/lib/actions";
import Products from "@/components/products";
import mongoose from "mongoose";
import { Metadata } from "next";
import React from "react";
import { notFound, redirect } from "next/navigation";

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
      title: "Category Not Found | Makrana Premium",
      description: "The requested marble collection could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const formattedCategory = category.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${formattedCategory} | Premium Makrana Marble Collection`;

  const description = `Explore our exclusive ${formattedCategory} collection at Makrana Premium. Discover beautifully handcrafted Makrana marble products and premium marble handicrafts from Rajasthan, India.`;

  const canonicalUrl = `https://www.makranapremium.com/collections/${ctg}`;

  return {
    title,
    description,
    keywords: [
      `${formattedCategory}`,
      `${formattedCategory} Makrana marble`,
      `buy ${formattedCategory} online`,
      `${formattedCategory} marble handicrafts`,
      `premium ${formattedCategory}`,
      "Makrana marble products",
      "handcrafted marble items",
      "Rajasthan marble handicrafts",
    ],
    alternates: {
      canonical: `https://www.makranapremium.com/collections/${ctg}`,
    },
    openGraph: {
      title: `${formattedCategory} | Makrana Premium`,
      description,
      url: canonicalUrl,
      siteName: "Makrana Premium",
      type: "website",
      images: category.imageUrl
        ? [
            {
              url: category.imageUrl,
              alt: `${formattedCategory} - Makrana Marble Collection`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: category.imageUrl ? [category.imageUrl] : undefined,
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

export default async function CategoryPage({ params }: PageProps) {
  const { ctg } = await params;
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const category = await getCategoryBySlug(ctg);

  // If not found, check whether it's an old collection ID
  if (!category) {
    const categoryById = await getCategory(ctg);

    if (categoryById) {
      redirect(`/collections/${categoryById.slug}`);
    }
  }

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
