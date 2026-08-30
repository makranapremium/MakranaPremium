import mongoose, { Schema, Document } from "mongoose";
import { Model } from "mongoose";

// Interface for Category
export interface ICategory extends Document {
  name: string;
  imageUrl: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Product
export interface IProduct extends Document {
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Blog
export interface IBlog extends Document {
  title: string;
  featureImage: string;
  mainContent: string;
  secondImage: string;
  otherContent: string;
  slug: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        const { _id, __v, ...category } = ret;
        return {
          ...category,
          id: _id,
        };
      },
    },
  },
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        const { _id, __v, ...product } = ret;
        return {
          ...product,
          id: _id,
        };
      },
    },
  },
);

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    featureImage: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    mainContent: {
      type: String,
      required: true,
    },
    secondImage: {
      type: String,
    },
    otherContent: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        const { _id, __v, ...blog } = ret;
        return {
          ...blog,
          id: _id,
        };
      },
    },
  },
);

// Export models
export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export interface IVisitor extends Document {
  visitorId: string;
  firstVisit: Date;
  lastSeen: Date;
}

const VisitorSchema = new Schema<IVisitor>({
  visitorId: { type: String, required: true, unique: true },
  firstVisit: { type: Date, required: true },
  lastSeen: { type: Date, required: true },
});

export const Visitor: Model<IVisitor> =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
