import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { SITE, waLink } from "@/data/site";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — The Bite, Chandipur, Kuakhia" },
      { name: "description", content: "Find The Bite Near The Celebration Mandap, Chandipur, Kuakhia Market, Odisha 755009. Call 7077186377 / 9237237550." },
      { property: "og:title", content: "Visit The Bite, Kuakhia" },
      { property: "og:description", content: "Directions, phone and WhatsApp for The Bite." },
    ],
  }),
  component: Location,
});

function Location() {
  return (
    <>
      <PageHero eyebrow="Location" title="Find your table." image={interior} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <h2 className="font-display text-5xl tracking-[0.15em] text-gold-gradient">THE BITE</h2>
          <div className="mt-6 flex gap-3 text-lg"><MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" /><address className="not-italic leading-relaxed">{SITE.addressLines.map((l) => <div key={l}>{l}</div>)}</address></div>
          <div className="mt-6 space-y-2">
            {SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="flex items-center gap-3 text-lg hover:text-gold"><Phone className="h-5 w-5 text-gold" />{p}</a>)}
          </div>
          <div className="mt-10 grid gap-3">
            <a href={SITE.mapsLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-sm bg-gold-gradient py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground"><Navigation className="h-4 w-4" />GET DIRECTIONS</a>
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${SITE.phones[0]}`} className="flex items-center justify-center gap-2 rounded-sm border border-gold py-4 text-xs tracking-[0.2em] text-gold"><Phone className="h-4 w-4" />CALL NOW</a>
              <a href={waLink("Hello The Bite!")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-sm border border-gold py-4 text-xs tracking-[0.2em] text-gold"><MessageCircle className="h-4 w-4" />WHATSAPP</a>
            </div>
          </div>
        </div>
        <div className="min-h-[420px] overflow-hidden rounded-md hairline lg:col-span-3">
          <iframe title="The Bite on Google Maps" src={SITE.mapsEmbed} className="h-full min-h-[420px] w-full grayscale-[40%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </>
  );
}
