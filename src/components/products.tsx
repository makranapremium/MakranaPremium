"use client";

import { useCallback, useEffect, useRef, useState, Fragment } from "react";
import Image from "next/image";
import type { ProductType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/lib/api";
import {
  Search,
  Grid3X3,
  List,
  Filter,
  Home,
  PartyPopper,
  Loader2,
  AlertCircle,
} from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [error, setError] = useState<string | null>(null);

  /*
   * Pagination
   */
  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  /*
   * Determine whether more products are available.
   */
  const initialHasMore = initialProducts.length < productCount;

  const hasMoreRef = useRef(initialHasMore);
  const [hasMore, setHasMore] = useState(initialHasMore);

  /*
   * Sentinel used by IntersectionObserver.
   */
  const observerRef = useRef<HTMLDivElement | null>(null);

  /*
   * Used to prevent stale requests when category changes.
   */
  const requestIdRef = useRef(0);

  /*
   * Initial category setup.
   */
  useEffect(() => {
    pageRef.current = 1;
    loadingRef.current = false;

    const newHasMore = initialProducts.length < productCount;

    hasMoreRef.current = newHasMore;

    setProducts(initialProducts);
    setHasMore(newHasMore);
    setIsLoading(false);
    setError(null);

    requestIdRef.current += 1;
  }, [ctg, initialProducts, productCount]);

  /*
   * Category name.
   */
  const categoryName =
    products[0]?.categoryId?.name
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "Products";

  /**
   * Load next page.
   */
  const fetchMoreProducts = useCallback(async () => {
    /*
     * Prevent duplicate requests.
     */
    if (loadingRef.current || !hasMoreRef.current) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    const nextPage = pageRef.current + 1;
    const currentRequestId = requestIdRef.current;

    try {
      console.log(
        `[Products] Fetching category=${ctg}, page=${nextPage}`,
      );

      const response = await fetchProducts(ctg, nextPage);

      /*
       * Ignore response if category changed while request was running.
       */
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      const newProducts = response?.products ?? [];

      console.log(
        `[Products] Received ${newProducts.length} products for page ${nextPage}`,
      );

      /*
       * No more products.
       */
      if (newProducts.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
        return;
      }

      setProducts((prevProducts) => {
        /*
         * Remove duplicates.
         */
        const existingIds = new Set(
          prevProducts.map((product) => product.id),
        );

        const uniqueProducts = newProducts.filter(
          (product: ProductType) => !existingIds.has(product.id),
        );

        const updatedProducts = [
          ...prevProducts,
          ...uniqueProducts,
        ];

        /*
         * If we've reached the total count,
         * stop observing.
         */
        if (updatedProducts.length >= productCount) {
          hasMoreRef.current = false;
          setHasMore(false);
        }

        return updatedProducts;
      });

      /*
       * Move pagination forward only after
       * a successful API response.
       */
      pageRef.current = nextPage;
    } catch (err) {
      console.error("[Products] Failed to load products:", err);

      /*
       * Do not permanently disable pagination after
       * a temporary production/network error.
       */
      setError("Unable to load more products. Please try again.");
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [ctg, productCount]);

  /**
   * IntersectionObserver.
   */
  useEffect(() => {
    const element = observerRef.current;

    if (!element || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        /*
         * Ref check prevents duplicate calls.
         */
        if (loadingRef.current || !hasMoreRef.current) {
          return;
        }

        fetchMoreProducts();
      },
      {
        /*
         * Start loading well before the user
         * reaches the bottom.
         */
        rootMargin: "500px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchMoreProducts, hasMore]);

  /**
   * Search.
   */
  const filteredProducts = searchQuery.trim()
    ? products.filter((product) => {
        const query = searchQuery.toLowerCase();

        const productName =
          typeof product.name === "string"
            ? product.name.toLowerCase()
            : "";

        const productDescription =
          typeof product.description === "string"
            ? product.description.toLowerCase()
            : "";

        return (
          productName.includes(query) ||
          productDescription.includes(query)
        );
      })
    : products;

  const navList = [
    {
      link: "/",
      content: <Home size="20px" />,
    },
    {
      link: "/collections",
      content: "Collections",
    },
    {
      link: products[0]?.categoryId?.id || "Products",
      content: categoryName,
    },
  ];

  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* ================= HERO ================= */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pb-16 pt-24 text-white">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center text-gray-300 sm:mb-8">
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

                    {i < navList.length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="px-2 text-center sm:px-0">
            <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-amber-600/20 px-4 py-1 text-sm sm:mb-6 sm:text-base">
              <Filter className="h-4 w-4 text-amber-400" />

              <span className="font-medium text-amber-300">
                Premium Collection
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">
              {categoryName}

              <span className="mt-1 block text-xl font-normal text-gray-300 sm:mt-2 sm:text-2xl lg:text-3xl">
                Marble Collection
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-gray-300 sm:mb-8 sm:text-xl">
              Discover our exquisite collection of{" "}
              {categoryName.toLowerCase()} crafted with precision and
              artistry from the finest Makrana marble.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {[
                {
                  label: "Products",
                  value: productCount,
                },
                {
                  label: "Quality",
                  value: "Premium",
                },
                {
                  label: "Excellence",
                  value: "Handcrafted",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="min-w-[80px] text-center"
                >
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>

                  <div className="text-sm text-gray-300 sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Search */}
            <div className="relative max-w-full flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-gray-300 py-2 pl-10 pr-4 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
              <div className="flex overflow-hidden rounded-lg border border-gray-300">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "rounded-none bg-amber-600 hover:bg-amber-700"
                      : "rounded-none"
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>

                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "rounded-none bg-amber-600 hover:bg-amber-700"
                      : "rounded-none"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Badge
                variant="secondary"
                className="bg-amber-100 px-3 py-1 text-amber-800"
              >
                {filteredProducts.length} results
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {filteredProducts.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center sm:py-20">
            <div className="relative mb-6 sm:mb-8">
              <Image
                src="/empty-box.svg"
                alt="No products found"
                width={300}
                height={200}
                className="opacity-50"
              />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
              {searchQuery
                ? "No products match your search"
                : "No products in this category yet!"}
            </h2>

            <p className="mb-6 max-w-md text-gray-600 sm:mb-8">
              {searchQuery
                ? "Try adjusting your search terms or browse our other categories."
                : "Check back later or explore other categories while we add more products."}
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                >
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
            {/* Products */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-4 min-[540px]:grid-cols-2 min-[800px]:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    listView
                  />
                ))}
              </div>
            )}

            {/* ================= INFINITE SCROLL ================= */}
            {hasMore && (
              <div
                ref={observerRef}
                className="mt-8 flex min-h-[80px] w-full items-center justify-center"
                aria-live="polite"
                aria-busy={isLoading}
              >
                {isLoading && (
                  <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-gray-200">
                    <Loader2 className="h-5 w-5 animate-spin text-amber-600" />

                    <span className="text-sm font-medium text-gray-600">
                      Loading more products...
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ================= ERROR ================= */}
            {error && (
              <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center">
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchMoreProducts}
                  disabled={isLoading}
                >
                  {isLoading ? "Retrying..." : "Try Again"}
                </Button>
              </div>
            )}

            {/* ================= END ================= */}
            {!isLoading && !hasMore && products.length > 0 && (
              <div className="py-6 text-center sm:py-12">
                <div className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 sm:px-6 sm:py-3">
                  <span className="text-gray-600">
                    <PartyPopper className="mr-1 inline" />
                    You&apos;ve seen all products in this category!
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
