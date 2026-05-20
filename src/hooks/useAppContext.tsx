import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/data/products";
import { toast } from "sonner";

export type CartItem = {
  product: Product;
  size: number;
  quantity: number;
};

type AppContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (product: Product, size: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateCartQuantity: (productId: string, size: number, val: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Initialize state from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("solespace-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      document.documentElement.className = "dark";
    }

    const savedCart = localStorage.getItem("solespace-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const savedWishlist = localStorage.getItem("solespace-wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("solespace-theme", nextTheme);
    document.documentElement.className = nextTheme;
    toast.success(`Switched to ${nextTheme === "dark" ? "Dark" : "Light"} mode`);
  };

  const addToCart = (product: Product, size: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      let newCart;
      if (existingItemIndex > -1) {
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
      } else {
        newCart = [...prevCart, { product, size, quantity: 1 }];
      }

      localStorage.setItem("solespace-cart", JSON.stringify(newCart));
      return newCart;
    });

    toast.success(`${product.name} (Size ${size}) added to cart!`);
    setCartOpen(true); // Open cart drawer on successful add
  };

  const removeFromCart = (productId: string, size: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => !(item.product.id === productId && item.size === size)
      );
      localStorage.setItem("solespace-cart", JSON.stringify(newCart));
      return newCart;
    });
    toast.info("Item removed from cart");
  };

  const updateCartQuantity = (productId: string, size: number, val: number) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQuantity = Math.max(1, item.quantity + val);
            return { ...item, quantity: nextQuantity };
          }
          return item;
        });
      localStorage.setItem("solespace-cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("solespace-cart");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      const index = prevWishlist.indexOf(productId);
      let newWishlist;
      if (index > -1) {
        newWishlist = prevWishlist.filter((id) => id !== productId);
        toast.info("Removed from wishlist");
      } else {
        newWishlist = [...prevWishlist, productId];
        toast.success("Added to wishlist!");
      }
      localStorage.setItem("solespace-wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartOpen,
        setCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
