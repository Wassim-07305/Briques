"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Check,
  Sparkle,
  Crown,
  ShieldCheck,
  ArrowRight,
  X,
  Spinner,
  CheckCircle,
  Receipt,
  CalendarBlank,
  ArrowsClockwise,
  Warning,
} from "@phosphor-icons/react";
import { cn, formatCurrency } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular: boolean;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["5 clients actifs", "1 formation", "Support email", "Analytics de base"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "Clients illimites",
      "10 formations",
      "Support prioritaire",
      "Certificats personnalises",
      "Analytics avances",
      "API access",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Tout Pro inclus",
      "White-label complet",
      "Account manager dedie",
      "SLA garanti",
      "Integration sur-mesure",
      "Formation equipe",
    ],
    popular: false,
  },
];

const paymentHistory = [
  { id: "1", date: "15 mars 2024", amount: 49, status: "paid", description: "Plan Pro - Mensuel" },
  { id: "2", date: "15 fev 2024", amount: 49, status: "paid", description: "Plan Pro - Mensuel" },
  { id: "3", date: "15 jan 2024", amount: 49, status: "paid", description: "Plan Pro - Mensuel" },
  { id: "4", date: "15 dec 2023", amount: 29, status: "paid", description: "Plan Starter - Mensuel" },
];

const features = [
  "Checkout Stripe securise",
  "Abonnements mensuels/annuels",
  "Paiements one-time",
  "Webhooks pour sync automatique",
  "Portail client Stripe",
  "Historique des paiements",
  "Annulation/reactivation abonnement",
  "Pricing table responsive",
];

export default function PaymentsDemo() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "processing" | "success">("idle");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCheckout = (plan: Plan) => {
    setSelectedPlan(plan);
    setCheckoutStep("processing");

    // Simulate checkout process
    setTimeout(() => {
      setCheckoutStep("success");
    }, 2500);
  };

  const handleCloseCheckout = () => {
    setSelectedPlan(null);
    setCheckoutStep("idle");
  };

  const getPrice = (plan: Plan) => {
    return billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: Plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
            <CreditCard weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
          <p className="text-muted-foreground">
            Integration Stripe checkout et abonnements
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Mensuel
          </span>
          <button
            onClick={() =>
              setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")
            }
            className="relative h-7 w-14 rounded-full bg-muted p-1 transition-colors"
          >
            <motion.div
              className="h-5 w-5 rounded-full bg-primary"
              animate={{ x: billingPeriod === "yearly" ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              billingPeriod === "yearly" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Annuel
          </span>
          {billingPeriod === "yearly" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500"
            >
              -17% de reduction
            </motion.span>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-3 mb-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 transition-all",
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border hover:border-primary/30"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Sparkle weight="fill" className="h-3 w-3" />
                    Populaire
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <motion.span
                    key={`${plan.id}-${billingPeriod}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-foreground"
                  >
                    {formatCurrency(getPrice(plan))}
                  </motion.span>
                  <span className="text-muted-foreground">
                    /{billingPeriod === "monthly" ? "mois" : "an"}
                  </span>
                </div>
                {billingPeriod === "yearly" && (
                  <p className="text-xs text-emerald-500 mt-1">
                    Economisez {getSavings(plan)}% soit {formatCurrency(plan.monthlyPrice * 12 - plan.yearlyPrice)}/an
                  </p>
                )}
              </div>

              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCheckout(plan)}
                className={cn(
                  "w-full rounded-xl py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                S'abonner
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Paiements securises par Stripe. Annulez a tout moment.
        </motion.div>

        {/* Current Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Crown weight="duotone" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Plan Pro</h3>
                    <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                      Actif
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    49 EUR/mois • Renouvellement le 15 avril 2024
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Changer de plan
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Historique des paiements
            </h4>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle weight="duotone" className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {payment.description}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarBlank className="h-3 w-3" />
                        {payment.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {formatCurrency(payment.amount)}
                    </p>
                    <button className="text-xs text-primary hover:underline">
                      Telecharger
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Checkout Modal */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={checkoutStep === "success" ? handleCloseCheckout : undefined}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-card rounded-2xl border border-border overflow-hidden"
              >
                {checkoutStep === "processing" && (
                  <div className="p-8 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mx-auto mb-6"
                    >
                      <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary mx-auto" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Traitement en cours...
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Redirection vers Stripe Checkout
                    </p>
                    <div className="mt-6 p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{selectedPlan.name}</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(getPrice(selectedPlan))}/{billingPeriod === "monthly" ? "mois" : "an"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mx-auto mb-6"
                    >
                      <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                        <CheckCircle weight="duotone" className="h-10 w-10 text-emerald-500" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Paiement reussi !
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Bienvenue dans le plan {selectedPlan.name}
                    </p>
                    <div className="p-4 rounded-xl bg-emerald-500/10 mb-6">
                      <div className="flex items-center justify-center gap-2 text-emerald-500">
                        <ArrowsClockwise className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Prochain renouvellement dans 30 jours
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseCheckout}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Continuer
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cancel Modal */}
        <AnimatePresence>
          {showCancelModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowCancelModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-card rounded-2xl border border-border p-6"
              >
                <div className="text-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                    <Warning weight="duotone" className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Annuler votre abonnement ?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Vous perdrez acces a toutes les fonctionnalites Pro a la fin de votre periode de facturation.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-colors"
                  >
                    Garder mon plan
                  </button>
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                  >
                    Confirmer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Fonctionnalites
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check weight="bold" className="h-3 w-3 text-emerald-500" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
