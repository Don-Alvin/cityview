export type Service = {
  slug: string;
  title: string;
  /** Home page row copy. */
  teaser: string;
  /** Service page copy. */
  metaTitle: string;
  metaDescription: string;
  intro: string;
  products: string[];
  /**
   * IMPLEMENTATION.md open item: pricing is undecided. Optional from the
   * start so an answer later is a data change, not a refactor. Renders
   * nothing while undefined.
   */
  priceFrom?: number;
};

/**
 * Slugs, titles and teasers match IMPLEMENTATION.md's routes list and
 * final_design.html's service rows exactly. The product lists below are
 * written for this pass, not given anywhere in the mockup (it's a
 * single-page site with one-line teasers, no service detail pages), so
 * they're the same kind of placeholder-but-real content as the old
 * three-service list before it: CHECKLIST.md's "Service list confirmed
 * as four" and "Capability claims verified" pre-launch items cover
 * confirming these are actually right, not inventing new ones later.
 */
export const services: Service[] = [
  {
    slug: "commercial-printing",
    title: "Commercial Printing",
    teaser: "Business cards, flyers, brochures, booklets and office stationery.",
    metaTitle: "Commercial Printing | Business Cards & Brochures in Kisumu",
    metaDescription:
      "Business cards, flyers, brochures, booklets and office stationery, printed in Kisumu. Beautiful, useful print for the moments that put your business in front of people.",
    intro:
      "Beautiful, useful print for the moments that put your business in front of people.",
    products: [
      "Business cards",
      "Flyers and leaflets",
      "Brochures and booklets",
      "Letterheads and envelopes",
      "Menus and presentation materials",
      "Stickers and labels",
    ],
  },
  {
    slug: "branding-and-signage",
    title: "Branding & Signage",
    teaser: "Shop signs, banners, vehicle graphics and event displays.",
    metaTitle: "Branding & Signage | Shopfronts & Banners in Kisumu",
    metaDescription:
      "Shopfront signage, roll-up banners, vehicle branding and event displays in Kisumu. Give your business a visible, consistent presence, on the street or at your next event.",
    intro:
      "Give your business a visible, consistent presence, whether on the street or at your next event.",
    products: [
      "Shopfront and indoor signage",
      "Roll-up banners and event displays",
      "Vehicle branding and window graphics",
      "Pull-up and pop-up stands",
      "Directional and safety signage",
    ],
  },
  {
    slug: "apparel-and-merchandise",
    title: "Apparel & Merchandise",
    teaser: "T-shirts, tote bags, mugs, caps and useful promotional items.",
    metaTitle: "Apparel & Merchandise | Branded T-Shirts & Gifts in Kisumu",
    metaDescription:
      "Branded T-shirts, caps, tote bags, mugs and promotional gifts in Kisumu. Make your identity part of someone's day with useful branded items.",
    intro:
      "Make your identity part of someone's day with useful branded items and thoughtful presentation.",
    products: [
      "Branded T-shirts and workwear",
      "Caps and headwear",
      "Tote bags",
      "Mugs and drinkware",
      "Notebooks and promotional gifts",
    ],
  },
  {
    slug: "custom-packaging",
    title: "Custom Packaging",
    teaser: "Boxes, bags, labels and branded packaging built around your product.",
    metaTitle: "Custom Packaging | Branded Boxes & Bags in Kisumu",
    metaDescription:
      "Custom boxes, branded bags, product labels and packaging built around your product, printed in Kisumu. Every touchpoint carries the same identity.",
    intro: "Packaging built around your product, carrying the same identity as everything else you make.",
    products: [
      "Custom boxes",
      "Branded paper and gift bags",
      "Product labels",
      "Tissue paper and inserts",
      "Mailer boxes",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
