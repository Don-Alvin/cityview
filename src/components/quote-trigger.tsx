"use client";

import type { ReactNode } from "react";
import { Pill, type PillVariant } from "./pill";

/**
 * Server components (SiteFooter, service pages) can't pass an onClick
 * function prop directly to a Client Component like Pill: event handlers
 * aren't serialisable across the RSC boundary. This is the one place
 * that click-to-open-modal wiring lives, so every "Request a quote"
 * trigger site-wide goes through it.
 */
export function QuoteTrigger({
  variant = "solid",
  className = "",
  children,
}: {
  variant?: PillVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Pill
      variant={variant}
      icon
      className={className}
      onClick={() => {
        (document.getElementById("quote-modal") as HTMLDialogElement | null)?.showModal();
      }}
    >
      {children}
    </Pill>
  );
}
