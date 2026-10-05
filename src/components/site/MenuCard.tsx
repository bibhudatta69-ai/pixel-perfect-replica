import { useRef, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import type { MenuItem } from "@/data/menu";
import { useStore, type Size } from "@/lib/store";

export function VegMark({ veg }: { veg: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.18em] ${veg ? "text-veg" : "text-nonveg"}`}>
      <span className={`grid h-3.5 w-3.5 place-items-center border ${veg ? "border-veg" : "border-nonveg"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
      </span>
      {veg ? "Veg" : "Non-Veg"}
    </span>
  );
}

function flyToCart(from: HTMLElement | null, src: string) {
  if (!from) return;
  const target = document.getElementById("cart-fab") ?? document.getElementById("cart-icon");
  if (!target) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const el = document.createElement("img");
  el.src = src;
  el.className = "fly-dot pointer-events-none fixed z-[60] h-16 w-16 rounded-full object-cover";
  el.style.left = `${a.left + a.width / 2 - 32}px`;
  el.style.top = `${a.top + a.height / 2 - 32}px`;
  el.style.setProperty("--fx", `${b.left + b.width / 2 - (a.left + a.width / 2)}px`);
  el.style.setProperty("--fy", `${b.top + b.height / 2 - (a.top + a.height / 2)}px`);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 750);
}

export function MenuCard({ item }: { item: MenuItem }) {
  const { add, favorites, toggleFav } = useStore();
  const hasSizes = item.full != null;
  const [size, setSize] = useState<Size>(hasSizes ? "full" : "single");
  const [qty, setQty] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const fav = favorites.includes(item.id);

  const onAdd = () => {
    add(item.id, size, qty);
    flyToCart(imgRef.current, item.image);
    toast.success(`${item.name}${hasSizes ? ` (${size === "full" ? "Full" : "Half"})` : ""} × ${qty} added`);
    setQty(1);
  };

  return (
    <article className="tilt-card group flex flex-col overflow-hidden rounded-md hairline bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img ref={imgRef} src={item.image} alt={item.name} loading="lazy" width={600} height={450}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay/70 to-transparent" />
        <button onClick={() => toggleFav(item.id)} aria-label={fav ? "Remove from favorites" : "Add to favorites"} aria-pressed={fav}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-overlay/60 backdrop-blur transition hover:scale-110">
          <Heart className={`h-4 w-4 ${fav ? "fill-gold text-gold" : "text-gold"}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <VegMark veg={item.veg} />
          <h3 className="mt-1.5 text-xl leading-tight">{item.name}</h3>
        </div>
        {item.tbc ? (
          <p className="text-sm italic text-muted-foreground">Price to be confirmed — please ask at the counter.</p>
        ) : hasSizes ? (
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Portion size">
            {(["half", "full"] as const).map((s) => (
              <button key={s} role="radio" aria-checked={size === s} onClick={() => setSize(s)}
                className={`rounded-sm border px-2 py-2 text-xs tracking-widest transition ${size === s ? "border-gold bg-accent text-gold" : "text-muted-foreground hover:border-gold"}`}>
                {s.toUpperCase()} ₹{s === "full" ? item.full : item.half}
              </button>
            ))}
          </div>
        ) : (
          <p className="font-display text-2xl text-gold">₹{item.price}</p>
        )}
        {!item.tbc && (
          <div className="mt-auto flex items-center gap-2 pt-1">
            <div className="flex items-center rounded-sm hairline">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-9 place-items-center hover:text-gold" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-6 text-center text-sm" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-9 place-items-center hover:text-gold" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <button onClick={onAdd} className="h-10 flex-1 rounded-sm bg-primary text-xs font-semibold tracking-[0.18em] text-primary-foreground transition hover:opacity-90">
              ADD TO CART
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
