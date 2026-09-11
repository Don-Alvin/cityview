import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Services } from "@/components/home/services";
import { Possibilities } from "@/components/home/possibilities";
import { Why } from "@/components/home/why";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Services />
      <Possibilities />
      <Why />
      <Cta />
    </main>
  );
}
