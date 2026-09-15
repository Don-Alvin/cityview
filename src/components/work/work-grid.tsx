"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/content/work";
import { services } from "@/content/services";

const filters = [{ slug: "all", title: "All work" }, ...services.map((service) => ({ slug: service.slug, title: service.title }))];

/**
 * IMPLEMENTATION.md step 6: filter by service, hover crossfade from a
 * flat shot to an angled detail. Client-side filtering rather than
 * separate routes per filter: four categories over a handful of items is
 * not enough content to justify the SEO cost of duplicate/thin pages, and
 * every item still links out to its real /services/[slug] page.
 *
 * The crossfade is two stacked `next/image` elements with opacity
 * swapped on `group-hover`, DESIGN.md's own "Scale: image hover only"
 * vocabulary extended to opacity, which its motion constraints
 * (transform and opacity only, 0.2 to 0.25s) already allow.
 */
export function WorkGrid({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? items : items.filter((item) => item.service === active);

  return (
    <div>
      <div role="tablist" aria-label="Filter by service" className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.slug}
            type="button"
            role="tab"
            aria-selected={active === filter.slug}
            onClick={() => setActive(filter.slug)}
            className={`rounded-pill border px-5 py-3 text-body-sm font-medium transition-colors duration-[250ms] ${
              active === filter.slug
                ? "border-ink bg-ink text-white"
                : "border-hairline bg-transparent text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {filter.title}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const service = services.find((entry) => entry.slug === item.service);
          return (
            <li key={item.slug}>
              <Link
                href={service ? `/services/${service.slug}` : "/"}
                className="group relative block aspect-[4/5] overflow-hidden rounded-card"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-0"
                />
                <Image
                  src={item.hoverImage}
                  alt={item.hoverAlt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />
                <span className="absolute inset-x-3 bottom-3 rounded-xl bg-brand-deep/90 px-3 py-2.5 text-body-sm font-medium text-white">
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
