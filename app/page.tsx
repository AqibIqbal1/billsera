"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Send,
  Sparkles,
  CreditCard,
  Bell,
  Globe,
} from "lucide-react";

// --- Nav ---
const Nav = () => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-6 pb-2"
  >
    <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4 rounded-2xl bg-zinc-950/60 border border-white/[0.06] backdrop-blur-xl">
      <a href="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-xl bg-violet-500 flex items-center justify-center text-white group-hover:bg-violet-400 transition-colors">
          <Zap className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold text-zinc-100 tracking-tight">
          Billsera
        </span>
      </a>
      <div className="hidden md:flex items-center gap-1">
        <a
          href="#features"
          className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Features
        </a>
        <a
          href="#flow"
          className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Flow
        </a>
      </div>
      <div className="flex items-center gap-2">
        {/* <Link
          href="/login"
          className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
        >
          Log in
        </Link> */}
        <Link
          href="/signup"
          className="px-5 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-bold hover:bg-violet-400 transition-colors"
        >
          Get started
        </Link>
      </div>
    </nav>
  </motion.header>
);

// --- Hero: one line, maximum impact ---
const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 overflow-hidden">
    <div className="absolute inset-0 gradient-mesh" />
    <div className="absolute inset-0 bg-grid-dark" />
    <div className="fixed inset-0 noise z-0" />

    <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface text-violet-400 text-sm font-medium mb-8 md:mb-12"
      >
        <Sparkles className="w-4 h-4" />
        Built for founders who get paid
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-100 leading-[1.05] mb-8"
      >
        Invoicing
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-[length:200%_auto] animate-gradient-shift text-glow-violet">
          without the headache.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-14 leading-relaxed"
      >
        Create, send, get paid. In under a minute.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 md:mb-24"
      >
        <a
          href="#waitlist"
          className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-violet-500 text-white font-bold text-base hover:bg-violet-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
        >
          Join the waitlist
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#flow"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl surface surface-hover text-zinc-300 font-semibold text-base transition-colors"
        >
          See how it works
        </a>
      </motion.div>

    </div>
  </section>
);

// --- Features ---
const Features = () => {
  const items = [
    {
      icon: FileText,
      title: "Create in 30 sec",
      desc: "No templates. No clutter.",
    },
    {
      icon: Send,
      title: "One-click send",
      desc: "Email or link. Client pays.",
    },
    {
      icon: CreditCard,
      title: "Get paid instantly",
      desc: "Stripe built in.",
    },
    {
      icon: Bell,
      title: "Live updates",
      desc: "View, paid, downloaded.",
    },
    {
      icon: Globe,
      title: "150+ countries",
      desc: "Any currency.",
    },
  ];

  return (
    <section id="features" className="relative py-28 md:py-36 px-4 md:px-8 section-band">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-zinc-100 mb-3 tracking-tight"
        >
          Everything you need.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-500 text-base md:text-lg mb-14"
        >
          No accounting degree required.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="surface surface-hover rounded-2xl p-6 md:p-7 transition-all duration-300 group/card"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover/card:bg-violet-500/30 group-hover/card:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 mb-1.5">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Flow ---
const FlowSection = () => (
  <section id="flow" className="relative py-28 md:py-36 px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-black text-zinc-100 mb-3 tracking-tight"
      >
        The flow.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-zinc-500 text-base md:text-lg mb-14"
      >
        Create → Send → Paid. That’s it.
      </motion.p>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-6 relative">
        <div className="absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent hidden md:block -translate-y-1/2" />

        {[
          { step: "01", title: "Create", sub: "Add client, line items, done." },
          { step: "02", title: "Send", sub: "Link or email. One click." },
          { step: "03", title: "Paid", sub: "Money in your account." },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative flex flex-col items-center text-center surface rounded-2xl p-8 md:p-9 surface-hover z-10 group/step"
          >
            <span className="text-3xl md:text-4xl font-black text-violet-400/70 mb-3 tabular-nums group-hover/step:text-violet-400 transition-colors duration-300">
              {item.step}
            </span>
            <h3 className="text-lg font-bold text-zinc-100 mb-1.5">{item.title}</h3>
            <p className="text-sm text-zinc-500">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Waitlist ---
const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll be in touch.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Could not join waitlist. Try again."
      );
    }
  }

  return (
    <section
      id="waitlist"
      className="relative py-28 md:py-36 px-4 md:px-8 section-band"
    >
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface text-violet-400 text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          200+ on the list
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-zinc-100 mb-4 tracking-tight"
        >
          Get in before everyone else.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-500 mb-10 leading-relaxed"
        >
          We’ll only email you when we launch. No spam, ever.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@company.com"
            required
            aria-label="Email for waitlist"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-zinc-100 placeholder:text-zinc-500 font-medium outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-4 rounded-2xl bg-violet-500 text-white font-bold hover:bg-violet-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-violet-500/20"
          >
            {status === "loading" ? "Joining..." : "Join"}
          </button>
        </motion.form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-8 flex items-center justify-center gap-6 text-zinc-500 text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500/70" /> No spam
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500/70" /> Unsubscribe anytime
          </span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 selection:bg-violet-500/30 selection:text-white overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Features />
        <FlowSection />
        <WaitlistSection />
      </main>
      <footer className="py-10 border-t border-white/[0.06] text-center text-zinc-500 text-sm">
        © 2026 Billsera
      </footer>
    </div>
  );
}
