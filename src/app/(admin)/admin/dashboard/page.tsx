"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Boxes,
  Package,
  FileText,
} from "lucide-react";
import Visitors from "@/components/admin/visitors";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-xl text-gray-600">
            Manage products, categories, and marble blogs with ease.
          </p>
        </div>

        {/* Management Cards */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Products Management */}
          <Card
            className="cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            onClick={() => router.push("/admin/products")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Manage Products
                </CardTitle>

                <p className="mt-2 text-gray-600">
                  Add, edit, and delete marble products from your collection.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>

            <CardContent>
              <Button
                variant="outline"
                className="w-full border-blue-200 bg-transparent text-blue-700 hover:bg-blue-50"
              >
                Go to Products
              </Button>
            </CardContent>
          </Card>

          {/* Categories Management */}
          <Card
            className="cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            onClick={() => router.push("/admin/categories")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Manage Categories
                </CardTitle>

                <p className="mt-2 text-gray-600">
                  Organize your marble products into categories.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Boxes className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>

            <CardContent>
              <Button
                variant="outline"
                className="w-full border-green-200 bg-transparent text-green-700 hover:bg-green-50"
              >
                Go to Categories
              </Button>
            </CardContent>
          </Card>

          {/* Blog Management */}
          <Card
            className="cursor-pointer border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            onClick={() => router.push("/admin/blogs")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Manage Blogs
                </CardTitle>

                <p className="mt-2 text-gray-600">
                  Create and manage marble slab guides and articles.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <FileText className="h-8 w-8 text-amber-600" />
              </div>
            </CardHeader>

            <CardContent>
              <Button
                variant="outline"
                className="w-full border-amber-200 bg-transparent text-amber-700 hover:bg-amber-50"
              >
                Go to Blogs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Visitors Analytics */}
        <div className="overflow-hidden rounded-2xl border-0 bg-white shadow-lg">
          <Visitors />
        </div>
      </div>
    </div>
  );
}
