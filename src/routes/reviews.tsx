import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { SITE } from "@/data/site";
import family from "@/assets/family.jpg";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — The Bite, Kuakhia" },
      { name: "description", content: "Read what guests say about The Bite and leave your own review on Google." },
      { property: "og:title", content: "The Bite — Guest Reviews" },
      { property: "og:description", content: "Guest reviews of The Bite, Kuakhia." },
    ],
  }),
  component: Reviews,
});

// Add real Google reviews here: { name, rating, text }
const REVIEWS: { name: string; rating: number; text: string }[] = [];

function Reviews() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="Words from our guests." image={family} />
      <div className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        {REVIEWS.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-md hairline bg-card p-7">
                <div className="flex gap-1 text-gold">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold" />)}</div>
                <blockquote className="mt-4 font-display text-xl italic">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-xs tracking-widest text-muted-foreground">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed bg-card p-14 text-center">
            <div className="flex justify-center gap-1 text-gold">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5" />)}</div>
            <p className="mt-6 font-display text-3xl">Customer reviews will appear here.</p>
            <p className="mt-3 text-muted-foreground">Visited us? We'd love to hear about your experience.</p>
          </div>
        )}
        <div className="mt-10 text-center">
          <a href={SITE.googleReviewsLink} target="_blank" rel="noreferrer" className="inline-block rounded-sm bg-gold-gradient px-8 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground">VIEW US ON GOOGLE</a>
        </div>
      </div>
    </>
  );
}
