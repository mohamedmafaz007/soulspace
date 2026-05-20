import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { SectionHeading } from "@/components/site/SectionHeading";

export function FeaturedCategories() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Shop by Category"
          title={<>Find Your <span className="italic text-gradient-gold">Sole</span></>}
          description="From boardroom-ready oxfords to weekend slides — every pair, perfected."
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ category: c.slug }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border hover:border-gold/40 transition animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg md:text-xl text-foreground">{c.name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-gold mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
                  Shop now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
