import { useAppContext } from "@/hooks/useAppContext";
import { X, Star, ShoppingBag, Heart, ShieldCheck, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const sizes = [39, 40, 41, 42, 43, 44, 45];

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  // Reset selected size when product changes
  useEffect(() => {
    setSelectedSize(null);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const wished = isWishlisted(quickViewProduct.id);
  const discount = quickViewProduct.oldPrice
    ? Math.round(((quickViewProduct.oldPrice - quickViewProduct.price) / quickViewProduct.oldPrice) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-card-glass border border-gold/20 rounded-3xl overflow-hidden shadow-elegant animate-fade-up z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full border border-border bg-card/60 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Product Gallery UI */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold text-primary-foreground shadow-gold">
                {quickViewProduct.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-destructive text-destructive-foreground">
                -{discount}%
              </span>
            )}
          </div>

          {/* Product Info Panel */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2 font-semibold">
                {quickViewProduct.category}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold leading-snug mb-3">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i <= Math.round(quickViewProduct.rating)
                          ? "fill-gold text-gold"
                          : "text-muted-foreground/35"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold">{quickViewProduct.rating}</span>
                <span className="text-xs text-muted-foreground">({quickViewProduct.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-gold">
                  ₹{quickViewProduct.price.toLocaleString("en-IN")}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{quickViewProduct.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Sizing selection */}
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-widest font-semibold mb-2.5">Select Size (EU)</p>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 rounded-lg text-xs font-semibold border transition-all ${
                        selectedSize === s
                          ? "border-gold bg-gold text-primary-foreground shadow-gold"
                          : "border-border hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="flex gap-2.5 mb-5">
                <button
                  onClick={() => {
                    if (selectedSize) {
                      addToCart(quickViewProduct, selectedSize);
                      setQuickViewProduct(null);
                    }
                  }}
                  disabled={!selectedSize}
                  className={`flex-1 h-12 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    selectedSize
                      ? "bg-gold text-primary-foreground hover:bg-gold-soft shadow-gold"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all ${
                    wished ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold/50 hover:text-gold"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`h-4.5 w-4.5 ${wished ? "fill-gold" : ""}`} />
                </button>
              </div>

              {/* Service Badges */}
              <div className="flex justify-between border-t border-border pt-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" /> 100% Original
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="h-3.5 w-3.5 text-gold" /> Easy Exchanges
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
