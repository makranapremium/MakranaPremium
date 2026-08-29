"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";
import type { ProductType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/lib/api";
import { Search, Grid3X3, List, Filter, Home, PartyPopper } from "lucide-react";
import ProductCard from "./utils/product-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type ViewMode = "grid" | "list";

export default function Products({
  initialProducts,
  categoryId: ctg,
  productCount,
}: {
  categoryId: string;
  initialProducts: ProductType[];
  productCount: number;
}) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const categoryName =
    products[0]?.categoryId?.name
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "Products";

  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { products: newProducts } = await fetchProducts(ctg, page + 1);
      if (newProducts) {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          products.length < productCount
        ) {
          fetchMoreProducts();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isLoading, products.length, productCount]);

  const navList = [
    { link: "/", content: <Home size={"20px"} /> },
    { link: "/collections", content: "Collections" },
    { link: products[0]?.categoryId.id || "Products", content: categoryName },
  ];

  return (
    <div className="max-w-screen overflow-x-hidden   min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center text-gray-300 mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                {navList.map((n, i) => (
                  <Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={n.link.toString()}
                        className="hover:text-white"
                      >
                        {n.content}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {i < navList.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="text-center px-2 sm:px-0">
            <div className="inline-flex items-center space-x-2 bg-amber-600/20 rounded-full px-4 py-1 mb-4 sm:mb-6 text-sm sm:text-base">
              <Filter className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-medium">
                Premium Collection
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {categoryName}
              <span className="block text-xl sm:text-2xl lg:text-3xl font-normal text-gray-300 mt-1 sm:mt-2">
                Marble Collection
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite collection of {categoryName.toLowerCase()}{" "}
              crafted with precision and artistry from the finest Makrana
              marble.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {[
                { label: "Products", value: productCount },
                { label: "Quality", value: "Premium" },
                { label: "Excellence", value: "Handcrafted" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center min-w-[80px]">
                  <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 w-full"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none bg-amber-600 hover:bg-amber-700"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Results Count */}
              <Badge
                variant="secondary"
                className="px-3 py-1 bg-amber-100 text-amber-800"
              >
                {products.length} results
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20">
            <div className="relative mb-6 sm:mb-8">
              <Image
                src="/empty-box.svg?height=200&width=300"
                alt="No products found"
                width={300}
                height={200}
                className="opacity-50"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {searchQuery
                ? "No products match your search"
                : "No products in this category yet!"}
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-md">
              {searchQuery
                ? "Try adjusting your search terms or browse our other categories."
                : "Check back later or explore other categories while we add more products."}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {searchQuery && (
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              )}
              <Button
                onClick={() => window.location.reload()}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              // <MasonryLayout breakpoints={{ 1500: 4, 1200: 3, 768: 2, 500: 1 }}>
              // {/* </MasonryLayout> */}
              <div className="grid grid-cols-1 min-[540]:grid-cols-2 min-[800]:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} listView />
                ))}
              </div>
            )}

            <div ref={observerRef} className="h-10 w-full mt-6 sm:mt-8" />

            {isLoading && (
              <div className="flex items-center justify-center py-8 sm:py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                  <span className="text-gray-600 font-medium">
                    Loading more products...
                  </span>
                </div>
              </div>
            )}

            {!isLoading && products.length >= productCount && (
              <div className="text-center py-6 sm:py-12">
                <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                  <span className="text-gray-600">
                    <PartyPopper className="inline" /> You&apos;ve seen all
                    products in this category!
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
