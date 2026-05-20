import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Import all 7 premium footwear images
import heroShoe from "@/assets/hero-shoe.jpg";
import formalShoe from "@/assets/product-formal.jpg";
import slideShoe from "@/assets/product-slide.jpg";
import loaferShoe from "@/assets/product-loafer.jpg";
import sandalShoe from "@/assets/product-sandal.jpg";
import casualShoe from "@/assets/product-casual.jpg";
import sneakerShoe from "@/assets/product-sneaker.jpg";

const images = [
  heroShoe,
  formalShoe,
  slideShoe,
  loaferShoe,
  sandalShoe,
  casualShoe,
  sneakerShoe,
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Automatically cycle images every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-hero min-h-[80vh] flex items-center">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0.82 0.13 82) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Background Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-12 md:pt-20 pb-20 md:pb-24 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: Fixed, Standard Premium Text Details */}
          <div className="lg:col-span-6 text-left animate-fade-up">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] font-semibold tracking-tight text-foreground">
              Step Into{" "}
              <span className="italic text-gradient-gold">Style.</span>
              <br />
              Step Into SOLESPACE.
            </h1>

            <p className="mt-6 text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
              Premium men's footwear crafted for the modern gentleman. From hand-stitched leather oxfords to all-day comfort sneakers — luxury that walks with you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-gold hover:bg-gold-soft transition duration-300"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/40 text-foreground font-bold text-xs uppercase tracking-widest hover:bg-gold/10 transition duration-300"
              >
                Explore Collection
              </Link>
            </div>

            {/* Counter statistics */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border/40 pt-8">
              {[
                { k: "50K+", v: "Happy Walkers" },
                { k: "200+", v: "Premium Styles" },
                { k: "4.9★", v: "Customer Rating" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-2xl text-gradient-gold font-semibold">{s.k}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Auto-sliding clean images alone */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full animate-float pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-elegant bg-card/25 max-w-md md:max-w-lg w-full aspect-square">
              {images.map((imgSrc, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`SOLESPACE Collection Style ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[4000ms] scale-100 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
