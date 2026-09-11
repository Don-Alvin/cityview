import { Container, Section, Eyebrow } from "../layout-primitives";

const items = [
  {
    n: "01",
    title: "A considered finish",
    body: "The right paper, colour and texture help every piece feel like your brand.",
  },
  {
    n: "02",
    title: "Consistency, everywhere",
    body: "A cohesive identity across your print, signage, packaging and merchandise.",
  },
  {
    n: "03",
    title: "From idea to something real",
    body: "Support with the details, from choosing a format to preparing the final artwork.",
  },
];

export function Why() {
  return (
    <Section className="bg-ink pb-14 text-paper lg:pb-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-[9%]">
          <div>
            <Eyebrow number="04">MADE WITH INTENTION</Eyebrow>
            <h2 className="font-display text-display-lg uppercase">
              Small details.
              <br />
              <span className="text-dim">Big difference.</span>
            </h2>
            <p className="mt-4 max-w-[350px] text-[15px] text-dim">
              Your brand deserves more than ink on a page. It deserves care
              at every step.
            </p>
            <div aria-hidden="true" className="mt-8 hidden text-[105px] leading-[1.2] text-accent lg:block">
              &#10039;
            </div>
          </div>
          <div>
            {items.map((item) => (
              <article key={item.n} className="flex gap-5 border-t border-line py-6">
                <span className="pt-1 text-xs text-accent">{item.n}</span>
                <div>
                  <h3 className="mb-[9px] text-[18px] font-medium">{item.title}</h3>
                  <p className="text-body-sm text-dim">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
