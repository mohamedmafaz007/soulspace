import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingBag, ChevronDown, Sun, Moon } from "lucide-react";
import logo from "@/assets/solespace-logo.png";
import { useAppContext } from "@/hooks/useAppContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const collectionCategories = [
  { label: "All Collections", to: "/shop", search: {} },
  { label: "Sneakers", to: "/shop", search: { category: "Sneakers" } },
  { label: "Formal", to: "/shop", search: { category: "Formal" } },
  { label: "Loafers", to: "/shop", search: { category: "Loafers" } },
  { label: "Slides", to: "/shop", search: { category: "Slides" } },
  { label: "Sandals", to: "/shop", search: { category: "Sandals" } },
  { label: "Casual", to: "/shop", search: { category: "Casual" } },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const { cartCount, setCartOpen, theme, toggleTheme } = useAppContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/95 backdrop-blur-xl border-b border-gold/20 shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-gold/50 group-hover:ring-gold transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(209,161,82,0.6)]">
              <img
                src={logo}
                alt="SOLESPACE"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <span className="hidden sm:block font-display text-lg tracking-[0.3em] font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
              SOLE<span className="text-gradient-gold">SPACE</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              if (item.label === "Collections") {
                return (
                  <div key={item.to} className="relative group/dropdown py-5">
                    <Link
                      to={item.to}
                      className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition flex items-center gap-1.5 cursor-pointer"
                      activeProps={{ className: "text-foreground" }}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover/dropdown:rotate-180" />
                    </Link>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 h-px w-0 bg-gold group-hover/dropdown:w-full transition-all duration-300" />
                    
                    {/* Premium glassmorphism dropdown */}
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-56 pt-2 opacity-0 invisible translate-y-2 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-300 z-50">
                      <div className="bg-card-glass border border-gold/20 rounded-2xl p-2.5 shadow-elegant">
                        {collectionCategories.map((cat) => (
                          <Link
                            key={cat.label}
                            to={cat.to}
                            search={cat.search}
                            className="block px-4 py-2.5 text-xs tracking-wider uppercase text-muted-foreground hover:text-gold hover:bg-gold/5 rounded-lg transition"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition relative group py-5"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-gold" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <Link
              to="/shop"
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition relative text-foreground"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold text-[9px] font-bold text-primary-foreground flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-6 pt-2 animate-fade-up">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                if (item.label === "Collections") {
                  return (
                    <div key={item.to} className="flex flex-col">
                      <button
                        onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                        className="flex items-center justify-between w-full py-3 px-3 text-sm tracking-widest uppercase rounded-lg hover:bg-muted text-muted-foreground"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileCollectionsOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {mobileCollectionsOpen && (
                        <div className="pl-4 flex flex-col gap-0.5 border-l border-gold/20 ml-3 my-1">
                          {collectionCategories.map((cat) => (
                            <Link
                              key={cat.label}
                              to={cat.to}
                              search={cat.search}
                              onClick={() => {
                                setOpen(false);
                                setMobileCollectionsOpen(false);
                              }}
                              className="py-2.5 px-3 text-xs tracking-wider uppercase rounded-lg hover:bg-muted text-muted-foreground"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 text-sm tracking-widest uppercase rounded-lg hover:bg-muted"
                    activeProps={{ className: "text-gold bg-muted" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
