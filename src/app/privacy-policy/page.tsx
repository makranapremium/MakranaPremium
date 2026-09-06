import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Privacy Policy | Makrana Premium",
  description:
    "Privacy Policy for Makrana Premium — marble articles and handicrafts from Makrana, Rajasthan.",
}

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Information You Provide Directly
        </h3>

        <p className="mb-5">
          When you contact us through WhatsApp, phone, or email to enquire
          about a product, request a quotation, or place an order, you may
          voluntarily provide information such as:
        </p>

        <ul className="mb-8 grid gap-3 sm:grid-cols-2">
          {[
            "Your name",
            "Phone number",
            "Email address",
            "Product or marble article you are interested in",
            "Required size, design, or customization details",
            "Budget or quotation requirements",
            "Delivery location",
            "Any other information you choose to share with us",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mb-8">
          We do not collect this information through a customer registration
          or enquiry form on our website. The information is provided directly
          by you when you contact us through WhatsApp, phone, or email.
        </p>

        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Information Collected Automatically
        </h3>

        <p>
          Our website may receive basic technical information such as your IP
          address, browser type, operating system, device type, and similar
          technical information. This information may be automatically
          processed by our website hosting or infrastructure providers for
          purposes such as website security, reliability, and performance.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "WhatsApp Communications",
    content: (
      <p>
        When you choose to contact us through WhatsApp, your conversation takes
        place on WhatsApp&apos;s platform and is also subject to WhatsApp&apos;s
        own Privacy Policy and terms. We only have access to the information
        and messages that you choose to send to us through WhatsApp. We do not
        control how WhatsApp processes information on its platform.
      </p>
    ),
  },
  {
    number: "03",
    title: "Cookies and Tracking",
    content: (
      <>
        <p className="mb-4">
          Our website currently does not use Google Analytics, Meta Pixel,
          Google Ads conversion tracking, or other marketing or advertising
          tracking tools.
        </p>

        <p className="mb-4">
          We do not use tracking tools on our website to create advertising
          profiles or track your activity across other websites.
        </p>

        <p>
          Our hosting or website infrastructure may use basic technical
          mechanisms that are necessary for website security, functionality,
          and performance.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Payment Information",
    content: (
      <p>
        We currently do not collect or store payment card, debit card, credit
        card, or banking information through our website. Orders and payments
        are finalized directly with us through communication methods such as
        WhatsApp, phone, or in person, as applicable.
      </p>
    ),
  },
  {
    number: "05",
    title: "How We Use Your Information",
    content: (
      <>
        <p className="mb-5">We may use the information you provide to:</p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Respond to your enquiries",
            "Provide product information and quotations",
            "Discuss customization requirements",
            "Process and coordinate your orders",
            "Contact you regarding your enquiry or order",
            "Arrange delivery or other order-related communication",
            "Maintain necessary business records",
            "Improve our products, catalogue, and website",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          We do not use your personal information for purposes unrelated to
          the above without a lawful basis or appropriate notice where
          required.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Sharing of Information",
    content: (
      <>
        <p className="mb-5">
          We do not sell or rent your personal information to third parties.
        </p>

        <p className="mb-5">We may share information where reasonably necessary with:</p>

        <ul className="grid gap-3">
          {[
            "Website hosting and technical service providers that help us operate and secure our website",
            "WhatsApp, when you choose to communicate with us through WhatsApp",
            "Delivery, logistics, or other service providers where necessary to fulfill your order",
            "Government authorities or law-enforcement agencies where disclosure is required by applicable law",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          We expect service providers handling information on our behalf to
          use it only for the purposes for which it is provided or as
          otherwise permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Data Retention",
    content: (
      <>
        <p className="mb-5">
          We retain information you provide for as long as reasonably
          necessary to:
        </p>

        <ul className="grid gap-3">
          {[
            "Respond to your enquiry",
            "Fulfill and support your order",
            "Maintain business and transaction records",
            "Resolve disputes or comply with legal obligations",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          Where appropriate and legally permissible, you may request deletion
          of your personal information.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Your Choices and Rights",
    content: (
      <>
        <p className="mb-5">
          Depending on applicable law, you may contact us to:
        </p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Ask what personal information we hold about you",
            "Request correction of inaccurate information",
            "Request deletion of information where applicable",
            "Ask us to stop sending promotional communications",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          You can contact us using the details provided in Section 10.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Data Security",
    content: (
      <p>
        We take reasonable measures to protect the information provided to us
        from unauthorized access, misuse, loss, or disclosure. However, no
        method of transmission over the internet or electronic storage is
        completely secure. Therefore, we cannot guarantee absolute security
        of information.
      </p>
    ),
  },
  {
    number: "10",
    title: "Contact Us",
    content: (
      <Card className="border-stone-200 bg-stone-50/70 shadow-none">
        <CardContent className="p-6 sm:p-8">
          <h3 className="mb-5 text-xl font-semibold text-stone-900">
            Makrana Premium
          </h3>

          <div className="space-y-3 text-sm leading-6 text-stone-600">
            <p>
              Opposite to Modi Masjid, Bypass Road
              <br />
              Makrana – 341505, Rajasthan, India
            </p>

            <p>
              <span className="font-medium text-stone-900">
                Phone / WhatsApp:
              </span>{" "}
              <a
                href="tel:+917976973338"
                className="transition-colors hover:text-stone-900"
              >
                +91 79769 73338
              </a>
            </p>

            <p>
              <span className="font-medium text-stone-900">Email:</span>{" "}
              <a
                href="mailto:abdulriyaz1009@gmail.com"
                className="transition-colors hover:text-stone-900"
              >
                abdulriyaz1009@gmail.com
              </a>
            </p>

            <p>
              <span className="font-medium text-stone-900">Website:</span>{" "}
              <a
                href="https://www.makranapremium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-stone-900"
              >
                www.makranapremium.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    number: "11",
    title: "Children's Privacy",
    content: (
      <p>
        Our website and products are intended for adults and are not directed
        at children under 18. We do not knowingly collect personal information
        from children.
      </p>
    ),
  },
  {
    number: "12",
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time if our website,
        business practices, or applicable legal requirements change. Any
        updated version will be published on this page with a revised
        &quot;Last updated&quot; date.
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-stone-700">
      {/* Header */}
      <header className="border-b border-stone-200/80 bg-[#faf9f7]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-950"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to website
          </Link>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-stone-800" />
            <span className="hidden text-sm font-semibold tracking-wide text-stone-900 sm:inline">
              Makrana Premium
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-6 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-stone-600"
            >
              Legal & Privacy
            </Badge>

            <h1 className="font-serif text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
              Your privacy matters to us. This policy explains how Makrana
              Premium handles information when you visit our website or
              contact us about our marble articles and handicrafts.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-stone-500">
              <span className="h-px w-8 bg-stone-300" />
              Last updated:{" "}
              <span className="font-medium text-stone-700">
                September 06, 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <p className="text-base leading-8 text-stone-600">
              Makrana Premium (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;)
              operates the website{" "}
              <a
                href="https://www.makranapremium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-700"
              >
                www.makranapremium.com
              </a>
              , where we showcase and sell marble articles and handicrafts.
            </p>

            <p className="mt-5 text-base leading-8 text-stone-600">
              This Privacy Policy explains what information we may receive when
              you visit our website or contact us, how we use that information,
              and the choices available to you.
            </p>

            <p className="mt-5 text-base leading-8 text-stone-600">
              By using our website or contacting us, you acknowledge the
              practices described in this Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Policy Sections */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="space-y-0">
          {sections.map((section, index) => (
            <article key={section.number}>
              <div className="grid gap-6 py-10 sm:grid-cols-[100px_1fr] sm:gap-10 lg:grid-cols-[120px_1fr]">
                <div>
                  <span className="font-mono text-sm tracking-wider text-stone-400">
                    {section.number}
                  </span>
                </div>

                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl font-medium text-stone-950 sm:text-3xl">
                    {section.title}
                  </h2>

                  <div className="mt-6 text-[15px] leading-7 text-stone-600">
                    {section.content}
                  </div>
                </div>
              </div>

              {index !== sections.length - 1 && (
                <Separator className="bg-stone-200" />
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-lg text-white">Makrana Premium</p>
            <p className="mt-1 text-sm text-stone-500">
              Premium marble articles & handicrafts from Makrana, Rajasthan.
            </p>
          </div>

          <div className="text-sm text-stone-500">
            © {new Date().getFullYear()} Makrana Premium. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
