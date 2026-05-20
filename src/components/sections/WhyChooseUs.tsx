import { Heart, Award, TrendingUp, Wallet, Gem, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const items = [
  { Icon: Heart, title: "Comfort First", text: "Cushioned soles & ergonomic fit — built for all-day wear." },
  { Icon: Award, title: "Premium Look", text: "Hand-finished detailing that elevates every step." },
  { Icon: TrendingUp, title: "Trendy Styles", text: "Drops inspired by global street & runway trends." },
  { Icon: Wallet, title: "Affordable Luxury", text: "Designer quality without the designer markup." },
  { Icon: Gem, title: "Quality Finishing", text: "Stitch-perfect craftsmanship, inspected pair by pair." },
  { Icon: ShoppingBag, title: "Easy Shopping", text: "Fast checkout, free shipping & 7-day returns." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why SOLESPACE"
          title={<>Six reasons men <span className="italic text-gradient-gold">trust us</span></>}
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              className="group relative p-7 rounded-2xl bg-card-glass border border-border hover:border-gold/40 transition animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-gold/10 grid place-items-center border border-gold/30 group-hover:bg-gold group-hover:text-primary-foreground transition">
                <Icon className="h-5 w-5 text-gold group-hover:text-primary-foreground transition" />
              </div>
              <h3 className="font-display text-xl mt-5">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
