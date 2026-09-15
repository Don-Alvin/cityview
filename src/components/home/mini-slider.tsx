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
 *
 * The card fills whatever height its flex parent gives it (Alvin: the
 * hero cards should stretch tall, top edge reaching up toward "MAKE YOUR
 * MARK", not sit as a short strip pinned to the floor), with the photo
 * taking the flexible middle and the caption/dots pinned under it.
 *
 * Below `sm`, the card is landscape instead of tall (Alvin: image then
 * writing, side by side, filling the gap between the title and the
 * tagline): the content row is `flex-row` on mobile, `sm:flex-col` above
 * that breakpoint.
 *
 * The row is `items-stretch`, matching final_design.html's own
 * `.project-card{align-items:stretch}`, so the photo grows to the full
 * height of the card's content box rather than sitting at a fixed size
 * centred inside it. That fixed-size-plus-centring combination was what
 * read as oversized vertical padding: the padding was already `p-1.5` on
 * all four sides, the space above and below the image was just dead flex
 * space. Height is owned by the caller via `className`, so the hero can
 * trim the mobile cards without touching the desktop ones.
 */
export function MiniSlider({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3800);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <div className={`flex flex-col rounded-card border border-white/15 bg-white/10 p-1.5 sm:p-4 ${className}`}>
      <div className="flex min-h-0 flex-1 flex-row items-stretch gap-2 sm:flex-col sm:gap-3">
        {/* Only the image remounts on slide change (key on index): the
            dot row and text stay stable, so a keyboard focus on a dot
            survives the auto-advance instead of being lost to a remount
            every 3.8s. */}
        <div
          key={index}
          className="relative aspect-square h-full shrink-0 overflow-hidden rounded-xl transition-opacity duration-200 sm:aspect-auto sm:h-auto sm:w-full sm:flex-1"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            quality={80}
            sizes="(min-width: 640px) 14rem, 8rem"
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center text-eyebrow uppercase leading-[1.5] text-white sm:block sm:flex-none">
          <strong className="block font-medium tracking-[0.08em]">{slide.label}</strong>
          <span className="block text-white/80">{slide.title}</span>
          <Link href={slide.href} className="mt-1 block text-eyebrow normal-case tracking-normal underline underline-offset-2">
            Explore print &#8594;
          </Link>
        </div>
      </div>
      <div className="mt-1.5 flex justify-center gap-2 sm:mt-3" role="tablist" aria-label="Featured products">
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
