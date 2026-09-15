import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Trust } from "@/components/home/trust";
import { Services } from "@/components/home/services";
import { Showcase } from "@/components/home/showcase";
import { Stats } from "@/components/home/stats";
import { Reviews } from "@/components/home/reviews";

// IMPLEMENTATION.md: per-page metadata, no inherited defaults. The title
// is `absolute` because the home page is the one that should read as the
// business itself, not "Home | CityView Printers, Kisumu".
export const metadata: Metadata = {
  title: { absolute: "CityView Printers | Print, Branding & Signage in Kisumu" },
  description:
    "Business cards, banners, shopfront signage, branded apparel and custom packaging, printed in Kisumu.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Showcase />
      <Stats />
      <Reviews />
    </>
  );
}
