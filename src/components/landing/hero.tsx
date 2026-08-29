import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Clock, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Luxury Marble Showroom"
          fill
          priority
          quality={90}  
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Makrana
          </h1>

          <div className="relative inline-block mt-1">
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400">
              Premium
            </span>
            <div className="absolute inset-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-amber-300/20 blur-sm">
              Premium
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
          <div className="mx-4 sm:mx-6 flex space-x-2">
            <div className="w-2 h-2 bg-amber-300 rounded-full" />
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <div className="w-2 h-2 bg-amber-300 rounded-full" />
          </div>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Experience the exceptional quality of{" "}
          <span className="text-amber-300 font-medium">Makrana marble</span>{" "}
          that elevates the elegance of any space.
          <span className="block mt-2 text-sm sm:text-base md:text-lg">
            Renowned worldwide for its pristine beauty.
          </span>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16">
          <Link href="/collections">
            <Button
              size="lg"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-amber-600 hover:bg-amber-700"
            >
              Explore Collections
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>

          <Link href="tel:+917976973338">
            <Button
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-white/30"
            >
              <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Get Quote
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {[
            { icon: Users, value: "1000+", label: "Satisfied Clients" },
            { icon: Award, value: "25+", label: "Years Experience" },
            { icon: Clock, value: "24/7", label: "Expert Support" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row items-center justify-center sm:space-x-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-gray-300">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
