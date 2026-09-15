/**
 * CLAUDE.md: placeholders must be loud. TODO_PHONE, TODO_WHATSAPP, never
 * a plausible-looking fake number: a realistic dummy survives a
 * read-through and ships by accident, a loud one doesn't, and
 * check:placeholders greps for exactly this TODO_ prefix and fails the
 * build while any remain.
 */
export const contact = {
  phoneDisplay: "TODO_PHONE",
  phoneHref: "tel:TODO_PHONE",
  whatsappNumber: "TODO_WHATSAPP",
  email: "hello@cityviewprinters.co.ke",
  /** Human-readable, e.g. "Mon-Sat, 8am-6pm". Shown in the footer and on /contact. */
  hoursDisplay: "TODO_HOURS",
  /** schema.org PostalAddress/OpeningHours format, e.g. "Mo-Sa 08:00-18:00". */
  openingHours: "TODO_HOURS",
  streetAddress: "TODO_ADDRESS",
  addressLocality: "Kisumu",
  addressCountry: "KE",
  businessName: "CityView Printers",
  foundedYear: "TODO_FOUNDED",
};

/**
 * True while any contact detail above is still a TODO_ placeholder.
 *
 * The build-time placeholder gate is currently off (see
 * scripts/check-placeholders.mjs) so main can deploy for a client
 * presentation before the meeting that resolves these. This is the
 * backstop for the consequence that actually matters: while it is true,
 * the site serves noindex and a disallow-all robots.txt, so a fake phone
 * number and invented opening hours cannot be indexed, cached or shown in
 * a search result for a real business.
 *
 * Derived, not a second switch to flip: it goes false on its own the
 * moment the real values replace the placeholders.
 */
export const hasPlaceholderContact = Object.values(contact).some(
  (value) => typeof value === "string" && value.startsWith("TODO_"),
);

/**
 * A search-query maps link degrades sensibly without a confirmed
 * address or pinned coordinates: it finds the business by name once
 * it's listed, and just shows the general area until then.
 */
export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${contact.businessName}, ${contact.addressLocality}`,
  )}`;
}

export function mapsEmbedSrc() {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    `${contact.businessName}, ${contact.addressLocality}`,
  )}&output=embed`;
}

/**
 * WhatsApp stays the primary conversion path (CLAUDE.md), prefilled
 * with a message naming the service, added throughout the site (header,
 * footer, every service page, sticky on mobile) even though
 * final_design.html's own mockup doesn't show WhatsApp at all.
 */
export function whatsappLink(serviceName?: string) {
  const message = serviceName
    ? `Hi CityView, I'd like a quote for ${serviceName}.`
    : "Hi CityView, I'd like to know more about your services.";
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
