import type { Metadata } from "next";
import { CardSection, Eyebrow } from "@/components/layout-primitives";

export const metadata: Metadata = {
  title: "Our Work | CityView Printers, Nairobi",
  description:
    "Print, branding, signage and merchandise work by CityView Printers in Nairobi.",
};

// Not yet rebuilt for the Skyline mockup. Build order step 6 covers
// /work, blocked on photography regardless. This is a placeholder so
// the route exists and compiles against the current tokens, not the
// finished page.
export default function WorkPage() {
  return (
    <CardSection ground="background" id="work" labelledBy="work-title">
      <Eyebrow>Our work</Eyebrow>
      <h1 id="work-title" className="mt-4 text-title-sm font-medium">
        Rebuilt in step 6.
      </h1>
    </CardSection>
  );
}
