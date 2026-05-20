import { Shield, Sparkles, Award, Star, Truck } from "lucide-react";

const keyFeatures = [
  {
    icon: Award,
    title: "Goodyear Welted",
    desc: "Re-soleable stitched construction ensuring longevity.",
  },
  {
    icon: Shield,
    title: "Full-Grain Leather",
    desc: "Finest top layer leather that develops a beautiful patina.",
  },
  {
    icon: Sparkles,
    title: "Ortholite Footbed",
    desc: "High density foam cushioning for dual-layer arch comfort.",
  },
  {
    icon: Truck,
    title: "Free COD Express",
    desc: "Secured shipping option with 7-day hassle-free exchange.",
  },
];

export function BrandShowcase() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-gold font-bold">Uncompromising Standards</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
            Designed to <span className="italic text-gradient-gold">Last.</span> Crafted for comfort.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We partner with premier Indian tanneries to deliver world-class footwear. We reject cheap adhesives in favor of genuine leather stitching.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFeatures.map((feat, i) => (
            <div
              key={feat.title}
              className="p-6 md:p-8 rounded-3xl bg-card-glass border border-border/80 hover:border-gold/30 hover:shadow-[0_10px_25px_-5px_rgba(209,161,82,0.08)] transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 shrink-0 text-gold">
                <feat.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                {feat.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
