"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cube,
  Bell,
  User,
  MagnifyingGlass,
  Moon,
  House,
  Users,
  GraduationCap,
  ChatsCircle,
  Gear,
  CaretRight,
  CaretLeft,
  SignOut,
  CreditCard,
  TrendUp,
  Calendar,
  Check,
  Star,
  DotsThree,
  PlusCircle,
  Funnel,
  Export,
  ArrowsDownUp,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  plan: string;
  revenue: string;
  status: "active" | "trial" | "churned";
  avatar: string;
  lastSeen: string;
}

/* ─── Data ─── */
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "clients", label: "Clients", icon: Users, badge: 3 },
  { id: "formations", label: "Formations", icon: GraduationCap },
  { id: "messages", label: "Messages", icon: ChatsCircle, badge: 12 },
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "revenus", label: "Revenus", icon: CreditCard },
];

const bottomNavItems: NavItem[] = [
  { id: "settings", label: "Parametres", icon: Gear },
];

const clients: Client[] = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie.dupont@gmail.com",
    plan: "Pro",
    revenue: "2 940 €",
    status: "active",
    avatar: "MD",
    lastSeen: "En ligne",
  },
  {
    id: "2",
    name: "Thomas Bernard",
    email: "t.bernard@outlook.fr",
    plan: "Business",
    revenue: "5 880 €",
    status: "active",
    avatar: "TB",
    lastSeen: "il y a 2h",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    email: "sophie.l@yahoo.fr",
    plan: "Starter",
    revenue: "588 €",
    status: "trial",
    avatar: "SL",
    lastSeen: "il y a 1j",
  },
  {
    id: "4",
    name: "Nicolas Martin",
    email: "n.martin@entreprise.com",
    plan: "Pro",
    revenue: "2 940 €",
    status: "active",
    avatar: "NM",
    lastSeen: "il y a 3h",
  },
  {
    id: "5",
    name: "Julie Moreau",
    email: "julie.moreau@free.fr",
    plan: "Business",
    revenue: "5 880 €",
    status: "active",
    avatar: "JM",
    lastSeen: "il y a 30min",
  },
  {
    id: "6",
    name: "Antoine Leroy",
    email: "a.leroy@gmail.com",
    plan: "Starter",
    revenue: "294 €",
    status: "churned",
    avatar: "AL",
    lastSeen: "il y a 14j",
  },
  {
    id: "7",
    name: "Camille Petit",
    email: "camille.p@hotmail.com",
    plan: "Pro",
    revenue: "1 470 €",
    status: "active",
    avatar: "CP",
    lastSeen: "il y a 5h",
  },
];

const notifications = [
  { id: "1", text: "Marie Dupont a termine le Module 3", time: "il y a 5 min", unread: true },
  { id: "2", text: "Paiement de 297 € recu", time: "il y a 23 min", unread: true },
  { id: "3", text: "Nouveau message de Thomas B.", time: "il y a 1h", unread: false },
];

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  trial: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  churned: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels = {
  active: "Actif",
  trial: "Essai",
  churned: "Inactif",
};

/* ─── Components ─── */
function MiniStat({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl bg-[#0d0d12] border border-white/5 p-4">
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      <div className="flex items-center gap-1 mt-1">
        <TrendUp weight="bold" className="h-3 w-3 text-emerald-400" />
        <span className="text-xs text-emerald-400">{trend}</span>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function AppShellDemo() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("clients");
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredClients = searchQuery
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clients;

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
            <Cube weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AppShell</h1>
          <p className="text-muted-foreground">
            Layout applicatif complet avec sidebar, header et navigation
          </p>
        </motion.div>

        {/* App Shell Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border overflow-hidden mb-8 shadow-2xl shadow-black/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,12,18,1) 0%, rgba(18,18,28,1) 100%)",
          }}
        >
          {/* ─ App Header ─ */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 h-14">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Cube weight="duotone" className="h-4 w-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-semibold text-sm text-white"
                >
                  CoachHub
                </motion.span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {/* Search */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher..."
                      className="h-8 w-full rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white outline-none focus:border-blue-500/50 placeholder:text-white/30"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (searchOpen) setSearchQuery("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
              >
                <MagnifyingGlass className="h-4 w-4 text-white/50" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 transition-colors relative"
                >
                  <Bell className="h-4 w-4 text-white/50" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#0c0c12]" />
                </button>

                <AnimatePresence>
                  {showNotifs && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute right-0 top-10 z-50 w-72 rounded-xl border border-white/10 bg-[#16161f] shadow-2xl shadow-black/50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-xs font-semibold text-white/70">Notifications</p>
                      </div>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "px-3 py-2.5 border-b border-white/5 last:border-0 transition-colors hover:bg-white/5",
                            n.unread && "bg-blue-500/5"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            {n.unread && (
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            )}
                            <div>
                              <p className="text-xs text-white/80">{n.text}</p>
                              <p className="text-[10px] text-white/30 mt-0.5">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
                <Moon className="h-4 w-4 text-white/50" />
              </button>

              {/* User avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold text-white ml-1">
                WK
              </div>
            </div>
          </div>

          <div className="flex">
            {/* ─ Sidebar ─ */}
            <motion.aside
              animate={{ width: sidebarCollapsed ? 60 : 220 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="shrink-0 border-r border-white/5 hidden sm:flex flex-col justify-between"
              style={{ minHeight: 520 }}
            >
              <nav className="p-2 space-y-0.5 mt-2">
                {navItems.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all relative group",
                        isActive
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-white/40 hover:bg-white/5 hover:text-white/70"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-blue-500"
                        />
                      )}
                      <item.icon
                        weight={isActive ? "duotone" : "regular"}
                        className="h-5 w-5 shrink-0"
                      />
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500/20 px-1.5 text-[10px] font-bold text-blue-400">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="p-2 space-y-1 border-t border-white/5">
                {bottomNavItems.map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                ))}

                {/* Collapse toggle */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/30 hover:bg-white/5 hover:text-white/50 transition-colors"
                >
                  {sidebarCollapsed ? (
                    <CaretRight className="h-5 w-5 shrink-0" />
                  ) : (
                    <>
                      <CaretLeft className="h-5 w-5 shrink-0" />
                      <span>Replier</span>
                    </>
                  )}
                </button>

                {/* User card */}
                {!sidebarCollapsed && (
                  <div className="flex items-center gap-3 rounded-lg bg-white/3 p-2.5 mt-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold text-white">
                      WK
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/70 truncate">Wassim K.</p>
                      <p className="text-[10px] text-white/30 truncate">Admin</p>
                    </div>
                    <SignOut className="h-4 w-4 text-white/20 shrink-0" />
                  </div>
                )}
              </div>
            </motion.aside>

            {/* ─ Main Content ─ */}
            <div className="flex-1 overflow-hidden">
              {/* Breadcrumb + page header */}
              <div className="border-b border-white/5 px-6 py-4">
                <div className="flex items-center gap-1 text-xs text-white/30 mb-3">
                  <House weight="duotone" className="h-3 w-3" />
                  <CaretRight className="h-3 w-3" />
                  <span className="text-white/60">Clients</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Clients</h2>
                    <p className="text-xs text-white/40 mt-0.5">
                      {clients.length} clients — {clients.filter((c) => c.status === "active").length} actifs
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/60 hover:bg-white/10 transition-colors">
                      <Funnel weight="bold" className="h-3.5 w-3.5" />
                      Filtrer
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/60 hover:bg-white/10 transition-colors">
                      <Export weight="bold" className="h-3.5 w-3.5" />
                      Exporter
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors">
                      <PlusCircle weight="bold" className="h-3.5 w-3.5" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 px-6 py-4">
                <MiniStat label="Revenu mensuel" value="18 420 €" trend="+12%" />
                <MiniStat label="Nouveaux clients" value="14" trend="+23%" />
                <MiniStat label="Taux de retention" value="94%" trend="+3%" />
              </div>

              {/* Table */}
              <div className="px-6 pb-4">
                <div className="rounded-xl border border-white/5 overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-white/3 text-[10px] uppercase tracking-wider text-white/30 font-semibold">
                    <div className="col-span-1 flex items-center">
                      <div className="h-3.5 w-3.5 rounded border border-white/15" />
                    </div>
                    <div className="col-span-3 flex items-center gap-1">
                      Client <ArrowsDownUp className="h-3 w-3" />
                    </div>
                    <div className="col-span-2">Plan</div>
                    <div className="col-span-2">Revenus</div>
                    <div className="col-span-2">Statut</div>
                    <div className="col-span-2">Derniere activite</div>
                  </div>

                  {/* Table rows */}
                  {filteredClients.map((client, i) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => toggleRow(client.id)}
                      className={cn(
                        "grid grid-cols-12 gap-2 px-4 py-3 border-t border-white/3 cursor-pointer transition-colors",
                        selectedRows.includes(client.id)
                          ? "bg-blue-500/5"
                          : "hover:bg-white/3"
                      )}
                    >
                      <div className="col-span-1 flex items-center">
                        <div
                          className={cn(
                            "h-3.5 w-3.5 rounded border transition-all flex items-center justify-center",
                            selectedRows.includes(client.id)
                              ? "bg-blue-500 border-blue-500"
                              : "border-white/15"
                          )}
                        >
                          {selectedRows.includes(client.id) && (
                            <Check weight="bold" className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                            client.status === "active"
                              ? "bg-blue-500/10 text-blue-400"
                              : client.status === "trial"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-white/5 text-white/30"
                          )}
                        >
                          {client.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white truncate">
                            {client.name}
                          </p>
                          <p className="text-[10px] text-white/30 truncate">
                            {client.email}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="flex items-center gap-1 text-xs text-white/60">
                          {client.plan === "Business" && (
                            <Star weight="fill" className="h-3 w-3 text-amber-400" />
                          )}
                          {client.plan}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="text-xs font-medium text-white/70">
                          {client.revenue}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            statusColors[client.status]
                          )}
                        >
                          {statusLabels[client.status]}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-[10px] text-white/30">
                          {client.lastSeen}
                        </span>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/5 transition-colors"
                        >
                          <DotsThree weight="bold" className="h-4 w-4 text-white/20" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Table footer */}
                <div className="flex items-center justify-between mt-3 text-[10px] text-white/30">
                  <span>
                    {selectedRows.length > 0
                      ? `${selectedRows.length} selectionne(s)`
                      : `${filteredClients.length} resultats`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 rounded hover:bg-white/5">Precedent</button>
                    <span className="px-2 py-1 rounded bg-white/5 text-white/60">1</span>
                    <button className="px-2 py-1 rounded hover:bg-white/5">2</button>
                    <button className="px-2 py-1 rounded hover:bg-white/5">Suivant</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Fonctionnalites
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Layout responsive avec sidebar collapsible",
              "Header avec recherche et notifications live",
              "Navigation multi-niveaux avec badges",
              "Theme switcher (dark/light)",
              "Table de donnees interactive avec selection",
              "Breadcrumbs automatiques",
              "User dropdown et deconnexion",
              "Support des raccourcis clavier",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.04 }}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <Check weight="bold" className="h-3 w-3 text-blue-500" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
