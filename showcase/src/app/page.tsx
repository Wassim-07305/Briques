"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cube,
  Calendar,
  ChatsCircle,
  Robot,
  GraduationCap,
  ListChecks,
  ChartLine,
  CreditCard,
  Rocket,
  ArrowRight,
  GithubLogo,
  Lightning,
  Database,
  PaintBrush,
  Star,
  Code,
  Shield,
  Sparkle,
  Phone,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ─── Data ─── */
const briques = [
  {
    id: "appshell",
    name: "AppShell",
    description: "Layout avec sidebar, header et navigation responsive",
    icon: Cube,
    href: "/demo/appshell",
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/10",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Stats, graphiques et activite recente en temps reel",
    icon: ChartLine,
    href: "/demo/dashboard",
    color: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/10",
  },
  {
    id: "iclosed",
    name: "iClosed",
    description: "Systeme de reservation et calendrier interactif",
    icon: Calendar,
    href: "/demo/iclosed",
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/10",
  },
  {
    id: "messaging",
    name: "Messaging",
    description: "Chat temps reel avec channels, reactions et DMs",
    icon: ChatsCircle,
    href: "/demo/messaging",
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/10",
  },
  {
    id: "nameia",
    name: "NamEIA",
    description: "Chatbot IA avec RAG et base de connaissances vectorielle",
    icon: Robot,
    href: "/demo/nameia",
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/10",
  },
  {
    id: "skool",
    name: "Skool",
    description: "LMS complet avec video player et certificats",
    icon: GraduationCap,
    href: "/demo/skool",
    color: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/10",
  },
  {
    id: "typeform",
    name: "Typeform",
    description: "Formulaires wizard multi-step avec 9 types de questions",
    icon: ListChecks,
    href: "/demo/typeform",
    color: "from-red-500 to-pink-500",
    shadow: "shadow-red-500/10",
  },
  {
    id: "payments",
    name: "Payments",
    description: "Integration Stripe checkout et gestion abonnements",
    icon: CreditCard,
    href: "/demo/payments",
    color: "from-green-500 to-emerald-500",
    shadow: "shadow-green-500/10",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    description: "Flow multi-etapes avec progression et animations",
    icon: Rocket,
    href: "/demo/onboarding",
    color: "from-fuchsia-500 to-violet-500",
    shadow: "shadow-fuchsia-500/10",
  },
  {
    id: "appel",
    name: "Appel",
    description: "Visioconference WebRTC avec transcription live et calendrier",
    icon: Phone,
    href: "/demo/appel",
    color: "from-violet-500 to-indigo-500",
    shadow: "shadow-violet-500/10",
  },
];

const features = [
  {
    icon: Lightning,
    title: "Next.js 16 App Router",
    description: "Server Components, Server Actions, React 19",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: Database,
    title: "Supabase Ready",
    description: "Auth, PostgreSQL, RLS, Storage, Realtime",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: PaintBrush,
    title: "Design Premium",
    description: "Dark mode, Framer Motion, glassmorphism",
    color: "text-violet-500 bg-violet-500/10",
  },
  {
    icon: Shield,
    title: "TypeScript Strict",
    description: "Zero any, schemas Zod, type safety",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: Code,
    title: "Copy-Paste Ready",
    description: "Composants autonomes, zero dependances inutiles",
    color: "text-pink-500 bg-pink-500/10",
  },
  {
    icon: Star,
    title: "Production Grade",
    description: "Responsive, accessible, performant",
    color: "text-cyan-500 bg-cyan-500/10",
  },
];

const stats = [
  { label: "Briques", value: 10, suffix: "" },
  { label: "Composants", value: 60, suffix: "+" },
  { label: "Types de questions", value: 9, suffix: "" },
  { label: "Lignes de code", value: 15, suffix: "k+" },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Floating Orbs ─── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-fuchsia-500/5 blur-[80px]"
      />
    </div>
  );
}

/* ─── Grid Pattern ─── */
function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

/* ─── Main ─── */
export default function HomePage() {
  const [hoveredBrique, setHoveredBrique] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <FloatingOrbs />
        <GridPattern />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.12),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-8"
            >
              <Sparkle weight="fill" className="h-4 w-4" />
              10 Briques SaaS Pretes a l&apos;Emploi
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-8xl"
            >
              Construis ton SaaS
              <br />
              <span className="gradient-text">en quelques heures</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              Briques est une collection de composants{" "}
              <span className="text-foreground font-medium">Next.js + Supabase</span>{" "}
              prets a l&apos;emploi pour les coaches, consultants et formateurs.
              Copy-paste et c&apos;est parti.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Link
                href="/demo/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 active:scale-100"
              >
                Explorer les demos
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="https://github.com/Wassim-07305/Briques"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-card hover:border-primary/30"
              >
                <GithubLogo weight="bold" className="h-4 w-4" />
                GitHub
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 flex items-center justify-center gap-8 sm:gap-16"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack Marquee ─── */}
      <section className="border-t border-border bg-card/20 backdrop-blur-sm overflow-hidden py-6">
        <div className="relative">
          {/* Gradient fade left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          {/* Gradient fade right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {[
              "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "Framer Motion",
              "Zustand", "TanStack Query", "Zod", "shadcn/ui", "Stripe", "WebRTC",
              "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "Framer Motion",
              "Zustand", "TanStack Query", "Zod", "shadcn/ui", "Stripe", "WebRTC",
            ].map((tech, i) => (
              <span key={i} className="text-sm font-medium text-muted-foreground/60 tracking-wide">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-card/50"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                    feature.color
                  )}
                >
                  <feature.icon weight="duotone" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Briques Grid ─── */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Section ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary mb-4"
          >
            <Cube weight="duotone" className="h-3.5 w-3.5" />
            Composants
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground sm:text-5xl"
          >
            Les Briques
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto"
          >
            Chaque brique est independante, testee et prete a etre integree
            dans votre projet.
          </motion.p>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {briques.map((brique, index) => (
            <motion.div
              key={brique.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredBrique(brique.id)}
              onMouseLeave={() => setHoveredBrique(null)}
            >
              <Link
                href={brique.href}
                className={cn(
                  "group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
                  "hover:border-primary/30 glow-hover",
                  hoveredBrique === brique.id && brique.shadow
                )}
              >
                {/* Gradient background on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]",
                    brique.color
                  )}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={cn(
                      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                      brique.color
                    )}
                  >
                    <brique.icon
                      weight="duotone"
                      className="h-6 w-6 text-white"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground">
                    {brique.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {brique.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    Voir la demo
                    <ArrowRight
                      weight="bold"
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.1) 50%, rgba(236,72,153,0.1) 100%)",
            }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
            <GridPattern />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30"
              >
                <Rocket weight="duotone" className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground sm:text-4xl">
                Pret a construire ton prochain projet ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Clone le repo, copie les briques dont tu as besoin, et lance-toi.
                Pas de dependances inutiles, juste du code propre et production-ready.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Link
                  href="/demo/onboarding"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                >
                  <Rocket weight="bold" className="h-4 w-4" />
                  Commencer
                  <ArrowRight
                    weight="bold"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Cube weight="duotone" className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Briques</span>
              <span className="text-xs text-muted-foreground ml-2">
                par Wassim
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Supabase & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
