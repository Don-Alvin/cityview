import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CardSection, Eyebrow } from "@/components/layout-primitives";
import { Pill } from "@/components/pill";
import { PriceFrom } from "@/components/price-from";
import { getService, services } from "@/content/services";
import { whatsappLink } from "@/content/contact";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

/**
 * IMPLEMENTATION.md: services are real, indexable pages, not a modal
 * (final_design.html's own service rows link out to nowhere, they're
 * just home-page copy, so this whole page is new rather than ported).
 * The product list is the most search-relevant content on the site, so
 * it's plain markup here, not something that only exists after a click.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <CardSection ground="brand-deep" id="service" labelledBy="service-title" className="px-6 py-16 sm:px-10">
      <Eyebrow light>Our services</Eyebrow>
      <h1 id="service-title" className="mt-2 text-section-title font-medium">
        {service.title}
      </h1>
      <p className="mt-4 max-w-[36rem] text-body-lg leading-[1.6] text-white/80">{service.intro}</p>

      <div className="mt-14 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div>
          <h2 className="text-body-lg font-medium">What we produce</h2>
          <PriceFrom amount={service.priceFrom} />
        </div>
        <ul>
          {service.products.map((product) => (
            <li
              key={product}
              className="border-t border-white/15 py-4 text-body leading-[1.6] text-white/85 first:border-t-0 sm:first:border-t"
            >
              {product}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-white/15 pt-10">
        <Link
          href={whatsappLink(service.title)}
          className="inline-flex items-center gap-[0.55rem] rounded-pill bg-white px-7 py-[0.875rem] text-body-sm font-medium uppercase tracking-[0.07em] text-brand-deep hover:bg-brand"
        >
          Message us on WhatsApp
        </Link>
        <Pill href="/#services" variant="outline-light">
          Back to all services
        </Pill>
      </div>
    </CardSection>
  );
}
