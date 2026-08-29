import MasonryLayout from "../utils/masonry-layout";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Award, Sparkles, Users } from "lucide-react";
import { staticCategories } from "@/lib/constant";
import CategoryCard from "../utils/category-card";

const ShopProducts = () => {
  return (
    <section
      id="gallery"
      className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-8 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-24 right-12 w-20 h-20 border border-white/20 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-amber-600/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 sm:mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs sm:text-sm font-medium text-amber-200">
                Our Collections
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Discover Marble
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                Elegance
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore our exquisite collections of handcrafted marble
              masterpieces. Each piece tells a story of traditional
              craftsmanship and timeless beauty from the heart of Makrana.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-6 sm:mb-8">
              {[
                { value: "10+", label: "Collections" },
                { value: "500+", label: "Unique Pieces" },
                { value: "25+", label: "Years Crafting" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                text: "Handpicked marble from the finest quarries of Makrana, ensuring exceptional quality.",
                color: "blue",
              },
              {
                icon: Users,
                title: "Expert Craftsmanship",
                text: "Skilled artisans with generations of experience and attention to detail.",
                color: "green",
              },
              {
                icon: Sparkles,
                title: "Custom Designs",
                text: "Bespoke marble creations tailored to your vision and space.",
                color: "amber",
              },
            ].map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className={`text-center p-5 sm:p-6 bg-${color}-50 rounded-2xl border border-${color}-200`}
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-${color}-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4 sm:px-6">
        <MasonryLayout breakpoints={{ 1200: 3, 768: 2, 500: 1 }}>
          {staticCategories.map((category, index) => (
            <CategoryCard
              key={category.id.toString()}
              category={category}
              showNewBadge={index < 2}
            />
          ))}
        </MasonryLayout>

        <div className="text-center mt-10 sm:mt-16">
          <Link href="/collections">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg"
            >
              View All Collections
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopProducts;
