import type { Metadata } from "next";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { WorkGrid } from "@/components/work/work-grid";
import { workItems } from "@/content/work";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Print, branding, signage and merchandise work by CityView Printers in Kisumu.",
  alternates: { canonical: "/work" },
};

/**
 * IMPLEMENTATION.md step 6: blocked on real photography, so the copy
 * below is deliberately worded around "the kind of work we do" rather
 * than "recent projects" (see report.md: the grid currently shows
 * placeholder product photography, not verified completed jobs).
 */
export default function WorkPage() {
  return (
    <CardSection ground="background" id="work" labelledBy="work-title" className="px-6 py-14 sm:px-10">
      <Eyebrow>Our work</Eyebrow>
      <h1 id="work-title" className="mt-2 text-section-title font-medium">
        A look at the kind of work we do
      </h1>
      <p className="mt-4 max-w-[34rem] text-body-lg leading-[1.6] text-ink-soft">
        Filter by service to browse print, branding, signage and merchandise projects.
      </p>

      <div className="mt-8">
        <WorkGrid items={workItems} />
      </div>
    </CardSection>
  );
}
