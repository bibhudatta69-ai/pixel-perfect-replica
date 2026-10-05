import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { findItem } from "@/data/menu";
import { sizeLabel, unitPrice, useStore } from "@/lib/store";
import { VegMark } from "./MenuCard";
import type { ReactNode } from "react";

function Panel({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-overlay/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-label={title}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-background transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-3xl">{title}</h2>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hairline hover:text-gold" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </aside>
    </div>
  );
}

export function CartLines() {
  const { cart, setQty, remove } = useStore();
  return (
    <ul className="divide-y">
      {cart.map((l) => {
        const it = findItem(l.id);
        if (!it) return null;
        const u = unitPrice(l.id, l.size);
        return (
          <li key={l.id + l.size} className="flex gap-4 py-4">
            <img src={it.image} alt={it.name} className="h-16 w-16 rounded-sm object-cover" loading="lazy" />
            <div className="flex-1">
              <p className="font-display text-lg leading-tight">{it.name}</p>
              <p className="text-xs text-muted-foreground">{sizeLabel(l.size) && `${sizeLabel(l.size)} · `}₹{u} each</p>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => setQty(l.id, l.size, l.qty - 1)} className="grid h-8 w-8 place-items-center rounded-sm hairline" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                <span className="w-6 text-center text-sm">{l.qty}</span>
                <button onClick={() => setQty(l.id, l.size, l.qty + 1)} className="grid h-8 w-8 place-items-center rounded-sm hairline" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                <button onClick={() => remove(l.id, l.size)} className="ml-auto text-muted-foreground hover:text-destructive" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="font-display text-lg text-gold">₹{u * l.qty}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function Drawers() {
  const { cartOpen, setCartOpen, favOpen, setFavOpen, cart, total, favorites, toggleFav } = useStore();
  return (
    <>
      <Panel open={cartOpen} onClose={() => setCartOpen(false)} title="Your Order">
        <div className="flex-1 overflow-y-auto px-6">
          {cart.length ? <CartLines /> : (
            <div className="py-20 text-center text-muted-foreground">
              <p>Your cart is empty.</p>
              <Link to="/menu" onClick={() => setCartOpen(false)} className="mt-4 inline-block text-gold underline-offset-4 hover:underline">Explore the menu</Link>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t px-6 py-5">
            <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="mt-1 flex justify-between font-display text-2xl"><span>Total</span><span className="text-gold">₹{total}</span></div>
            <Link to="/order" onClick={() => setCartOpen(false)} className="mt-4 block rounded-sm bg-gold-gradient py-3.5 text-center text-sm font-semibold tracking-[0.2em] text-primary-foreground">
              CHECKOUT
            </Link>
          </div>
        )}
      </Panel>

      <Panel open={favOpen} onClose={() => setFavOpen(false)} title="Favorites">
        <div className="flex-1 overflow-y-auto px-6">
          {favorites.length === 0 && <p className="py-20 text-center text-muted-foreground">Tap the heart on any dish to save it here.</p>}
          <ul className="divide-y">
            {favorites.map((id) => {
              const it = findItem(id);
              if (!it) return null;
              return (
                <li key={id} className="flex items-center gap-4 py-4">
                  <img src={it.image} alt={it.name} className="h-14 w-14 rounded-sm object-cover" loading="lazy" />
                  <div className="flex-1">
                    <VegMark veg={it.veg} />
                    <p className="font-display text-lg leading-tight">{it.name}</p>
                    <p className="text-xs text-gold">{it.full ? `Full ₹${it.full} · Half ₹${it.half}` : it.tbc ? "Price TBC" : `₹${it.price}`}</p>
                  </div>
                  <button onClick={() => toggleFav(id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove favorite"><Trash2 className="h-4 w-4" /></button>
                </li>
              );
            })}
          </ul>
        </div>
        {favorites.length > 0 && (
          <div className="border-t p-6">
            <Link to="/menu" onClick={() => setFavOpen(false)} className="block rounded-sm bg-primary py-3 text-center text-sm tracking-[0.2em] text-primary-foreground">ADD FROM MENU</Link>
          </div>
        )}
      </Panel>
    </>
  );
}
