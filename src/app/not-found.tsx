import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers3 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-stone-50 px-6">
      {/* Subtle marble texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              115deg,
              transparent 35%,
              rgba(80, 75, 68, 0.8) 35.2%,
              transparent 35.5%
            ),
            linear-gradient(
              25deg,
              transparent 55%,
              rgba(80, 75, 68, 0.5) 55.2%,
              transparent 55.5%
            )
          `,
          backgroundSize: "420px 420px, 620px 620px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Small architectural mark */}
        <div className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm">
          <Layers3 className="h-5 w-5 text-stone-500" strokeWidth={1.5} />
        </div>

        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-stone-500">
          Page Not Found
        </p>

        <h1 className="text-[clamp(7rem,18vw,12rem)] font-light leading-[0.8] tracking-[-0.08em] text-stone-900">
          404
        </h1>

        <div className="mx-auto mt-10 max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl">
            This piece seems to be missing.
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-500 sm:text-base">
            The page you’re looking for may have moved, been removed, or
            doesn’t exist anymore. Explore our collections to find what
            you’re looking for.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-md px-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-md border-stone-300 bg-white px-6"
          >
            <Link href="/collections">Explore Collections</Link>
          </Button>
        </div>

        {/* Marble slab-inspired divider */}
        <div className="mx-auto mt-16 flex max-w-xs items-center gap-4">
          <div className="h-px flex-1 bg-stone-200" />
          <div className="h-2.5 w-2.5 rotate-45 border border-stone-300 bg-stone-50" />
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-stone-400">
          Crafted in stone · Built to last
        </p>
      </div>
    </main>
  );
}
