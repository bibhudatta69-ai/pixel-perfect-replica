import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, QrCode } from "lucide-react";
import { MenuBrowser } from "@/components/site/MenuBrowser";
import { CartLines } from "@/components/site/Drawers";
import { findItem } from "@/data/menu";
import { SITE, waLink } from "@/data/site";
import { sizeLabel, unitPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — The Bite, Kuakhia" },
      { name: "description", content: "Order from The Bite for dine-in or takeaway. Pay by UPI or at the restaurant and send your order on WhatsApp." },
      { property: "og:title", content: "Order from The Bite" },
      { property: "og:description", content: "Build your order and send it on WhatsApp." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { cart, total, clear } = useStore();
  const [type, setType] = useState<"Dine-In" | "Takeaway" | null>(null);
  const [table, setTable] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pay, setPay] = useState<"now" | "restaurant" | null>(null);
  const [notes, setNotes] = useState("");

  const ready = cart.length > 0 && type && pay && (type === "Dine-In" || (name.trim() && phone.trim()));

  const message = () => {
    const lines = cart.map((l, i) => {
      const it = findItem(l.id)!;
      const u = unitPrice(l.id, l.size);
      return [`${i + 1}. ${it.name}`, sizeLabel(l.size) && `Size: ${sizeLabel(l.size)}`, `Quantity: ${l.qty}`, `Price: ₹${u} each`, `Subtotal: ₹${u * l.qty}`].filter(Boolean).join("\n");
    });
    return [
      "THE BITE — NEW ORDER", "",
      `Customer Name: ${name || "-"}`, `Phone: ${phone || "-"}`,
      `Order Type: ${type}${type === "Dine-In" && table ? ` (Table ${table})` : ""}`, "",
      "Items:", lines.join("\n\n"), "",
      `TOTAL: ₹${total}`, "",
      `Payment: ${pay === "now" ? "Paid via UPI (screenshot to follow)" : "Pay at Restaurant"}`,
      notes && `\nNotes: ${notes}`,
    ].filter((x) => x !== false && x !== undefined).join("\n");
  };

  const opt = (a: boolean) => `rounded-sm border py-4 text-xs tracking-[0.2em] transition ${a ? "border-gold bg-accent text-gold" : "text-muted-foreground hover:border-gold"}`;
  const input = "h-11 w-full rounded-sm border bg-card px-3 text-sm outline-none focus:border-gold";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8">
      <p className="eyebrow">Order</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Build your order.</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="order-2 lg:order-1"><MenuBrowser /></div>

        <aside className="order-1 lg:order-2">
          <div className="space-y-6 rounded-md hairline bg-card p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <h2 className="text-3xl">Checkout</h2>
            {cart.length ? <CartLines /> : <p className="text-sm text-muted-foreground">Add dishes from the menu to begin.</p>}

            <div>
              <p className="eyebrow mb-3">Order Type</p>
              <div className="grid grid-cols-2 gap-2">
                {(["Dine-In", "Takeaway"] as const).map((t) => <button key={t} onClick={() => setType(t)} className={opt(type === t)}>{t.toUpperCase()}</button>)}
              </div>
              {type === "Dine-In" && <input className={`${input} mt-3`} placeholder="Table number (optional)" value={table} onChange={(e) => setTable(e.target.value)} aria-label="Table number" />}
              {type === "Takeaway" && <div className="mt-3 space-y-2">
                <input className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" maxLength={60} />
                <input className={input} placeholder="Phone number" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" maxLength={15} />
              </div>}
            </div>

            <div>
              <p className="eyebrow mb-3">Payment</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPay("now")} className={opt(pay === "now")}>PAY NOW (UPI)</button>
                <button onClick={() => setPay("restaurant")} className={opt(pay === "restaurant")}>PAY AT RESTAURANT</button>
              </div>
              {pay === "now" && (
                <div className="mt-4 rounded-sm border bg-background p-5 text-center">
                  <p className="text-xs tracking-widest text-muted-foreground">TOTAL AMOUNT</p>
                  <p className="font-display text-4xl text-gold">₹{total}</p>
                  {SITE.upiQr ? <img src={SITE.upiQr} alt="UPI payment QR code" className="mx-auto mt-4 w-48" /> : (
                    <div className="mx-auto mt-4 grid h-48 w-48 place-items-center rounded-sm border border-dashed text-muted-foreground">
                      <div><QrCode className="mx-auto h-10 w-10" /><p className="mt-2 text-xs">UPI QR coming soon</p></div>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">After paying, send the screenshot in WhatsApp.</p>
                </div>
              )}
            </div>

            <textarea className={`${input} h-20 py-2`} placeholder="Notes (spice level, timing…)" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={300} aria-label="Notes" />

            <div className="flex justify-between border-t pt-4 font-display text-2xl"><span>Total</span><span className="text-gold">₹{total}</span></div>
            <a href={ready ? waLink(message()) : undefined} target="_blank" rel="noreferrer" aria-disabled={!ready}
              onClick={(e) => { if (!ready) e.preventDefault(); }}
              className={`flex items-center justify-center gap-2 rounded-sm py-4 text-xs font-semibold tracking-[0.25em] ${ready ? "bg-gold-gradient text-primary-foreground shadow-gold" : "cursor-not-allowed bg-muted text-muted-foreground"}`}>
              <MessageCircle className="h-4 w-4" /> ORDER ON WHATSAPP
            </a>
            {!ready && <p className="text-center text-xs text-muted-foreground">Add items, choose order type{type === "Takeaway" ? ", name & phone" : ""} and payment.</p>}
            {cart.length > 0 && <button onClick={clear} className="w-full text-xs tracking-widest text-muted-foreground hover:text-destructive">CLEAR CART</button>}
          </div>
        </aside>
      </div>
    </div>
  );
}
