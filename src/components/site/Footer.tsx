import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Send, CreditCard } from "lucide-react";
import logo from "@/assets/solespace-logo.png";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed successfully from footer!");
    setEmail("");
  };

  return (
    <footer className="relative mt-24 border-t border-gold/20 bg-card/40">
      {/* Golden gradient line on top */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Logo and About column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-gold/40 group-hover:ring-gold transition-all duration-300">
                <img src={logo} alt="SOLESPACE" className="h-full w-full object-cover rounded-full" />
              </div>
              <span className="font-display text-lg tracking-[0.3em] font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                SOLE<span className="text-gradient-gold">SPACE</span>
              </span>
            </Link>
            
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-sm">
              India's premium men's footwear boutique. Offering hand-finished loafers, sneakers, formal dress shoes, and urban slides designed for absolute comfort.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-2.5">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/solespace_kalavasal" },
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 grid place-items-center rounded-full border border-border bg-background/30 hover:bg-gold hover:text-primary-foreground hover:border-gold transition duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links column */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-5">Navigation</h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop Catalog" },
                { to: "/collections", label: "Collections" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Get in Touch" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-gold transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories column */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-5">Collections</h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider">
              {["Sneakers", "Formal", "Loafers", "Slides", "Sandals", "Casual"].map((c) => (
                <li key={c}>
                  <Link
                    to="/shop"
                    search={{ category: c }}
                    className="text-muted-foreground hover:text-gold transition"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe and Contact Column */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-4">Contact Details</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Kalavasal, Madurai, TN, India</li>
                <li className="flex gap-2"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> +91 90000 00000</li>
                <li className="flex gap-2"><Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" /> hello@solespace.in</li>
              </ul>
            </div>

            <div className="border-t border-border/40 pt-4">
              <h4 className="text-[9px] uppercase tracking-widest text-gold font-semibold mb-3">Quick Subscribe</h4>
              <form onSubmit={handleSubscribe} className="flex gap-1.5 max-w-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="flex-1 h-9 px-3 text-xs bg-background/50 border border-border rounded-xl focus:border-gold/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-9 w-9 rounded-xl bg-gold text-primary-foreground flex items-center justify-center hover:bg-gold-soft transition"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer bottom area with payment badges */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="text-[10px] text-muted-foreground">
              © {new Date().getFullYear()} SOLESPACE India. Handcrafted Footwear Showcase.
            </p>
            <p className="text-[9px] text-muted-foreground/60">
              Product images are for presentation purposes. Delivery timelines verified dynamically.
            </p>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[8px] font-bold tracking-widest text-muted-foreground">
            <span className="px-2 py-1 rounded border border-border bg-background/40">VISA</span>
            <span className="px-2 py-1 rounded border border-border bg-background/40">MASTERCARD</span>
            <span className="px-2 py-1 rounded border border-border bg-background/40">RUPAY</span>
            <span className="px-2 py-1 rounded border border-border bg-background/40">UPI PAY</span>
            <span className="px-2 py-1 rounded border border-border bg-background/40">CASH ON DELIVERY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
