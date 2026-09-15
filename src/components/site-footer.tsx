import Link from "next/link";
import { QuoteTrigger } from "./quote-trigger";
import { contact, whatsappLink } from "@/content/contact";

const serviceLinks = [
  { href: "/services/commercial-printing", label: "Commercial print" },
  { href: "/services/branding-and-signage", label: "Branding & signage" },
  { href: "/services/apparel-and-merchandise", label: "Merchandise" },
  { href: "/services/custom-packaging", label: "Packaging" },
];

const companyLinks = [
  { href: "/#trust", label: "Our approach" },
  { href: "/work", label: "Our work" },
  { href: "/#reviews", label: "Reviews" },
];

/**
 * CLAUDE.md launch checklist: real phone number in header, footer and
 * every service page, and WhatsApp click-to-chat as the primary path
 * everywhere, neither of which final_design.html's footer shows at all
 * (it only has an email address). Both added here alongside the
 * mockup's own layout rather than replacing it.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="card-section mt-3 bg-brand-deep px-6 py-14 text-white sm:px-10">
      <div className="flex flex-col gap-6 border-b border-white/15 pb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow light text-eyebrow font-medium">Start a project</span>
          <h2 className="mt-2 text-[3.75rem] font-medium leading-[0.92] tracking-[-0.04em]">
            Ready to
            <br />
            make your mark?
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href={whatsappLink()}
            className="inline-flex items-center gap-[0.55rem] rounded-pill bg-white px-7 py-[0.875rem] text-body-sm font-medium uppercase tracking-[0.07em] text-brand-deep hover:bg-brand"
          >
            Message us on WhatsApp
          </Link>
          <QuoteTrigger variant="outline-light">Request a quote</QuoteTrigger>
        </div>
      </div>

      <div className="grid gap-10 py-14 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-[20rem]">
          <span className="flex items-center gap-[0.55rem] text-[1.25rem] font-medium uppercase tracking-[0.2em]">
            <span aria-hidden="true" className="flex h-5 w-5 items-end gap-[0.12rem]">
              <i className="block h-[0.5rem] w-[0.22rem] bg-current" />
              <i className="block h-[0.85rem] w-[0.22rem] bg-current" />
              <i className="block h-[1.18rem] w-[0.22rem] bg-current" />
              <i className="block h-[0.7rem] w-[0.22rem] bg-current" />
            </span>
            CityView
          </span>
          <p className="mt-4 text-body-sm leading-[1.7] text-white/65">
            Printing and branding that turns ideas into tangible, memorable experiences.
          </p>
          <address className="mt-6 not-italic text-body-sm leading-[1.7]">
            <a href={contact.phoneHref} className="block text-white/80 hover:text-white">
              {contact.phoneDisplay}
            </a>
            <Link href={whatsappLink()} className="block text-white/80 hover:text-white">
              WhatsApp: {contact.whatsappNumber}
            </Link>
            <a href={`mailto:${contact.email}`} className="block text-white/80 hover:text-white">
              {contact.email}
            </a>
            <span className="block text-white/55">{contact.hours}</span>
          </address>
        </div>

        <nav aria-label="Services">
          <h3 className="text-eyebrow font-medium text-white/50">Services</h3>
          <ul className="mt-4 flex flex-col gap-3 text-body-sm text-white/80">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products">
          <h3 className="text-eyebrow font-medium text-white/50">Products</h3>
          <ul className="mt-4 flex flex-col gap-3 text-body-sm text-white/80">
            <li>
              <Link href="/#showcase" className="hover:text-white">
                Business cards
              </Link>
            </li>
            <li>
              <Link href="/#showcase" className="hover:text-white">
                Branded apparel
              </Link>
            </li>
            <li>
              <Link href="/#showcase" className="hover:text-white">
                Display banners
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-eyebrow font-medium text-white/50">Company</h3>
          <ul className="mt-4 flex flex-col gap-3 text-body-sm text-white/80">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Social links and legal (Privacy/Terms) links both removed rather
          than pointed at "#" or a page that doesn't exist yet
          (IMPLEMENTATION.md launch checklist: real accounts and real
          pages, or the footer links are removed) until either exists. */}
      <div className="border-t border-white/15 pt-8 text-body-sm text-white/60">
        <span>&copy; {year} CityView Printers. All rights reserved.</span>
      </div>
    </footer>
  );
}
