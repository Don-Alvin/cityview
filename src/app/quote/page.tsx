import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import site from "@/components/site.module.css";
import { services } from "@/content/services";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us the service, size, quantity and finish you need, and CityView Printers will come back to you with a quote.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = services.find((entry) => entry.slug === service)?.title;

  return (
    <section id="quote" className={`site-grid ${styles.quotePage}`} aria-labelledby="quote-title">
      <div className={styles.quoteIntro}>
        <h1 id="quote-title" className={site.pageTitle}>Request a quote</h1>
        <p className={site.prose}>
          Fill in your project details. WhatsApp opens with your message ready to send.
        </p>
      </div>
      <div className={styles.quoteBody}>
        <QuoteForm key={initialService ?? ""} services={services} initialService={initialService} />
      </div>
    </section>
  );
}
