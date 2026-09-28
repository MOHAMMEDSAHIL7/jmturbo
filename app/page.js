import Hero from "../components/Hero";
import Stats from "../components/Stats";
import CarSection from "../components/CarSection";
import CarInfo from "../components/CarInfo";
import Education from "../components/Education";
import Directory from "../components/Directory";
import Booking from "../components/Booking";
import Reveal from "../components/Reveal";
import { bmw, supra, lancer } from "../data/cars";
import { bmwInfo, supraInfo, lancerInfo } from "../data/carInfo";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal>
        <Stats />
      </Reveal>
      <CarSection cfg={bmw} />
      <Reveal>
        <CarInfo info={bmwInfo} />
      </Reveal>
      <CarSection cfg={supra} />
      <Reveal>
        <CarInfo info={supraInfo} />
      </Reveal>
      <CarSection cfg={lancer} />
      <Reveal>
        <CarInfo info={lancerInfo} />
      </Reveal>
      <Reveal>
        <Education />
      </Reveal>
      <Reveal>
        <Directory />
      </Reveal>
      <Reveal>
        <Booking />
      </Reveal>
    </main>
  );
}