"use client";

import { useSyncExternalStore } from "react";
import { themeKey } from "@/content/site";
import styles from "./site.module.css";

const preference = "(prefers-color-scheme: dark)";
const themeChanged = "cityview-theme-change";

function getTheme() {
  const theme = document.documentElement.dataset.theme;
  if (theme === "dark" || theme === "light") return theme;
  return window.matchMedia(preference).matches ? "dark" : "light";
}

function subscribe(notify: () => void) {
  const media = window.matchMedia(preference);
  function syncStorage(event: StorageEvent) {
    if (event.key !== themeKey && event.key !== null) return;
    if (event.newValue === "light" || event.newValue === "dark") {
      document.documentElement.dataset.theme = event.newValue;
    } else {
      delete document.documentElement.dataset.theme;
    }
    notify();
  }

  media.addEventListener("change", notify);
  window.addEventListener(themeChanged, notify);
  window.addEventListener("storage", syncStorage);
  return () => {
    media.removeEventListener("change", notify);
    window.removeEventListener(themeChanged, notify);
    window.removeEventListener("storage", syncStorage);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const next = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(themeKey, next);
    } catch {
      // The active page still switches when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(themeChanged));
  }

  return (
    <button type="button" className={styles.iconButton} onClick={toggle} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m16.2-6.7-1.4 1.4M6.7 17.3l-1.4 1.4m13.4 0-1.4-1.4M6.7 6.7 5.3 5.3" />
          </>
        ) : (
          <path d="M20.8 14.3A9 9 0 0 1 9.7 3.2a9 9 0 1 0 11.1 11.1Z" />
        )}
      </svg>
    </button>
  );
}
