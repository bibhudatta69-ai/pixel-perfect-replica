import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu as MenuIcon, Moon, ShoppingBag, Sun, X, Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { NAV, SITE, waLink } from "@/data/site";
import { useStore } from "@/lib/store";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex flex-col leading-none ${className}`} aria-label="The Bite home">
      <span className="font-display text-2xl tracking-[0.25em] text-gold-gradient">THE BITE</span>
      <span className="mt-1 text-[0.55rem] tracking-[0.4em] text-muted-foreground">PREMIUM RESTAURANT</span>
    </Link>
  );
}

export function SiteHeader() {
  const { count, setCartOpen, setFavOpen, favorites, theme, toggleTheme } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const iconBtn = "relative grid h-10 w-10 place-items-center rounded-full hairline text-foreground transition hover:text-gold hover:border-gold";
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md border-b" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-gold"
              activeProps={{ className: "!text-gold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle light or dark mode">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setFavOpen(true)} className={iconBtn} aria-label="Favorites">
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">{favorites.length}</span>}
          </button>
          <button id="cart-icon" onClick={() => setCartOpen(true)} className={iconBtn} aria-label="Cart">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">{count}</span>}
          </button>
          <button onClick={() => setOpen(true)} className={`${iconBtn} xl:hidden`} aria-label="Open menu"><MenuIcon className="h-4 w-4" /></button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background page-enter xl:hidden">
          <div className="flex h-20 items-center justify-between px-5">
            <Logo />
            <button onClick={() => setOpen(false)} className={iconBtn} aria-label="Close menu"><X className="h-4 w-4" /></button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
            {NAV.map((n, i) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
                style={{ animationDelay: `${i * 40}ms` }}
                className="page-enter border-b py-3 font-display text-3xl text-foreground"
                activeProps={{ className: "!text-gold" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 p-6">
            <a href={`tel:${SITE.phones[0]}`} className="flex-1 rounded-sm hairline py-3 text-center text-sm">Call</a>
            <button onClick={() => { setOpen(false); setCartOpen(true); }} className="flex-1 rounded-sm bg-primary py-3 text-sm text-primary-foreground">Cart ({count})</button>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Rich flavours, warm hospitality and food made to bring people together — in the heart of Kuakhia.</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Quick Links</p>
          <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-muted-foreground hover:text-gold">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          {SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-gold"><Phone className="h-3.5 w-3.5" />{p}</a>)}
          <div className="mt-3 flex gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span>{SITE.addressLines.join(", ")}</span></div>
        </div>
        <div>
          <p className="eyebrow mb-4">Follow & Book</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={SITE.instagram} className="flex items-center gap-2 hover:text-gold"><Instagram className="h-3.5 w-3.5" />Instagram</a>
            <a href={SITE.facebook} className="flex items-center gap-2 hover:text-gold"><Facebook className="h-3.5 w-3.5" />Facebook</a>
            <a href={waLink("Hello The Bite!")} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
            <a href={SITE.mapsLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold"><MapPin className="h-3.5 w-3.5" />Google Maps</a>
            <Link to="/the-celebration" className="hover:text-gold">The Celebration booking →</Link>
          </div>
        </div>
      </div>
      <p className="border-t py-6 text-center text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()} THE BITE · KUAKHIA, ODISHA</p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro?: string; image?: string }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-32">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-xl text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function FloatingCart() {
  const { count, total, setCartOpen } = useStore();
  if (!count) return null;
  return (
    <button id="cart-fab" onClick={() => setCartOpen(true)}
      className="fixed bottom-5 right-5 z-30 flex items-center gap-3 rounded-full bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold page-enter">
      <ShoppingBag className="h-4 w-4" /> {count} {count === 1 ? "ITEM" : "ITEMS"} · ₹{total}
    </button>
  );
}
