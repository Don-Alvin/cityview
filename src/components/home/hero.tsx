import type { CSSProperties } from "react";
import Image from "next/image";
import { SiteHeader } from "../site-header";
import { MiniSlider } from "./mini-slider";

function delayStyle(ms: number): CSSProperties {
  return { "--delay": `${ms}ms` } as CSSProperties;
}

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="clip">
      <span style={delayStyle(delay)}>{children}</span>
    </span>
  );
}

/**
 * DESIGN.md section 6: no preloader, hero reveal runs immediately on
 * load. The .clip/.reveal-word CSS in globals.css is a plain @keyframes
 * animation with no JS gate, so this is true without any "ready" class
 * to wait for, unlike the mockup's loader-gated version.
 *
 * Gradient overlay on hero-bg is ported as-is: unlike the previous
 * direction, this DESIGN.md never rules gradients out, and it's the
 * mockup's own mechanism for keeping white hero text readable over a
 * photo of unknown tone.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="card-section relative isolate min-h-[36rem] overflow-hidden bg-brand-deep text-white"
      style={{ height: "calc(100svh - 1rem)" }}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/herobanner.png"
          alt="City skyline at sunset"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,19,18,.75), rgba(20,19,18,.18), rgba(20,19,18,.88))",
        }}
      />

      <div className="flex h-full flex-col">
        <SiteHeader />

        {/* The visible h1 is the design's three words, which say nothing
            about what the business does or where it is. The sr-only half
            completes the sentence for screen readers and crawlers without
            touching the layout: this is the site's only h1, and on its own
            "Make your mark" would be the page's strongest heading signal
            while carrying no meaning. */}
        <h1 id="hero-title" className="mt-4 px-6 text-hero font-medium uppercase sm:px-10">
          <Word delay={0}>Make</Word> <Word delay={140}>Your</Word> <Word delay={280}>Mark</Word>
          <span className="sr-only">: print, branding and signage in Kisumu</span>
        </h1>

        {/* This row fills all the space left between the title and the
            hero's bottom edge (flex-1), rather than the old mt-auto strip
            that only took up as much height as its content needed. The
            tagline keeps its natural height and sits at the bottom via
            its own mt-auto (a real margin, not stretch, so the text
            itself doesn't distort); the card column has nothing
            overriding stretch, so it fills the row's full height, top
            edge landing right under "MAKE YOUR MARK" instead of hugging
            the floor. */}
        <div className="mt-5 flex flex-1 flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6 sm:px-10 sm:pb-8">
          <p className="order-2 text-[2.4rem] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-white/85 sm:order-1 sm:mt-auto">
            <span className="clip">
              <span style={delayStyle(350)}>Print bold,</span>
            </span>
            <br />
            <span className="clip">
              <span style={delayStyle(460)}>brand brilliantly</span>
            </span>
          </p>

          {/* Below sm this fills the gap between the title and the
              tagline (order-1, flex-1), stacked landscape rather than
              hidden entirely; at sm and up it reverts to source order
              (second, to the right of the tagline) and the two cards sit
              side by side, tall. */}
          {/* Mobile card height: each card is 45% of the column rather
              than half of it, i.e. 10% shorter than the (100% - gap) / 2
              they used to split, per Alvin. The freed space falls below
              the pair, giving the tagline clearer separation instead of
              opening an odd gap between the two cards. */}
          <div className="order-1 flex flex-1 flex-col gap-4 sm:order-2 sm:w-full sm:max-w-[26rem] sm:flex-row">
            <MiniSlider className="h-[calc((100%_-_1rem)*0.45)] sm:h-full sm:flex-1" />

            <div className="flex h-[calc((100%_-_1rem)*0.45)] flex-col gap-1.5 rounded-card border border-white/15 bg-white/10 p-1.5 sm:h-full sm:flex-1 sm:gap-4 sm:p-4">
              <div className="flex min-h-0 flex-1 flex-row items-stretch gap-2 sm:flex-col sm:gap-3">
                {/* From the previous Skyline direction; see report.md. */}
                <div className="relative order-1 aspect-square h-full shrink-0 overflow-hidden rounded-xl sm:order-2 sm:aspect-auto sm:h-auto sm:w-full sm:flex-1">
                  <Image
                    src="/images/hero-7.png"
                    alt="Branded packaging: gift bag and boxes"
                    fill
                    quality={80}
                    sizes="(min-width: 640px) 14rem, 8rem"
                    className="object-cover"
                  />
                </div>
                <div className="order-2 flex min-w-0 flex-1 flex-col justify-center sm:order-1 sm:block sm:flex-none">
                  <strong className="text-title-sm font-medium leading-none">360&deg;</strong>
                  <div className="mt-2 flex sm:mt-3">
                    <i className="h-5 w-5 rounded-full border border-black/40 bg-brand" />
                    <i className="-ml-[0.35rem] h-5 w-5 rounded-full border border-black/40 bg-brand-deep" />
                    <i className="-ml-[0.35rem] h-5 w-5 rounded-full border border-black/40 bg-surface" />
                    <i className="-ml-[0.35rem] h-5 w-5 rounded-full border border-black/40 bg-white" />
                  </div>
                </div>
              </div>
              <p className="text-eyebrow text-white/80">Your brand, across every surface</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
