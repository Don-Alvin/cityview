import type { Metadata } from "next";
import Link from "next/link";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { Pill } from "@/components/pill";
import { contact, mapsEmbedSrc, mapsLink, whatsappLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CityView Printers in Kisumu by phone, WhatsApp or email, or find us on the map.",
  alternates: { canonical: "/contact" },
};

/**
 * IMPLEMENTATION.md: name, address and phone must be byte-identical to
 * the Google Business Profile. Every field here reads from contact.ts,
 * the single source of truth, so this stays correct the moment real
 * details replace the TODO_ placeholders, without touching this file.
 */
function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.businessName,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.streetAddress,
      addressLocality: contact.addressLocality,
      addressCountry: contact.addressCountry,
    },
    openingHours: contact.openingHours,
  };
}

export default function ContactPage() {
  return (
    <CardSection ground="background" id="contact" labelledBy="contact-title" className="px-6 py-14 sm:px-10">
      <Eyebrow>Get in touch</Eyebrow>
      <h1 id="contact-title" className="mt-2 text-section-title font-medium">
        Get in touch
      </h1>
      <p className="mt-4 max-w-[34rem] text-body-lg leading-[1.6] text-ink-soft">
        Call, WhatsApp or drop by the studio. For a full job brief, use our{" "}
        <Link href="/quote" className="underline underline-offset-4 hover:text-ink">
          quote form
        </Link>
        .
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <address className="not-italic">
          <dl className="flex flex-col gap-6 border-t border-hairline pt-5">
            <div>
              <dt className="text-eyebrow font-medium text-ink-soft">Phone</dt>
              <dd className="mt-1.5 text-body-lg">
                <a href={contact.phoneHref} className="hover:text-ink-soft">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-medium text-ink-soft">WhatsApp</dt>
              <dd className="mt-1.5 text-body-lg">
                <Link href={whatsappLink()} className="hover:text-ink-soft">
                  {contact.whatsappNumber}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-medium text-ink-soft">Email</dt>
              <dd className="mt-1.5 text-body-lg">
                <a href={`mailto:${contact.email}`} className="hover:text-ink-soft">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-medium text-ink-soft">Studio</dt>
              <dd className="mt-1.5 text-body-lg leading-[1.5]">
                {contact.streetAddress}
                <br />
                {contact.addressLocality}, Kenya
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-medium text-ink-soft">Hours</dt>
              <dd className="mt-1.5 text-body-lg">{contact.hoursDisplay}</dd>
            </div>
          </dl>

          <Pill href={mapsLink()} icon className="mt-6">
            Get directions
          </Pill>
        </address>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-card border border-hairline sm:aspect-auto sm:h-full">
          <iframe
            title="CityView Printers on the map"
            src={mapsEmbedSrc()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
    </CardSection>
  );
}
