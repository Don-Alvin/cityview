"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

/**
 * The header renders once, here in the layout, for every route. It used
 * to live inside <Hero />, which meant the home page had it and nothing
 * else did: /about, /contact, /work, /quote and all four service pages
 * had no nav, no logo and no way back to home, which is exactly where
 * WhatsApp deep links land.
 *
 * It also has to be here to be sticky at all. Inside the hero it sat in a
 * section that is overflow-hidden (needed, to clip the photograph to the
 * card radius) and position:sticky cannot escape a clipping ancestor.
 *
 * All that differs per route is the resting tone: white over the hero
 * photograph on home, ink on the light page ground everywhere else. Once
 * scrolled the header paints its own brand-deep ground either way.
 */
export function SiteHeaderSlot() {
  const pathname = usePathname();
  return <SiteHeader tone={pathname === "/" ? "light" : "ink"} />;
}
