import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, Eyebrow } from "@/components/layout-primitives";
import { PriceFrom } from "@/components/price-from";
import { Cta } from "@/components/home/cta";
import { getService, services } from "@/content/services";

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="flex-1 bg-ink text-paper">
      <Section id="top" className="pb-14 lg:pb-24">
        <Container>
          <Eyebrow number={service.index}>OUR SERVICES</Eyebrow>
          <h1 className="font-display text-display-lg uppercase">{service.title}</h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.8] text-dim">
            {service.intro}
          </p>
        </Container>
      </Section>

      <Section className="pb-14 lg:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[38%_62%]">
            <div>
              <h2 className="text-heading font-medium">What we produce</h2>
              <PriceFrom amount={service.priceFrom} />
            </div>
            <ul>
              {service.products.map((product) => (
                <li
                  key={product}
                  className="border-b border-line py-[14px] text-[15px] text-dim first:border-t"
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Cta />
    </main>
  );
}
