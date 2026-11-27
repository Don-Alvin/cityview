"use client";

import type { ReactNode } from "react";

/**
 * Connects the shared quote dialog to triggers in server and client layouts.
 */
export function QuoteTrigger({ className, beforeOpen, children }: {
  className?: string;
  beforeOpen?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        beforeOpen?.();
        (document.getElementById("quote-modal") as HTMLDialogElement | null)?.showModal();
      }}
    >
      {children}
    </button>
  );
}
