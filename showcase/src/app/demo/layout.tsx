"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cube,
  House,
  ChartLine,
  Calendar,
  ChatsCircle,
  Robot,
  GraduationCap,
  ListChecks,
  CreditCard,
  Rocket,
  ArrowLeft,
  List,
  X,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/demo/appshell", label: "AppShell", icon: Cube, color: "from-blue-500 to-cyan-500" },
  { href: "/demo/dashboard", label: "Dashboard", icon: ChartLine, color: "from-violet-500 to-purple-500" },
  { href: "/demo/iclosed", label: "iClosed", icon: Calendar, color: "from-emerald-500 to-teal-500" },
  { href: "/demo/messaging", label: "Messaging", icon: ChatsCircle, color: "from-pink-500 to-rose-500" },
  { href: "/demo/nameia", label: "NamEIA", icon: Robot, color: "from-amber-500 to-orange-500" },
  { href: "/demo/skool", label: "Skool", icon: GraduationCap, color: "from-indigo-500 to-blue-500" },
  { href: "/demo/typeform", label: "Typeform", icon: ListChecks, color: "from-red-500 to-pink-500" },
  { href: "/demo/payments", label: "Payments", icon: CreditCard, color: "from-green-500 to-emerald-500" },
  { href: "/demo/onboarding", label: "Onboarding", icon: Rocket, color: "from-fuchsia-500 to-violet-500" },
];

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentItem = navItems.find((item) => item.href === pathname);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border glass px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Cube weight="duotone" className="h-6 w-6 text-primary" />
          <span className="font-semibold">Briques</span>
        </Link>
        <div className="flex items-center gap-2">
          {currentItem && (
            <span className="text-xs text-muted-foreground">
              {currentItem.label}
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            {sidebarOpen ? (
              <X weight="bold" className="h-5 w-5" />
            ) : (
              <List weight="bold" className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card/95 backdrop-blur-xl transition-transform lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar header */}
          <div className="flex h-14 items-center gap-2 border-b border-border px-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Cube weight="duotone" className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">Briques</span>
            </Link>
          </div>

          {/* Back to home */}
          <div className="p-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft weight="bold" className="h-4 w-4" />
              Retour a l&apos;accueil
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-0.5 px-3">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Demos
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="demo-nav-active"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br transition-transform",
                        item.color,
                        isActive && "scale-110"
                      )}
                    >
                      <item.icon
                        weight="duotone"
                        className="h-3.5 w-3.5 text-white"
                      />
                    </div>
                    <span className={cn("font-medium", isActive && "text-foreground")}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 p-3">
              <Sparkle weight="duotone" className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] font-medium text-foreground">
                  9 briques pretes
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Next.js + Supabase
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
