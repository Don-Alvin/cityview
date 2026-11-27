import Link from "next/link";
import { contact, hasContactDetail, hasContactPhone, whatsappLink } from "@/content/contact";
import { CityBackdrop } from "./city-backdrop";
import { QuoteTrigger } from "./quote-trigger";
import styles from "./site.module.css";

export function SiteFooter() {
  return (
    <footer className={`section-gap ${styles.footer}`}>
      <CityBackdrop />
      <div className={`site-grid ${styles.footerGrid}`}>
        <div className={styles.footerCopy}>
          <h2>Tell us about your project</h2>
        </div>
        <div className={`site-actions ${styles.footerActions}`}>
          <Link href={whatsappLink()} className="text-link">Message us on WhatsApp</Link>
          <QuoteTrigger className="site-action">Request a quote</QuoteTrigger>
        </div>
        <address className={styles.footerContact}>
          <span>{contact.addressLocality}, Kenya</span>
          {hasContactPhone && (
            <a href={contact.phoneHref} className="text-link">{contact.phoneDisplay}</a>
          )}
          {hasContactDetail(contact.hoursDisplay) && <span>{contact.hoursDisplay}</span>}
        </address>
        <small className={styles.copyright}>&copy; {new Date().getFullYear()} CityView Printers.</small>
      </div>
      <p className={styles.wordmark} aria-hidden="true">CityView</p>
    </footer>
  );
}
