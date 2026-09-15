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
          alt="Nairobi skyline at sunset"
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

        <h1 id="hero-title" className="mt-4 px-6 text-hero font-medium uppercase sm:px-10">
          <Word delay={0}>Make</Word> <Word delay={140}>Your</Word> <Word delay={280}>Mark</Word>
        </h1>

        <div className="mt-auto flex flex-col gap-6 px-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-10">
          <p className="text-[2.4rem] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-white/85">
            <span className="clip">
              <span style={delayStyle(350)}>Print bold,</span>
            </span>
            <br />
            <span className="clip">
              <span style={delayStyle(460)}>brand brilliantly</span>
            </span>
          </p>

          <div className="flex items-end gap-4">
            <MiniSlider />

            <div className="flex w-full max-w-[20rem] items-stretch gap-3 rounded-card border border-white/15 bg-white/10 p-3">
              <div className="flex flex-1 flex-col justify-between">
                <strong className="text-title-sm font-medium leading-none">360&deg;</strong>
                <div className="flex">
                  <i className="h-5 w-5 rounded-full border border-black/40 bg-brand" />
                  <i className="-ml-[0.35rem] h-5 w-5 rounded-full border border-black/40 bg-brand-deep" />
                  <i className="-ml-[0.35rem] h-5 w-5 rounded-full border border-black/40 bg-surface" />
                  <i className="-ml-[0.35rem] h-5 w-5 rounded-full border border-black/40 bg-white" />
                </div>
                <p className="text-eyebrow text-white/80">Your brand, across every surface</p>
              </div>
              {/* From the previous Skyline direction; see report.md. */}
              <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/hero-7.png"
                  alt="Branded packaging: gift bag and boxes"
                  fill
                  quality={80}
                  sizes="4rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
