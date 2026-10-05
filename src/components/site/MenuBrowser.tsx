import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, MENU } from "@/data/menu";
import { MenuCard } from "./MenuCard";

export function MenuBrowser() {
  const [diet, setDiet] = useState<"all" | "veg" | "nonveg">("all");
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => MENU.filter((m) =>
    (diet === "all" || (diet === "veg" ? m.veg : !m.veg)) &&
    (cat === "All" || m.category === cat) &&
    (!q || `${m.name} ${m.category}`.toLowerCase().includes(q.toLowerCase())),
  ), [diet, cat, q]);

  const grouped = CATEGORIES.map((c) => [c, items.filter((i) => i.category === c)] as const).filter(([, l]) => l.length);
  const chip = (active: boolean) => `shrink-0 rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition ${active ? "border-gold bg-primary text-primary-foreground" : "text-muted-foreground hover:border-gold hover:text-gold"}`;

  return (
    <div>
      <div className="sticky top-20 z-20 -mx-5 border-y bg-background/90 px-5 py-4 backdrop-blur-md lg:mx-0 lg:rounded-md lg:border">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search menu</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search biryani, paneer, chicken…"
              className="h-11 w-full rounded-sm border bg-card pl-10 pr-3 text-sm outline-none focus:border-gold" />
          </label>
          <div className="flex gap-2">
            {([["all", "All"], ["veg", "Veg"], ["nonveg", "Non-Veg"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setDiet(k)} className={chip(diet === k)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {["All", ...CATEGORIES].map((c) => <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>)}
        </div>
      </div>

      <p className="mt-6 text-xs tracking-widest text-muted-foreground">{items.length} DISHES</p>
      {grouped.length === 0 && <p className="py-20 text-center text-muted-foreground">No dishes match your search.</p>}
      {grouped.map(([c, list]) => (
        <section key={c} className="mt-10">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl">{c}</h2>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">{list.length}</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((m) => <MenuCard key={m.id} item={m} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
