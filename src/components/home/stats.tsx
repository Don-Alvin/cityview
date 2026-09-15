import { InViewBox } from "../in-view-box";

const stats = [
  { label: "Full-colour printing", value: "CMYK", detail: "Full-colour printing" },
  { label: "Small to large format", value: "A0+", detail: "Small to large format" },
  { label: "Single pieces to bulk runs", value: "1–∞", detail: "Single pieces to bulk runs" },
  { label: "Complete brand coverage", value: "360°", detail: "Complete brand coverage" },
];

/**
 * IMPLEMENTATION.md launch checklist: these capability claims (CMYK,
 * A0+, unlimited runs) are unverified, particularly A0+ large format,
 * which needs specific equipment. Building the section as designed, not
 * blocking on that: the checklist is what gates launch, not the build.
 */
export function Stats() {
  return (
    <section
      aria-labelledby="stats-title"
      className="card-section mt-3 bg-brand-deep px-6 py-16 text-white sm:px-10"
    >
      <span className="eyebrow light text-eyebrow font-medium">By the capabilities</span>
      <h2 id="stats-title" className="mt-2 text-section-title font-medium text-white">
        Built to print
        <br />
        at every scale
      </h2>

      <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <InViewBox key={stat.label} delay={i * 110} className="border-t border-white/20 pt-5">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <strong className="block text-stat font-medium">{stat.value}</strong>
              <span className="mt-3 block text-body-sm text-white/65">{stat.detail}</span>
            </dd>
          </InViewBox>
        ))}
      </dl>
    </section>
  );
}
