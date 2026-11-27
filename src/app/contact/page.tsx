import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout-primitives";
import site from "@/components/site.module.css";
import { contact, hasContactDetail, hasContactPhone, mapsEmbedSrc, mapsLink, whatsappLink } from "@/content/contact";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call CityView Printers in Kisumu, message us on WhatsApp or request a quote for your project.",
  alternates: { canonical: "/contact" },
};

/**
 * IMPLEMENTATION.md: name, address and phone must be byte-identical to
 * the Google Business Profile. Every field here reads from contact.ts,
 * the single source of truth, so this stays correct the moment real
 * details replace the TODO_ placeholders, without touching this file.
 */
const streetAddress = hasContactDetail(contact.streetAddress) ? contact.streetAddress : undefined;

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.businessName,
    telephone: hasContactPhone ? contact.phoneHref.replace("tel:", "") : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: contact.addressLocality,
      addressCountry: contact.addressCountry,
    },
    openingHours: hasContactDetail(contact.openingHours) ? contact.openingHours : undefined,
  };
}

export default function ContactPage() {
  return (
    <div id="contact">
      <PageIntro id="contact-title" title="Get in touch">
        <p>
          Call or message our Kisumu team on WhatsApp. For pricing, tell us about your project in the{" "}
          <Link href="/quote" className="text-link">quote form</Link>.
        </p>
      </PageIntro>

      <div className={`site-grid ${site.pageLead} ${styles.contact}`}>
        <address className={styles.contactDetails}>
          <dl>
            {hasContactPhone && (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={contact.phoneHref} className="text-link">{contact.phoneDisplay}</a>
                </dd>
              </div>
            )}
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <Link href={whatsappLink()} className="text-link">
                  {contact.phoneDisplay}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>
                {streetAddress && <>{streetAddress}<br /></>}
                {contact.addressLocality}, Kenya
              </dd>
            </div>
            {hasContactDetail(contact.hoursDisplay) && (
              <div>
                <dt>Opening hours</dt>
                <dd>{contact.hoursDisplay}</dd>
              </div>
            )}
          </dl>

          <Link href={mapsLink()} className={`site-action ${styles.rowActions}`}>
            Find us on Google Maps
          </Link>
        </address>

        <div className={styles.map}>
          <iframe
            title="CityView Printers on the map"
            src={mapsEmbedSrc()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
    </div>
  );
}
