import Image from "next/image";
import { Container, Section, Eyebrow } from "../layout-primitives";

const list = ["Everyday essentials", "Event-ready branding", "Products with personality"];

export function Possibilities() {
  return (
    <Section className="bg-ink text-paper">
      <Container>
        <Eyebrow number="03">THINK BEYOND THE ORDINARY</Eyebrow>
        <h2 className="font-display text-display-lg uppercase">
          Limitless possibilities.
          <br />
          One distinctive brand.
        </h2>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 lg:grid-cols-[35%_65%]">
          <div className="lg:pr-12">
            <span className="text-xs tracking-[1px] text-accent">CV / 01</span>
            <h3 className="my-4 text-heading font-medium">
              A whole world with your name on it.
            </h3>
            <p className="text-body-sm leading-[1.8] text-dim">
              Bring the same distinctive look to everything you make, from a
              single business card to a complete branded collection.
            </p>
            <div className="mt-5 text-sm">
              {list.map((item) => (
                <span key={item} className="block border-b border-line py-[9px]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-[330px] overflow-hidden rounded-card lg:h-[430px]">
            {/* Replace alt text once the actual shot is in place. */}
            <Image
              src="/images/possibilities.png"
              alt="Range of branded print and merchandise by CityView Printers"
              fill
              quality={80}
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
