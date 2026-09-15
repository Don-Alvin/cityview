"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Photos from the previous Skyline direction; see report.md.
const slides = [
  { label: "Print essentials", title: "Business cards", href: "/services/commercial-printing", image: "/images/hero-1.png", alt: "Branded business cards" },
  { label: "Large format", title: "Display banners", href: "/services/branding-and-signage", image: "/images/hero-6.png", alt: "Branded roll-up display banner" },
  { label: "Wear the brand", title: "Custom apparel", href: "/services/apparel-and-merchandise", image: "/images/hero-3.png", alt: "Branded T-shirt" },
];

/**
 * Auto-advancing product preview inside the hero (final_design.html's
 * .mini-slider). Plain interval-driven state rather than the mockup's
 * manual DOM mutation: same crossfade read, no direct element handles.
 * Pauses under reduced-motion since an auto-advancing carousel is
 * exactly the kind of movement that preference exists to stop.
 */
export function MiniSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3800);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <div className="hidden w-64 sm:block">
      <div
        key={index}
        className="flex items-center gap-3 rounded-card border border-white/15 bg-white/10 p-3 transition-opacity duration-200"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
          <Image src={slide.image} alt={slide.alt} fill quality={80} sizes="3.5rem" className="object-cover" />
        </div>
        <div className="text-eyebrow uppercase leading-[1.5] text-white">
          <strong className="block font-medium tracking-[0.08em]">{slide.label}</strong>
          <span className="block text-white/80">{slide.title}</span>
          <Link href={slide.href} className="mt-1 block text-eyebrow normal-case tracking-normal underline underline-offset-2">
            Explore print &#8594;
          </Link>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Featured products">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.title}`}
            onClick={() => setIndex(i)}
            className="p-1.5"
          >
            <i className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
