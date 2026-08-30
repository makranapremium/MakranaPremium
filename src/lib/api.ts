import mongoose from "mongoose";
import { CategoryType } from "./types";

type ProductData = {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  imageUrl: string;
};

type CategoryData = {
  name: string;
  imageUrl: string;
};

export const uploadToCloudinary = async (file: File | null) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to upload image");

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function fetchProducts(category?: string, page?: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${category}&page=${page}`,
  );

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategories(): Promise<CategoryType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const { categories } = await res.json();
  return categories;
}

export async function fetchProduct(productId: mongoose.Types.ObjectId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const { product } = await res.json();
  return product;
}

export async function fetchCategory(categoryId: mongoose.Types.ObjectId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const { category } = await res.json();
  return category;
}

export async function addProduct(productData: {
  name: string;
  imageUrl: string;
  categoryId: string;
  description: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to add product");
  const { product } = await res.json();
  return product;
}

export async function addCategory(categoryData: {
  name: string;
  imageUrl: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error("Failed to add product");
  const { category } = await res.json();

  return category;
}

export async function updateProduct(
  productId: mongoose.Types.ObjectId,
  productData: ProductData,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(productData),
    },
  );
  if (!res.ok) throw new Error("Failed to update products");
  return res.json();
}

export async function updateCategory(
  categoryId: mongoose.Types.ObjectId,
  categoryData: CategoryData,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(categoryData),
    },
  );
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteProduct(productId: mongoose.Types.ObjectId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) throw new Error("Failed to delete products");
  return res.json();
}

export async function deleteCategory(categoryId: mongoose.Types.ObjectId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
