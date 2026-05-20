import { useAppContext } from "@/hooks/useAppContext";
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateCartQuantity, cartTotal } = useAppContext();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-9999">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-card-glass border-l border-gold/20 shadow-elegant flex flex-col animate-fade-right z-10">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-semibold">Shopping Bag</h2>
            <span className="bg-gold/15 text-gold text-xs px-2.5 py-1 rounded-full font-medium">
              {cart.length}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/50 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-muted/30 border border-dashed border-border flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-display text-lg mb-2">Your cart is empty</p>
              <p className="text-xs text-muted-foreground max-w-[200px] mb-6">
                Add premium leather sneakers or comfy slides to start your collection.
              </p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="px-6 py-3 rounded-full bg-gold text-primary-foreground text-xs uppercase tracking-widest hover:bg-gold-soft transition shadow-gold"
              >
                Shop Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 p-4 rounded-2xl bg-card/40 border border-border/60 hover:border-gold/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-secondary/40 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-display text-sm font-semibold leading-tight line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                        Size {item.size}
                      </span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-xs font-semibold text-foreground">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center rounded-lg border border-border bg-card/60 p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, -1)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, 1)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-gold">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-card/65 backdrop-blur-md space-y-4">
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-400 font-semibold">Free Delivery</span>
              </div>
              <div className="border-t border-border/40 my-2 pt-2 flex justify-between text-sm font-semibold text-foreground">
                <span className="font-display">Total (Incl. Taxes)</span>
                <span className="text-gold">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert("Proceeding to secure checkout under sandbox environment...");
                setCartOpen(false);
              }}
              className="w-full h-12 rounded-xl bg-gold text-primary-foreground text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-gold-soft transition shadow-gold"
            >
              <CreditCard className="h-4 w-4" /> Secure Checkout
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full h-12 rounded-xl border border-border text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:border-gold/50 hover:text-gold transition"
            >
              Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
