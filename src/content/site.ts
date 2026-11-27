/**
 * IMPLEMENTATION.md open item: domain not yet purchased. Defaults to the
 * name it names as the target ("cityviewprinters.co.ke or similar"), but
 * every reference to the site's own URL (sitemap, robots, metadataBase)
 * reads from here, so pointing it at the real domain, or overriding via
 * NEXT_PUBLIC_SITE_URL before that, is a one-line change.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cityviewprinters.co.ke";
export const themeKey = "cityview-theme";

export const mainNavigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;
