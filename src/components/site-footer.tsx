import Link from "next/link";
import { Container } from "./layout-primitives";
import { contact } from "@/content/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink pt-14 text-paper">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Link href="/" className="flex items-center gap-[11px] text-xl font-bold leading-none tracking-[-0.8px]">
            <span aria-hidden="true" className="text-[46px] font-bold leading-[0.85] tracking-[-12px]">
              c<i className="not-italic text-accent">v</i>
            </span>
            <span>
              CITYVIEW
              <small className="mt-[7px] block text-[10px] font-medium tracking-[4.3px]">
                PRINTERS
              </small>
            </span>
          </Link>

          <div className="text-right text-sm leading-[2] text-dim">
            <Link href={contact.phoneHref} className="text-paper">
              <b className="font-normal text-accent">Call</b> {contact.phoneDisplay}
            </Link>
            <br />
            <Link href={contact.whatsappHref} className="text-paper">
              <b className="font-normal text-accent">WhatsApp</b> {contact.phoneDisplay}
            </Link>
            <br />
            <Link href={`mailto:${contact.email}`} className="text-paper">
              {contact.email}
            </Link>
            <br />
            <span>{contact.hours}</span>
          </div>
        </div>

        <div className="mt-[34px] flex flex-col gap-2 border-t border-line py-7 text-micro text-dim sm:flex-row sm:justify-between">
          <span>&copy; {year} CityView Printers</span>
          <span>NAIROBI, KENYA</span>
        </div>
      </Container>
    </footer>
  );
}
