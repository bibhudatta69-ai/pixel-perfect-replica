import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import biryani from "@/assets/biryani-hero.jpg";
import tandoori from "@/assets/tandoori.jpg";
import curryVeg from "@/assets/curry-veg.jpg";
import chinese from "@/assets/chinese.jpg";
import special from "@/assets/special.jpg";
import interior from "@/assets/interior.jpg";
import celebration from "@/assets/celebration.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Bite — Premium Restaurant in Kuakhia, Odisha" },
      { name: "description", content: "Aromatic biryanis, smoky tandoor, rich curries. Browse the full menu and order on WhatsApp from The Bite, Kuakhia." },
      { property: "og:title", content: "The Bite — Premium Restaurant in Kuakhia" },
      { property: "og:description", content: "Premium quality, rich flavours, an unforgettable experience." },
    ],
  }),
  component: Home,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return y;
}

const SPICES = [
  { l: "12%", t: "22%", s: 10, d: "0s" }, { l: "82%", t: "30%", s: 8, d: "1.5s" },
  { l: "70%", t: "72%", s: 12, d: "3s" }, { l: "20%", t: "68%", s: 7, d: "2s" }, { l: "50%", t: "15%", s: 6, d: "4s" },
];

function Home() {
  const y = useScrollY();
  const storyRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = storyRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setP(Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight))));
  }, [y]);

  const chapters = [
    { k: "01", t: "Saffron & Spice", d: "Long-grain rice layered with slow-cooked masala and fragrant whole spices." },
    { k: "02", t: "Sealed in Dum", d: "Cooked low and slow so every grain carries the aroma." },
    { k: "03", t: "Served Fresh", d: "Lifted straight to your table — steaming, rich and unforgettable." },
  ];
  const active = Math.min(2, Math.floor(p * 3));

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <img src={biryani} alt="Chicken dum biryani in a copper handi" width={1600} height={1200}
          style={{ transform: `scale(${1.08 + y * 0.0002}) translateY(${y * 0.15}px)` }}
          className="absolute inset-0 h-full w-full object-cover opacity-70 will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <span className="steam left-[62%] top-[30%]" />
        <span className="steam left-[70%] top-[34%]" style={{ animationDelay: "2s" }} />
        <span className="steam left-[56%] top-[36%]" style={{ animationDelay: "4s" }} />
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-20 lg:px-8">
          <p className="eyebrow">Premium Restaurant · Kuakhia / Odisha</p>
          <h1 className="mt-6 font-display text-7xl leading-none tracking-[0.12em] text-gold-gradient md:text-9xl">THE BITE</h1>
          <p className="mt-8 max-w-xl font-display text-2xl italic leading-snug text-foreground md:text-3xl">
            Premium Quality. Rich Flavours. An Unforgettable Experience.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/menu" className="rounded-sm bg-gold-gradient px-8 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground shadow-gold">EXPLORE MENU</Link>
            <Link to="/order" className="rounded-sm border border-gold px-8 py-4 text-xs font-semibold tracking-[0.25em] text-gold transition hover:bg-accent">ORDER NOW</Link>
          </div>
        </div>
      </section>

      {/* SCROLL STORY */}
      <section ref={storyRef} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-2 lg:px-8">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" style={{ opacity: 0.4 + p * 0.6 }} />
              <img src={biryani} alt="Biryani close-up" loading="lazy"
                style={{ transform: `scale(${0.9 + p * 0.25}) rotate(${-6 + p * 12}deg)`, filter: `brightness(${0.75 + p * 0.35})` }}
                className="relative h-full w-full rounded-full object-cover shadow-gold transition-transform duration-100" />
              <span className="steam left-[30%] top-[10%]" />
              <span className="steam left-[55%] top-[5%]" style={{ animationDelay: "3s" }} />
              {SPICES.map((s, i) => (
                <span key={i} className="float-slow absolute rounded-full bg-bronze" style={{ left: s.l, top: s.t, width: s.s, height: s.s * 1.6, animationDelay: s.d, transform: `translateY(${-p * 40}px)` }} />
              ))}
            </div>
            <div>
              <p className="eyebrow">The Signature</p>
              <h2 className="mt-4 text-5xl md:text-6xl">A biryani worth the journey.</h2>
              <div className="mt-10 space-y-6">
                {chapters.map((c, i) => (
                  <div key={c.k} className={`border-l-2 pl-6 transition-all duration-500 ${i === active ? "border-gold opacity-100" : "border-border opacity-35"}`}>
                    <p className="text-xs tracking-[0.3em] text-gold">{c.k}</p>
                    <h3 className="mt-1 text-3xl">{c.t}</h3>
                    <p className="mt-1 text-muted-foreground">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">From Our Kitchen</p><h2 className="mt-3 text-5xl">Signature flavours</h2></div>
          <Link to="/menu" className="text-sm tracking-[0.2em] text-gold hover:underline">FULL MENU →</Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {[
            { img: tandoori, t: "Tandoori", s: "Smoky, charred, irresistible", c: "md:col-span-2 md:row-span-2" },
            { img: curryVeg, t: "Paneer Specials", s: "Rich & velvety" , c: ""},
            { img: chinese, t: "Indo-Chinese", s: "Wok-tossed favourites", c: "" },
            { img: special, t: "Bamboo & Patrapoda", s: "House specials", c: "md:col-span-2" },
          ].map((x) => (
            <Link to="/menu" key={x.t} className={`tilt-card group relative block min-h-64 overflow-hidden rounded-md hairline ${x.c}`}>
              <img src={x.img} alt={x.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay/90 via-overlay/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-3xl text-gold">{x.t}</h3>
                <p className="text-sm text-gold/80">{x.s}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="relative overflow-hidden py-28">
        <img src={interior} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" style={{ transform: `translateY(${(y - 2600) * 0.08}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">The Experience</p>
          <h2 className="mt-4 text-5xl leading-tight md:text-6xl">Good food tastes better together.</h2>
          <p className="mt-6 text-muted-foreground">Dine in with family, take away for the evening, or order ahead on WhatsApp — we'll have it ready.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/about" className="rounded-sm border border-gold px-7 py-3.5 text-xs tracking-[0.25em] text-gold hover:bg-accent">OUR STORY</Link>
            <Link to="/location" className="rounded-sm border border-gold px-7 py-3.5 text-xs tracking-[0.25em] text-gold hover:bg-accent">VISIT US</Link>
          </div>
        </div>
      </section>

      {/* CELEBRATION PROMO */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-md hairline">
          <img src={celebration} alt="Decorated banquet hall (demo image)" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-overlay/95 via-overlay/75 to-overlay/20" />
          <div className="relative max-w-xl p-8 md:p-14">
            <p className="eyebrow">Your special moment deserves a special place</p>
            <h2 className="mt-4 text-5xl text-gold md:text-6xl">The Celebration</h2>
            <p className="mt-2 font-display text-xl italic text-gold/80">Mandap & Banquet Venue</p>
            <p className="mt-5 text-sm tracking-wide text-gold/70">Weddings • Receptions • Engagements • Birthdays • Parties • Gatherings</p>
            <Link to="/the-celebration" className="mt-8 inline-block rounded-sm bg-gold-gradient px-7 py-3.5 text-xs font-semibold tracking-[0.25em] text-primary-foreground">DISCOVER THE CELEBRATION</Link>
          </div>
        </div>
      </section>
    </>
  );
}
