import Link from "next/link";
import { services } from "@/content/services";

/**
 * IMPLEMENTATION.md: services are real pages, not a modal (and not, as
 * final_design.html has it, an in-page anchor to the showcase section).
 * Each row is a genuine <Link> to its own /services/[slug] page, so this
 * is the most search-relevant content on the site being crawlable, not
 * JS-only.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="px-6 py-14 sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <span className="eyebrow text-eyebrow font-medium">Printing services</span>
      </div>
      <h2 id="services-title" className="mt-2 text-section-title font-medium">
        Made for
        <br />
        every impression
      </h2>

      <ul className="mt-6 flex flex-col">
        {services.map((service, i) => (
          <li key={service.slug} className="border-t border-hairline last:border-b">
            <Link
              href={`/services/${service.slug}`}
              className="group flex items-center gap-6 py-5 hover:text-brand"
            >
              <span className="text-eyebrow text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <h3 className="text-title-sm font-medium">{service.title}</h3>
                <p className="mt-1 text-body-sm text-ink-soft">{service.teaser}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-none stroke-current stroke-[1.8] transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
