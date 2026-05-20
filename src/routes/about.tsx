import { createFileRoute } from "@tanstack/react-router";
import { BrandStory } from "@/components/sections/BrandStory";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SOLESPACE — Premium Men's Footwear from India" },
      { name: "description", content: "SOLESPACE is a modern men's footwear destination crafted in Kalavasal, Madurai. Premium quality, affordable luxury, trend-forward designs." },
      { property: "og:title", content: "About SOLESPACE" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative bg-hero py-20 md:py-28 border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold">
            About <span className="italic text-gradient-gold">SOLESPACE</span>
          </h1>
        </div>
      </section>
      <BrandStory />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
