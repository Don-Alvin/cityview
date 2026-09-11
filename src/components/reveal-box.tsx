"use client";

import type { ReactNode } from "react";
import { useReveal } from "./use-reveal";

/**
 * Wraps one element in the registration reveal. DESIGN.md caps this at
 * five uses site-wide, so reach for it deliberately, not on every
 * heading.
 */
export function RevealBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
