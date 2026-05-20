import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Percent } from "lucide-react";
import offerShoe from "@/assets/product-loafer.jpg";

export function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep demo working
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-card/15 border-y border-gold/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="bg-card-glass border border-gold/20 rounded-3xl p-8 md:p-12 xl:p-16 grid lg:grid-cols-12 gap-10 items-center shadow-elegant">
          
          {/* Promo Text Details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold uppercase tracking-widest text-gold">
              <Percent className="h-4 w-4" /> Limited Flash Deal
            </span>
            
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
              Exclusive Loafer Drops <br />
              <span className="italic text-gradient-gold">Flat 25% Off</span>
            </h2>
            
            <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
              Step into unparalleled comfort with our handcrafted Italian Suede loafers. Grab this special collection drop before price goes back to retail.
            </p>

            {/* Countdown Grid Clock */}
            <div className="flex gap-3 pt-2">
              {[
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((time) => (
                <div key={time.label} className="w-16 h-16 rounded-2xl bg-background/60 border border-border flex flex-col justify-center items-center shadow-inner">
                  <span className="text-xl font-bold text-gold font-display">
                    {time.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">{time.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                to="/shop"
                search={{ category: "Loafers" }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-primary-foreground font-semibold text-xs uppercase tracking-widest hover:bg-gold-soft transition shadow-gold"
              >
                Claim Offer Now <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-xs text-muted-foreground">Free Shipping & Cod Included.</span>
            </div>
          </div>

          {/* Promo Shoe Image Display */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-elegant bg-background/50 max-w-sm w-full group">
              <img
                src={offerShoe}
                alt="Limited Offer Tan Suede Loafers"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-4 right-4 bg-destructive text-destructive-foreground font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                Save ₹700
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
