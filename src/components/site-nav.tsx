"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./layout-primitives";
import { contact } from "@/content/contact";

const links = [
  { href: "/about", label: "About us" },
  { href: "/#services", label: "Our services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

/**
 * Client component because the mobile menu needs click state. Everything
 * else on this page can stay a server component; this is the one place
 * that genuinely needs the browser.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-paper text-ink">
      <Container>
        <header className="flex h-20 items-center justify-between gap-6 border-b border-line-light lg:h-[100px]">
          <Link href="/" className="flex items-center gap-[11px] text-xl font-bold leading-none tracking-[-0.8px]">
            <span aria-hidden="true" className="text-[41px] font-bold leading-[0.85] tracking-[-12px] lg:text-[46px]">
              c<i className="not-italic text-[#7f8a30]">v</i>
            </span>
            <span>
              CITYVIEW
              <small className="mt-[7px] block text-[10px] font-medium tracking-[4.3px]">
                PRINTERS
              </small>
            </span>
          </Link>

          <nav
            id="menu"
            className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-20 z-10 flex-col gap-5 border border-line-light bg-paper p-[22px] lg:static lg:flex lg:flex-row lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={contact.whatsappHref}
            className="hidden rounded-full border border-[#b9bcb0] px-[18px] py-[10px] text-sm lg:inline-flex"
          >
            Let&apos;s make something &#8599;
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-[#b6bdac] lg:hidden"
          >
            <span className="h-px w-[18px] bg-ink" />
            <span className="h-px w-[18px] bg-ink" />
          </button>
        </header>
      </Container>
    </div>
  );
}
