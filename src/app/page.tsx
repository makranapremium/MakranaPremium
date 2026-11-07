import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Stats from "@/components/landing/stats";

// Only the canonical is set here; title, description and social tags
// are inherited from the root layout.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.makranapremium.com",
  },
};

const ShopProducts = dynamic(() => import("@/components/landing/gallery"));
const Process = dynamic(() => import("@/components/landing/process"));
const Testimonials = dynamic(() => import("@/components/landing/testimonials"));
const ContactUs = dynamic(() => import("@/components/landing/contact-us"));
const WhatsAppContact = dynamic(() => import("@/components/utils/whatsapp"));


const page = () => {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ShopProducts />
      <Process />
      <Testimonials />
      <ContactUs />
    </>
  );
};

export default page;
