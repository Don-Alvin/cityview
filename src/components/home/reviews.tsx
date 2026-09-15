import { InViewBox } from "../in-view-box";
import { reviews } from "@/content/reviews";

/**
 * CLAUDE.md: testimonials carry placeholder: true and must not render in
 * production until real attributed quotes replace them. Gated by
 * NODE_ENV rather than removed outright so the section can still be
 * previewed with its real layout in development. If nothing real is
 * left to show, IMPLEMENTATION.md's own launch checklist gives the
 * choice of "real quotes, or the section removed": returning null here
 * applies that automatically rather than needing a manual step later.
 */
export function Reviews() {
  const visible = reviews.filter((review) => !review.placeholder || process.env.NODE_ENV !== "production");
  if (visible.length === 0) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-white px-6 py-16 sm:px-10">
      <span className="eyebrow text-eyebrow font-medium">What clients value</span>
      <h2 id="reviews-title" className="mt-2 text-section-title font-medium">
        Made to be seen.
        <br />
        Made to be remembered.
      </h2>

      <ul className="mt-12 grid gap-5 sm:grid-cols-3">
        {visible.map((review, i) => (
          <li key={review.attribution + review.detail} className="h-full">
            <InViewBox
              as="figure"
              delay={i * 120}
              className="flex h-full flex-col justify-between rounded-card bg-surface p-6"
            >
              <div>
                <span className="text-[2.25rem] leading-none text-brand" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-4 text-body-lg leading-[1.7]">{review.quote}</blockquote>
              </div>
              <figcaption className="mt-5 border-t border-hairline pt-4">
                <strong className="block font-medium">{review.attribution}</strong>
                <span className="block text-body-sm text-ink-soft">{review.detail}</span>
              </figcaption>
            </InViewBox>
          </li>
        ))}
      </ul>
    </section>
  );
}
