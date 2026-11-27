import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/layout-primitives";
import site from "@/components/site.module.css";
import { milestones, story } from "@/content/about";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Read how CityView Printers grew from a one-printer shop in Maseno in 2018 to a Kisumu team producing branding across western Kenya.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div id="about">
        <PageIntro id="about-title" title="Our Story"><p>{story[0]}</p></PageIntro>
        <section id="about-story" className={`site-grid ${site.pageLead} ${styles.story}`} aria-labelledby="about-title">
          <figure className={styles.storyFigure}>
            <Image
              src="/images/about.png"
              alt="CityView lettering on a set of black printed stationery"
              fill
              quality={80}
              sizes="(max-width: 760px) 92vw, 38vw"
            />
          </figure>
          <div className={`${styles.storyCopy} ${site.prose}`}>
            {story.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      </div>

      <section
        id="about-timeline"
        aria-labelledby="about-timeline-title"
        className={`site-grid section-gap ${styles.timeline}`}
      >
        <h2 id="about-timeline-title" className={`${site.sectionTitle} ${styles.ruleTitle}`}>Timeline</h2>
        <div className={styles.ruleContent}>
          <ol className={styles.ruleList} role="list">
            {milestones.map((milestone) => (
              <li key={milestone.title}>
                <h3>{milestone.title}</h3>
                <p>{milestone.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
