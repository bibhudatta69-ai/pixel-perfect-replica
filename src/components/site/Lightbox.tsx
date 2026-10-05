import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export type Shot = { src: string; caption: string };

export function Lightbox({ shots, index, onClose, onIndex }: { shots: Shot[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const [zoom, setZoom] = useState(1);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const go = (d: number) => { if (index === null) return; setZoom(1); onIndex((index + d + shots.length) % shots.length); };

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  });

  if (index === null) return null;
  const s = shots[index];
  const btn = "grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-overlay/60 text-gold backdrop-blur hover:bg-overlay";
  return (
    <div role="dialog" aria-label="Image viewer" className="fixed inset-0 z-[70] flex flex-col bg-overlay/95 page-enter"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { if (touchX.current === null) return; const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1); touchX.current = null; }}>
      <div className="flex items-center justify-end gap-2 p-4">
        <button className={btn} onClick={() => setZoom((z) => Math.min(3, z + 0.5))} aria-label="Zoom in"><ZoomIn className="h-4 w-4" /></button>
        <button className={btn} onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label="Zoom out"><ZoomOut className="h-4 w-4" /></button>
        <button className={btn} onClick={onClose} aria-label="Close"><X className="h-4 w-4" /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-auto px-4">
        <img src={s.src} alt={s.caption} style={{ transform: `scale(${zoom})` }} className="max-h-[75vh] max-w-full object-contain transition-transform duration-300" />
        {shots.length > 1 && <>
          <button className={`${btn} absolute left-4`} onClick={() => go(-1)} aria-label="Previous"><ChevronLeft className="h-5 w-5" /></button>
          <button className={`${btn} absolute right-4`} onClick={() => go(1)} aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
        </>}
      </div>
      <p className="p-6 text-center font-display text-xl italic text-gold">{s.caption} <span className="ml-3 font-sans text-xs not-italic opacity-60">{index + 1} / {shots.length}</span></p>
    </div>
  );
}
