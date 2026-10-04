import dynamic from "next/dynamic";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Stats from "@/components/landing/stats";

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
