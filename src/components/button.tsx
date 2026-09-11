import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "accent" | "ink";
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const variants = {
  accent: "bg-accent text-accent-ink",
  ink: "bg-ink text-paper",
};

/**
 * DESIGN.md section 4: 15px/20px padding, radius-control, 14px DM Sans
 * 500, two variants only, lift on hover. Always a Link, never a <button>,
 * since every use on this site goes somewhere (WhatsApp, a route, an
 * anchor) rather than triggering in-page state.
 */
export function Button({ href, variant = "accent", children, ...rest }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-8 rounded-control px-5 py-[15px] text-sm font-medium transition-transform duration-200 ease-out hover:-translate-y-[3px] ${variants[variant]}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
