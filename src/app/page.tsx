"use client";

import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Gallery } from "@/components/Gallery";
import { Weekend } from "@/components/Weekend";
import { Location } from "@/components/Location";
import { GoodToKnow } from "@/components/GoodToKnow";
import { Rsvp } from "@/components/Rsvp";
import { Footer } from "@/components/Footer";
import { MusicToggle } from "@/components/MusicToggle";
import { FloatingPetals } from "@/components/FloatingPetals";

export default function Home() {
  useSmoothScroll();

  return (
    <>
      <Intro />
      <FloatingPetals />
      <main className="relative">
        <Navbar />
        <Hero />
        <Story />
        <Gallery />
        <Weekend />
        <Location />
        <GoodToKnow />
        <Rsvp />
        <Footer />
        <MusicToggle />
      </main>
    </>
  );
}
