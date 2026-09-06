import mongoose, { Schema, Document, models, model } from "mongoose";
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

// Export models
export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

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

const TiptapMarkSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    attrs: {
      type: Schema.Types.Mixed,
      default: undefined,
    },
  },
  {
    _id: false,
  },
);

const TiptapNodeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    attrs: {
      type: Schema.Types.Mixed,
      default: undefined,
    },

    text: {
      type: String,
      default: undefined,
    },

    marks: {
      type: [TiptapMarkSchema],
      default: undefined,
    },

    content: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },
  },
  {
    _id: false,
  },
);

const TiptapContentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["doc"],
    },

    content: {
      type: [TiptapNodeSchema],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["marble-slab", "article"],
      index: true,
    },

    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    content: {
      type: TiptapContentSchema,
      required: true,
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
          id: _id.toString(),
        };
      },
    },
  },
);

/**
 * Useful for:
 *
 * GET /api/blogs?category=marble-slab
 *
 * sorted by newest first.
 */
BlogSchema.index({
  category: 1,
  publishedAt: -1,
});

export const Blog = models.Blog || model("Blog", BlogSchema);
