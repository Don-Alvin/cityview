import type { Metadata } from "next";
import Link from "next/link";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { Pill } from "@/components/pill";
import { services } from "@/content/services";
import { whatsappLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "That page does not exist. Find CityView Printers' services, work and contact details here.",
  robots: { index: false, follow: true },
};

/**
 * A 404 that does the one job a 404 has: get the visitor somewhere useful
 * before they close the tab. Links out to every service plus the contact
 * routes rather than offering a bare "go home", since most mistyped or
 * stale URLs on this site will be service URLs shared over WhatsApp.
 *
 * noindex, but still follow: the page itself should never rank, but the
 * links on it are worth crawling.
 */
export default function NotFound() {
  return (
    <CardSection ground="brand-deep" labelledBy="not-found-title" className="px-6 py-14 sm:px-10">
      <Eyebrow light>Error 404</Eyebrow>
      <h1 id="not-found-title" className="mt-2 max-w-[30rem] text-section-title font-medium">
        This page went to print and never came back.
      </h1>
      <p className="mt-4 max-w-[34rem] text-body-lg leading-[1.6] text-white/80">
        The link you followed is broken or the page has moved. Everything we print is
        still here.
      </p>

      <ul className="mt-10 grid gap-0 border-t border-white/15 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.slug} className="border-b border-white/15 py-5 sm:odd:pr-8 sm:even:pl-8">
            <Link href={`/services/${service.slug}`} className="group flex items-center justify-between gap-4">
              <span>
                <span className="block text-body-lg font-medium">{service.title}</span>
                <span className="mt-1 block text-body-sm text-white/70">{service.teaser}</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.5] text-white/60 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
              >
                <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-4">
        <Pill href="/" variant="light" icon>
          Back to home
        </Pill>
        <Link
          href={whatsappLink()}
          className="inline-flex items-center gap-[0.55rem] rounded-pill border border-white px-7 py-[0.875rem] text-body-sm font-medium uppercase tracking-[0.07em] text-white hover:bg-white hover:text-brand-deep"
        >
          Message us on WhatsApp
        </Link>
      </div>
    </CardSection>
  );
}
