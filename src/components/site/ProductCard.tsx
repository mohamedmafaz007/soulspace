import { Link } from "@tanstack/react-router";
import { Star, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useAppContext } from "@/hooks/useAppContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, isWishlisted, addToCart } = useAppContext();
  
  const wished = isWishlisted(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div
      className="group relative animate-fade-up flex flex-col h-full"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Gold top glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
      
      <div className="relative bg-card-glass border border-border rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-gold/45 group-hover:shadow-[0_10px_30px_-10px_rgba(209,161,82,0.15)] flex flex-col h-full">
        
        {/* Card Image Area (Clean, no overlays or blur on hover) */}
        <div className="relative aspect-square overflow-hidden bg-secondary/40">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />

          {/* Badge overlays */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-gold text-primary-foreground shadow-gold">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-destructive text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {/* Info & Action Buttons Area */}
        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-baseline">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">{product.category}</p>
              
              {/* Stars rating */}
              <div className="flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 fill-gold text-gold" />
                <span className="text-[10px] sm:text-[11px] font-semibold ml-0.5">{product.rating}</span>
              </div>
            </div>
            
            <h3 className="font-display text-sm sm:text-base font-semibold leading-snug group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            
            <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-sm sm:text-base font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
          </div>

          {/* Bottom actions containing: View Product, Wishlist (Heart), and Add to Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-border/40">
            {/* View Product Details */}
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="flex-1 h-9 px-2 sm:px-4 rounded-xl bg-gold hover:bg-gold-soft text-primary-foreground font-bold text-[9px] sm:text-[10px] uppercase tracking-widest flex items-center justify-center shadow-gold hover:scale-[1.02] transition-all duration-300 min-w-0"
            >
              View
            </Link>

            {/* Wishlist Like Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-[1.02] shrink-0 ${
                wished 
                  ? "text-gold border-gold/40 bg-gold/15" 
                  : "text-muted-foreground border-border bg-background/20 hover:text-gold hover:border-gold/45"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`h-3.5 w-3.5 ${wished ? "fill-gold text-gold" : ""}`} />
            </button>

            {/* Quick Add To Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 42); // default size 42
              }}
              className="h-9 w-9 rounded-xl border border-border bg-background/20 text-muted-foreground hover:text-gold hover:border-gold/45 hover:scale-[1.02] flex items-center justify-center transition-all duration-300 shrink-0"
              title="Add to cart (Size 42)"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
