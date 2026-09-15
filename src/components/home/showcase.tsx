import Image from "next/image";
import { InViewBox } from "../in-view-box";

export function Showcase() {
  return (
    <section
      id="showcase"
      aria-labelledby="showcase-title"
      className="card-section -mt-8 bg-white px-6 py-14 sm:px-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:items-end">
        <InViewBox className="max-w-[24rem]">
          <div className="relative h-16 w-16 overflow-hidden rounded-card">
            {/* From the previous Skyline direction: carries that
                direction's old logo, not the current Onest wordmark.
                Kept as a placeholder photo until a real on-brand shot
                replaces it (see report.md). */}
            <Image src="/images/hero-5.png" alt="Branded mug" fill quality={80} sizes="4rem" className="object-cover" />
          </div>
          <h2 id="showcase-title" className="mt-5 text-section-title font-medium">
            See your brand
            <br />
            in the real world
          </h2>
          <p className="mt-5 max-w-[20rem] text-body-sm leading-[1.7] text-ink-soft">
            Bring the same distinctive look to every touchpoint, from the things customers carry to the displays
            they see across the city.
          </p>
        </InViewBox>

        <div className="flex items-end gap-5">
          <InViewBox as="figure" className="group relative flex-1 overflow-hidden rounded-card">
            {/* From the previous Skyline direction; see report.md. */}
            <div className="relative aspect-[3/4] transition-transform duration-[450ms] group-hover:scale-[1.03]">
              <Image src="/images/hero-4.png" alt="Branded canvas tote bag" fill quality={80} sizes="(min-width: 640px) 25vw, 45vw" className="object-cover" />
            </div>
            <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-brand-deep/90 px-3 py-2.5 text-white">
              <strong className="block text-body-sm font-medium">Brand in hand</strong>
              <span className="block text-eyebrow normal-case tracking-normal text-white/80">
                Custom bags & merchandise
              </span>
            </figcaption>
          </InViewBox>
          <InViewBox as="figure" delay={140} className="group relative mb-8 flex-1 overflow-hidden rounded-card">
            {/* From the previous Skyline direction; see report.md. */}
            <div className="relative aspect-[3/4] transition-transform duration-[450ms] group-hover:scale-[1.03]">
              <Image src="/images/hero-6.png" alt="Branded roll-up display banner" fill quality={80} sizes="(min-width: 640px) 25vw, 45vw" className="object-cover" />
            </div>
            <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-brand-deep/90 px-3 py-2.5 text-white">
              <strong className="block text-body-sm font-medium">Brand on display</strong>
              <span className="block text-eyebrow normal-case tracking-normal text-white/80">
                Signs, banners & events
              </span>
            </figcaption>
          </InViewBox>
        </div>
      </div>
    </section>
  );
}
