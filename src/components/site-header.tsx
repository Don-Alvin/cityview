"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pill } from "./pill";
import { contact, whatsappLink } from "@/content/contact";

// CHECKLIST.md: desktop nav carries the full route set, not just two
// links (the mockup's own header only had "Services & Products" and
// "Our Work"). Desktop nav and the mobile overlay use the same set, so
// there's one list to keep in sync, not two that can quietly drift.
const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#showcase", label: "Products" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// The overlay menu gets a Home link the desktop bar doesn't need. The bar
// has the logo, which is already a link home and is the convention people
// expect. The overlay is a full-screen dialog: while it is open it covers
// that logo, so without this the only route home is to close the menu
// first and then find it. Derived from navLinks rather than a second
// array, so the two still can't drift apart.
const overlayLinks = [{ href: "/", label: "Home" }, ...navLinks];

function openQuoteModal() {
  (document.getElementById("quote-modal") as HTMLDialogElement | null)?.showModal();
}

function BrandLockup() {
  return (
    <span className="flex items-center gap-[0.55rem] text-[1.25rem] font-medium uppercase tracking-[0.2em]">
      <span aria-hidden="true" className="flex h-5 w-5 items-end gap-[0.12rem]">
        <i className="block h-[0.5rem] w-[0.22rem] bg-current" />
        <i className="block h-[0.85rem] w-[0.22rem] bg-current" />
        <i className="block h-[1.18rem] w-[0.22rem] bg-current" />
        <i className="block h-[0.7rem] w-[0.22rem] bg-current" />
      </span>
      CityView
    </span>
  );
}

/**
 * Header sits inside the hero, over the photo, so it renders in white
 * (DESIGN.md doesn't give it its own ground: it's visually part of the
 * hero, not a separate section).
 *
 * The mobile menu is a native <dialog> rather than a plain fixed div:
 * showModal() locks background scroll, traps focus and returns it to
 * the trigger on close, and Escape closes it, all for free (DESIGN.md
 * section 7). A hand-rolled fixed overlay gets none of that without
 * separately reimplementing each piece, and the missing scroll lock was
 * exactly the bug this replaces: the page kept scrolling behind the
 * "open" overlay, which is also what made it read as oddly stuck in
 * place rather than a real modal.
 *
 * DESIGN.md section 6: no backdrop-filter on the overlay itself (it's
 * fixed) even though the mockup's close-circle/burger buttons used one.
 * A solid brand-deep background reads identically on a page with no
 * gradients anyway.
 */
export function SiteHeader({ tone = "light" }: { tone?: "light" | "ink" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();
  const { email } = contact;

  const scrollYRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    // IntersectionObserver, not a scroll listener. DESIGN.md section 6
    // bans layout reads inside scroll handlers and names this as the
    // replacement: the sentinel is a zero-height marker sitting in normal
    // flow at the very top of the page, so the moment it leaves the
    // viewport the header is stuck and needs its own background.
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function openMenu() {
    // Native <dialog> + showModal() is supposed to lock background
    // scroll on its own, but that's not reliable everywhere: iOS Safari
    // in particular is known to still let the page scroll (and rubber-
    // band) behind an open modal via touch, dialog notwithstanding. This
    // is the standard defensive fix: pin the body in place at its
    // current scroll offset while the dialog is open, so there's
    // nothing behind it to scroll regardless of how the browser's own
    // dialog handles it, then restore the exact position on close.
    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, scrollYRef.current);
  }

  // At rest on the home page this sits over the hero photograph, so it
  // renders in white; on every other page it sits on the light page
  // ground and has to invert, or it would be white text on white. Once
  // stuck it carries its own brand-deep ground and goes white regardless
  // of what is scrolling underneath. Only the bar changes: the overlay
  // menu is its own brand-deep surface in all cases.
  const onDark = tone === "light" || scrolled;

  return (
    <>
      {/* Zero-height marker in normal flow, read by the observer above to
          tell "at the top of the page" from "scrolled". It has to sit
          outside the sticky element, which stops moving relative to the
          viewport and so can never report this itself. */}
      <div ref={sentinelRef} aria-hidden="true" />

      <header
        className={`sticky top-0 z-50 flex h-[var(--header-h)] items-center gap-4 px-6 transition-colors duration-200 sm:px-10 ${
          scrolled ? "bg-brand-deep text-white" : onDark ? "text-white" : "text-ink"
        }`}
      >
        <nav aria-label="Primary" className="hidden flex-1 gap-6 text-eyebrow lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={onDark ? "hover:text-brand-light" : "hover:text-brand"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" aria-label="CityView Printers home" className="flex-1 lg:flex-none lg:justify-self-center">
          <BrandLockup />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Below lg (1024px, matching the burger below), the header is
              logo and hamburger only. WhatsApp and "Request a quote" both
              already live in the mobile overlay, so nothing is lost, and
              the small-screen header stops being three competing CTAs.

              The hide/show lives on this wrapper, not on Pill's own
              className: Pill's base classes always include `inline-flex`
              (needed to lay out its own label + arrow icon), and a
              `hidden` passed into Pill's className would be fighting
              that same base class for the `display` property at equal
              CSS specificity, the exact bug the footer hover fix already
              ran into once. Wrapping avoids the fight entirely. */}
          <div className="hidden lg:block">
            <Pill variant={onDark ? "light" : "solid"} onClick={openQuoteModal}>
              Request a quote
            </Pill>
          </div>
          <a
            href={whatsappLink()}
            aria-label="Message CityView Printers on WhatsApp"
            className={`hidden h-10 w-10 items-center justify-center rounded-full lg:flex ${
              onDark ? "bg-white/15 hover:bg-white/25" : "bg-surface hover:bg-hairline"
            }`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.36a9.9 9.9 0 0 0 4.64 1.15h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.06h-.01a8.14 8.14 0 0 1-4.14-1.13l-.3-.18-3.1.8.83-3.02-.19-.31a8.13 8.13 0 0 1-1.26-4.31c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.67 8.14-8.16 8.14Zm4.47-6.1c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21a7.36 7.36 0 0 1-1.35-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </a>
          {/* CHECKLIST.md: burger hidden at 1024px and up, desktop nav
              takes over instead. */}
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
              onDark ? "bg-white/15 hover:bg-white/25" : "bg-surface hover:bg-hairline"
            }`}
          >
            <span className="flex flex-col gap-[5px]">
              <i className={`block h-px w-4 ${onDark ? "bg-white" : "bg-ink"}`} />
              <i className={`block h-px w-4 ${onDark ? "bg-white" : "bg-ink"}`} />
            </span>
          </button>
        </div>
      </header>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => {
          setOpen(false);
          unlockScroll();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-brand-deep p-0 text-white backdrop:bg-transparent"
      >
        {/* Ghost watermark: DESIGN.md's own "oversized background
            lettering" concept (the --color-ghost token), just needing a
            dark-ground-safe tone here since --color-ghost itself
            (#d9d7d1) is tuned for the white Trust section and would be
            nearly invisible on brand-deep. A low-opacity white reuses an
            already-established pattern (bg-white/10, border-white/15)
            rather than adding a new token for one element. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 origin-left -translate-y-1/2 -rotate-90 select-none whitespace-nowrap text-[6rem] font-medium uppercase leading-none tracking-[-0.04em] text-white/[0.06] sm:text-[8rem]"
        >
          CityView
        </span>

        {/* overflow-y-auto here, not on the <dialog> itself: the dialog
            keeps overflow-hidden so the oversized rotated ghost
            watermark (a sibling, not a child, of this div) stays
            clipped to its box. If this menu's own content is ever
            taller than the viewport, this div scrolls internally
            instead of it being clipped outright or the page behind it
            scrolling. */}
        {/* gap-8 on this column, rather than auto margins between the
            sections: `my-auto` on the nav looked fine while everything
            fitted, but auto margins resolve to zero the moment content
            overflows, which left the quote button touching the last nav
            row ("Contact") with no gap at all. A real gap can't collapse;
            mt-auto on the bottom block still pushes it down when there
            is spare room. */}
        <div className="relative flex h-full min-h-0 flex-col gap-8 overflow-y-auto px-6 py-5 sm:px-10 sm:py-8">
          <div className="flex items-center justify-between text-eyebrow font-medium uppercase text-white/60">
            <span>Navigation</span>
            <button type="button" onClick={closeMenu} className="flex items-center gap-2 hover:text-white">
              Close
              <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Menu links" className="flex flex-col">
            {overlayLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between gap-4 border-t border-white/15 py-4 text-body-lg font-medium leading-none tracking-[-0.02em] last:border-b hover:text-brand-light"
              >
                {link.label}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.5] transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-6">
            <Pill
              variant="light"
              icon
              onClick={() => {
                closeMenu();
                openQuoteModal();
              }}
            >
              Request a quote
            </Pill>

            <div className="border-t border-white/15 pt-5">
              <span className="eyebrow light text-eyebrow font-medium">Contact</span>
              <div className="mt-3 flex flex-col gap-1 text-body-sm text-white/80">
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
                <Link href={whatsappLink()} onClick={closeMenu} className="hover:text-white">
                  Message us on WhatsApp
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-5 text-eyebrow normal-case tracking-normal text-white/50">
              <span>&copy; {year} CityView Printers</span>
              <span>Kisumu, Kenya</span>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
