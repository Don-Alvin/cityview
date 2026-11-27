import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export type PillVariant = "solid" | "light" | "outline" | "outline-light" | "action";

const variants: Record<Exclude<PillVariant, "action">, string> = {
  solid: "bg-brand text-on-brand hover:bg-brand-deep",
  light: "bg-white text-brand-deep hover:bg-brand hover:text-on-brand",
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

function Arrow({ circle }: { circle: boolean }) {
  const icon = (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8] transition-transform duration-200 ease-out group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return circle ? (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-accent">
      {icon}
    </span>
  ) : icon;
}

function pillClasses(variant: PillVariant, className: string) {
  if (variant === "action") {
    return `group inline-flex items-center justify-between gap-4 rounded-pill border border-hairline bg-surface-card py-2 pr-2 pl-6 text-sm font-medium text-ink motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out-expo motion-safe:hover:scale-105 ${className}`;
  }
  return `group inline-flex items-center justify-center gap-[0.55rem] rounded-pill px-7 py-[0.875rem] text-body-sm font-medium uppercase tracking-[0.07em] transition-colors duration-[250ms] ${variants[variant]} ${className}`;
}

type PillLinkProps = {
  href: string;
  variant?: PillVariant;
  icon?: boolean;
  children: ReactNode;
  className?: string;
};

type PillButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
  href?: undefined;
  variant?: PillVariant;
  icon?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Shared pill styling for buttons and navigation links. The action
 * variant adds the circular icon and reduced-motion-aware hover scale.
 */
export function Pill(props: PillLinkProps | PillButtonProps) {
  if (props.href) {
    const { href, variant = "solid", icon = false, children, className = "" } = props;
    return (
      <Link href={href} className={pillClasses(variant, className)}>
        {children}
        {icon ? <Arrow circle={variant === "action"} /> : null}
      </Link>
    );
  }

  const { variant = "solid", icon = false, children, className = "", ...buttonProps } = props;
  return (
    <button type="button" className={pillClasses(variant, className)} {...buttonProps}>
      {children}
      {icon ? <Arrow circle={variant === "action"} /> : null}
    </button>
  );
}
