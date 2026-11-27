import Link from "next/link";
import { PriceFrom } from "@/components/price-from";
import { services } from "@/content/services";
import styles from "./home.module.css";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={`site-grid section-gap ${styles.tableSection}`}
    >
      <div className={styles.tableTitle}>
        <h2 id="services-title">Get a quote by service</h2>
        <Link href="/services" className="text-link">View all services</Link>
      </div>
      <div className={styles.tableData}>
        <table className={styles.serviceTable} aria-labelledby="services-title">
          <tbody>
            {services.map(({ slug, title, priceFrom }) => (
              <tr key={slug}>
                <th scope="row">
                  <Link href={`/services/${slug}`}>{title}</Link>
                  <PriceFrom amount={priceFrom} />
                </th>
                <td>
                  <Link href={`/quote?service=${slug}`} className="text-link">
                    Request a quote<span className="sr-only"> for {title}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
