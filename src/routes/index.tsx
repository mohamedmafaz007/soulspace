import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { BestSellers } from "@/components/sections/BestSellers";
import { SpecialOffer } from "@/components/sections/SpecialOffer";
import { BrandStory } from "@/components/sections/BrandStory";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { SocialProof } from "@/components/sections/SocialProof";
import { Newsletter } from "@/components/sections/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLESPACE — Premium Men's Footwear | Sneakers, Loafers, Formal Shoes" },
      { name: "description", content: "Step into style with SOLESPACE. Shop premium men's sneakers, loafers, formal shoes, slides and sandals. Luxury comfort, modern design, crafted in India." },
      { property: "og:title", content: "SOLESPACE — Premium Men's Footwear" },
      { property: "og:description", content: "Step into style. Step into SOLESPACE." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <SpecialOffer />
      <BrandStory />
      <BrandShowcase />
      <NewArrivals />
      <WhyChooseUs />
      <Testimonials />
      <SocialProof />
      <Newsletter />
    </>
  );
}
