"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import styles from "./home.module.css";

export function Features() {
  const chapterList = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(services[0].slug);

  useEffect(() => {
    const chapters = chapterList.current?.querySelectorAll<HTMLElement>("[data-service]");
    if (!chapters?.length || !("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | undefined;
    function observeChapters() {
      observer?.disconnect();
      const height = window.innerHeight;
      const anchor = Math.round(height * 0.47);
      const chapterObserver = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting);
          const service = (current?.target as HTMLElement | undefined)?.dataset.service;
          if (service) setActiveService(service);
        },
        { rootMargin: `-${anchor}px 0px -${height - anchor - 1}px 0px` },
      );
      chapters?.forEach((chapter) => chapterObserver.observe(chapter));
      observer = chapterObserver;
    }

    observeChapters();
    window.addEventListener("resize", observeChapters);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeChapters);
    };
  }, []);

  return (
    <section
      id="showcase"
      aria-labelledby="features-title"
      className={`site-grid section-gap ${styles.showcase}`}
    >
      <div className={styles.showcaseIntro}>
        <h2 id="features-title">What we make</h2>
        <p>
          Printing, signage, branded merchandise and custom packaging for businesses and events.
        </p>
      </div>
      <figure className={styles.serviceFigure} data-active-service={activeService}>
        {services.map(({ slug, previewImage }) => previewImage && (
          <Image
            key={slug}
            src={previewImage.src}
            alt={previewImage.alt}
            fill
            quality={80}
            sizes="(max-width: 760px) 40vw, 52vw"
            className={styles.serviceImage}
            hidden={slug !== activeService}
          />
        ))}
      </figure>
      <div className={styles.chapters} ref={chapterList}>
        {services.map(({ slug, title, teaser, products }) => (
          <article key={slug} className={styles.chapter} data-service={slug}>
            <h3>{title}</h3>
            <p>{teaser}</p>
            <ul role="list">
              {products.slice(-2).map((product) => <li key={product}>{product}</li>)}
            </ul>
            <Link href={`/services/${slug}`} className="text-link">
              View service<span className="sr-only"> details for {title}</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
