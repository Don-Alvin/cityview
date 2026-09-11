"use client";

import { useEffect, useRef } from "react";

/**
 * Adds .is-visible the first time the element enters the viewport, which
 * triggers the registration-reveal keyframe in globals.css. The element is
 * already fully visible before this runs (no clip-path by default), so a
 * slow, blocked or failed script just means the page never animates.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
