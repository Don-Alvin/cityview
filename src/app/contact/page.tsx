import type { Metadata } from "next";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us | CityView Printers, Nairobi",
  description:
    "Get in touch with CityView Printers in Nairobi by phone, WhatsApp or email, or find us on the map.",
};

/**
 * IMPLEMENTATION.md: name, address and phone must be byte-identical to
 * the Google Business Profile. Every field here reads from contact.ts,
 * unaffected by the visual rebuild, so this stays correct even while the
 * page around it is a placeholder.
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

// Not yet rebuilt for the Skyline mockup. Build order step 5 covers
// about/contact. This is a placeholder so the route exists and compiles
// against the current tokens, not the finished page.
export default function ContactPage() {
  return (
    <CardSection ground="background" id="contact" labelledBy="contact-title">
      <Eyebrow>Get in touch</Eyebrow>
      <h1 id="contact-title" className="mt-4 text-title-sm font-medium">
        Rebuilt in step 5.
      </h1>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
    </CardSection>
  );
}
