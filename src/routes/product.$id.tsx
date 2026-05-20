import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products, type Product } from "@/data/products";
import {
  Star,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    return {
      meta: [
        { title: product ? `${product.name} — SOLESPACE` : "Product — SOLESPACE" },
        { name: "description", content: product?.description ?? "Premium men's footwear by SOLESPACE." },
      ],
    };
  },
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return product;
  },
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="text-gold text-sm uppercase tracking-widest mb-3">404</p>
        <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft underline underline-offset-4">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>
    </div>
  ),
});

const sizes = [39, 40, 41, 42, 43, 44, 45];
const colors = [
  { name: "Noir Black", class: "bg-black ring-black" },
  { name: "Gold Crest", class: "bg-amber-600 ring-amber-600" },
  { name: "Charcoal Grey", class: "bg-zinc-700 ring-zinc-700" },
];

const featureMap: Record<string, string[]> = {
  Sneakers: ["Premium leather upper", "Cushioned EVA sole", "Gold-tipped laces", "Anti-odour lining", "Flexible outsole"],
  Formal: ["Genuine full-grain leather", "Goodyear-welt construction", "Leather sole with rubber toe-tap", "Breathable lining", "Hand-polished finish"],
  Loafers: ["Suede/leather upper", "Penny-keeper band", "Memory foam insole", "Slip-on comfort", "Non-slip rubber outsole"],
  Slides: ["Embossed brand crest", "Contoured footbed", "Soft EVA upper", "Quick-dry material", "All-day arch support"],
  Sandals: ["Premium leather straps", "Adjustable buckle", "Padded footbed", "Cork midsole", "Durable rubber sole"],
  Casual: ["Canvas upper", "Gum rubber sole", "Gold tab detail", "Breathable mesh lining", "Lightweight construction"],
};

const mockReviews = [
  {
    author: "Rohan Sharma",
    date: "May 12, 2026",
    rating: 5,
    title: "Incredible Comfort!",
    comment: "Hands down the best premium sneaker I have owned. The gold-tipped laces are a beautiful detail and the leather feels extremely luxury. Verified purchase.",
  },
  {
    author: "Aditya Verma",
    date: "April 28, 2026",
    rating: 4,
    title: "Superb Leather Quality",
    comment: "The finish is outstanding. Wore it to a formal wedding and received a dozen compliments. Fits true to size.",
  },
  {
    author: "Karan Johar",
    date: "March 15, 2026",
    rating: 5,
    title: "Perfect urban shoes",
    comment: "Extremely comfortable for walking around. The padding is perfect and the black leather goes with everything.",
  },
];

function ProductDetailPage() {
  const product = Route.useLoaderData() as Product;
  const { addToCart, toggleWishlist, isWishlisted } = useAppContext();
  
  // Custom interactive states
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "sizing">("details");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  
  // 360 view states
  const [angle360, setAngle360] = useState(0);
  const [mode360, setMode360] = useState(false);

  // Delivery check state
  const [pincode, setPincode] = useState("");
  const [checkingDelivery, setCheckingDelivery] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const features = featureMap[product.category] ?? featureMap["Casual"];
  const wished = isWishlisted(product.id);

  // Track recently viewed products
  useEffect(() => {
    // Add current product to recently viewed list in localStorage
    const saved = localStorage.getItem("solespace-recent");
    let list: string[] = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Filter out current, push to front, cap at 4 items
    list = [product.id, ...list.filter((id) => id !== product.id)].slice(0, 4);
    localStorage.setItem("solespace-recent", JSON.stringify(list));

    // Resolve product structures for UI rendering
    const resolved = list
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => !!p && p.id !== product.id);
    setRecentlyViewed(resolved);
  }, [product.id]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length < 6) return;
    setCheckingDelivery(true);
    setDeliveryResult(null);
    setTimeout(() => {
      setCheckingDelivery(false);
      setDeliveryResult("Delivered by Friday, May 22 — Free Cash on Delivery & Express Shipping.");
    }, 800);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb navigation */}
      <div className="bg-card/25 border-b border-border py-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/shop" className="hover:text-gold transition">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/shop"
              search={{ category: product.category }}
              className="hover:text-gold transition"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate max-w-[180px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
            Back to Shop
          </Link>

          {/* Product showcase panel */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            
            {/* Gallery Panel with 360 View */}
            <div className="space-y-4">
              
              {/* Main Image Display */}
              <div className="relative rounded-3xl overflow-hidden bg-secondary/30 aspect-square group border border-border/80 shadow-elegant">
                
                {mode360 ? (
                  /* 360 Degree View Interactive Container */
                  <div className="relative w-full h-full flex flex-col justify-center items-center p-6 bg-card/10 select-none">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        transform: `rotateY(${angle360}deg) scale(0.95)`,
                        filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.3))",
                      }}
                      className="max-h-[80%] object-contain transition-transform duration-100"
                    />
                    
                    {/* Drag controls info overlay */}
                    <div className="absolute inset-x-5 bottom-5 bg-background/80 backdrop-blur border border-gold/15 p-4 rounded-2xl flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2">
                        Rotate Footwear 360°
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={angle360}
                        onChange={(e) => setAngle360(parseInt(e.target.value))}
                        className="w-full accent-gold cursor-pointer"
                      />
                      <span className="text-[9px] text-muted-foreground mt-1.5 font-medium">Angle: {angle360}°</span>
                    </div>
                  </div>
                ) : (
                  /* Normal Zoom Image Display */
                  <div className="w-full h-full overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        // Gallery selection mocks variant views with subtle rotations or default
                        transform: activeGalleryIndex === 1
                          ? "scale(1.08) rotate(-4deg)"
                          : activeGalleryIndex === 2
                          ? "scale(1.1) rotate(4deg) scaleY(-1)"
                          : activeGalleryIndex === 3
                          ? "scale(1.15) translate(5px, 5px)"
                          : "none",
                      }}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Image badges */}
                    {product.badge && (
                      <span className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold text-primary-foreground shadow-gold">
                        {product.badge}
                      </span>
                    )}
                    {discount && (
                      <span className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-destructive text-destructive-foreground">
                        -{discount}%
                      </span>
                    )}
                  </div>
                )}

                {/* 360° Selector Button Overlay */}
                <button
                  onClick={() => setMode360(!mode360)}
                  className="absolute bottom-5 left-5 z-15 px-3.5 py-2 rounded-full border border-gold/30 bg-background/85 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-gold hover:border-gold hover:scale-105 transition-all shadow-lg flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {mode360 ? "Gallery View" : "360° Interactive"}
                </button>
              </div>

              {/* Thumbnails list selector */}
              {!mode360 && (
                <div className="grid grid-cols-4 gap-3">
                  {[
                    "View Main",
                    "Angle Details",
                    "Sole View",
                    "Close Up",
                  ].map((label, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveGalleryIndex(i)}
                      className={`rounded-xl overflow-hidden aspect-square border-2 transition-all relative ${
                        activeGalleryIndex === i ? "border-gold scale-95" : "border-border hover:border-gold/50"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={label}
                        style={{
                          transform: i === 1
                            ? "scale(1.2) rotate(-6deg)"
                            : i === 2
                            ? "scale(1.2) rotate(6deg) scaleY(-1)"
                            : i === 3
                            ? "scale(1.3) translate(5px, 5px)"
                            : "none",
                        }}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 inset-x-1 text-[8px] uppercase tracking-wider bg-background/70 backdrop-blur rounded p-0.5 font-bold truncate">
                        {label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info details panel */}
            <div className="flex flex-col">
              
              <div className="flex justify-between items-baseline mb-2.5">
                <p className="text-xs uppercase tracking-[0.35em] text-gold font-bold">
                  {product.category}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  <span className="font-semibold text-foreground">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} customer reviews)</span>
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight mb-4">
                {product.name}
              </h1>

              {/* Pricing section */}
              <div className="flex items-baseline gap-4 mb-3 border-b border-border/40 pb-5">
                <span className="font-display text-3xl font-bold text-gold">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {discount && (
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Swatch Selector */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2.5 text-muted-foreground">Select Color Swatch</p>
                <div className="flex items-center gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 px-3 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 ${
                        selectedColor === c.name
                          ? "border-gold text-gold bg-gold/10"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${c.class}`} />
                      {c.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Select Button Grid */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Select Size (EU)</p>
                  <button className="text-xs text-gold hover:text-gold-soft font-semibold transition">
                    Size Helper Chart →
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-11 h-11 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === s
                          ? "border-gold bg-gold text-primary-foreground shadow-gold"
                          : "border-border hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-[10px] text-muted-foreground/80 mt-2 font-medium">Please select a size to purchase.</p>
                )}
              </div>

              {/* Action Buttons Panel */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => selectedSize && addToCart(product, selectedSize)}
                  disabled={!selectedSize}
                  className={`flex-1 h-13 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    selectedSize
                      ? "bg-gold text-primary-foreground hover:bg-gold-soft shadow-gold"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="h-4.5 w-4.5" /> Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-13 w-13 rounded-xl border flex items-center justify-center transition-all ${
                    wished ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold/50 hover:text-gold"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`h-4.5 w-4.5 ${wished ? "fill-gold" : ""}`} />
                </button>

                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="h-13 w-13 rounded-xl border border-border flex items-center justify-center hover:border-gold/50 hover:text-gold transition-colors duration-300"
                  aria-label="Copy link to share"
                  title="Copy link"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Fast Delivery Pincode Checker */}
              <div className="p-4 rounded-2xl bg-card-glass border border-border/80 mb-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  <MapPin className="h-4 w-4" /> Check Shipping Delivery
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit postal code"
                    className="flex-1 h-10 px-3 text-xs bg-background/50 border border-border rounded-xl focus:border-gold/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-xl bg-muted hover:bg-gold hover:text-primary-foreground text-xs uppercase tracking-widest font-semibold transition"
                  >
                    Check
                  </button>
                </form>
                {checkingDelivery && (
                  <p className="text-[10px] text-muted-foreground animate-pulse">Querying shipping database...</p>
                )}
                {deliveryResult && (
                  <p className="text-[10px] text-emerald-400 font-semibold">{deliveryResult}</p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, title: "Free Shipping", sub: "For prepaid orders" },
                  { icon: RotateCcw, title: "7-Day Return", sub: "Easy door pickup" },
                  { icon: Shield, title: "100% Genuine", sub: "Authorized showroom" },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex flex-col items-center text-center p-3 rounded-2xl bg-card/30 border border-border/60">
                    <Icon className="h-4.5 w-4.5 text-gold mb-1.5" />
                    <p className="text-[10px] font-bold uppercase tracking-wider">{title}</p>
                    <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Sizing, Care, and Details Tab List */}
          <div className="mt-16 border-t border-border/40 pt-10">
            <div className="flex gap-6 border-b border-border mb-8 overflow-x-auto">
              {(["details", "care", "sizing"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-xs uppercase tracking-widest font-semibold transition border-b-2 -mb-px shrink-0 ${
                    activeTab === tab
                      ? "border-gold text-gold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "details" ? "Specifications" : tab === "care" ? "Shoe Care Guide" : "Size Conversion Matrix"}
                </button>
              ))}
            </div>

            {activeTab === "details" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-3.5 rounded-xl bg-card/30 border border-border/50">
                    <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{f}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "care" && (
              <div className="space-y-3 text-xs text-muted-foreground max-w-2xl bg-card-glass border border-border p-5 rounded-2xl">
                <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> Clean with a premium soft shoe brush after each wear to clear dust.</p>
                <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> Apply wax polish for leather, or suede spray for suede variant.</p>
                <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> Never machine wash. If wet, let it dry naturally under ceiling fan.</p>
                <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> Use cedar wood shoe trees to absorb moisture and maintain upper curve.</p>
              </div>
            )}
            {activeTab === "sizing" && (
              <div className="overflow-x-auto bg-card-glass border border-border rounded-2xl p-5">
                <table className="text-xs text-center w-full max-w-lg">
                  <thead>
                    <tr className="border-b border-border text-[9px] uppercase tracking-widest text-muted-foreground">
                      <th className="py-2.5 pr-4 text-left font-bold text-gold">EUROPE</th>
                      <th className="py-2.5 px-4 font-bold">UK</th>
                      <th className="py-2.5 px-4 font-bold">US</th>
                      <th className="py-2.5 pl-4 font-bold">FOOT LENGTH (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [39, 6, 7, "25.0 cm"],
                      [40, 7, 8, "25.5 cm"],
                      [41, 7.5, 8.5, "26.0 cm"],
                      [42, 8, 9, "26.5 cm"],
                      [43, 9, 10, "27.5 cm"],
                      [44, 9.5, 10.5, "28.0 cm"],
                      [45, 10, 11, "29.0 cm"],
                    ].map(([eu, uk, us, cm]) => (
                      <tr key={eu} className="border-b border-border/30 hover:bg-card/40 transition">
                        <td className="py-2.5 pr-4 text-left font-bold text-foreground">{eu}</td>
                        <td className="py-2.5 px-4 text-muted-foreground">{uk}</td>
                        <td className="py-2.5 px-4 text-muted-foreground">{us}</td>
                        <td className="py-2.5 pl-4 text-muted-foreground font-semibold">{cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Ratings & Reviews Section */}
          <div className="mt-16 border-t border-border/40 pt-10">
            <h2 className="font-display text-2xl mb-8 flex items-center gap-2">
              <MessageSquare className="h-5.5 w-5.5 text-gold" /> Customer Reviews
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Reviews Breakdown Summary */}
              <div className="p-5 rounded-2xl bg-card-glass border border-border space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Ratings Summary</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">/ 5.0</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-4.5 w-4.5 ${
                        i <= Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">96% of customers recommend this shoe style.</p>

                {/* Rating bars */}
                <div className="space-y-1.5 pt-2">
                  {[
                    { stars: 5, pct: "75%" },
                    { stars: 4, pct: "20%" },
                    { stars: 3, pct: "3%" },
                    { stars: 2, pct: "2%" },
                    { stars: 1, pct: "0%" },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-right">{row.stars}</span>
                      <div className="flex-1 h-2 bg-secondary/60 rounded-full overflow-hidden">
                        <div className="h-full bg-gold" style={{ width: row.pct }} />
                      </div>
                      <span className="w-8 text-muted-foreground text-right">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-4">
                {mockReviews.map((rev, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-card/25 border border-border/80 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold text-foreground">{rev.author}</p>
                        <p className="text-[10px] text-muted-foreground">{rev.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i <= rev.rating ? "fill-gold text-gold" : "text-muted-foreground/20"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider">{rev.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products Slider Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-border/40 pt-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1">Pairs You May Like</p>
                  <h2 className="font-display text-2xl font-bold">Similar Footwear</h2>
                </div>
                <Link
                  to="/shop"
                  search={{ category: product.category }}
                  className="text-xs uppercase tracking-widest text-gold hover:text-gold-soft border-b border-gold/40 pb-1 font-semibold"
                >
                  View All
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Recently Viewed Items Section */}
          {recentlyViewed.length > 0 && (
            <div className="mt-16 border-t border-border/40 pt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1.5">Your browsing history</p>
              <h2 className="font-display text-2xl font-bold mb-8">Recently Viewed</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyViewed.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
