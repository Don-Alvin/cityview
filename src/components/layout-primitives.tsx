import type { ReactNode } from "react";

const grounds = {
  background: "bg-background text-ink",
  surface: "bg-surface text-ink",
  "brand-deep": "bg-brand-deep text-white",
};

/**
 * DESIGN.md section 3: the page is a stack of rounded cards, not
 * full-bleed sections, alternating between three grounds. `ground` picks
 * which one, so that alternation is enforced by the type system rather
 * than by remembering to type the right class each time.
 *
 * `aria-labelledby` is required, not optional: DESIGN.md section 7 lists
 * it as an accessibility floor the mockup already meets, so every section
 * needs a heading id to point at.
 */
export function CardSection({
  children,
  ground,
  id,
  labelledBy,
  className = "",
}: {
  children: ReactNode;
  ground: keyof typeof grounds;
  id?: string;
  labelledBy: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`card-section ${grounds[ground]} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Uppercase label with a brand-coloured dot (CSS ::before in
 * globals.css). `light` switches to the pale-on-dark variant for
 * sections on the brand-deep ground.
 */
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span className={`eyebrow text-eyebrow font-medium ${light ? "light" : ""}`}>
      {children}
    </span>
  );
}
