import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Chrome";
import { Lightbox, type Shot } from "@/components/site/Lightbox";
import biryani from "@/assets/biryani-hero.jpg";
import tandoori from "@/assets/tandoori.jpg";
import interior from "@/assets/interior.jpg";
import family from "@/assets/family.jpg";
import curryVeg from "@/assets/curry-veg.jpg";
import curryNonveg from "@/assets/curry-nonveg.jpg";
import riceNaan from "@/assets/rice-naan.jpg";
import starters from "@/assets/starters.jpg";
import special from "@/assets/special.jpg";
import chinese from "@/assets/chinese.jpg";
import celebration1 from "@/assets/celebration-1.jpg";
import celebration2 from "@/assets/celebration-2.jpg";
import celebration3 from "@/assets/celebration-3.jpg";
import celebration4 from "@/assets/celebration-4.jpg";
import celebration5 from "@/assets/celebration-5.jpg";
import biteMuralSinger from "@/assets/bite-mural-pirate.jpg";
import biteDiningGuests from "@/assets/bite-dining-guests.jpg";
import biteOutdoorNeon from "@/assets/bite-outdoor-neon.jpg";
import biteMuralSmoker from "@/assets/bite-mural-smoker.jpg";
import biteMuralPirate from "@/assets/bite-mural-pirate.jpg";
import biteCabinDining from "@/assets/bite-cabin-dining.jpg";
import biteGuestsSelfie from "@/assets/bite-guests-selfie.jpg";
import biteTeam from "@/assets/bite-team.jpg";
import biteCabinSeating from "@/assets/bite-cabin-seating.jpg";
import celebrationReception from "@/assets/celebration-reception.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Bite, Kuakhia" },
      { name: "description", content: "A look at the food and atmosphere at The Bite restaurant." },
      { property: "og:title", content: "The Bite — Gallery" },
      { property: "og:description", content: "Signature dishes and moments from The Bite." },
    ],
  }),
  component: Gallery,
});

// Demo images — replace with real restaurant photos and edit captions here.
const SHOTS: Shot[] = [
  { src: biteOutdoorNeon, caption: "The Bite at night — lit up and welcoming." },
  { src: biteMuralSinger, caption: "Street-art wall at the entrance." },
  { src: biteMuralSmoker, caption: "Hand-painted art inside the restaurant." },
  { src: biteMuralPirate, caption: "Colourful murals around every corner." },
  { src: biteCabinSeating, caption: "Comfortable AC cabin seating." },
  { src: biteDiningGuests, caption: "Good times with friends over dinner." },
  { src: biteCabinDining, caption: "Family dining in the AC cabin." },
  { src: biteGuestsSelfie, caption: "Meals made for laughter and stories." },
  { src: biteTeam, caption: "Friends first choice to hangout." },
  { src: biryani, caption: "Aromatic, rich and served fresh." },
  { src: tandoori, caption: "Smoky flavours from the tandoor." },
  { src: interior, caption: "An inviting place to gather." },
  { src: family, caption: "Good food tastes better together." },
  { src: curryVeg, caption: "Rich flavours for vegetarian food lovers." },
  { src: curryNonveg, caption: "Bold flavours, freshly prepared." },
  { src: riceNaan, caption: "Classic comfort, served warm." },
  { src: chinese, caption: "Welcome to The Bite." },
  { src: starters, caption: "Made for memorable occasions." },
  { src: special, caption: "The Bite experience." },
  { src: celebrationReception, caption: "The Celebration — Reception entrance." },
  { src: celebration2, caption: "The Celebration — Mandap & Banquet." },
  { src: celebration1, caption: "Stage decor under the lights." },
  { src: celebration4, caption: "Royal seating & floral arch." },
  { src: celebration3, caption: "Evening celebrations at The Celebration." },
  { src: celebration5, caption: "Banquet & catering area." },
];

function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments at The Bite." intro="Tap any photo to view it full screen." image={interior} />
      <div className="mx-auto max-w-7xl columns-1 gap-5 px-5 pb-24 sm:columns-2 lg:columns-3 lg:px-8">
        {SHOTS.map((s, i) => (
          <button key={i} onClick={() => setIdx(i)} className="tilt-card group relative mb-5 block w-full overflow-hidden rounded-md hairline">
            <img src={s.src} alt={s.caption} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-overlay/85 to-transparent p-5 opacity-90 transition group-hover:opacity-100">
              <p className="text-left font-display text-xl italic text-gold">{s.caption}</p>
            </div>
          </button>
        ))}
      </div>
      <Lightbox shots={SHOTS} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
