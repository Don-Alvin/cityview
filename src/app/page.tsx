import type { Metadata } from "next";
import Link from "next/link";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Workflow } from "@/components/home/workflow";
import styles from "@/components/home/home.module.css";

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

      <section
        className={`site-grid section-gap ${styles.thesis}`}
        aria-labelledby="story-title"
      >
        <h2 id="story-title">
          From one room in Maseno to a print and branding studio in Kisumu
        </h2>
        <div className={styles.thesisCopy}>
          <p>
            We started with one printer in 2018. Today our team of more than 20 works
            with everyone from local shops to organisations such as Safaricom, NTSA
            and Bolt on print, signage and event branding.
          </p>
          <Link href="/gallery" className="text-link">See our work</Link>
        </div>
      </section>

      <Features />
      <Workflow />
      <Services />
    </>
  );
}
