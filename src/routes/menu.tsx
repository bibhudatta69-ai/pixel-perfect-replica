import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Expand } from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { MenuBrowser } from "@/components/site/MenuBrowser";
import { Lightbox, type Shot } from "@/components/site/Lightbox";
import tandoori from "@/assets/tandoori.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — The Bite, Kuakhia" },
      { name: "description", content: "The complete menu of The Bite: biryani, tandoor, curries, starters, rolls, chowmein and more, with half/full prices." },
      { property: "og:title", content: "The Bite — Full Menu" },
      { property: "og:description", content: "Browse every dish, filter veg/non-veg and order on WhatsApp." },
    ],
  }),
  component: MenuPage,
});

// Replace these with the restaurant's original menu photographs.
const ORIGINAL_MENU: Shot[] = [
  { src: "", caption: "Original Menu — Page 1" },
  { src: "", caption: "Original Menu — Page 2" },
];

function MenuPage() {
  const [idx, setIdx] = useState<number | null>(null);
  const available = ORIGINAL_MENU.filter((s) => s.src);
  return (
    <>
      <PageHero eyebrow="The Menu" title="Every dish, every flavour." intro="Filter by veg or non-veg, pick half or full portions, and build your order." image={tandoori} />
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <section className="mb-16">
          <p className="eyebrow">Original Restaurant Menu</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {ORIGINAL_MENU.map((s, i) => s.src ? (
              <button key={i} onClick={() => setIdx(available.indexOf(s))} className="group relative overflow-hidden rounded-md hairline">
                <img src={s.src} alt={s.caption} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-overlay/70 text-gold"><Expand className="h-4 w-4" /></span>
              </button>
            ) : (
              <div key={i} className="grid aspect-[4/3] place-items-center rounded-md border border-dashed bg-card p-6 text-center">
                <div><p className="font-display text-2xl">{s.caption}</p><p className="mt-2 text-sm text-muted-foreground">Original menu photo coming soon.</p></div>
              </div>
            ))}
          </div>
        </section>
        <MenuBrowser />
      </div>
      <Lightbox shots={available} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
