import { apiDefaults } from "@/lib/constant";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import { MongooseError } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const page = Number(searchParams.get("page"));

    const products = await Product.find(categoryId ? { categoryId } : {})
      .skip(page > 1 ? (page - 1) * apiDefaults.limit : 0)
      .sort({ createdAt: -1 })
      .populate(["categoryId"], ["id", "name"])
      .limit(apiDefaults.limit);
    return NextResponse.json(
      {
        products,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ApiError || error instanceof MongooseError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, imageUrl, categoryId, description } = await req.json();

    console.log(description)

    if (!name || !imageUrl || !categoryId || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const productName = String(name).trim().toLowerCase();
    const slug = slugify(productName, "-");

    const product = await Product.create({
      name: productName,
      slug,
      imageUrl,
      description,
      categoryId,
    });

    return NextResponse.json(
      {
        product,
        message: "product added successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ApiError || error instanceof MongooseError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  }
}
