import type { Metadata } from "next";
import Link from "next/link";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { QuoteForm } from "@/components/quote-form";
import { services } from "@/content/services";
import { whatsappLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us the service, size, quantity and finish you need, and CityView Printers will come back to you with a quote.",
  alternates: { canonical: "/quote" },
};

/**
 * IMPLEMENTATION.md build order step 4: the structured alternative to
 * WhatsApp, with the fields the client actually needs to price a job
 * (service, size, quantity, finish, deadline, name, phone), rather than
 * the quick name/email/project modal every "Request a quote" pill already
 * opens. Reads `?service=` so a service page's link can arrive with the
 * right option preselected.
 */
export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = services.find((entry) => entry.slug === service)?.title;

  return (
    <CardSection ground="background" id="quote" labelledBy="quote-title" className="px-6 py-14 sm:px-10">
      <Eyebrow>Request a quote</Eyebrow>
      <h1 id="quote-title" className="mt-2 text-section-title font-medium">
        Tell us what you want to make
      </h1>
      <p className="mt-4 max-w-[34rem] text-body-lg leading-[1.6] text-ink-soft">
        Give us the details of the job and we will come back with pricing. Prefer to talk it
        through instead? <Link href={whatsappLink()} className="underline underline-offset-4 hover:text-ink">Message us on WhatsApp</Link>.
      </p>

      <QuoteForm services={services} initialService={initialService} />
    </CardSection>
  );
}
