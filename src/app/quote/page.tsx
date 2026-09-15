import type { Metadata } from "next";
import { CardSection, Eyebrow } from "@/components/layout-primitives";

export const metadata: Metadata = {
  title: "Request a Quote | CityView Printers, Nairobi",
  description:
    "Tell us what you need printed, and CityView Printers will come back to you with a quote.",
};

// Not yet rebuilt for the Skyline mockup. Build order step 4 covers the
// quote form and WhatsApp. This is a placeholder so the route exists and
// compiles against the current tokens, not the finished page.
export default function QuotePage() {
  return (
    <CardSection ground="background" id="quote" labelledBy="quote-title">
      <Eyebrow>Request a quote</Eyebrow>
      <h1 id="quote-title" className="mt-4 text-title-sm font-medium">
        Rebuilt in step 4.
      </h1>
    </CardSection>
  );
}
