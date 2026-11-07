import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marble Collections | Premium Makrana Marble Handicrafts",
  description:
    "Explore exclusive Makrana marble collections featuring handcrafted marble handicrafts, decorative marble items, and timeless artistic creations from Rajasthan, India.",
  keywords: [
    "Makrana marble collections",
    "marble collections",
    "Makrana marble handicrafts",
    "handcrafted marble products",
    "marble decorative items",
    "premium marble articles",
    "Rajasthan marble handicrafts",
    "Makrana marble designs",
  ],
  alternates: { canonical: "https://www.makranapremium.com/collections" },
  openGraph: {
    title: "Explore Marble Collections | Makrana Premium",
    description:
      "Discover beautifully handcrafted Makrana marble collections, premium decorative pieces, and timeless marble artistry from Rajasthan.",
    url: "https://www.makranapremium.com/collections",
    siteName: "Makrana Premium",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function CollectionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
