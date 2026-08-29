import mongoose from "mongoose";

export interface CategoryType {
  id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  categoryId: {
    id: mongoose.Types.ObjectId,
    name: string,
    slug: string
  };
  imageUrl: string;
  createdAt: string;
  updatedAt: string
}
