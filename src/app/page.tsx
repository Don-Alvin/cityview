import { Hero } from "@/components/home/hero";
import { Trust } from "@/components/home/trust";
import { Services } from "@/components/home/services";
import { Showcase } from "@/components/home/showcase";
import { Stats } from "@/components/home/stats";
import { Reviews } from "@/components/home/reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Showcase />
      <Stats />
      <Reviews />
    </>
  );
}
