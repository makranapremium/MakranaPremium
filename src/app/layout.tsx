import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import WhatsAppContact from "@/components/utils/whatsapp";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "qPm6LNMecy8-8L1PfFsQKVZnIEnEsAAEDXDJZqiKiE4",
  },
  metadataBase: new URL("https://makranapremium.com"),
  // metadataBase: new URL('http://localhost.com'),
  title: {
    default: "Makrana Premium",
    template: "Makrana Premium - %s",
  },
  description:
    "Makrana Premium offers an exquisite collection of marble handicrafts and Makrana marble, renowned for their quality and craftsmanship.",
  keywords: [
    "makrana premium",
    "makrana primium",
    "makranaprimium",
    "makrana-premium",
    "white marble",
    "Makrana marble",
    "marble handicrafts",
    "premium marble",
    "marble sculptures",
    "marble decor",
    "marble art",
    "Makrana marble products",
    "marble art pieces",
    "custom marble designs",
    "luxury marble items",
    "handcrafted marble artifacts",
    "marble home accents",
    "marble sculptures for home",
    "exclusive marble creations",
    "artistic marble works",
    "marble carvings",
    "marble vases and bowls",
    "marble tabletops",
    "marble figurines",
    "marble kitchen decor",
    "marble wall art",
    "marble gifts",
    "marble centerpieces",
    "Indian marble handicrafts",
    "marble heritage crafts",
    "marble statues",
    "decorative marble items",
    "marble furniture pieces",
    "marble interior decor",
    "high-quality marble products",
    "marble design collection",
    "marble artistry",
    "marble traditional crafts",
    "marble souvenirs",
    "unique marble items",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Makrana Premium - Marble Handicrafts and Makrana Marble",
    description:
      "Discover the finest selection of marble handicrafts and Makrana marble at Makrana Premium. Perfect for home decor and artistic installations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makrana Premium - Marble Handicrafts and Makrana Marble",
    description:
      "Discover the finest selection of marble handicrafts and Makrana marble at Makrana Premium. Perfect for home decor and artistic installations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>

        <WhatsAppContact />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
