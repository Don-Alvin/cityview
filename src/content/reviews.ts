export type Review = {
  quote: string;
  attribution: string;
  detail: string;
  /**
   * CLAUDE.md: testimonials carry placeholder: true and must not render
   * in production until real attributed quotes replace them. Fabricated
   * testimonials are a consumer protection exposure, not a content gap.
   * Transcribed from final_design.html's own placeholder copy, which is
   * itself unattributed ("Retail brand", "Events team") rather than
   * naming a real client, so it's flagged here rather than presented as
   * a real quote.
   */
  placeholder: boolean;
};

export const reviews: Review[] = [
  {
    quote:
      "The print quality made our launch feel complete. The colours, paper and finishing all worked together beautifully.",
    attribution: "Retail brand",
    detail: "Kisumu",
    placeholder: true,
  },
  {
    quote:
      "CityView helped us carry one clear identity from our event banners to staff T-shirts and guest materials.",
    attribution: "Events team",
    detail: "Corporate activation",
    placeholder: true,
  },
  {
    quote: "Our signs are bold, readable and consistent with the brand. The difference is immediately visible.",
    attribution: "Property agency",
    detail: "Brand rollout",
    placeholder: true,
  },
];
