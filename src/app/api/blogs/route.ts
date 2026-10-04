import { connectDB } from "@/lib/db";
import { Blog } from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

/**
 * GET /api/blogs
 *
 * Optional:
 * /api/blogs?category=marble-slab
 * /api/blogs?category=article
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "12"), 1),
      50,
    );

    if (category && !["marble-slab", "article"].includes(category)) {
      return NextResponse.json(
        {
          message: "Invalid blog category.",
        },
        { status: 400 },
      );
    }

    const filter = category ? { category } : {};

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean({ virtuals: true }),

      Blog.countDocuments(filter),
    ]);

    const formattedBlogs = blogs.map((blog) => ({
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      featuredImage: blog.featuredImage,
      publishedAt: blog.publishedAt.toISOString(),
      updatedAt: blog.updatedAt?.toISOString(),
    }));

    return NextResponse.json({
      blogs: formattedBlogs,
      total,
      page,
      limit,
      hasMore: skip + formattedBlogs.length < total,
    });
  } catch (error) {
    console.error("[GET /api/blogs]", error);

    return NextResponse.json(
      {
        message: "Failed to fetch blogs.",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/blogs
 *
 * Creates a new blog post.
 */

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, slug, category, featuredImage, content } = body;

    // Basic validation
    if (!title?.trim()) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 },
      );
    }

    if (!category) {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 },
      );
    }

    if (!featuredImage) {
      return NextResponse.json(
        { message: "Featured image is required" },
        { status: 400 },
      );
    }

    if (!content) {
      return NextResponse.json(
        { message: "Blog content is required" },
        { status: 400 },
      );
    }

    const finalSlug = slugify(slug);

    // Check duplicate slug
    const existingBlog = await Blog.findOne({
      slug: finalSlug,
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          message: "A blog with this slug already exists.",
        },
        { status: 409 },
      );
    }

    const blog = await Blog.create({
      title: title.trim(),
      slug: finalSlug,
      category,
      featuredImage,
      content,
      publishedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog: {
          id: blog._id.toString(),
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          featuredImage: blog.featuredImage,
          publishedAt: blog.publishedAt,
          content: blog.content,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create blog error:", error);

    // Mongo duplicate key
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          message: "A blog with this slug already exists.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create blog",
      },
      { status: 500 },
    );
  }
}
