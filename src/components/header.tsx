"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navSections } from "@/lib/constant";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Only ONE dropdown can be open at a time.
  // null = no dropdown is open.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  /*
   * Prevent body scrolling when mobile menu is open.
   */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  /*
   * Prevent hydration mismatch.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Handle header scroll state.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Intersection Observer for active sections.
   */
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50px 0px -50px 0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    navSections.forEach((section) => {
      const element = document.getElementById(section.name);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  /*
   * Close desktop dropdown when navigating to another page.
   */
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  /*
   * Close mobile menu when resizing to desktop.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHomePage = pathname === "/";

  /*
   * Don't render until mounted.
   */
  if (!mounted) {
    return null;
  }

  /*
   * Helper for determining whether a navigation item is active.
   */
  const isSectionActive = (sectionName: string, sectionUrl: string) => {
    return (
      pathname === sectionUrl ||
      (sectionName === "home" && pathname === "/") ||
      (sectionName === "about" && pathname === "/about") ||
      (sectionName === "collections" &&
        pathname.startsWith("/collections")) ||
      (sectionName === "blogs" && pathname.startsWith("/blogs")) ||
      (sectionName === "contact us" && pathname === "/contact")
    );
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={`w-full max-w-screen top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "fixed bg-white/50 backdrop-blur-md shadow-lg"
            : isHomePage
              ? "absolute bg-transparent"
              : "absolute bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={() => setOpenDropdown(null)}
          >
            <div className="relative">
              <Image
                className="rounded-full aspect-square w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                src="/logo.png"
                alt="Makrana Premium"
                width={48}
                height={48}
              />

              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>

            <div className="hidden sm:block">
              <h1
                className={`text-xl font-bold ${
                  isScrolled || !isHomePage
                    ? "text-gray-900"
                    : "text-white"
                }`}
              >
                Makrana Premium
              </h1>

              <p
                className={`text-xs ${
                  isScrolled || !isHomePage
                    ? "text-gray-600"
                    : "text-gray-300"
                }`}
              >
                Premium Marble Collection
              </p>
            </div>
          </Link>

          {/* ===================================================== */}
          {/* Desktop Navigation */}
          {/* ===================================================== */}

          <nav className="hidden lg:flex items-center space-x-8">
            {navSections.map((section) => {
              const isActive = isSectionActive(
                section.name,
                section.url
              );

              const isDropdownOpen =
                openDropdown === section.name;

              return (
                <div
                  key={section.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (section.hasDropdown) {
                      setOpenDropdown(section.name);
                    } else {
                      setOpenDropdown(null);
                    }
                  }}
                  onMouseLeave={() => {
                    if (section.hasDropdown) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  {/* Navigation Link */}
                  <Link
                    href={section.url}
                    className={`flex items-center space-x-1 py-2 px-3 rounded-lg transition-all duration-300 font-medium ${
                      isActive
                        ? isScrolled || !isHomePage
                          ? "bg-amber-100 text-amber-700"
                          : "bg-white/20 text-amber-300"
                        : isScrolled || !isHomePage
                          ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          : "text-white hover:text-amber-400 hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setOpenDropdown(null);
                    }}
                  >
                    <span>
                      {section.name.charAt(0).toUpperCase() +
                        section.name.slice(1)}
                    </span>

                    {section.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    )}
                  </Link>

                  {/* ================================================= */}
                  {/* Dropdown */}
                  {/* ================================================= */}

                  {section.hasDropdown && (
                    <div
                      className={`absolute top-full left-0 pt-2 w-48 transition-all duration-200 ${
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {/* Actual dropdown */}
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                        {section.dropdownItems?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.url}
                            className={`block px-4 py-2 transition-colors ${
                              pathname === item.url
                                ? "bg-amber-50 text-amber-600"
                                : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                            }`}
                            onClick={() => {
                              setOpenDropdown(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ===================================================== */}
          {/* Mobile Menu Button */}
          {/* ===================================================== */}

          <div className="sm:hidden flex items-center space-x-4">
            <button
              onClick={() => {
                setMenuOpen((prev) => !prev);

                // Close desktop dropdown state as well.
                setOpenDropdown(null);
              }}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled || !isHomePage
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={
                menuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* ======================================================= */}
        {/* Mobile Menu */}
        {/* ======================================================= */}

        <div
          className={`lg:hidden fixed overflow-x-hidden h-screen inset-0 z-40 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm h-screen"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Content */}
          <div
            className={`h-screen absolute top-0 right-0 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
              menuOpen
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Image
                  unoptimized={true}
                  className="rounded-full w-10 h-10"
                  src="/logo.png"
                  alt="Makrana Premium"
                  width={40}
                  height={40}
                />

                <div>
                  <h2 className="font-bold text-gray-900">
                    Makrana Premium
                  </h2>

                  <p className="text-xs text-gray-600">
                    Premium Marble
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="p-6 space-y-2">
              {navSections.map((section) => {
                const isActive = isSectionActive(
                  section.name,
                  section.url
                );

                return (
                  <div key={section.name}>
                    {/* Main Navigation Item */}
                    <Link
                      href={section.url}
                      className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors font-medium ${
                        isActive
                          ? "bg-amber-100 text-amber-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>
                        {section.name.charAt(0).toUpperCase() +
                          section.name.slice(1)}
                      </span>

                      {section.hasDropdown && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Link>

                    {/* Mobile Dropdown Items */}
                    {section.hasDropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {section.dropdownItems?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.url}
                            className={`block py-2 px-4 rounded-lg text-sm transition-colors ${
                              pathname === item.url
                                ? "bg-amber-50 text-amber-600"
                                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
