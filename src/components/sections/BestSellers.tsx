import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export function BestSellers() {
  const featured = products.slice(0, 4);
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <SectionHeading
            center={false}
            eyebrow="Best Sellers"
            title={<>Most Loved <span className="italic text-gradient-gold">Pairs</span></>}
            description="Hand-picked by our stylists — the styles our community walks in every day."
          />
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.3em] text-gold hover:text-gold-soft border-b border-gold pb-1"
          >
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
