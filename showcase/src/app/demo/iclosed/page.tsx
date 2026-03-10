"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Check,
  User,
  VideoCamera,
  CaretLeft,
  CaretRight,
  Lightning,
  Users,
  Phone,
  EnvelopeSimple,
  CheckCircle,
  ArrowLeft,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface BookingType {
  id: string;
  name: string;
  duration: number;
  description: string;
  icon: React.ElementType;
  color: string;
}

const bookingTypes: BookingType[] = [
  {
    id: "coaching",
    name: "Coaching 1:1",
    duration: 60,
    description: "Session individuelle approfondie",
    icon: User,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "discovery",
    name: "Appel decouverte",
    duration: 30,
    description: "Premier contact gratuit",
    icon: Phone,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "group",
    name: "Session groupe",
    duration: 90,
    description: "Atelier collectif (max 8 personnes)",
    icon: Users,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "urgent",
    name: "Session express",
    duration: 20,
    description: "Deblocage rapide",
    icon: Lightning,
    color: "from-amber-500 to-orange-500",
  },
];

const features = [
  "Calendrier mensuel avec disponibilites",
  "Creneaux horaires configurables",
  "Confirmations par email automatiques",
  "Rappels 24h avant le RDV",
  "Integration Google Calendar",
  "Page de reservation publique",
  "Formulaire pre-RDV personnalisable",
  "Types de RDV multiples",
];

const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

// Deterministic pseudo-random based on seed (avoids re-render flickering)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0

  const days: { day: number; available: boolean; isCurrentMonth: boolean }[] = [];

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({ day: prevMonthLastDay - i, available: false, isCurrentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayOfWeek = new Date(year, month, i).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPast = new Date(year, month, i) < new Date(new Date().setHours(0, 0, 0, 0));
    days.push({
      day: i,
      available: !isWeekend && !isPast && seededRandom(year * 372 + month * 31 + i) > 0.3,
      isCurrentMonth: true,
    });
  }

  // Next month days
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, available: false, isCurrentMonth: false });
  }

  return days;
}

function generateTimeSlots(duration: number, day: number) {
  const slots = [];
  const startHour = 9;
  const endHour = 18;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += duration) {
      if (hour + min / 60 + duration / 60 <= endHour) {
        const available = seededRandom(day * 1440 + hour * 60 + min + duration) > 0.4;
        slots.push({
          time: `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`,
          available,
        });
      }
    }
  }
  return slots;
}

export default function IClosedDemo() {
  const [step, setStep] = useState<"type" | "date" | "confirm" | "success">("type");
  const [selectedType, setSelectedType] = useState<BookingType | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const today = new Date();
  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  const timeSlots = selectedType && selectedDate ? generateTimeSlots(selectedType.duration, selectedDate + currentMonth * 31) : [];
  const isCurrentMonthView = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const monthNames = [
    "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectType = (type: BookingType) => {
    setSelectedType(type);
    setStep("date");
  };

  const handleSelectDate = (day: number) => {
    setSelectedDate(day);
  };

  const handleSelectSlot = (time: string) => {
    setSelectedSlot(time);
    setStep("confirm");
  };

  const handleConfirm = () => {
    if (formData.name && formData.email) {
      setStep("success");
    }
  };

  const handleReset = () => {
    setStep("type");
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-6">
            <Calendar weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">iClosed</h1>
          <p className="text-muted-foreground">
            Systeme de reservation et calendrier pour vos rendez-vous
          </p>
        </motion.div>

        {/* Booking Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-8 shadow-xl shadow-emerald-500/5"
        >
          {/* Progress Bar */}
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {["Type", "Date", "Confirmer"].map((label, index) => {
                const stepIndex = ["type", "date", "confirm"].indexOf(step);
                const isActive = index <= stepIndex;
                const isCurrent = index === stepIndex;

                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
                        isCurrent
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index < stepIndex ? (
                        <Check weight="bold" className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 2 && (
                      <div
                        className={cn(
                          "h-1 w-12 sm:w-20 mx-2 rounded-full transition-colors",
                          index < stepIndex ? "bg-primary" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Type */}
              {step === "type" && (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-foreground text-center mb-6">
                    Choisissez votre type de rendez-vous
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {bookingTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        onClick={() => handleSelectType(type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-lg"
                      >
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                            type.color
                          )}
                        >
                          <type.icon weight="duotone" className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{type.name}</h4>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                            <Clock className="h-3 w-3" />
                            {type.duration} min
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Select Date & Time */}
              {step === "date" && selectedType && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setStep("type")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                  </button>

                  <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-muted/30">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br",
                        selectedType.color
                      )}
                    >
                      <selectedType.icon weight="duotone" className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{selectedType.name}</h4>
                      <p className="text-xs text-muted-foreground">{selectedType.duration} min</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Calendar */}
                    <div className="rounded-xl border border-border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={handlePrevMonth}
                          className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center"
                        >
                          <CaretLeft className="h-5 w-5" />
                        </button>
                        <span className="font-semibold text-foreground">
                          {monthNames[currentMonth]} {currentYear}
                        </span>
                        <button
                          onClick={handleNextMonth}
                          className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center"
                        >
                          <CaretRight className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {daysOfWeek.map((d, i) => (
                          <div key={i} className="text-muted-foreground py-2 text-xs font-medium">
                            {d}
                          </div>
                        ))}
                        {calendarDays.map((day, index) => (
                          <motion.button
                            key={index}
                            disabled={!day.available || !day.isCurrentMonth}
                            onClick={() => day.available && handleSelectDate(day.day)}
                            whileHover={day.available ? { scale: 1.1 } : {}}
                            whileTap={day.available ? { scale: 0.95 } : {}}
                            className={cn(
                              "py-2 rounded-lg text-sm transition-all relative",
                              !day.isCurrentMonth && "text-muted-foreground/30",
                              day.isCurrentMonth && !day.available && "text-muted-foreground/50",
                              day.isCurrentMonth && day.available && "hover:bg-primary/10 cursor-pointer font-medium",
                              selectedDate === day.day && day.isCurrentMonth && "bg-primary text-primary-foreground hover:bg-primary",
                              isCurrentMonthView && day.isCurrentMonth && day.day === today.getDate() && selectedDate !== day.day && "ring-2 ring-primary/40 font-bold"
                            )}
                          >
                            {day.day}
                            {isCurrentMonthView && day.isCurrentMonth && day.day === today.getDate() && (
                              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">
                        {selectedDate
                          ? `Creneaux du ${selectedDate} ${monthNames[currentMonth]}`
                          : "Selectionnez une date"}
                      </p>
                      {selectedDate ? (
                        <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
                          {timeSlots.map((slot) => (
                            <motion.button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => slot.available && handleSelectSlot(slot.time)}
                              whileHover={slot.available ? { scale: 1.05 } : {}}
                              whileTap={slot.available ? { scale: 0.95 } : {}}
                              className={cn(
                                "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                                slot.available
                                  ? "border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary"
                                  : "border-border text-muted-foreground/50 cursor-not-allowed line-through"
                              )}
                            >
                              {slot.time}
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                          <Calendar className="h-5 w-5 mr-2" />
                          Choisissez d'abord une date
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {step === "confirm" && selectedType && selectedDate && selectedSlot && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-md mx-auto"
                >
                  <button
                    onClick={() => setStep("date")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                  </button>

                  <div className="rounded-xl border border-border p-4 mb-6 bg-muted/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br",
                          selectedType.color
                        )}
                      >
                        <selectedType.icon weight="duotone" className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{selectedType.name}</h4>
                        <p className="text-xs text-muted-foreground">{selectedType.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        {selectedDate} {monthNames[currentMonth]} {currentYear}
                      </div>
                      <div className="flex items-center gap-1 text-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        {selectedSlot}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean@exemple.fr"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <motion.button
                      onClick={handleConfirm}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!formData.name || !formData.email}
                      className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirmer le rendez-vous
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Success */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mx-auto mb-6"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 mx-auto ring-4 ring-emerald-500/20">
                      <CheckCircle weight="duotone" className="h-12 w-12 text-emerald-500" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Rendez-vous confirme !
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Un email de confirmation a ete envoye a {formData.email}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-sm text-emerald-500 mb-6">
                      <Calendar className="h-4 w-4" />
                      {selectedDate} {monthNames[currentMonth]} a {selectedSlot}
                    </div>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleReset}
                    className="text-sm text-primary hover:underline"
                  >
                    Prendre un autre rendez-vous
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check weight="bold" className="h-3 w-3 text-emerald-500" />
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
