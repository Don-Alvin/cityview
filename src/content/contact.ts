/**
 * CLAUDE.md: placeholders must be loud. Use TODO_PHONE, never
 * a plausible-looking fake number: a realistic dummy survives a
 * read-through and ships by accident, a loud one doesn't, and
 * check:placeholders greps for exactly this TODO_ prefix and fails the
 * build while any remain.
 */
const phoneDisplay = "+254 725 913 100";
const phoneNumber = phoneDisplay.replaceAll(" ", "");

export const contact = {
  phoneDisplay,
  phoneHref: `tel:${phoneNumber}`,
  whatsappNumber: phoneNumber.slice(1),
  /** Human-readable, e.g. "Mon-Sat, 8am-6pm". Shown in the footer and on /contact. */
  hoursDisplay: "TODO_HOURS",
  /** schema.org PostalAddress/OpeningHours format, e.g. "Mo-Sa 08:00-18:00". */
  openingHours: "TODO_HOURS",
  streetAddress: "TODO_ADDRESS",
  addressLocality: "Kisumu",
  addressCountry: "KE",
  businessName: "CityView Printers",
};

export function hasContactDetail(value: string) {
  return value.trim() !== "" && !value.includes("TODO_");
}

export const hasContactPhone = hasContactDetail(contact.phoneDisplay) && hasContactDetail(contact.phoneHref);

// The site stays out of search while the studio's contact details are pending.
export const hasPlaceholderContact = Object.values(contact).some((value) => !hasContactDetail(value));

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
  return whatsappMessageLink(message);
}

export function whatsappMessageLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
