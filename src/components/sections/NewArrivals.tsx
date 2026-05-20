import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import sneaker from "@/assets/product-sneaker.jpg";
import loafer from "@/assets/product-loafer.jpg";
import slide from "@/assets/product-slide.jpg";
import formal from "@/assets/product-formal.jpg";
import casual from "@/assets/product-casual.jpg";

const collections = [
  { title: "Imported Slides", tag: "Drop 01", img: slide, size: "lg", slug: "Slides" },
  { title: "Everyday Sandals", tag: "Comfort", img: casual, size: "sm", slug: "Sandals" },
  { title: "Party Wear", tag: "Nightline", img: loafer, size: "sm", slug: "Loafers" },
  { title: "Office Wear", tag: "Boardroom", img: formal, size: "sm", slug: "Formal" },
  { title: "Casual Edit", tag: "Weekend", img: sneaker, size: "sm", slug: "Casual" },
];

export function NewArrivals() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        <SectionHeading
          eyebrow="New Collection"
          title={<>The 2026 <span className="italic text-gradient-gold">Edit</span></>}
          description="Trend-forward drops curated for every moment — work, weekend, and after-dark."
        />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:auto-rows-[260px]">
          <Link
            to="/shop"
            search={{ category: collections[0].slug }}
            className="group relative lg:col-span-2 lg:row-span-2 col-span-2 rounded-3xl overflow-hidden border border-border hover:border-gold/40 transition"
          >
            <img src={collections[0].img} alt={collections[0].title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">{collections[0].tag}</p>
              <h3 className="font-display text-3xl md:text-4xl">{collections[0].title}</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">Statement slides built for sun-soaked streets and Sunday afternoons.</p>
            </div>
          </Link>

          {collections.slice(1).map((c, i) => (
            <Link
              key={c.title}
              to="/shop"
              search={{ category: c.slug }}
              className="group relative rounded-2xl overflow-hidden border border-border hover:border-gold/40 transition animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1">{c.tag}</p>
                <h3 className="font-display text-xl">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
