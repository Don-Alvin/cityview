import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CityView Printers | Print, Branding & Signage in Nairobi",
  description: "Print, branding, signage and merchandise, made in Nairobi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-KE"
      className={`${barlow.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
