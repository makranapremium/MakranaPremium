import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Blog } from "@/lib/models";
import slugify from "slugify";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET /api/blogs/[id]
 *
 * Fetch a single blog by MongoDB ID.
 */
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid blog ID.",
        },
        { status: 400 },
      );
    }

    const blog = await Blog.findById(id).lean({ virtuals: true });

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        id,
        ...blog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[GET /api/blogs/:id]", error);

    return NextResponse.json(
      {
        message: "Failed to fetch blog.",
      },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/blogs/[id]
 *
 * Update an existing blog.
 */
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid blog ID.",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const { title, category, featuredImage, publishedAt, content } = body;

    // Basic validation
    if (!title || !category || !featuredImage || !content) {
      return NextResponse.json(
        {
          message: "Title, category, featured image, and content are required.",
        },
        { status: 400 },
      );
    }

    if (!["marble-slab", "article"].includes(category)) {
      return NextResponse.json(
        {
          message: "Invalid blog category.",
        },
        { status: 400 },
      );
    }

    if (content.type !== "doc") {
      return NextResponse.json(
        {
          message: "Invalid Tiptap content.",
        },
        { status: 400 },
      );
    }

    const slug = slugify(title);
    // Check slug belongs to another blog
    const existingBlog = await Blog.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          message: "Another blog already uses this slug.",
        },
        { status: 409 },
      );
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        category,
        featuredImage,
        ...(publishedAt ? { publishedAt: new Date(publishedAt) } : {}),
        content,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Blog updated successfully.",
        blog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PUT /api/blogs/:id]", error);

    return NextResponse.json(
      {
        message: "Failed to update blog.",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/blogs/[id]
 *
 * Delete a blog.
 */
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid blog ID.",
        },
        { status: 400 },
      );
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Blog deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[DELETE /api/blogs/:id]", error);

    return NextResponse.json(
      {
        message: "Failed to delete blog.",
      },
      { status: 500 },
    );
  }
}
