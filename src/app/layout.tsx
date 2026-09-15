import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";
import { siteUrl } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";
import { StickyWhatsapp } from "@/components/sticky-whatsapp";
import { QuoteModal } from "@/components/quote-modal";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CityView Printers | Print, Branding & Signage in Nairobi",
  description: "Print, branding, signage and merchandise, made in Nairobi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-KE"
      className={`${onest.variable} h-full antialiased`}
      // The beforeInteractive script below adds .js to this element
      // before React hydrates, which is a deliberate, expected mismatch
      // between the server-rendered class and what's in the DOM by the
      // time hydration runs, not a bug for React to warn about or "fix"
      // by reverting it.
      suppressHydrationWarning
    >
      {/* No preloader (DESIGN.md section 6): the mockup's brand-deep
          overlay holds for ~1.4s before revealing content, which delays
          LCP on a site whose whole job is showing photographs fast. The
          page just renders. */}
      <body className="min-h-full bg-background text-ink font-sans">
        {/* beforeInteractive: must run before .inview elements paint, so
            the CSS in globals.css can gate opacity:0 behind .js actually
            being present. If this never runs (JS blocked or fails),
            <html> stays without .js and every .inview element renders
            at its default, fully visible state instead of staying
            hidden forever. */}
        <Script id="mark-js" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');`}
        </Script>
        <main className="page">
          {children}
          <SiteFooter />
        </main>
        <StickyWhatsapp />
        <QuoteModal />
      </body>
    </html>
  );
}
