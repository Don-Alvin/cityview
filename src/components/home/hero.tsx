import Image from "next/image";
import Link from "next/link";
import { CityBackdrop } from "@/components/city-backdrop";
import { foundedYear } from "@/content/about";
import styles from "./home.module.css";

const studioFacts = [
  { label: "Clients served", value: "100+" },
  { label: "Founded", value: foundedYear },
  { label: "Team members", value: "20+" },
  { label: "Based in", value: "Kisumu, Kenya" },
];

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroStage}>
        <CityBackdrop eager />
        <h1 id="hero-title" className={styles.heroTitle} aria-label="CityView Printers">CityView</h1>
        <figure className={styles.heroCutout}>
          <span className={styles.contactShadow} aria-hidden="true" />
          <div className={styles.floatingCutout}>
            <Image
              src="/images/cityview-studio-cutout.webp"
              alt="Studio mockup of a branded canvas tote, packaging, brochure and business cards"
              fill
              preload
              sizes="(max-width: 760px) 43vw, (max-width: 1170px) 34vw, 405px"
              className={styles.cutoutImage}
            />
            <span className={styles.lightSweep} aria-hidden="true" />
          </div>
        </figure>
        <dl className={`site-grid ${styles.cornerFacts}`}>
          {studioFacts.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.dock}>
        <span>Printing, branding and signage</span>
        <Link href="/quote" className="site-action">Start your project</Link>
      </div>
    </section>
  );
}
