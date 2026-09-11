export type Service = {
  slug: string;
  index: string;
  title: string;
  /** Home page card copy. */
  teaser: string;
  tags: string[];
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

export const services: Service[] = [
  {
    slug: "print-and-paper",
    index: "01",
    title: "Print & paper",
    teaser: "Make every introduction count with beautiful everyday print.",
    tags: ["Business cards", "Flyers", "Brochures"],
    metaTitle: "Print & Paper | Business Cards & Brochures in Nairobi",
    metaDescription:
      "Business cards, flyers, brochures, booklets and packaging, printed in Nairobi. Beautiful, useful print for the moments that put your business in front of people.",
    intro:
      "Beautiful, useful print for the moments that put your business in front of people.",
    products: [
      "Business cards and branded stationery",
      "Flyers, brochures and promotional leaflets",
      "Booklets, menus and presentation materials",
      "Labels, stickers and paper-based packaging",
    ],
  },
  {
    slug: "branding-and-signage",
    index: "02",
    title: "Branding & signage",
    teaser: "Turn your space into a statement that's unmistakably yours.",
    tags: ["Banners", "Shop signs", "Vehicle graphics"],
    metaTitle: "Branding & Signage | Shopfronts & Banners in Nairobi",
    metaDescription:
      "Shopfront and indoor signage, roll-up banners, vehicle branding and window graphics in Nairobi. Give your business a visible, consistent presence, on the street or at your next event.",
    intro:
      "Give your business a visible, consistent presence, whether on the street or at your next event.",
    products: [
      "Shopfront and indoor signage",
      "Roll-up banners and event displays",
      "Vehicle branding and window graphics",
      "Artwork and layout support for your project",
    ],
  },
  {
    slug: "merch-and-packaging",
    index: "03",
    title: "Merch & packaging",
    teaser: "Put your brand in their hands, and into their everyday.",
    tags: ["Apparel", "Gift items", "Custom packaging"],
    metaTitle: "Merch & Packaging | Branded Apparel & Packaging in Nairobi",
    metaDescription:
      "Branded T-shirts, tote bags, mugs and custom packaging in Nairobi. Make your identity part of someone's day with useful branded items and thoughtful presentation.",
    intro:
      "Make your identity part of someone's day with useful branded items and thoughtful presentation.",
    products: [
      "Branded T-shirts, caps and workwear",
      "Tote bags and reusable carry bags",
      "Mugs, notebooks and promotional gifts",
      "Custom boxes, bags and packaging labels",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
