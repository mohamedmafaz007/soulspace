import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X, Star, Eye } from "lucide-react";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

type ShopSearch = {
  category?: string;
  search?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      category: search.category as string | undefined,
      search: search.search as string | undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop All — SOLESPACE Premium Men's Footwear" },
      { name: "description", content: "Browse the full SOLESPACE collection — sneakers, loafers, oxfords, slides, sandals and more. Premium men's footwear, delivered across India." },
      { property: "og:title", content: "Shop All — SOLESPACE" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const filters = ["All", "Sneakers", "Formal", "Loafers", "Slides", "Sandals", "Casual"];
const sorts = ["Featured", "Price: Low → High", "Price: High → Low", "Top Rated"] as const;
const sizes = [39, 40, 41, 42, 43, 44, 45];

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const active = search.category || "All";
  const [query, setQuery] = useState(search.search || "");
  const [sort, setSort] = useState<typeof sorts[number]>("Featured");
  
  // Custom filters
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  // Layout toggles
  const [showFilters, setShowFilters] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync state with URL search param changes
  useEffect(() => {
    setQuery(search.search || "");
  }, [search.search]);

  // Fake skeleton loader effect on filter change
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [active, query, sort, priceFilter, sizeFilter, ratingFilter]);

  const list = useMemo(() => {
    let l = products;
    if (active !== "All") {
      l = l.filter((p) => p.category.toLowerCase() === active.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      l = l.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    
    // Price Filter
    if (priceFilter === "under-1500") {
      l = l.filter((p) => p.price < 1500);
    } else if (priceFilter === "1500-3000") {
      l = l.filter((p) => p.price >= 1500 && p.price <= 3000);
    } else if (priceFilter === "over-3000") {
      l = l.filter((p) => p.price > 3000);
    }

    // Size Filter (mocked matches size selection availability)
    if (sizeFilter) {
      // Hardcoded mock check: even IDs match odd sizes for variety
      l = l.filter((p) => (parseInt(p.id) + sizeFilter) % 2 === 0);
    }

    // Rating Filter
    if (ratingFilter) {
      l = l.filter((p) => p.rating >= ratingFilter);
    }

    // Sorting
    if (sort === "Price: Low → High") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") l = [...l].sort((a, b) => b.rating - a.rating);
    
    return l;
  }, [active, query, sort, priceFilter, sizeFilter, ratingFilter]);

  // Live search suggestions
  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 4);
  }, [query]);

  const handleCategoryChange = (cat: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: cat === "All" ? undefined : cat,
      }),
    });
  };

  const handleSearchChange = (val: string) => {
    setQuery(val);
    navigate({
      search: (prev) => ({
        ...prev,
        search: val || undefined,
      }),
    });
    setShowSuggestions(val.length >= 2);
  };

  const resetAllFilters = () => {
    handleCategoryChange("All");
    setQuery("");
    setPriceFilter("all");
    setSizeFilter(null);
    setRatingFilter(null);
    setSort("Featured");
    navigate({ search: {} });
  };

  return (
    <>
      <section className="relative bg-hero py-20 md:py-28 border-b border-gold/10">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, oklch(0.82 0.13 82) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center relative z-10 animate-fade-in">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 font-semibold">The Collection</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground">
            Shop <span className="italic text-gradient-gold">SOLESPACE</span>
          </h1>
          <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every pair, handpicked. Every stitch, intentional. Experience modern luxury combined with urban athletic comfort.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          
          {/* Header Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-border/40 pb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="h-11 px-5 rounded-full border border-border bg-card/40 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest hover:border-gold/50 hover:text-gold transition-colors duration-300"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <span className="text-xs text-muted-foreground font-medium">
                Showing {list.length} {list.length === 1 ? "Style" : "Styles"}
              </span>
            </div>

            {/* Live Search and Custom Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setShowSuggestions(query.length >= 2)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                  placeholder="Search styles…"
                  className="w-full h-11 pl-11 pr-4 rounded-full bg-card-glass border border-border focus:border-gold/60 focus:outline-none text-xs"
                />

                {/* Search Suggestions Dropdown Overlay */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-[110%] left-0 right-0 z-50 bg-card-glass border border-gold/25 rounded-2xl p-3 shadow-elegant animate-fade-up">
                    <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-2 px-2">Suggestions</p>
                    <div className="space-y-1">
                      {suggestions.map((p) => (
                        <Link
                          key={p.id}
                          to="/product/$id"
                          params={{ id: p.id }}
                          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gold/5 transition-all text-left"
                        >
                          <img src={p.image} className="w-8 h-8 rounded-lg object-cover bg-secondary/30 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-[11px] font-semibold truncate leading-tight">{p.name}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">{p.category}</p>
                          </div>
                          <span className="text-[10px] font-semibold text-gold ml-auto shrink-0">₹{p.price.toLocaleString("en-IN")}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sorting Select Option */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sorts[number])}
                  className="h-11 pl-4 pr-10 rounded-full bg-card-glass border border-border focus:border-gold/60 focus:outline-none text-xs uppercase tracking-widest font-semibold cursor-pointer appearance-none text-muted-foreground hover:text-foreground"
                >
                  {sorts.map((s) => (
                    <option key={s} value={s} className="bg-card">
                      Sort: {s}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            {/* Left Sidebar Filter Section */}
            {showFilters && (
              <div className="w-64 shrink-0 hidden md:block space-y-7 animate-fade-right sticky top-24">
                
                {/* Categories */}
                <div className="border-b border-border/40 pb-5">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">Categories</h4>
                  <div className="space-y-1.5">
                    {filters.map((f) => (
                      <button
                        key={f}
                        onClick={() => handleCategoryChange(f)}
                        className={`w-full text-left text-xs py-1.5 px-3 rounded-lg uppercase tracking-wider transition-all ${
                          active.toLowerCase() === f.toLowerCase()
                            ? "bg-gold/10 text-gold font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border-b border-border/40 pb-5">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3.5">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { label: "All Prices", val: "all" },
                      { label: "Under ₹1,500", val: "under-1500" },
                      { label: "₹1,500 – ₹3,000", val: "1500-3000" },
                      { label: "Over ₹3,000", val: "over-3000" },
                    ].map((item) => (
                      <label key={item.val} className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        <input
                          type="radio"
                          name="price-filter"
                          checked={priceFilter === item.val}
                          onChange={() => setPriceFilter(item.val)}
                          className="accent-gold h-3.5 w-3.5"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes Filter */}
                <div className="border-b border-border/40 pb-5">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">Filter by Size</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSizeFilter(sizeFilter === s ? null : s)}
                        className={`w-9 h-9 rounded-lg text-xs font-semibold border flex items-center justify-center transition-all ${
                          sizeFilter === s
                            ? "border-gold bg-gold text-primary-foreground shadow-gold"
                            : "border-border hover:border-gold/40 hover:text-gold"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="border-b border-border/40 pb-5">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3.5">Min Customer Rating</h4>
                  <div className="space-y-2">
                    {[
                      { label: "All Ratings", val: null },
                      { label: "4.5★ & Above", val: 4.5 },
                      { label: "4.0★ & Above", val: 4.0 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        <input
                          type="radio"
                          name="rating-filter"
                          checked={ratingFilter === item.val}
                          onChange={() => setRatingFilter(item.val)}
                          className="accent-gold h-3.5 w-3.5"
                        />
                        <span className="flex items-center gap-1">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={resetAllFilters}
                  className="w-full py-2.5 rounded-xl border border-dashed border-border hover:border-gold/45 text-xs text-muted-foreground hover:text-gold uppercase tracking-widest transition-all font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Right Product Grid Area */}
            <div className="flex-1">
              {loading ? (
                /* Skeleton Loader Cards Grid */
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-card-glass border border-border rounded-2xl p-4 space-y-4 animate-pulse">
                      <div className="aspect-square bg-muted/40 rounded-xl" />
                      <div className="space-y-2">
                        <div className="h-2 bg-muted/40 rounded w-1/3" />
                        <div className="h-4 bg-muted/40 rounded w-3/4" />
                        <div className="h-3 bg-muted/40 rounded w-full" />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="h-5 bg-muted/40 rounded w-1/3" />
                        <div className="h-6 bg-muted/40 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : list.length === 0 ? (
                <div className="text-center py-24 bg-card-glass border border-border rounded-3xl p-8 max-w-xl mx-auto">
                  <SlidersHorizontal className="h-8 w-8 text-gold mx-auto mb-4" />
                  <p className="font-display text-lg font-semibold mb-2">No Matching Pair Found</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    We couldn't find any products matching your specific combinations. Try resetting filters to explore our whole catalog.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="px-6 py-3 rounded-full bg-gold text-primary-foreground text-xs uppercase tracking-widest font-semibold hover:bg-gold-soft transition shadow-gold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {list.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
