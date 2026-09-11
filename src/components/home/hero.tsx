import Image from "next/image";
import { Container } from "../layout-primitives";
import { Button } from "../button";

export function Hero() {
  return (
    <div className="bg-paper text-ink">
      <Container>
        <section className="grid gap-8 pt-8 lg:grid-cols-[48%_52%] lg:pt-[50px]">
          <div className="pb-8 lg:pb-20">
            <p className="mb-[26px] text-eyebrow font-medium text-accent">
              &#10039; YOUR IDEAS. MADE TANGIBLE.
            </p>
            <h1 className="font-display text-display-xl uppercase">
              Make
              <br />
              your mark.
            </h1>
            <p className="mb-[26px] mt-6 text-[15px] text-dim-light">
              Print that gets noticed.
              <br />
              Branding that stays with you.
            </p>
            <Button href="#services" variant="ink">
              Explore our services &#8599;
            </Button>
          </div>

          <div className="relative h-[330px] overflow-hidden rounded-control lg:h-[460px]">
            {/* Replace alt text once the actual shot is in place. It must
                describe the printed item, not just the fact that it's a
                photo (DESIGN.md section 6). */}
            <Image
              src="/images/hero.png"
              alt="Printed work by CityView Printers"
              fill
              priority
              quality={80}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <span className="absolute right-3 bottom-4 rotate-[5deg] bg-accent px-[22px] py-5 text-[11px] font-bold leading-[1.12] text-accent-ink lg:right-[-14px] lg:bottom-[26px] lg:text-[13px]">
              PRINT.
              <br />
              BRAND.
              <br />
              STAND OUT. <b className="block text-[25px] font-normal">&#8599;</b>
            </span>
          </div>
        </section>

        <div className="flex min-h-[60px] flex-col items-start justify-center gap-2 border-t border-line-light py-4 text-[10px] tracking-[1.2px] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span>GOOD DESIGN DESERVES GREAT PRINT.</span>
          <a href="#about">Discover CityView &#8595;</a>
        </div>
      </Container>
    </div>
  );
}
