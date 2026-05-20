import { createFileRoute, Link } from "@tanstack/react-router";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — SOLESPACE" },
      { name: "description", content: "Explore SOLESPACE collections: imported slides, party wear, office wear, casual and everyday footwear for men." },
      { property: "og:title", content: "Collections — SOLESPACE" },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: Collections,
});

function Collections() {
  return (
    <>
      <section className="relative bg-hero py-20 md:py-28 border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Curated Edits</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold">
            Our <span className="italic text-gradient-gold">Collections</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Seasonal drops, signature classics, and limited editions.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-primary-foreground text-sm uppercase tracking-widest hover:bg-gold-soft transition"
          >
            Shop All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <NewArrivals />
      <FeaturedCategories />
    </>
  );
}
