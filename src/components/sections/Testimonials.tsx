import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const reviews = [
  { name: "Arjun M.", city: "Bengaluru", text: "The Heritage Oxford is hands down the most comfortable formal shoe I own. Quality is unreal for the price.", rating: 5 },
  { name: "Karthik R.", city: "Chennai", text: "Got the Noir sneakers — packaging, fit, finish, all premium. Got compliments at work the very next day.", rating: 5 },
  { name: "Vignesh S.", city: "Madurai", text: "Local Madurai brand doing world-class work. The Gold Crest Slides are now my daily go-to.", rating: 5 },
  { name: "Rohan P.", city: "Mumbai", text: "Delivery was quick, leather smells real, stitching is on point. SOLESPACE is the real deal.", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title={<>Words from <span className="italic text-gradient-gold">our walkers</span></>}
        />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="relative p-7 rounded-2xl bg-card-glass border border-border hover:border-gold/40 transition animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-gold/20" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-6">"{r.text}"</p>
              <div className="pt-5 border-t border-border">
                <p className="font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
