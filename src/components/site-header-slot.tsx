"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

/** Marks the active link in the shared desktop and mobile navigation. */
export function SiteHeaderSlot() {
  const pathname = usePathname();
  return <SiteHeader pathname={pathname} />;
}
