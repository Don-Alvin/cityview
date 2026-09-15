import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export type PillVariant = "solid" | "light" | "outline" | "outline-light";

const variants: Record<PillVariant, string> = {
  solid: "bg-ink text-white hover:bg-brand",
  light: "bg-white text-brand-deep hover:bg-brand hover:text-brand-deep",
  outline: "border border-current bg-transparent text-ink hover:bg-ink hover:text-white",
  // For an outline pill on a dark ground (the footer's white-bordered
  // trigger). Kept as its own variant rather than overriding `outline`'s
  // hover colour via an extra className: two utility classes targeting
  // the same property under the same pseudo-class (hover:text-white
  // from the variant, hover:text-brand-deep from the override) don't
  // resolve by which one appears later in the className string, they
  // resolve by which is later in Tailwind's generated stylesheet, which
  // isn't something a call site should have to reason about or fight.
  "outline-light": "border border-white bg-transparent text-white hover:bg-white hover:text-brand-deep",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8] transition-transform duration-200 ease-out group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function pillClasses(variant: keyof typeof variants, className: string) {
  return `group inline-flex items-center justify-center gap-[0.55rem] rounded-pill px-7 py-[0.875rem] text-body-sm font-medium uppercase tracking-[0.07em] transition-colors duration-[250ms] ${variants[variant]} ${className}`;
}

type PillLinkProps = {
  href: string;
  variant?: keyof typeof variants;
  icon?: boolean;
  children: ReactNode;
  className?: string;
};

type PillButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
  href?: undefined;
  variant?: keyof typeof variants;
  icon?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * DESIGN.md section 4: the only button. Three variants, pill radius,
 * uppercase body-sm/500 at 0.07em tracking. The arrow's hover nudge is a
 * plain CSS transform on Tailwind's `group-hover` rather than the
 * mockup's spring-physics JS (`--spring-x` driven by a
 * requestAnimationFrame loop): same visual read, no JS needed, and
 * DESIGN.md's own motion constraints only ask for transform/opacity,
 * which this already is.
 */
export function Pill(props: PillLinkProps | PillButtonProps) {
  if (props.href) {
    const { href, variant = "solid", icon = false, children, className = "" } = props;
    return (
      <Link href={href} className={pillClasses(variant, className)}>
        {children}
        {icon ? <Arrow /> : null}
      </Link>
    );
  }

  const { variant = "solid", icon = false, children, className = "", ...buttonProps } = props;
  return (
    <button type="button" className={pillClasses(variant, className)} {...buttonProps}>
      {children}
      {icon ? <Arrow /> : null}
    </button>
  );
}
