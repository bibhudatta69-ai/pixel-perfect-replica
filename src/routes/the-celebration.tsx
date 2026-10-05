import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { Lightbox, type Shot } from "@/components/site/Lightbox";
import { SITE, waLink } from "@/data/site";
import celebration1 from "@/assets/celebration-1.jpg.asset.json";
import celebration2 from "@/assets/celebration-2.jpg.asset.json";
import celebration3 from "@/assets/celebration-3.jpg.asset.json";
import celebration4 from "@/assets/celebration-4.jpg.asset.json";
import celebration5 from "@/assets/celebration-5.jpg.asset.json";
import family from "@/assets/family.jpg";

export const Route = createFileRoute("/the-celebration")({
  head: () => ({
    meta: [
      { title: "The Celebration — Mandap & Banquet, Kuakhia" },
      { name: "description", content: "The Celebration: mandap & banquet venue for weddings, receptions, birthdays and gatherings — opposite The Bite, Kuakhia." },
      { property: "og:title", content: "The Celebration — Mandap & Banquet Venue" },
      { property: "og:description", content: "Where special moments become unforgettable memories." },
    ],
  }),
  component: Celebration,
});

const EVENTS = ["Marriages", "Birthday Celebrations", "Marriage Receptions", "Engagement Ceremonies", "Parties", "Family Get-Togethers", "Meetings", "Corporate / Social Gatherings", "Other Special Occasions"];
// Set confirmed: true once the owner confirms each facility.
const FACILITIES = [
  { t: "AC Chilled Hall", confirmed: false }, { t: "Spacious Event Area", confirmed: false },
  { t: "Seating Arrangement", confirmed: false }, { t: "Dining / Catering Support", confirmed: false },
  { t: "Stage / Decoration Space", confirmed: false }, { t: "Lighting", confirmed: false },
  { t: "Sound / Event Setup Support", confirmed: false }, { t: "Parking / Access", confirmed: false },
];
// Real venue photos — The Celebration, Kuakhia.
const VENUE: Shot[] = [
  { src: celebration2.url, caption: "The Celebration — Main Stage" },
  { src: celebration1.url, caption: "Stage decor under the lights" },
  { src: celebration4.url, caption: "Royal seating & floral arch" },
  { src: celebration3.url, caption: "Evening celebrations" },
  { src: celebration5.url, caption: "Banquet & catering area" },
];

const BOOKING_MSG = "Hello, I would like to enquire about booking The Celebration.\n\nEvent Type:\nPreferred Date:\nNumber of Guests:\nName:\n\nPlease share availability and package details.";

function Celebration() {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <section className="relative flex min-h-[90svh] items-end overflow-hidden pb-20">
        <img src={celebration2.url} alt="The Celebration venue decorated for an event" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-overlay/30" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
          <p className="eyebrow">Mandap & Banquet · By the owners of The Bite</p>
          <h1 className="mt-5 text-6xl md:text-8xl">The Celebration</h1>
          <p className="mt-4 max-w-xl font-display text-2xl italic text-muted-foreground">Where special moments become unforgettable memories.</p>
          <p className="mt-3 text-xs text-muted-foreground">Photos from events at The Celebration.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-5 py-20 lg:px-8">
        <section>
          <p className="eyebrow">Events We Host</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e, i) => (
              <div key={e} className="tilt-card flex items-center gap-5 rounded-md hairline bg-card p-6">
                <span className="font-display text-3xl text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl">{e}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow">Facilities</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f) => (
              <div key={f.t} className="rounded-md hairline p-5">
                <p className="font-display text-xl">{f.t}</p>
                {!f.confirmed && <p className="mt-1 text-xs text-muted-foreground">Facility details to be updated</p>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow">The Celebration — Venue</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VENUE.map((s, i) => (
              <button key={i} onClick={() => setIdx(i)} className="group relative overflow-hidden rounded-md hairline">
                <img src={s.src} alt={s.caption} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-overlay/90 to-transparent p-4 text-left font-display text-lg italic text-gold">{s.caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-md hairline bg-card p-10 text-center md:p-16">
          <p className="eyebrow">Book The Celebration</p>
          <h2 className="mt-4 text-5xl">Plan your occasion with us.</h2>
          <p className="mt-3 text-muted-foreground">Call {SITE.phones.join(" / ")} for availability and packages.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="flex items-center gap-2 rounded-sm border border-gold px-6 py-4 text-xs tracking-[0.2em] text-gold"><Phone className="h-4 w-4" />CALL {p}</a>)}
            <a href={waLink(BOOKING_MSG)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-sm bg-gold-gradient px-6 py-4 text-xs font-semibold tracking-[0.2em] text-primary-foreground"><MessageCircle className="h-4 w-4" />WHATSAPP FOR BOOKING</a>
          </div>
        </section>

        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Planning a celebration?</p>
            <h2 className="mt-4 text-5xl leading-tight">The Celebration for the venue. The Bite for the food.</h2>
            <p className="mt-5 text-muted-foreground">Celebrate your special moments at The Celebration and make the occasion even more memorable with flavours from The Bite.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-sm border border-gold px-6 py-3.5 text-xs tracking-[0.2em] text-gold">EXPLORE THE CELEBRATION</a>
              <Link to="/order" className="rounded-sm bg-gold-gradient px-6 py-3.5 text-xs font-semibold tracking-[0.2em] text-primary-foreground">ORDER FROM THE BITE</Link>
            </div>
          </div>
          <img src={family} alt="Family feast" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover hairline" />
        </section>
      </div>
      <Lightbox shots={VENUE} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
