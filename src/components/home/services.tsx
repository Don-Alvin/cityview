import Link from "next/link";
import { Container, Section, Eyebrow } from "../layout-primitives";
import { ServiceIcon } from "../service-icon";
import { services } from "@/content/services";

/**
 * Real <Link> elements to real routes, not the phase 0 dialog trigger.
 * IMPLEMENTATION.md: service copy is the most search-relevant content on
 * the site, so it has to be crawlable HTML on its own URL, not JS-only
 * content behind a click.
 */
export function Services() {
  return (
    <Section id="services" className="bg-ink text-paper">
      <Container>
        <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow number="02">WHAT WE DO</Eyebrow>
            <h2 className="font-display text-display-lg uppercase">Our services.</h2>
          </div>
          <p className="text-sm text-dim">
            One brand. Every touchpoint.
            <br />
            Let&apos;s make them work together.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-card border border-line bg-panel p-[30px] text-paper transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-[5px] hover:bg-panel-hover hover:shadow-lg"
            >
              <div className="mb-[34px] flex items-center justify-between">
                <ServiceIcon slug={service.slug} />
                <span className="text-xs text-dim">{service.index}</span>
              </div>
              <h3 className="mb-[14px] text-heading font-medium">{service.title}</h3>
              <p className="mb-3 text-body-sm text-dim">{service.teaser}</p>
              <span className="block text-body-sm text-dim">
                {service.tags.join(" · ")}
              </span>
              <div className="mt-5 flex justify-between border-t border-line pt-[18px] text-[13px]">
                <span>Explore {service.title.split(" ")[0].toLowerCase()}</span>
                <b className="text-[20px] font-normal text-accent">&#8599;</b>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
