export type WorkItem = {
  slug: string;
  title: string;
  /** Matches a slug in src/content/services.ts, drives the filter. */
  service: string;
  image: string;
  imageAlt: string;
  /** Shown on hover, the crossfade IMPLEMENTATION.md's step 6 calls for. */
  hoverImage: string;
  hoverAlt: string;
};

/**
 * IMPLEMENTATION.md step 6, CHECKLIST.md item 6: /work is blocked on real
 * photography of finished jobs. Alvin's call: use the existing
 * hero-*.png set (already carrying the old Skyline branding, see
 * report.md) as stand-ins for now rather than an empty state, so the
 * grid, filter and hover interaction are real and reviewable today. None
 * of these are actual completed CityView jobs, just placeholder product
 * photography; every entry swaps for a real photographed job once
 * delivered, and the page copy is worded to not claim otherwise in the
 * meantime.
 */
export const workItems: WorkItem[] = [
  {
    slug: "business-card-run",
    title: "Business card run",
    service: "commercial-printing",
    image: "/images/hero-1.png",
    imageAlt: "Branded business cards",
    hoverImage: "/images/hero-2.png",
    hoverAlt: "Printed brochure detail",
  },
  {
    slug: "event-display-banners",
    title: "Event display banners",
    service: "branding-and-signage",
    image: "/images/hero-6.png",
    imageAlt: "Branded roll-up display banner",
    hoverImage: "/images/hero-7.png",
    hoverAlt: "Custom packaging detail",
  },
  {
    slug: "branded-team-apparel",
    title: "Branded team apparel",
    service: "apparel-and-merchandise",
    image: "/images/hero-3.png",
    imageAlt: "Branded T-shirt",
    hoverImage: "/images/hero-4.png",
    hoverAlt: "Branded canvas tote bag",
  },
  {
    slug: "custom-packaging-run",
    title: "Custom packaging",
    service: "custom-packaging",
    image: "/images/hero-7.png",
    imageAlt: "Custom branded packaging",
    hoverImage: "/images/hero-5.png",
    hoverAlt: "Branded mug detail",
  },
];
