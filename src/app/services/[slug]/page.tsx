import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PriceFrom } from "@/components/price-from";
import site from "@/components/site.module.css";
import { getService, services } from "@/content/services";
import { whatsappLink } from "@/content/contact";
import styles from "../../editorial.module.css";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    // absolute: services.ts already carries a full, tuned title with the
    // town in it, so it opts out of the layout's "%s | CityView Printers,
    // Kisumu" template rather than ending up with the town twice.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

/**
 * IMPLEMENTATION.md: services are real, indexable pages, not a modal
 * (final_design.html's own service rows link out to nowhere, they're
 * just home-page copy, so this whole page is new rather than ported).
 * The product list is the most search-relevant content on the site, so
 * it's plain markup here, not something that only exists after a click.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <header id="service" className={`site-grid ${styles.serviceHero}`}>
        <div className={styles.serviceLead}>
          <h1 id="service-title" className={site.pageTitle}>{service.title}</h1>
          <p className={site.prose}>{service.intro}</p>
          <Link href={whatsappLink(service.title)} className="site-action">Message us on WhatsApp</Link>
        </div>
        {service.previewImage && (
          <figure className={styles.serviceHeroFigure} data-service={service.slug}>
            <Image
              src={service.previewImage.src}
              alt={service.previewImage.alt}
              fill
              quality={80}
              sizes="(max-width: 760px) 92vw, 45vw"
            />
          </figure>
        )}
      </header>

      <section className={`site-grid section-gap ${styles.serviceCatalogue}`} aria-labelledby="production-title">
        <div className={styles.ruleTitle}>
          <h2 id="production-title" className={site.sectionTitle}>What we produce</h2>
          <PriceFrom amount={service.priceFrom} />
        </div>
        <div className={styles.ruleContent}>
          <ul className={styles.ruleList} role="list">
            {service.products.map((product) => <li key={product}>{product}</li>)}
          </ul>
          <div className={`site-actions ${styles.rowActions}`}>
            <Link href={`/quote?service=${service.slug}`} className="text-link">
              Request a quote online
            </Link>
            <Link href="/services" className="text-link">Back to all services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
