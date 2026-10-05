import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findItem } from "@/data/menu";

export type Size = "full" | "half" | "single";
export type CartLine = { id: string; size: Size; qty: number };

type Store = {
  cart: CartLine[];
  favorites: string[];
  theme: "dark" | "light";
  cartOpen: boolean;
  favOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setFavOpen: (v: boolean) => void;
  add: (id: string, size: Size, qty: number) => void;
  setQty: (id: string, size: Size, qty: number) => void;
  remove: (id: string, size: Size) => void;
  clear: () => void;
  toggleFav: (id: string) => void;
  toggleTheme: () => void;
  count: number;
  total: number;
};

export const unitPrice = (id: string, size: Size) => {
  const it = findItem(id);
  if (!it) return 0;
  if (size === "full") return it.full ?? 0;
  if (size === "half") return it.half ?? 0;
  return it.price ?? 0;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavs] = useState<string[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("bite-cart") || "[]"));
      setFavs(JSON.parse(localStorage.getItem("bite-favs") || "[]"));
      const t = localStorage.getItem("bite-theme");
      if (t === "light") setTheme("light");
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("bite-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("bite-favs", JSON.stringify(favorites)); }, [favorites, ready]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("bite-theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, ready]);

  const value = useMemo<Store>(() => ({
    cart, favorites, theme, cartOpen, favOpen, setCartOpen, setFavOpen,
    add: (id, size, qty) => setCart((c) => {
      const ex = c.find((l) => l.id === id && l.size === size);
      return ex ? c.map((l) => (l === ex ? { ...l, qty: l.qty + qty } : l)) : [...c, { id, size, qty }];
    }),
    setQty: (id, size, qty) => setCart((c) => qty <= 0 ? c.filter((l) => !(l.id === id && l.size === size)) : c.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l))),
    remove: (id, size) => setCart((c) => c.filter((l) => !(l.id === id && l.size === size))),
    clear: () => setCart([]),
    toggleFav: (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    count: cart.reduce((s, l) => s + l.qty, 0),
    total: cart.reduce((s, l) => s + l.qty * unitPrice(l.id, l.size), 0),
  }), [cart, favorites, theme, cartOpen, favOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
};

export const sizeLabel = (s: Size) => (s === "full" ? "Full" : s === "half" ? "Half" : "");
