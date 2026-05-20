import { Link } from "@tanstack/react-router";
import brandImg from "@/assets/brand-story.jpg";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative animate-fade-up">
            <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-elegant">
              <img
                src={brandImg}
                alt="Stylish man wearing SOLESPACE"
                loading="lazy"
                width={1280}
                height={1536}
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-background border border-gold/30 rounded-2xl p-5 shadow-elegant max-w-[200px]">
              <p className="text-3xl font-display text-gradient-gold">Est. 2020</p>
              <p className="text-xs text-muted-foreground mt-1 tracking-wider">Crafted in Kalavasal, India</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] mb-6">
              Footwear, <span className="italic text-gradient-gold">redefined</span> for the modern man.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
              SOLESPACE was born from one belief — every man deserves footwear that feels as confident as it looks. We combine hand-finished craftsmanship with the latest in comfort tech to create pairs you'll reach for, again and again.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              From our flagship store in Kalavasal to your doorstep — affordable luxury that walks the walk.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {[
                { k: "Premium Materials", v: "Full-grain leather & breathable knits" },
                { k: "Handcrafted Detail", v: "Inspected pair by pair, never machine-mass" },
                { k: "All-Day Comfort", v: "Memory foam, contoured arch support" },
                { k: "Trend-Forward", v: "Designs from international runways" },
              ].map((f) => (
                <div key={f.k} className="border-l-2 border-gold/40 pl-4">
                  <p className="font-medium text-foreground">{f.k}</p>
                  <p className="text-sm text-muted-foreground mt-1">{f.v}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-gold hover:text-gold-soft group"
            >
              Discover SOLESPACE
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
