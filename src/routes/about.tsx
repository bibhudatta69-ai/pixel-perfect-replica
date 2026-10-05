import { createFileRoute, Link } from "@tanstack/react-router";
import interior from "@/assets/interior.jpg";
import family from "@/assets/family.jpg";
import curryVeg from "@/assets/curry-veg.jpg";
import ownerSameer from "@/assets/owner-sameer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Bite, Kuakhia" },
      { name: "description", content: "The story, food and philosophy behind The Bite restaurant in Kuakhia, Odisha." },
      { property: "og:title", content: "About The Bite" },
      { property: "og:description", content: "Food built around flavour, warmth and togetherness." },
    ],
  }),
  component: About,
});

// Editable About content
const SECTIONS = [
  { k: "Our Story", img: interior, body: ["At The Bite, food is more than a meal — it is an experience built around flavour, warmth and togetherness.", "The Bite was created with a simple idea: serve satisfying food, create a welcoming atmosphere, and make every visit worth remembering."] },
  { k: "The Food", img: curryVeg, body: ["From comforting classics to rich curries, aromatic biryanis, sizzling starters and freshly prepared favourites, every dish is created to bring people together around the table."] },
  { k: "The Experience", img: family, body: ["Whether it is a quick meal, a family gathering, a celebration, or an evening with friends, we want every guest to leave with a reason to come back."] },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-40 text-center">
        <p className="eyebrow">About The Bite</p>
        <h1 className="mt-5 text-5xl leading-tight md:text-7xl">Flavour, warmth & togetherness.</h1>
      </section>
      <div className="mx-auto max-w-7xl space-y-24 px-5 py-16 lg:px-8">
        {SECTIONS.map((s, i) => (
          <section key={s.k} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <img src={s.img} alt={s.k} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover hairline" />
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="mt-3 text-5xl">{s.k}</h2>
              {s.body.map((b) => <p key={b} className="mt-5 text-lg leading-relaxed text-muted-foreground">{b}</p>)}
            </div>
          </section>
        ))}
        <section className="border-y py-16 text-center">
          <p className="eyebrow">Our Philosophy</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[["Fresh", "Prepared to order, served hot."], ["Generous", "Honest portions and fair prices."], ["Welcoming", "A table for every occasion."]].map(([t, d]) => (
              <div key={t}><h3 className="text-4xl text-gold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Owner / Management</p>
          <h2 className="mt-3 text-4xl">Meet the people behind The Bite</h2>
          <img src={ownerSameer} alt="Sameer Kumar Debata — Owner of The Bite" loading="lazy" className="mx-auto mt-8 aspect-[4/5] w-64 rounded-md object-cover hairline" />
          <p className="mt-6 font-display text-3xl text-gold">Sameer Kumar Debata</p>
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">Owner, The Bite</p>
          <Link to="/menu" className="mt-8 inline-block rounded-sm bg-gold-gradient px-8 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground">EXPLORE MENU</Link>
        </section>
      </div>
    </>
  );
}
