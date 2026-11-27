import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/layout-primitives";
import site from "@/components/site.module.css";
import { galleryPhotos } from "@/content/gallery";
import { getService, services } from "@/content/services";
import styles from "../editorial.module.css";

const categories = [{ slug: undefined, title: "All" }, ...services];

function getCategory(value: string | string[] | undefined) {
  return typeof value === "string" ? getService(value) : undefined;
}

function galleryHref(slug?: string) {
  return slug ? `/gallery?category=${slug}` : "/gallery";
}

export async function generateMetadata({ searchParams }: PageProps<"/gallery">): Promise<Metadata> {
  const category = getCategory((await searchParams).category);
  return {
    title: category ? `${category.title} Gallery` : "Gallery",
    description:
      "See CityView Printers' commercial printing, signage, branded merchandise and packaging work in Kisumu.",
    alternates: { canonical: galleryHref(category?.slug) },
  };
}

export default async function GalleryPage({ searchParams }: PageProps<"/gallery">) {
  const category = getCategory((await searchParams).category);
  const photos = category
    ? galleryPhotos.filter((photo) => photo.category === category.slug)
    : galleryPhotos;

  return (
    <>
      <PageIntro id="gallery-title" title="Gallery">
        <p>Browse our printing, signage, merchandise and packaging work.</p>
      </PageIntro>
      <section className={site.pageLead} aria-labelledby="gallery-title">
        <nav className={styles.galleryFilters} aria-label="Filter photos by service">
          {categories.map(({ slug, title }) => (
            <Link
              key={slug ?? "all"}
              href={galleryHref(slug)}
              aria-current={slug === category?.slug ? "page" : undefined}
              scroll={false}
            >
              {title}
            </Link>
          ))}
        </nav>
        <p id="gallery-photos" tabIndex={-1} className={styles.galleryCount} aria-live="polite">
          {photos.length === 0
            ? "Photos for this service are coming soon."
            : `${photos.length} ${photos.length === 1 ? "photo" : "photos"}`}
        </p>
        {photos.length > 0 && (
          <ul aria-label={category ? `${category.title} photos` : "All project photos"} role="list" className={`site-grid ${styles.photoGrid}`}>
            {photos.map(({ file, alt, width, height }, index) => (
              <li key={file}>
                <Image
                  src={`/gallery/${encodeURIComponent(file)}`}
                  alt={alt}
                  width={width}
                  height={height}
                  quality={80}
                  sizes={index % 5 < 2 ? "46vw" : "(max-width: 760px) 46vw, 30vw"}
                  className={styles.galleryImage}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
