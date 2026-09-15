import type { Metadata } from "next";
import Link from "next/link";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { InViewBox } from "@/components/in-view-box";
import { Pill } from "@/components/pill";
import { services } from "@/content/services";
import { milestones } from "@/content/about";
import { contact, whatsappLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CityView Printers is a print, branding, signage and merchandise business based in Kisumu.",
  alternates: { canonical: "/about" },
};

/**
 * IMPLEMENTATION.md step 5: story and founding year, both still blocked
 * on the client meeting (CHECKLIST.md), so this page is built in full now
 * with loud placeholders standing in for the unconfirmed facts. The team
 * section is gone at Alvin's request: there is no team to profile.
 */
export default function AboutPage() {
  return (
    <>
      <CardSection ground="background" id="about" labelledBy="about-title" className="px-6 py-14 sm:px-10">
        <Eyebrow>About CityView</Eyebrow>
        <h1 id="about-title" className="mt-2 max-w-[36rem] text-section-title font-medium leading-[0.95] tracking-[-0.04em]">
          Print, branding and signage, made in Kisumu.
        </h1>
        <p className="mt-5 max-w-[36rem] text-body-lg leading-[1.6] text-ink-soft">
          CityView Printers works with Kisumu shopfronts, event organisers and small
          brands to turn an idea into something you can hold, wear or hang above a door.
          One studio, four services, and a single point of contact from first proof to
          final delivery.
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-hairline pt-8 sm:grid-cols-4">
          <div>
            <dt className="text-eyebrow font-medium text-ink-soft">Founded</dt>
            <dd className="mt-2 text-title-sm font-medium">{contact.foundedYear}</dd>
          </div>
          <div>
            <dt className="text-eyebrow font-medium text-ink-soft">Based in</dt>
            <dd className="mt-2 text-title-sm font-medium">Kisumu</dd>
          </div>
          <div>
            <dt className="text-eyebrow font-medium text-ink-soft">Services</dt>
            <dd className="mt-2 text-title-sm font-medium">{services.length}</dd>
          </div>
          <div>
            <dt className="text-eyebrow font-medium text-ink-soft">Reach</dt>
            <dd className="mt-2 text-title-sm font-medium">Kisumu &amp; beyond</dd>
          </div>
        </dl>
      </CardSection>

      <CardSection ground="surface" id="about-services" labelledBy="about-services-title" className="mt-3 px-6 py-14 sm:px-10">
        <Eyebrow>What we make</Eyebrow>
        <h2 id="about-services-title" className="mt-2 text-title-sm font-medium">
          Four services, one studio
        </h2>
        <ul className="mt-8 grid gap-0 border-t border-hairline sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="border-b border-hairline py-5 sm:odd:pr-8 sm:even:pl-8">
              <Link href={`/services/${service.slug}`} className="group flex items-center justify-between gap-4">
                <span>
                  <span className="block text-body-lg font-medium">{service.title}</span>
                  <span className="mt-1 block text-body-sm text-ink-soft">{service.teaser}</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.5] text-ink-soft transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink"
                >
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </CardSection>

      {/* Replaces the old "Meet the team" placeholder, removed at Alvin's
          request: there is no team to profile. The story arc is his, the
          dates are not, so each year is a loud TODO_ (see about.ts). */}
      <CardSection ground="background" id="about-story" labelledBy="about-story-title" className="mt-3 px-6 py-14 sm:px-10">
        <Eyebrow>Our story</Eyebrow>
        <h2 id="about-story-title" className="mt-2 max-w-[30rem] text-title-sm font-medium">
          From one small shop to a full production floor
        </h2>

        <ol className="mt-8 border-t border-hairline">
          {milestones.map((milestone, i) => (
            <InViewBox
              as="li"
              key={milestone.year + milestone.title}
              delay={i * 110}
              className="grid gap-2 border-b border-hairline py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8"
            >
              <span className="text-body-lg font-medium text-brand">{milestone.year}</span>
              <span>
                <span className="block text-body-lg font-medium">{milestone.title}</span>
                <span className="mt-1 block max-w-[34rem] text-body-sm leading-[1.7] text-ink-soft">
                  {milestone.detail}
                </span>
              </span>
            </InViewBox>
          ))}
        </ol>
      </CardSection>

      <CardSection ground="brand-deep" id="about-contact" labelledBy="about-contact-title" className="mt-3 px-6 py-14 sm:px-10">
        <Eyebrow light>Start a project</Eyebrow>
        <h2 id="about-contact-title" className="mt-2 max-w-[28rem] text-title-sm font-medium">
          Tell us what you want to make
        </h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={whatsappLink()}
            className="inline-flex items-center gap-[0.55rem] rounded-pill bg-white px-7 py-[0.875rem] text-body-sm font-medium uppercase tracking-[0.07em] text-brand-deep hover:bg-brand"
          >
            Message us on WhatsApp
          </Link>
          <Pill href="/contact" variant="outline-light">
            Get in touch
          </Pill>
        </div>
      </CardSection>
    </>
  );
}
