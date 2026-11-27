"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contact, hasContactPhone, whatsappLink } from "@/content/contact";
import { mainNavigation } from "@/content/site";
import { QuoteTrigger } from "./quote-trigger";
import { ThemeToggle } from "./theme-toggle";
import styles from "./site.module.css";

function Brand({ pathname, onClick }: { pathname: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      className={styles.brand}
      aria-current={pathname === "/" ? "page" : undefined}
      onClick={onClick}
    >
      <span aria-hidden="true" className={styles.brandMark}>
        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path d="M0 12h3.5v8H0zm5.5-6H9v14H5.5zM11 0h3.5v20H11zm5.5 8H20v12h-3.5z" />
        </svg>
      </span>
      CityView Printers
    </Link>
  );
}

function NavigationLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const navigation = onNavigate ? mainNavigation : mainNavigation.slice(1);
  return navigation.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      aria-current={pathname === href ? "page" : href === "/services" && pathname.startsWith("/services/") ? "location" : undefined}
      onNavigate={onNavigate}
    >
      {label}
    </Link>
  ));
}

export function SiteHeader({ pathname }: { pathname: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
    closeButton.current?.focus();
  }

  function closeMenu() {
    dialog.current?.close();
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) dialog.current?.close();
    }
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <header>
        <address className={`site-grid ${styles.contactStrip}`} aria-label="Contact details">
          <div className={styles.contactStripLinks}>
            <a href={whatsappLink()}>WhatsApp</a>
            {hasContactPhone && (
              <>
                <span aria-hidden="true">/</span>
                <a href={contact.phoneHref}>Call {contact.phoneDisplay}</a>
              </>
            )}
          </div>
          <span className={styles.contactStripLocation}>{contact.addressLocality}, Kenya</span>
        </address>
        <div className={`site-grid ${styles.header}`}>
          <Brand pathname={pathname} />
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <NavigationLinks pathname={pathname} />
          </nav>
          <div className={styles.headerControls}>
            <ThemeToggle />
            <button
              type="button"
              className={`${styles.iconButton} ${styles.menuTrigger}`}
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <dialog id="mobile-menu" ref={dialog} className={styles.mobileMenu} aria-label="Main menu" onClose={() => setOpen(false)}>
        <div className={styles.mobileMenuInner}>
          <div className={styles.menuHeader}>
            <Brand pathname={pathname} onClick={closeMenu} />
            <button ref={closeButton} type="button" className={styles.iconButton} onClick={closeMenu} aria-label="Close menu">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav className={styles.mobileLinks} aria-label="Main navigation">
            <NavigationLinks pathname={pathname} onNavigate={closeMenu} />
          </nav>
          <div className="site-actions">
            <Link href={whatsappLink()} className="text-link">Message us on WhatsApp</Link>
            <QuoteTrigger className="site-action" beforeOpen={closeMenu}>Request a quote</QuoteTrigger>
          </div>
          <div className={styles.menuContact}>
            <span>{contact.addressLocality}, Kenya</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
