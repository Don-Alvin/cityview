"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

/**
 * Every page needs the nav, not just the home page: Alvin found there was
 * no way back to home from /about, /contact and the rest, because the
 * header only existed inside the hero.
 *
 * It can't simply move to the layout, though. On home the header is part
 * of the hero: it sits inside the hero card, over the photograph, in
 * white. Rendering it in the layout instead would lift it out of the
 * photo and onto the white page gutter above the card, which is a visible
 * change to the approved design. So home keeps rendering its own (inside
 * <Hero />) and this slot fills in everywhere else, in the ink tone that
 * a light page ground needs.
 */
export function SiteHeaderSlot() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteHeader tone="ink" />;
}
