import type { ReactNode } from "react";

/**
 * Fixed-width gutters at every breakpoint (calc(100% - Npx) rather than a
 * percentage gutter), capped by the 1240px content column. Matches
 * DESIGN.md section 3 and the mockup's `.wrap`.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-[calc(100%-36px)] max-w-[760px] sm:w-[calc(100%-56px)] sm:max-w-[1050px] lg:w-[calc(100%-96px)] lg:max-w-[1240px] ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Section top-rhythm only. Left-hand padding, colour and inner layout
 * belong to whatever the section actually contains.
 */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`pt-section-sm lg:pt-section ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * The numbered eyebrow label, e.g. "02 / WHAT WE DO". Number and label are
 * separate props so the running sequence down the page can't drift out of
 * sync with hand-typed text.
 */
export function Eyebrow({
  number,
  children,
}: {
  number?: string;
  children: ReactNode;
}) {
  return (
    <p className="mb-[26px] text-eyebrow font-medium text-accent">
      {number ? `${number} / ` : null}
      {children}
    </p>
  );
}
