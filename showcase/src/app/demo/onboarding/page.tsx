"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  Rocket,
  Check,
  CaretLeft,
  CaretRight,
  Sparkle,
  GraduationCap,
  Calendar,
  CreditCard,
  ChatCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Mock onboarding steps
const steps = [
  {
    id: "welcome",
    title: "Bienvenue !",
    description: "Configurons votre compte ensemble.",
  },
  {
    id: "profile",
    title: "Votre profil",
    description: "Dites-nous en plus sur vous.",
  },
  {
    id: "role",
    title: "Votre role",
    description: "Quel est votre role principal ?",
  },
  {
    id: "goals",
    title: "Vos objectifs",
    description: "Que souhaitez-vous accomplir ?",
  },
  {
    id: "complete",
    title: "Pret a commencer !",
    description: "",
  },
];

const roles = [
  {
    id: "coach",
    label: "Coach / Formateur",
    description: "J'accompagne des clients ou des apprenants.",
    icon: User,
  },
  {
    id: "consultant",
    label: "Consultant",
    description: "Je fournis des services de conseil.",
    icon: Briefcase,
  },
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    description: "Je gere ma propre activite.",
    icon: Rocket,
  },
];

const goals = [
  {
    id: "clients",
    label: "Gerer mes clients",
    description: "Organiser mes contacts et suivis.",
    icon: User,
  },
  {
    id: "bookings",
    label: "Planifier des RDV",
    description: "Automatiser ma prise de rendez-vous.",
    icon: Calendar,
  },
  {
    id: "courses",
    label: "Creer des formations",
    description: "Partager mon expertise en ligne.",
    icon: GraduationCap,
  },
  {
    id: "payments",
    label: "Recevoir des paiements",
    description: "Monetiser mes services facilement.",
    icon: CreditCard,
  },
];

export default function OnboardingDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    role: "",
    goals: [] as string[],
  });

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-500 mb-4">
            <Rocket weight="duotone" className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Onboarding</h1>
          <p className="text-sm text-muted-foreground">
            Flow multi-etapes avec progression et animations
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Configuration du compte
            </span>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary/20 text-primary ring-2 ring-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check weight="bold" className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-8 mx-1",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="relative min-h-[350px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                {/* Step header */}
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h2>
                  {step.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Step content */}
                {step.id === "welcome" && (
                  <div className="text-center py-4">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <Sparkle weight="duotone" className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Bienvenue sur Briques !
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Quelques etapes pour personnaliser votre experience.
                    </p>
                    <div className="space-y-3 text-left max-w-sm mx-auto">
                      {[
                        "Completez votre profil",
                        "Choisissez vos preferences",
                        "Commencez a utiliser l'app",
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-xl bg-muted/50 p-3"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                            {index + 1}
                          </div>
                          <span className="text-sm text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step.id === "profile" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Jean Dupont"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Ma Societe"
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}

                {step.id === "role" && (
                  <div className="space-y-3">
                    {roles.map((role) => {
                      const isSelected = formData.role === role.id;
                      return (
                        <button
                          key={role.id}
                          onClick={() =>
                            setFormData({ ...formData, role: role.id })
                          }
                          className={cn(
                            "w-full flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border bg-card hover:border-primary/30"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                            )}
                          >
                            {isSelected && (
                              <Check weight="bold" className="h-3 w-3" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <role.icon
                                weight="duotone"
                                className="h-4 w-4 text-muted-foreground"
                              />
                              <span className="font-medium text-foreground">
                                {role.label}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step.id === "goals" && (
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map((goal) => {
                      const isSelected = formData.goals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={cn(
                            "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border bg-card hover:border-primary/30"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <goal.icon weight="duotone" className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground">
                              {goal.label}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {goal.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step.id === "complete" && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="mx-auto mb-6"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 mx-auto">
                        <Check
                          weight="bold"
                          className="h-10 w-10 text-emerald-500"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Configuration terminee !
                      </h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Votre compte est pret. Decouvrez maintenant toutes les
                        fonctionnalites.
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-500"
                    >
                      <Check weight="bold" className="h-4 w-4" />
                      Pret a demarrer
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              isFirstStep
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-muted"
            )}
          >
            <CaretLeft weight="bold" className="h-4 w-4" />
            Retour
          </button>

          <button
            onClick={handleNext}
            disabled={isLastStep}
            className={cn(
              "flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold transition-colors",
              isLastStep
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isLastStep ? (
              <>
                Commencer
                <Rocket weight="bold" className="h-4 w-4" />
              </>
            ) : (
              <>
                Suivant
                <CaretRight weight="bold" className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
