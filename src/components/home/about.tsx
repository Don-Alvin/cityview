import Image from "next/image";
import { Container, Section, Eyebrow } from "../layout-primitives";
import { RevealBox } from "../reveal-box";

export function About() {
  return (
    <Section id="about" className="bg-ink text-paper">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-[9%]">
          <div className="relative h-[340px] overflow-hidden rounded-card lg:h-[500px]">
            {/* Replace alt text once the actual shot is in place. */}
            <Image
              src="/images/about.png"
              alt="Detail of finished print work by CityView Printers"
              fill
              quality={80}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow number="01">THE CITYVIEW APPROACH</Eyebrow>
            <RevealBox>
              <h2 className="font-display text-display-lg uppercase">
                Big ideas.
                <br />
                <span className="text-dim">Brilliantly</span>
                <br />
                printed.
              </h2>
            </RevealBox>
            <p className="mb-4 max-w-[450px] text-[15px] leading-[1.8] text-dim">
              A business card worth keeping. A shopfront you can&apos;t miss.
              Packaging that feels as good as it looks.
            </p>
            <p className="mb-4 max-w-[450px] text-[15px] leading-[1.8] text-dim">
              We bring your identity into the real world through thoughtful
              design, careful printing and considered finishes.
            </p>
            <a
              href="#services"
              className="mt-4 inline-flex items-center gap-11 border-b border-dim pb-2 text-sm"
            >
              Discover the possibilities <b className="text-[22px] font-normal text-accent">&#8599;</b>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
