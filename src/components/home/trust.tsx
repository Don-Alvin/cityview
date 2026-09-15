"use client";

import { useState } from "react";
import Image from "next/image";
import { InViewBox } from "../in-view-box";
import { useInView } from "../use-in-view";

// Photos from the previous Skyline direction; see report.md.
const slides = [
  { words: ["Premium", "Print", "Tactile", "Finish"], name: "Business essentials", role: "Cards & stationery", image: "/images/hero-1.png" },
  { words: ["Your", "Brand", "Everywhere", "Seen"], name: "Packaging systems", role: "Boxes & branded bags", image: "/images/hero-7.png" },
  { words: ["Ideas", "Made", "Boldly", "Real"], name: "Branded merchandise", role: "Bags, apparel & everyday items", image: "/images/hero-4.png" },
];

function ArrowButton({
  direction,
  onClick,
  solid = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  solid?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={`flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${
        solid ? "border-ink bg-ink text-white" : "border-hairline"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`h-5 w-5 fill-none stroke-current stroke-[1.8] ${direction === "prev" ? "-scale-x-100" : ""}`}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/**
 * final_design.html's trust section: a percent badge, a note, an
 * oversized "ghost" heading whose words swap per slide, and a rotated
 * feature card. The ghost heading's word-swap reveal only needs to play
 * once (on first scroll into view), same as the rest of the .inview
 * vocabulary, so it shares useInView rather than re-triggering on every
 * slide change after that.
 */
export function Trust() {
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView<HTMLHeadingElement>();
  const slide = slides[index];

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section id="trust" aria-labelledby="trust-title" className="card-section relative overflow-hidden bg-white px-6 py-14 sm:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <InViewBox className="flex h-28 w-28 items-center justify-center rounded-full bg-surface p-4 text-center sm:h-32 sm:w-32">
          <div>
            <strong className="block text-lead font-medium">100%</strong>
            <span className="block text-eyebrow normal-case tracking-normal text-ink-soft">custom to your brand</span>
          </div>
        </InViewBox>

        <InViewBox as="article" delay={120} className="flex max-w-[28rem] gap-4 rounded-card bg-surface p-4 sm:p-5">
          <span className="h-max shrink-0 rounded-xl bg-white px-4 py-2 text-title-sm font-medium">#01</span>
          <div>
            <h2 className="text-body-lg font-medium">Trusted where first impressions matter</h2>
            <p className="mt-1.5 text-body-sm leading-[1.7] text-ink-soft">
              From a first business card to a complete brand rollout, every detail is produced to feel consistent,
              considered and unmistakably yours.
            </p>
          </div>
        </InViewBox>
      </div>

      <h2
        ref={ref}
        id="trust-title"
        aria-live="polite"
        className="relative z-0 mx-auto mt-10 max-w-[88rem] select-none text-[8.2vw] font-medium uppercase leading-[1.02] tracking-[-0.045em] text-ghost"
      >
        <span className="flex justify-between gap-4">
          <span className={`ghost-word inline-block overflow-hidden pb-[0.12em] ${inView ? "visible" : ""}`}>
            <span>{slide.words[0]}</span>
          </span>
          <span className={`ghost-word inline-block overflow-hidden pb-[0.12em] ${inView ? "visible" : ""}`}>
            <span>{slide.words[1]}</span>
          </span>
        </span>
        <span className="flex justify-between gap-4">
          <span className={`ghost-word inline-block overflow-hidden pb-[0.12em] text-ink ${inView ? "visible" : ""}`}>
            <span>{slide.words[2]}</span>
          </span>
          <span className={`ghost-word inline-block overflow-hidden pb-[0.12em] ${inView ? "visible" : ""}`}>
            <span>{slide.words[3]}</span>
          </span>
        </span>
      </h2>

      {/* Ported straight from final_design.html's .feature-card and
          .glass-caption rules, not approximated: relative/flowing with a
          1rem top margin below 640px, only becoming absolute (centred at
          left:50%/top:52% over the ghost lettering, per the mockup's own
          value, not an even 50%) at sm and up. bg-brand and the soft
          shadow are the mockup's permanent fallback fill and depth cue,
          unchanged at either breakpoint. The caption is the mockup's
          translucent glass panel (brand-deep at 60%, not a solid 90%,
          plus its backdrop-blur, which DESIGN.md section 6 only forbids
          on fixed/sticky elements, and this is neither) with its
          0.65rem role label raised to the 0.75rem eyebrow size DESIGN.md
          requires as a hard floor. */}
      <figure className="relative z-[3] mx-auto mt-4 aspect-[3/4] w-52 rotate-[5deg] overflow-hidden rounded-card bg-brand shadow-[0_1rem_3rem_#00000022] sm:absolute sm:left-1/2 sm:top-[52%] sm:mt-0 sm:w-64 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <Image
          src={slide.image}
          alt={slide.name}
          fill
          quality={80}
          sizes="(min-width: 640px) 16rem, 13rem"
          className="object-cover"
        />
        <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-brand-deep/60 px-3 py-2.5 text-white backdrop-blur">
          <strong className="block text-body-sm font-medium">{slide.name}</strong>
          <span className="block text-eyebrow normal-case tracking-normal text-white/80">{slide.role}</span>
        </figcaption>
      </figure>

      <div className="relative z-[4] mt-10 flex items-center justify-between sm:mt-20">
        <ArrowButton direction="prev" onClick={() => go(index - 1)} />
        <div className="flex gap-2" role="tablist" aria-label="Featured work">
          {slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${s.name}`}
              onClick={() => setIndex(i)}
              className="p-1.5"
            >
              <i className={`block h-1.5 w-1.5 rounded-full ${i === index ? "bg-ink" : "bg-ghost"}`} />
            </button>
          ))}
        </div>
        <ArrowButton direction="next" onClick={() => go(index + 1)} solid />
      </div>
    </section>
  );
}
