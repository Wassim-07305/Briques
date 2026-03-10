"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CurrencyEur,
  Users,
  GraduationCap,
  Calendar,
  TrendUp,
  TrendDown,
  Minus,
  ArrowRight,
  Plus,
  UserPlus,
  ChatCircle,
  VideoCamera,
  ArrowsClockwise,
  Lightning,
  Eye,
  DotsThreeVertical,
  Sparkle,
  Export,
} from "@phosphor-icons/react";
import { cn, formatCurrency } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

/* ─── Data per period ─── */
const revenueByPeriod = {
  "7d": [
    { month: "Lun", revenue: 1200 },
    { month: "Mar", revenue: 1800 },
    { month: "Mer", revenue: 950 },
    { month: "Jeu", revenue: 2100 },
    { month: "Ven", revenue: 1650 },
    { month: "Sam", revenue: 800 },
    { month: "Dim", revenue: 400 },
  ],
  "30d": [
    { month: "S1", revenue: 6800 },
    { month: "S2", revenue: 8200 },
    { month: "S3", revenue: 7500 },
    { month: "S4", revenue: 9100 },
  ],
  "90d": [
    { month: "Jan", revenue: 18500 },
    { month: "Fev", revenue: 22300 },
    { month: "Mar", revenue: 26800 },
  ],
  "12m": [
    { month: "Jan", revenue: 4200 },
    { month: "Fev", revenue: 5800 },
    { month: "Mar", revenue: 4900 },
    { month: "Avr", revenue: 7200 },
    { month: "Mai", revenue: 6100 },
    { month: "Juin", revenue: 8400 },
    { month: "Juil", revenue: 7800 },
    { month: "Aout", revenue: 6500 },
    { month: "Sep", revenue: 9200 },
    { month: "Oct", revenue: 8100 },
    { month: "Nov", revenue: 10500 },
    { month: "Dec", revenue: 12300 },
  ],
};

const statsByPeriod = {
  "7d": { revenue: 8900, clients: 18, completion: 92, rdv: 3, revChange: 15, clientChange: 8 },
  "30d": { revenue: 31600, clients: 67, completion: 87, rdv: 8, revChange: 23, clientChange: 12 },
  "90d": { revenue: 67600, clients: 123, completion: 85, rdv: 24, revChange: 31, clientChange: 18 },
  "12m": { revenue: 91000, clients: 245, completion: 87, rdv: 96, revChange: 42, clientChange: 35 },
};

const clientsByPeriod = {
  "7d": [
    { source: "Referral", count: 6, color: "#8b5cf6" },
    { source: "LinkedIn", count: 5, color: "#06b6d4" },
    { source: "Organique", count: 4, color: "#10b981" },
    { source: "Social", count: 3, color: "#f59e0b" },
  ],
  "30d": [
    { source: "Referral", count: 22, color: "#8b5cf6" },
    { source: "LinkedIn", count: 18, color: "#06b6d4" },
    { source: "Organique", count: 16, color: "#10b981" },
    { source: "Social", count: 11, color: "#f59e0b" },
  ],
  "90d": [
    { source: "Referral", count: 45, color: "#8b5cf6" },
    { source: "LinkedIn", count: 32, color: "#06b6d4" },
    { source: "Organique", count: 28, color: "#10b981" },
    { source: "Social", count: 18, color: "#f59e0b" },
  ],
  "12m": [
    { source: "Referral", count: 98, color: "#8b5cf6" },
    { source: "LinkedIn", count: 65, color: "#06b6d4" },
    { source: "Organique", count: 52, color: "#10b981" },
    { source: "Social", count: 30, color: "#f59e0b" },
  ],
};

const weeklyData = [
  { day: "Lun", sessions: 12, completions: 8 },
  { day: "Mar", sessions: 18, completions: 14 },
  { day: "Mer", sessions: 15, completions: 11 },
  { day: "Jeu", sessions: 22, completions: 18 },
  { day: "Ven", sessions: 19, completions: 15 },
  { day: "Sam", sessions: 8, completions: 6 },
  { day: "Dim", sessions: 4, completions: 3 },
];

const activities = [
  {
    id: "1",
    type: "booking" as const,
    title: "Nouveau rendez-vous",
    description: "Marie Dupont — Coaching Leadership",
    time: "il y a 2 min",
    isNew: true,
  },
  {
    id: "2",
    type: "payment" as const,
    title: "Paiement recu",
    description: "497 € — Pack Formation Pro",
    time: "il y a 18 min",
    isNew: true,
  },
  {
    id: "3",
    type: "course" as const,
    title: "Formation terminee",
    description: "Jean Martin — Module 5 Vente",
    time: "il y a 45 min",
    isNew: false,
  },
  {
    id: "4",
    type: "client" as const,
    title: "Nouveau client",
    description: "Sophie Bernard — Plan Business",
    time: "il y a 1h",
    isNew: false,
  },
  {
    id: "5",
    type: "message" as const,
    title: "Nouveau message",
    description: "Pierre Durand — Question facturation",
    time: "il y a 2h",
    isNew: false,
  },
  {
    id: "6",
    type: "booking" as const,
    title: "RDV confirme",
    description: "Camille Petit — Bilan trimestriel",
    time: "il y a 3h",
    isNew: false,
  },
];

const topClients = [
  { name: "Thomas Bernard", revenue: 5880, sessions: 24, trend: 12 },
  { name: "Marie Dupont", revenue: 2940, sessions: 18, trend: 8 },
  { name: "Julie Moreau", revenue: 2940, sessions: 15, trend: -3 },
  { name: "Nicolas Martin", revenue: 1470, sessions: 12, trend: 22 },
];

const quickActions = [
  { id: "booking", label: "Creer un RDV", icon: Calendar, primary: true },
  { id: "invite", label: "Inviter un client", icon: UserPlus },
  { id: "message", label: "Envoyer un message", icon: ChatCircle },
  { id: "course", label: "Nouvelle formation", icon: VideoCamera },
];

const activityIcons: Record<string, { icon: React.ElementType; color: string }> = {
  booking: { icon: Calendar, color: "bg-blue-500/10 text-blue-400" },
  payment: { icon: CurrencyEur, color: "bg-emerald-500/10 text-emerald-400" },
  course: { icon: GraduationCap, color: "bg-amber-500/10 text-amber-400" },
  client: { icon: UserPlus, color: "bg-cyan-500/10 text-cyan-400" },
  message: { icon: ChatCircle, color: "bg-violet-500/10 text-violet-400" },
};

/* ─── Stat Card ─── */
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  gradient?: string;
  delay?: number;
}

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient = "from-primary/10 to-transparent",
  delay = 0,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-100`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Icon weight="duotone" className="h-5 w-5" />
          </div>
        </div>

        <motion.div
          key={String(value)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-baseline gap-1"
        >
          <span className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </span>
        </motion.div>

        {change !== undefined && (
          <div className="mt-3 flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                isPositive && "bg-emerald-500/10 text-emerald-500",
                isNegative && "bg-red-500/10 text-red-500",
                !isPositive && !isNegative && "bg-muted text-muted-foreground"
              )}
            >
              {isPositive && <TrendUp weight="bold" className="h-3 w-3" />}
              {isNegative && <TrendDown weight="bold" className="h-3 w-3" />}
              {!isPositive && !isNegative && (
                <Minus weight="bold" className="h-3 w-3" />
              )}
              <span>
                {isPositive && "+"}
                {change}%
              </span>
            </div>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function DashboardDemo() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "12m">("30d");
  const [refreshing, setRefreshing] = useState(false);

  const periodLabels = {
    "7d": "7 jours",
    "30d": "30 jours",
    "90d": "90 jours",
    "12m": "12 mois",
  };

  const stats = statsByPeriod[period];
  const revenueData = revenueByPeriod[period];
  const clientsData = clientsByPeriod[period];
  const totalClients = clientsData.reduce((sum, item) => sum + item.count, 0);

  const insightsByPeriod = {
    "7d": `Vos revenus ont augmente de ${stats.revChange}% cette semaine. ${stats.clients} clients actifs — un pic le jeudi avec 2 100 € de CA.`,
    "30d": `Vos revenus ont augmente de ${stats.revChange}% ce mois. 3 clients en essai pourraient convertir cette semaine — pensez a les relancer.`,
    "90d": `Croissance de ${stats.revChange}% sur le trimestre avec ${stats.clients} clients actifs. Le referral reste votre meilleur canal d'acquisition.`,
    "12m": `+${stats.revChange}% de revenus sur l'annee. Decembre est votre meilleur mois (12 300 €) — capitalisez sur cette saisonnalite.`,
  };
  const currentInsight = insightsByPeriod[period];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Tableau de bord
            </h1>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
              <Lightning weight="fill" className="h-3 w-3" />
              Live
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Vue d&apos;ensemble de votre activite —{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={refreshing ? "refreshing" : "idle"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {refreshing ? "Mise a jour..." : "Derniere MAJ il y a 2 min"}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-1">
            {(["7d", "30d", "90d", "12m"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  period === p
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {period === p && (
                  <motion.div
                    layoutId="period-active"
                    className="absolute inset-0 rounded-md bg-background shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{periodLabels[p]}</span>
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Export weight="bold" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exporter</span>
          </button>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ArrowsClockwise
              weight="bold"
              className={cn("h-4 w-4", refreshing && "animate-spin")}
            />
            <span className="hidden sm:inline">Actualiser</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenus"
          value={formatCurrency(stats.revenue)}
          change={stats.revChange}
          changeLabel="vs periode precedente"
          icon={CurrencyEur}
          gradient="from-violet-500/10 to-transparent"
          delay={0}
        />
        <StatCard
          title="Clients actifs"
          value={stats.clients}
          change={stats.clientChange}
          changeLabel="vs periode precedente"
          icon={Users}
          gradient="from-cyan-500/10 to-transparent"
          delay={0.05}
        />
        <StatCard
          title="Taux de completion"
          value={`${stats.completion}%`}
          change={5}
          changeLabel="points"
          icon={GraduationCap}
          gradient="from-amber-500/10 to-transparent"
          delay={0.1}
        />
        <StatCard
          title="RDV a venir"
          value={stats.rdv}
          changeLabel="3 cette semaine"
          icon={Calendar}
          gradient="from-blue-500/10 to-transparent"
          delay={0.15}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Revenus
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={period}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {formatCurrency(stats.revenue)}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                <TrendUp weight="bold" className="h-3 w-3" />
                +{stats.revChange}%
              </span>
              <span className="text-xs text-muted-foreground">
                {periodLabels[period]}
              </span>
            </div>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${(value / 1000).toFixed(0)}k` : String(value)
                  }
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl">
                          <p className="text-xs text-muted-foreground">
                            {payload[0].payload.month}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {formatCurrency(payload[0].value as number)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#revenueGradient)"
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Clients by source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Acquisition
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={period}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {totalClients}
                </motion.p>
              </AnimatePresence>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <DotsThreeVertical weight="bold" className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <div className="h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="count"
                    animationDuration={800}
                  >
                    {clientsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const percentage = Math.round(
                          (data.count / totalClients) * 100
                        );
                        return (
                          <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl">
                            <p className="text-xs text-muted-foreground">
                              {data.source}
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {data.count} ({percentage}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            {clientsData.map((item) => {
              const percentage = Math.round(
                (item.count / totalClients) * 100
              );
              return (
                <div key={item.source} className="flex items-center gap-3">
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">
                        {item.source}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="mt-1 h-1 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        key={`${item.source}-${period}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Second row: Weekly activity + Top Clients */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Sessions bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Sessions hebdomadaires
              </h3>
              <p className="text-lg font-bold text-foreground">
                98 sessions cette semaine
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                Sessions
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Completees
              </span>
            </div>
          </div>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={4}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl">
                          <p className="text-xs text-muted-foreground">
                            {payload[0].payload.day}
                          </p>
                          <p className="text-xs text-foreground">
                            {payload[0].value} sessions
                          </p>
                          <p className="text-xs text-emerald-400">
                            {payload[1]?.value} completees
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="sessions"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  animationDuration={800}
                />
                <Bar
                  dataKey="completions"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Top Clients
              </h3>
              <p className="text-lg font-bold text-foreground">
                Par revenus generes
              </p>
            </div>
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
              Voir tous
              <ArrowRight weight="bold" className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {topClients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">
                      {client.name}
                    </p>
                    <span className="text-sm font-bold text-foreground">
                      {formatCurrency(client.revenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {client.sessions} sessions
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        client.trend > 0
                          ? "text-emerald-500"
                          : "text-red-500"
                      )}
                    >
                      {client.trend > 0 ? (
                        <TrendUp weight="bold" className="h-3 w-3" />
                      ) : (
                        <TrendDown weight="bold" className="h-3 w-3" />
                      )}
                      {client.trend > 0 && "+"}
                      {client.trend}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Activite recente
              </h3>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
                {activities.filter((a) => a.isNew).length}
              </span>
            </div>
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
              <Eye weight="bold" className="h-3 w-3" />
              Tout voir
            </button>
          </div>

          <div className="space-y-1">
            {activities.map((activity, index) => {
              const { icon: Icon, color } = activityIcons[activity.type];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.04 }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50",
                    activity.isNew && "bg-muted/30"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      color
                    )}
                  >
                    <Icon weight="duotone" className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          {activity.title}
                          {activity.isNew && (
                            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Sparkle weight="duotone" className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Actions rapides
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "group flex flex-col items-center gap-3 rounded-xl p-4 transition-all",
                  action.primary
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                    action.primary
                      ? "bg-primary-foreground/20"
                      : "bg-background"
                  )}
                >
                  <action.icon
                    weight="duotone"
                    className={cn(
                      "h-5 w-5",
                      action.primary ? "text-primary-foreground" : "text-primary"
                    )}
                  />
                </div>
                <span className="text-sm font-medium text-center">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* AI Insight */}
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkle weight="fill" className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary">
                Insight IA
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={period}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-muted-foreground leading-relaxed"
              >
                {currentInsight}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
