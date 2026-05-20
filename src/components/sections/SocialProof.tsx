import { Instagram, Heart } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import sneaker from "@/assets/product-sneaker.jpg";
import loafer from "@/assets/product-loafer.jpg";
import formal from "@/assets/product-formal.jpg";
import slide from "@/assets/product-slide.jpg";
import casual from "@/assets/product-casual.jpg";
import sandal from "@/assets/product-sandal.jpg";

const grid = [sneaker, loafer, formal, slide, casual, sandal];

export function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="@solespace_kalavasal"
          title={<>Tag us. Get <span className="italic text-gradient-gold">featured.</span></>}
          description="Follow our daily drops, behind-the-scenes craftsmanship and real customers walking SOLESPACE."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {grid.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/solespace_kalavasal"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl border border-border hover:border-gold/40 transition"
            >
              <img src={src} alt="SOLESPACE on Instagram" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition grid place-items-center">
                <div className="flex items-center gap-3 text-gold">
                  <Heart className="h-5 w-5 fill-gold" />
                  <span className="text-sm font-medium">{(i + 1) * 124}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/solespace_kalavasal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-gold/40 text-foreground text-sm uppercase tracking-widest hover:bg-gold/10 transition"
          >
            <Instagram className="h-4 w-4" />
            Follow @solespace_kalavasal
          </a>
        </div>
      </div>
    </section>
  );
}
