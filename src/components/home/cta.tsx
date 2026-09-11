import { Container } from "../layout-primitives";
import { Button } from "../button";
import { contact } from "@/content/contact";

export function Cta() {
  return (
    <div className="bg-ink pb-14 text-paper lg:pb-24">
      <Container>
        <section className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-card border border-line bg-panel px-6 py-10 text-paper sm:flex-row sm:items-center lg:px-[62px] lg:py-14">
          <div>
            <p className="mb-4 text-eyebrow font-medium text-accent">
              YOUR NEXT GREAT IMPRESSION STARTS HERE.
            </p>
            <h2 className="font-display text-[clamp(42px,6vw,68px)] uppercase leading-[1]">
              Let&apos;s make
              <br />
              something great.
            </h2>
            <div className="mt-7">
              <Button href={contact.whatsappHref}>Message us on WhatsApp &#8599;</Button>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-7 bottom-8 text-[150px] leading-none text-accent opacity-10 lg:static lg:opacity-100 lg:text-[240px] lg:rotate-12"
          >
            &#10039;
          </span>
        </section>
      </Container>
    </div>
  );
}
