import Link from "next/link";
import { ArrowRight, BookOpen, Gem } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 pt-32 pb-20 text-white">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
            <BookOpen className="h-4 w-4" />
            Marble Journal
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore the World of
            <span className="block text-amber-500">
              Makrana Marble
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Discover marble guides, slab insights, design inspiration,
            care tips, and stories from the world of premium marble.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Marble Slab */}
          <Link
            href="/blog/marble-slab"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-600 text-white">
              <Gem className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Marble Slabs
            </h2>

            <p className="mt-3 max-w-lg leading-7 text-gray-600">
              Learn about marble slabs, varieties, finishes, selection,
              applications, pricing, and everything you need to know
              before choosing a slab.
            </p>

            <span className="mt-6 inline-flex items-center font-semibold text-amber-700">
              Explore Marble Slabs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Articles */}
          <Link
            href="/blog/article"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white">
              <BookOpen className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Articles
            </h2>

            <p className="mt-3 max-w-lg leading-7 text-gray-600">
              Read informative articles about marble, architecture,
              interiors, craftsmanship, design ideas, and the heritage
              of Makrana marble.
            </p>

            <span className="mt-6 inline-flex items-center font-semibold text-gray-900">
              Explore Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
