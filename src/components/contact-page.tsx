"use client";

import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Gem,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "+91 79769 73338",
      secondary: "For product & order enquiries",
      action: "tel:+917976973338",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      primary: "abdulriyaz1009@gmail.com",
      secondary: "We'll respond within 24 hours",
      action: "mailto:abdulriyaz1009@gmail.com",
      color: "bg-emerald-500",
    },
    {
      icon: MapPin,
      title: "Visit Showroom",
      primary: "Opposite to Modi Masjid",
      secondary: "Bypass Road, Makrana - 341505",
      action:
        "https://maps.google.com/?q=Makrana+Premium+Marble",
      color: "bg-purple-500",
    },
  ];

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to send enquiry."
        );
      }

      setSuccessMessage(
        "Thank you! Your enquiry has been sent successfully. Our team will get back to you shortly."
      );

      // Clear form after successful submission
      form.reset();

      // Scroll to the form so the success message is visible
      window.scrollTo({
        top: window.scrollY - 100,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Sorry, we couldn't send your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* =========================
          HERO
      ========================== */}

      <section className="relative overflow-hidden bg-zinc-950 text-white">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_45%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 lg:pb-36 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur">
              <MessageSquare className="h-4 w-4" />

              Enquire About Our Marble
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Let&apos;s Talk About

              <span className="block bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                Marble
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Looking for premium marble handicrafts, sculptures,
              slabs, or custom marble pieces? Send us your enquiry
              and our team will be happy to assist you.
            </p>

            {/* Features */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Premium Marble
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Handcrafted Products
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Custom Enquiries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN CONTACT SECTION
      ========================== */}

      <section className="relative -mt-16 px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">

            {/* =========================
                CONTACT FORM
            ========================== */}

            <Card className="overflow-hidden border-0 shadow-2xl shadow-zinc-900/10">
              <CardContent className="p-0">
                <div className="p-7 sm:p-10">

                  {/* Form Header */}

                  <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-600">
                      Send an Enquiry
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                      Let&apos;s talk about marble
                    </h2>

                    <p className="mt-2 text-zinc-500">
                      Have a question about our marble handicrafts,
                      sculptures, slabs, or custom work? Send us your
                      enquiry and our team will get back to you shortly.
                    </p>
                  </div>

                  {/* Form */}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name + Phone */}

                    <div className="grid gap-5 sm:grid-cols-2">

                      {/* Name */}

                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-zinc-800"
                        >
                          Full Name
                        </label>

                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            autoComplete="name"
                            maxLength={100}
                            required
                            disabled={isSubmitting}
                            className="h-12 border-zinc-200 bg-zinc-50 pl-10 transition focus-visible:ring-amber-500"
                          />
                        </div>
                      </div>

                      {/* Phone */}

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-zinc-800"
                        >
                          Phone Number
                        </label>

                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            autoComplete="tel"
                            maxLength={30}
                            required
                            disabled={isSubmitting}
                            className="h-12 border-zinc-200 bg-zinc-50 pl-10 transition focus-visible:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-zinc-800"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          maxLength={150}
                          required
                          disabled={isSubmitting}
                          className="h-12 border-zinc-200 bg-zinc-50 pl-10 transition focus-visible:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Enquiry */}

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-zinc-800"
                      >
                        Your Enquiry
                      </label>

                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about the marble handicraft, sculpture, slab, custom design, quantity, or anything else you would like to enquire about..."
                        minLength={10}
                        maxLength={5000}
                        required
                        disabled={isSubmitting}
                        className="min-h-40 resize-none border-zinc-200 bg-zinc-50 transition focus-visible:ring-amber-500"
                      />
                    </div>

                    {/* =========================
                        SUCCESS MESSAGE
                    ========================== */}

                    {successMessage && (
                      <div
                        role="status"
                        className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm leading-6 text-green-700"
                      >
                        <p className="font-semibold">
                          Enquiry Sent Successfully
                        </p>

                        <p className="mt-1">
                          {successMessage}
                        </p>
                      </div>
                    )}

                    {/* =========================
                        ERROR MESSAGE
                    ========================== */}

                    {errorMessage && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700"
                      >
                        <p className="font-semibold">
                          Unable to Send Enquiry
                        </p>

                        <p className="mt-1">
                          {errorMessage}
                        </p>
                      </div>
                    )}

                    {/* =========================
                        SUBMIT BUTTON
                    ========================== */}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group h-12 w-full bg-zinc-950 text-white shadow-lg transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          Sending...
                        </>
                      ) : (
                        <>
                          Send Enquiry

                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>

                    {/* Privacy */}

                    <p className="text-center text-xs leading-5 text-zinc-400">
                      We respect your privacy and will only use your
                      information to respond to your enquiry.
                    </p>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* =========================
                CONTACT INFORMATION
            ========================== */}

            <div className="space-y-5">

              {/* Header */}

              <div className="mb-7">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Get In Touch
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                  Let&apos;s talk marble
                </h2>

                <p className="mt-2 leading-7 text-zinc-500">
                  Have a question about our marble products? Reach us
                  by phone, email, or visit our showroom in Makrana.
                </p>
              </div>

              {/* Contact Cards */}

              {contactInfo.map((info) => {
                const Icon = info.icon;

                const isExternal =
                  info.action.startsWith("http");

                return (
                  <a
                    key={info.title}
                    href={info.action}
                    target={
                      isExternal ? "_blank" : undefined
                    }
                    rel={
                      isExternal
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group block"
                  >
                    <Card className="border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">

                          {/* Icon */}

                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${info.color} shadow-sm`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>

                          {/* Information */}

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-zinc-500">
                              {info.title}
                            </p>

                            <p className="mt-1 break-words font-semibold text-zinc-900">
                              {info.primary}
                            </p>

                            <p className="mt-1 text-sm text-zinc-500">
                              {info.secondary}
                            </p>
                          </div>

                          {/* Arrow */}

                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-amber-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}

              {/* Trust Card */}

              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 ring-1 ring-amber-100">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
                    <Gem className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900">
                      Looking for something custom?
                    </p>

                    <p className="text-sm text-zinc-600">
                      Ask us about custom marble craftsmanship.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MAP
      ========================== */}

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          {/* Map Header */}

          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Find Us
            </p>

            <h2 className="mt-2 text-3xl font-bold text-zinc-900">
              Visit our marble showroom
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-zinc-500">
              Visit us in Makrana to explore our collection of
              marble handicrafts, sculptures, slabs, and other
              handcrafted marble products.
            </p>
          </div>

          {/* Map */}

          <Card className="overflow-hidden border-0 shadow-xl">
            <CardContent className="relative p-0">
              <iframe
                className="h-[420px] w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.954976571828!2d74.71969490000001!3d27.0315886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b9de8dc3e736f%3A0x4843a9cd36e720a9!2sRK%20MOBILE%20makrana!5e0!3m2!1sen!2sin!4v1743443116598!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Marble Showroom Location in Makrana"
              />

              {/* Map Label */}

              <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur">
                <div className="flex items-start gap-3">

                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <div>
                    <p className="font-semibold text-zinc-900">
                      Marble Showroom
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Opposite to Modi Masjid
                    </p>

                    <p className="text-sm text-zinc-500">
                      Bypass Road, Makrana - 341505
                    </p>
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* =========================
          FAQ
      ========================== */}

      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">

          {/* FAQ Header */}

          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              FAQ
            </p>

            <h2 className="mt-2 text-3xl font-bold text-zinc-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-zinc-500">
              Quick answers about our marble products and enquiries.
            </p>
          </div>

          {/* FAQ Items */}

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                question:
                  "What types of marble products do you offer?",
                answer:
                  "We offer marble handicrafts, sculptures, statues, slabs, tiles, decorative pieces, and custom-made marble products.",
              },
              {
                question:
                  "Do you offer custom marble designs?",
                answer:
                  "Yes. We can create custom marble handicrafts, sculptures, decorative pieces, and other products based on your design and requirements.",
              },
              {
                question:
                  "Do you accept bulk and wholesale orders?",
                answer:
                  "Yes. We welcome bulk, wholesale, and commercial enquiries. Contact us with your required product and quantity for pricing and availability.",
              },
              {
                question:
                  "Can you arrange delivery outside Makrana?",
                answer:
                  "Share your delivery location and requirements with us, and our team can provide details about available delivery and shipping options.",
              },
            ].map((faq) => (
              <Card
                key={faq.question}
                className="border-zinc-200 bg-white shadow-sm"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-zinc-900">
                    {faq.question}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
