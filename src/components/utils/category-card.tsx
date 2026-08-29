import Link from "next/link";
import Image from "next/image";
import type { CategoryType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryCardProps {
  category: CategoryType;
  showNewBadge?: boolean;
}

export default function CategoryCard({
  category,
  showNewBadge = false,
}: CategoryCardProps) {
  const isNew = () => {
    if (!category.createdAt) return false;
    const createdDate = new Date(category.createdAt);
    const now = new Date();
    return (
      Math.abs(now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24) <=
      30
    );
  };

  return (
    // <Link href={`/collections/${category.id}`} className="group block">
    <Link href={`/collections/${category.slug}`} className="group block">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden">
          <Image
            src={category.imageUrl || "/placeholder.svg"}
            alt={category.name}
            width={600}
            height={400}
            className="
              w-full
              object-cover
              min-[540]:h-64
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Badge */}
          {showNewBadge && isNew() && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <Badge className="bg-amber-500 text-white px-2 py-1 text-xs shadow-md">
                <Sparkles className="w-3 h-3 mr-1" />
                New
              </Badge>
            </div>
          )}

          {/* Text on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h3 className="text-white text-base sm:text-lg font-semibold capitalize">
              {category.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Handcrafted marble collection
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <span className="text-sm sm:text-base font-medium text-gray-800">
            View Collection
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
