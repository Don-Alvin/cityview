import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout-primitives";
import site from "@/components/site.module.css";
import { services } from "@/content/services";
import { whatsappLink } from "@/content/contact";
import styles from "./editorial.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "That page does not exist. Find CityView Printers' services, work and contact details here.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageIntro id="not-found-title" title="Page not found">
        <p>The page may have moved. Browse our services or return to the homepage.</p>
      </PageIntro>
      <div className={`site-grid ${site.pageLead}`}>
        <ul className={`${styles.missingList} ${styles.ruleList}`} role="list">
          {services.map(({ slug, title, teaser }) => (
            <li key={slug}>
              <Link href={`/services/${slug}`} className="text-link">{title}</Link>
              <span>{teaser}</span>
            </li>
          ))}
        </ul>
        <div className={`site-actions ${styles.rowActions} ${styles.missingActions}`}>
          <Link href="/" className="site-action">Back to home</Link>
          <Link href={whatsappLink()} className="text-link">Message us on WhatsApp</Link>
        </div>
      </div>
    </>
  );
}
