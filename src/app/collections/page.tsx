"use client";

import { useState, useEffect } from "react";
import MasonryLayout from "@/components/utils/masonry-layout";
import { getCategories } from "@/lib/actions";
import type { CategoryType } from "@/lib/types";
import {
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Search,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryCard from "@/components/utils/category-card";
import Image from "next/image";

type ViewMode = "grid" | "list";
type SortOption = "name" | "newest" | "oldest";

export default function CollectionsPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories: fetchedCategories } = await getCategories();
        setCategories(fetchedCategories);
        setFilteredCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter and sort categories
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Sort categories
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "newest":
          comparison =
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime();
          break;
        case "oldest":
          comparison =
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime();
          break;
        default:
          comparison =
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredCategories(filtered);
  }, [categories, searchQuery, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-l from-gray-800 via-gray-700 to-gray-800 text-white pt-32 pb-24">
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/30 rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-28 h-28 border border-white/30 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-sm sm:text-lg font-medium text-indigo-300">
                Explore Our Collections
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Discover Timeless
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 to-pink-400">
                Marble Creations
              </span>
            </h1>

            <p className="text-sm text-ellipsis sm:text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in our curated collections of finely crafted
              marble designs. Each piece embodies artistic mastery and an
              unyielding commitment to quality.
            </p>

            {/* Stats Section */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  50+
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">
                  Unique Collections
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  500+
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">
                  Handcrafted Pieces
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  25+
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Sort */}
              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => setSortBy(value)}
              >
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="border-gray-300 bg-white"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
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
                {filteredCategories.length} collections
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="relative mb-8">
                  <Image
                    src="/empty-box.svg?height=200&width=300"
                    alt="No collections found"
                    width={300}
                    height={200}
                    className="opacity-50"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {searchQuery
                    ? "No collections match your search"
                    : "No collections available"}
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  {searchQuery
                    ? "Try adjusting your search terms or browse all our collections."
                    : "Check back later as we add more collections to our catalog."}
                </p>
                <div className="flex space-x-4">
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
                {viewMode === "grid" ? (
                  // <MasonryLayout
                  //   breakpoints={{ 1500: 4, 1200: 3, 800: 2, 500: 1, default: 1 }}
                  // >
                  //   </MasonryLayout>

                  <div className="grid gap-4 grid-cols-1 min-[540]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {filteredCategories.map((category, index) => (
                      <CategoryCard
                        key={category.id.toString()}
                        category={category}
                        showNewBadge={index < 2}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredCategories.map((category, index) => (
                      <CategoryListItem
                        key={category.id.toString()}
                        category={category}
                        showNewBadge={index < 2}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our master craftsmen bring your vision to life with premium
            Makrana marble. Contact us for custom designs and consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Get Custom Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryListItem({
  category,
  showNewBadge,
}: {
  category: CategoryType;
  showNewBadge: boolean;
}) {
  const isNew = () => {
    if (!category.createdAt) return false;
    const createdDate = new Date(category.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex">
        <div className="relative w-48 h-32 flex-shrink-0">
          <Image
            src={category.imageUrl || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover"
          />
          {showNewBadge && isNew() && (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          )}
        </div>
        <div className="flex-1 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 capitalize mb-2">
              {category.name}
            </h3>
            <p className="text-gray-600">
              Discover exquisite {category.name.toLowerCase()} pieces
            </p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <ArrowRight className="w-4 h-4 mr-2" />
            View Collection
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white max-w-7xl mx-auto">
      <div className="py-16 px-6">
        <div className="max-w-screen mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
