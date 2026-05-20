import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send, Sparkles } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      toast.success("Subscribed successfully! Welcome to the SOLESPACE inner circle.");
      setEmail("");
    }, 800);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-card/20 border-t border-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10 text-center space-y-6">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold uppercase tracking-widest text-gold">
          <Sparkles className="h-3.5 w-3.5" /> Newsletter Club
        </span>

        <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-foreground">
          Join the <span className="italic text-gradient-gold">SOLESPACE</span> Club
        </h2>

        <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Be the first to receive notifications on private collection drop events, new style pre-orders, and secret members-only weekend deals.
        </p>

        {subscribed ? (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-gold/10 border border-gold/20 text-xs font-semibold text-gold tracking-wider uppercase animate-fade-up">
            You are on the list! Check your inbox for your 10% welcome coupon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-12 pl-11 pr-4 rounded-full bg-background border border-border focus:border-gold/60 focus:outline-none text-xs"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-full bg-gold text-primary-foreground text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-gold-soft transition shadow-gold"
            >
              {loading ? "Joining..." : "Subscribe"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
        <p className="text-[10px] text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
