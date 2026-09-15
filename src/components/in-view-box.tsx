"use client";

import type { ReactNode, CSSProperties } from "react";
import { useInView } from "./use-in-view";

/**
 * Wraps one element in the .inview reveal for server components that
 * can't call useInView directly. Without this, a bare `.inview` class
 * with nothing to add .visible would stay at opacity:0 forever, exactly
 * the "permanently invisible" failure DESIGN.md section 5 forbids.
 */
export function InViewBox({
  children,
  delay,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "dd" | "li" | "article" | "figure";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = delay !== undefined ? ({ "--delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    // The polymorphic `as` tag means TypeScript can't reconcile one ref
    // type across every possible element JSX.IntrinsicElements allows
    // here; `as never` is the standard escape for this specific
    // polymorphic-component-ref situation, not a general-purpose one.
    <Tag ref={ref as never} style={style} className={`inview ${inView ? "visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
