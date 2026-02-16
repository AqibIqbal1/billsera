"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Users,
  BarChart3,
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
  Play,
  CreditCard,
  Send,
  MoreHorizontal,
  Bell,
  Globe,
} from "lucide-react";

// --- Utility Components ---

const AuroraBackground = () => (
  <div className="aurora-bg">
    <div className="aurora-item bg-indigo-300/30 -top-20 -left-20 animate-float-slow opacity-60 mix-blend-multiply blur-[100px]" />
    <div className="aurora-item bg-purple-300/30 top-40 -right-40 animate-float-medium opacity-50 mix-blend-multiply blur-[100px]" />
    <div className="aurora-item bg-blue-200/40 bottom-20 left-1/3 animate-float-fast opacity-40 mix-blend-multiply blur-[100px]" />
  </div>
);

const FloatingNav = () => (
  <motion.nav
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
    className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-5xl"
  >
    <div className="glass-pill px-2 py-2 rounded-full flex items-center justify-between md:justify-start gap-1 shadow-xl shadow-indigo-500/5">
      <div className="pl-2 md:pl-4 pr-3 md:pr-6 flex items-center gap-2 cursor-pointer">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
          <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
        </div>
        <span className="text-sm md:text-base font-bold text-zinc-900 tracking-tight">
          <a href="/">Billsera.</a>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-zinc-100/50 rounded-full px-1 py-1">
        {["Features", "Flow"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-5 py-2 rounded-full text-sm font-medium text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all duration-300"
          >
            {item}
          </a>
        ))}
        <span className="relative px-5 py-2 rounded-full text-sm font-medium text-zinc-400 cursor-default group">
          Pricing
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-[8px] font-black uppercase tracking-wider leading-none">
            Soon
          </span>
        </span>
        <span className="relative px-5 py-2 rounded-full text-sm font-medium text-zinc-400 cursor-default group">
          Blog
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-[8px] font-black uppercase tracking-wider leading-none">
            Soon
          </span>
        </span>
      </div>

      <div className="pl-2 pr-2 flex items-center gap-2">
        <a
          className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-zinc-900 text-white text-xs md:text-sm font-bold hover:bg-black hover:scale-105 transition-all shadow-lg cursor-pointer"
          href="#waitlist"
        >
          Get Started
        </a>
      </div>
    </div>
  </motion.nav>
);

const MockInvoice = ({ className }: { className?: string }) => (
  <div className={`glass-card p-6 rounded-[24px] w-[320px] ${className}`}>
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Client
          </div>
          <div className="text-sm font-bold text-zinc-900">Acme Corp</div>
        </div>
      </div>
      <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
        $4,500.00
      </div>
    </div>
    <div className="space-y-3 mb-6">
      <div className="h-2 w-3/4 bg-zinc-100 rounded-full" />
      <div className="h-2 w-1/2 bg-zinc-100 rounded-full" />
    </div>
    <div className="flex gap-2">
      <button className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2">
        <Send className="w-3 h-3" /> Send
      </button>
      <button className="p-2 rounded-xl bg-zinc-50 text-zinc-400 hover:text-zinc-900">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const MockPayment = ({ className }: { className?: string }) => (
  <div
    className={`glass-card p-4 rounded-[20px] flex items-center gap-4 w-[280px] ${className}`}
  >
    <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
      <CheckCircle2 className="w-6 h-6" />
    </div>
    <div>
      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
        Status
      </div>
      <div className="text-lg font-black text-zinc-900">Payment Paid</div>
    </div>
  </div>
);

const MockBalance = ({ className }: { className?: string }) => (
  <div className={`glass-card p-5 rounded-[24px] w-[240px] ${className}`}>
    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
      Total Revenue
    </div>
    <div className="text-3xl font-black text-zinc-900 mb-4">$124,500</div>
    <div className="flex gap-1 h-8 items-end">
      {[4, 7, 5, 9, 6, 8, 10].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-indigo-500 rounded-t-sm opacity-20 hover:opacity-100 transition-opacity"
          style={{ height: `${h * 10}%` }}
        />
      ))}
    </div>
  </div>
);

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Floating UI Elements (3D Space) - Hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none select-none hidden lg:block">
        <div className="absolute top-1/4 left-[10%] animate-float-slow">
          <MockInvoice className="rotate-[-6deg] scale-90 blur-[1px] opacity-80" />
        </div>
        <div className="absolute bottom-1/4 right-[10%] animate-float-medium">
          <MockPayment className="rotate-[6deg] scale-100 shadow-2xl" />
        </div>
        <div className="absolute top-1/3 right-[15%] animate-float-fast">
          <MockBalance className="rotate-[3deg] scale-90 blur-[0.5px] opacity-90" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/50 border border-white/60 backdrop-blur-md text-indigo-600 text-xs md:text-sm font-bold shadow-sm mb-6 md:mb-10 animate-float-fast">
          <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
          <span className="hidden sm:inline">
            The Future of Invoicing is Here
          </span>
          <span className="sm:hidden">Future is Here</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-900 mb-6 md:mb-8 leading-[0.9] px-4">
          Invoicing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x text-glow">
            Reimagined.
          </span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-zinc-500 font-medium max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          Experience the flow of financial management.{" "}
          <br className="hidden sm:block" />
          Beautiful, fast, and built for the modern founder.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto px-4">
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-full bg-zinc-900 text-white text-base md:text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-zinc-900/20 flex items-center justify-center gap-2 md:gap-3"
          >
            Start free trial <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </a>
          <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-full bg-white text-zinc-900 text-base md:text-lg font-bold border border-zinc-200 hover:bg-zinc-50 transition-colors shadow-sm flex items-center justify-center gap-2 md:gap-3">
            <Play className="w-4 md:w-5 h-4 md:h-5 fill-zinc-900" /> Watch Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const BentoCard = ({
  title,
  subtitle,
  icon,
  className,
  children,
}: {
  title: string;
  subtitle: string;
  icon: any;
  className?: string;
  children?: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`group relative p-8 rounded-[40px] bg-white border border-zinc-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-indigo-50/0 group-hover:to-indigo-50/30 transition-colors duration-500" />
    <div className="relative z-10 h-full flex flex-col">
      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-zinc-500 font-medium leading-relaxed mb-8">
        {subtitle}
      </p>
      <div className="mt-auto">{children}</div>
    </div>
  </motion.div>
);

const WaitlistSection = () => (
  <section
    id="waitlist"
    className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden"
  >
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs md:text-sm font-bold mb-4 md:mb-8 animate-float-fast">
        <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
        <span>Join 2,000+ others</span>
      </div>
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-4 md:mb-8 leading-[0.9]">
        Get early access.
      </h2>
      <p className="text-sm sm:text-base md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto mb-6 md:mb-12 leading-relaxed">
        We are crafting the ultimate invoicing experience. Be the first to know
        when we launch.
      </p>

      <form className="max-w-md mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-3xl sm:rounded-full p-1.5 sm:p-2 shadow-xl gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 sm:px-6 py-3.5 sm:py-3 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400 font-medium text-sm md:text-base rounded-2xl sm:rounded-none"
          />
          <button
            type="button"
            className="px-6 sm:px-8 py-3.5 sm:py-3 rounded-2xl sm:rounded-full bg-zinc-900 text-white font-bold hover:bg-black transition-colors shadow-lg text-sm md:text-base"
          >
            Join
          </button>
        </div>
      </form>

      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 opacity-60">
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs md:text-sm">
          <CheckCircle2 className="w-4 h-4" /> No spam
        </div>
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs md:text-sm">
          <CheckCircle2 className="w-4 h-4" /> Unsubscribe anytime
        </div>
      </div>
    </div>

    {/* Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 pointer-events-none" />
  </section>
);

const Features = () => (
  <section
    id="features"
    className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto"
  >
    <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-6 md:mb-8 px-4">
        Everything you need. <br />
        <span className="text-zinc-300">Nothing you don't.</span>
      </h2>
      <p className="text-base md:text-xl text-zinc-500 font-medium leading-relaxed px-4">
        We stripped away the complexity of traditional accounting software to
        focus on what matters: getting you paid.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[350px] md:auto-rows-[400px]">
      {/* Card 1: Large Span — Brand Customization */}
      <BentoCard
        title="Brand Your Way"
        subtitle="Customize every invoice to match your unique brand identity."
        icon={<LayoutDashboard className="w-6 h-6" />}
        className="md:col-span-2"
      >
        <div className="relative h-full w-full rounded-2xl overflow-hidden flex items-center justify-center">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />

          {/* Color palette */}
          <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-4">
            <div className="text-center">
              <div className="text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3 md:mb-4">
                Your Colors
              </div>
              <div className="flex gap-2 md:gap-3">
                {[
                  "bg-gradient-to-br from-indigo-500 to-indigo-600",
                  "bg-gradient-to-br from-purple-500 to-purple-600",
                  "bg-gradient-to-br from-pink-500 to-pink-600",
                  "bg-gradient-to-br from-amber-500 to-amber-600",
                  "bg-gradient-to-br from-emerald-500 to-emerald-600",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${color} shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                  />
                ))}
              </div>
            </div>

            {/* Preview card */}
            <div className="glass-card rounded-2xl p-4 md:p-6 w-full max-w-xs md:max-w-sm shadow-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600" />
                <div>
                  <div className="text-xs font-bold text-zinc-800">
                    Your Company
                  </div>
                  <div className="text-[10px] text-zinc-400">Invoice #0042</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 bg-zinc-100 rounded-full w-3/4" />
                <div className="h-1.5 bg-zinc-100 rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Floating accent blob */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-[60px]" />
        </div>
      </BentoCard>

      {/* Card 2: Tall — Live Notifications */}
      <BentoCard
        title="Live Notifications"
        subtitle="Get instant alerts when clients interact with your invoices."
        icon={<BarChart3 className="w-6 h-6" />}
        className="md:row-span-2"
      >
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {/* Animated bell icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-[40px] scale-150" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-float-medium">
              <Bell className="w-9 h-9 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-black text-white">3</span>
              </div>
            </div>
          </div>

          {/* Notification cards */}
          <div className="space-y-3 w-full">
            {[
              {
                icon: "👁️",
                text: "Invoice viewed",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "💰",
                text: "Payment received",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: "📄",
                text: "PDF downloaded",
                color: "from-purple-500 to-violet-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-sm shadow-sm`}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-zinc-700">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </BentoCard>

      {/* Card 3 — Instant Payments (KEEP AS IS) */}
      <BentoCard
        title="Instant Payments"
        subtitle="Get paid 2x faster with integrated payment gateways."
        icon={<CreditCard className="w-6 h-6" />}
      >
        <div className="relative flex items-center justify-center h-full">
          {/* Glow */}
          <div className="absolute w-48 h-48 bg-indigo-400/20 rounded-full blur-[60px]" />

          <div className="relative w-full max-w-[240px] aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-5 text-white shadow-2xl shadow-indigo-600/30 transform rotate-[-4deg] group-hover:rotate-0 transition-transform duration-700">
            <div className="flex justify-between items-start mb-auto">
              <div className="w-8 h-6 rounded bg-white/20" />
              <Zap className="w-4 h-4 text-white/50" />
            </div>
            <div className="mt-6 text-base font-mono tracking-[0.2em] opacity-90">
              •••• 4242
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-[10px] opacity-60 leading-tight">
                VALID
                <br />
                12 / 28
              </div>
              <div className="text-[10px] font-bold opacity-80 uppercase tracking-wider">
                Billsera
              </div>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Card 4 — Global Reach */}
      <BentoCard
        title="Global Reach"
        subtitle="Accept payments from anywhere in the world, instantly."
        icon={<ShieldCheck className="w-6 h-6" />}
      >
        <div className="relative flex flex-col items-center justify-center h-full gap-6">
          {/* Glow */}
          <div className="absolute w-40 h-40 bg-emerald-300/20 rounded-full blur-[60px]" />

          {/* Globe icon with checkmarks */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <Globe className="w-12 h-12 text-white" />
            </div>
            {/* Floating checkmarks */}
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -left-2 w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="text-3xl font-black text-zinc-900 mb-1">150+</div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Countries Supported
            </div>
          </div>

          {/* Currency badges */}
          <div className="flex gap-2">
            {["USD", "EUR", "GBP", "JPY"].map((currency, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg glass-card text-[10px] font-bold text-zinc-600"
              >
                {currency}
              </div>
            ))}
          </div>
        </div>
      </BentoCard>
    </div>
  </section>
);

const FlowSection = () => (
  <section
    id="flow"
    className="py-20 md:py-40 bg-zinc-50 relative overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-4 md:mb-6 px-4">
          The Flow.
        </h2>
        <p className="text-zinc-500 text-base md:text-xl font-medium max-w-2xl mx-auto px-4">
          From creation to cash in bank, designed to be frictionless.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-200 -z-10 hidden md:block border-t border-dashed border-zinc-300"></div>

        {[
          {
            title: "Create",
            icon: <FileText className="w-6 h-6" />,
            desc: "30 seconds or less",
          },
          {
            title: "Send",
            icon: <Send className="w-6 h-6" />,
            desc: "One-click delivery",
          },
          {
            title: "Paid",
            icon: <CheckCircle2 className="w-6 h-6" />,
            desc: "Instant deposit",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center bg-zinc-50 p-4 z-10 w-64"
          >
            <div className="w-20 h-20 rounded-full bg-white border-4 border-zinc-100 flex items-center justify-center text-indigo-600 shadow-xl mb-6">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">
              {step.title}
            </h3>
            <p className="text-zinc-500 font-medium">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden font-sans">
      <AuroraBackground />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-50" />

      <FloatingNav />

      <main>
        <Hero />
        <Features />
        <FlowSection />
        <WaitlistSection />
      </main>

      <footer className="py-8 md:py-12 text-center text-zinc-400 text-xs md:text-sm font-bold tracking-widest uppercase">
        © 2026 Billsera.
      </footer>
    </div>
  );
}
