"use client";

import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  User,
  Send,
  Gem,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contactItems = [
    {
      icon: MapPin,
      title: "Visit Our Showroom",
      content: (
        <>
          Opposite to Modi Masjid
          <br />
          Bypass Road, Makrana - 341505
          <br />
          Rajasthan, India
        </>
      ),
    },
    {
      icon: Phone,
      title: "Call Us",
      content: (
        <a 
          href="tel:+917976973338"
          className="text-gray-600 transition-colors hover:text-amber-600"
        >
          +91 79769 73338
        </a>
      ),
    },
    {
      icon: Mail,
      title: "Email Us",
      content: (
        <a
          href="mailto:abdulriyaz1009+resend@gmail.com"
          className="break-all text-gray-600 transition-colors hover:text-amber-600"
        >
          abdulriyaz1009@gmail.com
        </a>
      ),
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
        "Thank you! Your enquiry has been sent successfully. We will get back to you shortly."
      );

      // Clear form
      form.reset();

      // Scroll slightly so the success message is visible
      window.scrollTo({
        top: window.scrollY - 100,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Form submission error:", error);

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
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-100/30 blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            <MessageCircle className="h-4 w-4" />

            Enquire With Us
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Let&apos;s Create

            <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Something Timeless
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-amber-600" />

          <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
            Looking for premium marble handicrafts, sculptures, slabs,
            or custom marble pieces? Share your requirements with us
            and our team will be happy to assist you.
          </p>
        </div>

        {/* ================= FORM + CONTACT ================= */}

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

            {/* ================= FORM ================= */}

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Send an Enquiry
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Tell us what you&apos;re looking for
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                  Whether you need marble handicrafts, sculptures, slabs,
                  custom designs, or a bulk order, share your requirements
                  and we&apos;ll get back to you shortly.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name + Phone */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Name */}

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-gray-800"
                    >
                      Full Name
                    </Label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="Your name"
                        required
                        maxLength={100}
                        autoComplete="name"
                        disabled={isSubmitting}
                        className="h-12 border-gray-200 bg-gray-50 pl-10 focus-visible:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-phone"
                      className="text-sm font-medium text-gray-800"
                    >
                      Phone Number
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        maxLength={30}
                        autoComplete="tel"
                        disabled={isSubmitting}
                        className="h-12 border-gray-200 bg-gray-50 pl-10 focus-visible:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-gray-800"
                  >
                    Email Address
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      maxLength={150}
                      autoComplete="email"
                      disabled={isSubmitting}
                      className="h-12 border-gray-200 bg-gray-50 pl-10 focus-visible:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Enquiry */}

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-gray-800"
                  >
                    Your Enquiry
                  </Label>

                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about the marble handicraft, sculpture, slab, custom design, quantity, or anything else you would like to enquire about..."
                    required
                    minLength={10}
                    maxLength={5000}
                    disabled={isSubmitting}
                    className="min-h-40 resize-none border-gray-200 bg-gray-50 focus-visible:ring-amber-500"
                  />
                </div>

                {/* ================= SUCCESS ================= */}

                {successMessage && (
                  <div
                    role="status"
                    className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm leading-6 text-green-700"
                  >
                    <div className="font-semibold">
                      Enquiry Sent Successfully
                    </div>

                    <div className="mt-1">
                      {successMessage}
                    </div>
                  </div>
                )}

                {/* ================= ERROR ================= */}

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700"
                  >
                    <div className="font-semibold">
                      Unable to Send Enquiry
                    </div>

                    <div className="mt-1">
                      {errorMessage}
                    </div>
                  </div>
                )}

                {/* ================= SUBMIT ================= */}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group h-12 w-full bg-gray-950 text-white transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
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

                <p className="text-center text-xs leading-5 text-gray-400">
                  By submitting this form, you agree to be contacted
                  regarding your marble enquiry.
                </p>
              </form>
            </div>

            {/* ================= RIGHT SIDE ================= */}

            <div className="space-y-5">

              {/* Contact Cards */}

              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-amber-100 hover:shadow-xl sm:p-6"
                  >
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>

                        <div className="mt-2 text-sm leading-6 text-gray-600">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Quick CTA */}

              <div className="rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white shadow-xl sm:p-7">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-600">
                  <Gem className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Looking for something specific?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Contact our team for marble handicrafts, sculptures,
                  slabs, custom designs, pricing, availability, or bulk
                  enquiries.
                </p>

                <a
                  href="tel:+917976973338"
                  className="mt-5 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-amber-500 hover:text-white"
                >
                  +91 79769 73338
                </a>
              </div>
            </div>
          </div>

          {/* ================= MAP ================= */}

          <div className="mt-10">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                Find Us
              </p>

              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                Visit Our Marble Showroom
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Visit us in Makrana to explore our collection of marble
                handicrafts, sculptures, slabs, and custom marble products.
              </p>
            </div>

            <div className="relative h-80 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl sm:h-96 lg:h-[450px]">
              <div className="relative h-full overflow-hidden rounded-xl">

                <iframe
                  className="h-full w-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.954976571828!2d74.71969490000001!3d27.0315886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b9de8dc3e736f%3A0x4843a9cd36e720a9!2sRK%20MOBILE%20makrana!5e0!3m2!1sen!2sin!4v1743443116598!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Marble Showroom Location in Makrana"
                />

                {/* Map Label */}

                <div className="absolute bottom-4 left-4 rounded-xl border border-white/50 bg-white/95 p-4 shadow-xl backdrop-blur-md">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <MapPin className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        Marble Showroom
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Opposite to Modi Masjid
                        <br />
                        Bypass Road, Makrana - 341505
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
