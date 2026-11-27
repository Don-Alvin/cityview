export type Service = {
  slug: "commercial-printing" | "branding-and-signage" | "apparel-and-merchandise" | "custom-packaging";
  title: string;
  /** Home page row copy. */
  teaser: string;
  previewImage?: { src: string; alt: string };
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
    previewImage: {
      src: "/gallery/WhatsApp%20Image%202026-11-10%20at%2009.44.20.jpeg",
      alt: "Printed business cards laid out on a worktable",
    },
    metaTitle: "Commercial Printing | Business Cards & Brochures in Kisumu",
    metaDescription:
      "CityView Printers produces business cards, flyers, brochures, booklets and office stationery in Kisumu.",
    intro:
      "We print materials for promotions, events and everyday business, from flyers and brochures to menus and stationery.",
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
    previewImage: {
      src: "/gallery/WhatsApp%20Image%202026-11-10%20at%2009.44.37.jpeg",
      alt: "A branded resort sign being assembled",
    },
    metaTitle: "Branding & Signage | Shopfronts & Banners in Kisumu",
    metaDescription:
      "CityView Printers makes shopfront signs, roll-up banners, vehicle graphics and event displays in Kisumu.",
    intro:
      "We make signs for shops and offices, graphics for vehicles and windows, and branded displays for events.",
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
    teaser: "T-shirts, tote bags, mugs, caps and promotional gifts.",
    previewImage: {
      src: "/gallery/WhatsApp%20Image%202026-11-10%20at%2009.34.23.jpeg",
      alt: "Blue polo shirt with a gold anniversary design",
    },
    metaTitle: "Apparel & Merchandise | Branded T-Shirts & Gifts in Kisumu",
    metaDescription:
      "CityView Printers produces branded T-shirts, caps, tote bags, mugs and promotional gifts in Kisumu.",
    intro:
      "Put your logo or artwork on clothing and merchandise for your team, event or promotion.",
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
    teaser: "Custom boxes, printed bags, labels and packaging inserts.",
    previewImage: {
      src: "/images/cityview-print-showcase.webp",
      alt: "Red, white and navy printed boxes and a branded tote bag",
    },
    metaTitle: "Custom Packaging | Branded Boxes & Bags in Kisumu",
    metaDescription:
      "CityView Printers produces custom boxes, branded bags, labels and packaging inserts in Kisumu.",
    intro: "We make printed packaging to fit your products, with your artwork carried across boxes, bags and labels.",
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
