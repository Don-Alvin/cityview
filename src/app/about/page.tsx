import type { Metadata } from "next";
import { CardSection, Eyebrow } from "@/components/layout-primitives";

export const metadata: Metadata = {
  title: "About Us | CityView Printers, Nairobi",
  description:
    "CityView Printers is a print, branding, signage and merchandise business based in Nairobi.",
};

// Not yet rebuilt for the Skyline mockup (final_design.html). Build order
// step 5 covers about/contact. This is a placeholder so the route exists
// and compiles against the current tokens, not the finished page.
export default function AboutPage() {
  return (
    <CardSection ground="background" id="about" labelledBy="about-title">
      <Eyebrow>About CityView</Eyebrow>
      <h1 id="about-title" className="mt-4 text-title-sm font-medium">
        Rebuilt in step 5.
      </h1>
    </CardSection>
  );
}
