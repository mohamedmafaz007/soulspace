import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Instagram, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SOLESPACE — Get in Touch" },
      { name: "description", content: "Visit SOLESPACE in Kalavasal, Madurai, or message us on WhatsApp and Instagram. We're here for fit advice, orders, and partnerships." },
      { property: "og:title", content: "Contact SOLESPACE" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative bg-hero py-20 md:py-28 border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Say Hello</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold">
            Get in <span className="italic text-gradient-gold">Touch</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Questions, fit advice, or partnership? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {[
              { Icon: MapPin, title: "Visit the Store", text: "Kalavasal, Madurai, Tamil Nadu — 625016, India" },
              { Icon: Phone, title: "Call / WhatsApp", text: "+91 90000 00000" },
              { Icon: Mail, title: "Email", text: "hello@solespace.in" },
              { Icon: Clock, title: "Store Hours", text: "Mon – Sat · 10:00 AM – 9:00 PM" },
              { Icon: Instagram, title: "Instagram", text: "@solespace_kalavasal" },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl bg-card-glass border border-border">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-gold/10 border border-gold/30 grid place-items-center">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold">{title}</p>
                  <p className="mt-1 text-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-card-glass border border-border shadow-elegant"
          >
            <h2 className="font-display text-3xl mb-2">Send us a message</h2>
            <p className="text-sm text-muted-foreground mb-8">We reply within a few hours.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" placeholder="Your name" />
              <Field label="Email" type="email" placeholder="you@email.com" />
              <Field label="Phone" placeholder="+91 …" />
              <Field label="Subject" placeholder="How can we help?" />
            </div>
            <div className="mt-5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Tell us a bit more…"
                className="w-full rounded-xl bg-input/40 border border-border focus:border-gold/60 focus:outline-none px-4 py-3 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-primary-foreground text-sm uppercase tracking-widest hover:bg-gold-soft transition shadow-gold"
            >
              <Send className="h-4 w-4" /> {sent ? "Message Sent" : "Send Message"}
            </button>
            {sent && (
              <p className="mt-4 text-sm text-gold">Thanks! We'll be in touch shortly.</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full h-12 rounded-xl bg-input/40 border border-border focus:border-gold/60 focus:outline-none px-4 text-sm"
      />
    </div>
  );
}
