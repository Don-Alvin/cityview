import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/layout-primitives";
import site from "@/components/site.module.css";
import { services } from "@/content/services";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore commercial printing, branding and signage, apparel and merchandise, and custom packaging from CityView Printers in Kisumu.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro id="services-title" title="Services">
        <p>Explore our printing, signage, merchandise and packaging services.</p>
      </PageIntro>

      <ul className={site.pageLead} aria-labelledby="services-title" role="list">
        {services.map(({ slug, title, teaser, previewImage }, index) => (
          <li key={slug} className={`site-grid ${styles.serviceRow}`}>
            {previewImage && (
              <figure className={styles.serviceFigure} data-service={slug}>
                <Image
                  src={previewImage.src}
                  alt={previewImage.alt}
                  fill
                  quality={80}
                  sizes={index % 2 === 0 ? "(max-width: 760px) 85vw, 54vw" : "(max-width: 760px) 85vw, 62vw"}
                />
              </figure>
            )}
            <div className={styles.servicePreview}>
              <h2 className={site.sectionTitle}>{title}</h2>
              <p className={site.prose}>{teaser}</p>
              <Link href={`/services/${slug}`} className="text-link">
                View service<span className="sr-only"> details for {title}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
