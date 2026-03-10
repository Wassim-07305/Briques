"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListChecks,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  PaperPlaneTilt,
  Confetti,
  Image as ImageIcon,
  UploadSimple,
  TextAa,
  CheckSquare,
  Hash,
  Envelope,
  ChatDots,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ─── Question types ─── */
type QuestionType =
  | "text"
  | "email"
  | "textarea"
  | "choice"
  | "multi"
  | "rating"
  | "chips"
  | "upload"
  | "nps";

interface Question {
  id: string;
  type: QuestionType;
  label: string;
  sublabel?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
}

const questions: Question[] = [
  {
    id: "name",
    type: "text",
    label: "Comment vous appelez-vous ?",
    sublabel: "Nous aimerions mieux vous connaitre",
    placeholder: "Prenom et nom",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Quel est votre email ?",
    sublabel: "Pour vous envoyer les resultats",
    placeholder: "votre@email.com",
    required: true,
  },
  {
    id: "role",
    type: "choice",
    label: "Quel est votre role actuel ?",
    sublabel: "Selectionnez l'option qui vous correspond le mieux",
    options: [
      "Coach / Consultant",
      "Formateur / Enseignant",
      "Entrepreneur",
      "Freelance",
      "Manager / Directeur",
      "Autre",
    ],
  },
  {
    id: "goals",
    type: "multi",
    label: "Quels sont vos objectifs ?",
    sublabel: "Selectionnez tous ceux qui s'appliquent",
    options: [
      "Automatiser mon business",
      "Augmenter mon chiffre d'affaires",
      "Ameliorer l'experience client",
      "Lancer des formations en ligne",
      "Gerer ma communaute",
      "Simplifier la facturation",
    ],
  },
  {
    id: "budget",
    type: "chips",
    label: "Quel budget envisagez-vous ?",
    sublabel: "Pour un projet sur mesure",
    options: [
      "< 2 000 €",
      "2 000 – 5 000 €",
      "5 000 – 10 000 €",
      "10 000 – 20 000 €",
      "> 20 000 €",
    ],
  },
  {
    id: "satisfaction",
    type: "rating",
    label: "Comment evaluez-vous vos outils actuels ?",
    sublabel: "1 = pas satisfait, 5 = tres satisfait",
    min: 1,
    max: 5,
  },
  {
    id: "nps",
    type: "nps",
    label: "Recommanderiez-vous nos services ?",
    sublabel: "Sur une echelle de 0 a 10",
    min: 0,
    max: 10,
  },
  {
    id: "details",
    type: "textarea",
    label: "Decrivez votre projet en quelques lignes",
    sublabel: "Plus de details nous aident a mieux vous accompagner",
    placeholder: "Je souhaite creer une plateforme pour...",
  },
  {
    id: "file",
    type: "upload",
    label: "Avez-vous un cahier des charges ?",
    sublabel: "Glissez votre fichier ou cliquez pour uploader",
  },
];

const questionIcons: Record<QuestionType, React.ElementType> = {
  text: TextAa,
  email: Envelope,
  textarea: ChatDots,
  choice: CheckSquare,
  multi: CheckSquare,
  rating: Star,
  chips: Hash,
  upload: UploadSimple,
  nps: Hash,
};

/* ─── Slide variants ─── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

/* ─── Components ─── */

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus
      className="w-full bg-transparent border-b-2 border-white/10 focus:border-red-400 py-4 text-center text-xl text-white outline-none transition-all duration-300 placeholder:text-white/20"
    />
  );
}

function TextareaInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus
      rows={4}
      className="w-full bg-white/5 border border-white/10 focus:border-red-400 rounded-xl p-4 text-white text-lg outline-none transition-all duration-300 placeholder:text-white/20 resize-none"
    />
  );
}

function ChoiceInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 w-full max-w-lg mx-auto">
      {options.map((option, i) => {
        const letter = String.fromCharCode(65 + i);
        const isSelected = value === option;
        return (
          <motion.button
            key={option}
            onClick={() => onChange(option)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 border",
              isSelected
                ? "bg-red-500/20 border-red-500/50 text-white shadow-lg shadow-red-500/10"
                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all",
                isSelected
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-white/50"
              )}
            >
              {letter}
            </span>
            <span className="text-base font-medium">{option}</span>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                <Check weight="bold" className="h-5 w-5 text-red-400" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function MultiInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (option: string) => {
    onChange(
      value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option]
    );
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 w-full max-w-2xl mx-auto">
      {options.map((option, i) => {
        const isSelected = value.includes(option);
        return (
          <motion.button
            key={option}
            onClick={() => toggle(option)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 border",
              isSelected
                ? "bg-red-500/20 border-red-500/50 text-white shadow-lg shadow-red-500/10"
                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all border",
                isSelected
                  ? "bg-red-500 border-red-500"
                  : "border-white/20 bg-transparent"
              )}
            >
              {isSelected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check weight="bold" className="h-3.5 w-3.5 text-white" />
                </motion.div>
              )}
            </div>
            <span className="text-sm font-medium">{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function ChipsInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
      {options.map((option, i) => {
        const isSelected = value === option;
        return (
          <motion.button
            key={option}
            onClick={() => onChange(option)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border",
              isSelected
                ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/25"
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}

function RatingInput({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <motion.button
          key={n}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="transition-all"
        >
          <Star
            weight={n <= (hovered || value) ? "fill" : "regular"}
            className={cn(
              "h-10 w-10 transition-colors",
              n <= (hovered || value) ? "text-amber-400" : "text-white/20"
            )}
          />
        </motion.button>
      ))}
    </div>
  );
}

function NpsInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 11 }, (_, i) => i).map((n) => (
          <motion.button
            key={n}
            onClick={() => onChange(n)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: n * 0.03 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 border",
              value === n
                ? n <= 6
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/25"
                  : n <= 8
                    ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/25"
                    : "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
            )}
          >
            {n}
          </motion.button>
        ))}
      </div>
      <div className="flex justify-between mt-3 text-xs text-white/30">
        <span>Pas du tout</span>
        <span>Absolument</span>
      </div>
    </div>
  );
}

function UploadInput() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        setUploaded(true);
      }}
      onClick={() => setUploaded(true)}
      animate={dragging ? { scale: 1.02 } : { scale: 1 }}
      className={cn(
        "relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300",
        dragging
          ? "border-red-400 bg-red-500/10"
          : uploaded
            ? "border-emerald-500/50 bg-emerald-500/10"
            : "border-white/10 hover:border-white/20 hover:bg-white/5"
      )}
    >
      {uploaded ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <Check weight="bold" className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-medium">cahier-des-charges.pdf</p>
            <p className="text-white/40 text-sm mt-1">2.4 MB — Uploade</p>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
            {dragging ? (
              <ImageIcon weight="duotone" className="h-7 w-7 text-red-400" />
            ) : (
              <UploadSimple
                weight="duotone"
                className="h-7 w-7 text-white/40"
              />
            )}
          </div>
          <div>
            <p className="text-white/60 font-medium">
              {dragging
                ? "Deposez votre fichier ici"
                : "Glissez un fichier ou cliquez"}
            </p>
            <p className="text-white/30 text-sm mt-1">
              PDF, DOCX, PNG — Max 10 MB
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Success Screen ─── */
function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="relative mx-auto mb-8"
      >
        <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/30">
          <Confetti weight="duotone" className="h-12 w-12 text-white" />
        </div>
        {/* Animated rings */}
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 mx-auto h-24 w-24 rounded-full border-2 border-emerald-400/30"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-white mb-3"
      >
        Merci pour vos reponses !
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-white/50 text-lg max-w-md mx-auto"
      >
        Nous reviendrons vers vous sous 24h avec une proposition personnalisee.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-sm text-white/60"
      >
        <Check weight="bold" className="h-4 w-4 text-emerald-400" />
        Reponses enregistrees dans Supabase
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function TypeformDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = submitted
    ? 100
    : Math.round((currentIndex / questions.length) * 100);

  const setAnswer = useCallback(
    (value: unknown) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion?.id]
  );

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    } else {
      setSubmitted(true);
    }
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowUp" || (e.key === "ArrowLeft" && currentQuestion?.type !== "nps")) {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, currentQuestion?.type]);

  const answer = currentQuestion ? answers[currentQuestion.id] : undefined;

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 mb-6">
            <ListChecks weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Typeform</h1>
          <p className="text-muted-foreground">
            Formulaires wizard avec sauvegarde progressive
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl border border-border overflow-hidden mb-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,15,20,1) 0%, rgba(40,10,30,0.8) 50%, rgba(15,15,25,1) 100%)",
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Progress bar */}
          <div className="relative px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {!submitted && currentQuestion && (
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    {(() => {
                      const Icon = questionIcons[currentQuestion.type];
                      return <Icon weight="duotone" className="h-3.5 w-3.5" />;
                    })()}
                    {currentQuestion.type === "text" && "Texte libre"}
                    {currentQuestion.type === "email" && "Email"}
                    {currentQuestion.type === "textarea" && "Texte long"}
                    {currentQuestion.type === "choice" && "Choix unique"}
                    {currentQuestion.type === "multi" && "Choix multiples"}
                    {currentQuestion.type === "rating" && "Evaluation"}
                    {currentQuestion.type === "chips" && "Selection rapide"}
                    {currentQuestion.type === "upload" && "Upload fichier"}
                    {currentQuestion.type === "nps" && "Score NPS"}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-white/40">
                {submitted
                  ? "Termine !"
                  : `${currentIndex + 1} / ${questions.length}`}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question area */}
          <div className="relative px-8 pb-8 min-h-[420px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              {submitted ? (
                <SuccessScreen key="success" />
              ) : (
                <motion.div
                  key={currentQuestion.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-center"
                >
                  {/* Question number */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-1 text-sm text-red-400 font-semibold mb-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-xs">
                      {currentIndex + 1}
                    </span>
                    <ArrowRight weight="bold" className="h-3 w-3 opacity-50" />
                  </motion.span>

                  {/* Question text */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {currentQuestion.label}
                  </h2>
                  {currentQuestion.sublabel && (
                    <p className="text-white/40 mb-8">
                      {currentQuestion.sublabel}
                    </p>
                  )}

                  {/* Answer area */}
                  <div className="mt-6">
                    {currentQuestion.type === "text" && (
                      <TextInput
                        value={(answer as string) ?? ""}
                        onChange={setAnswer}
                        placeholder={currentQuestion.placeholder}
                      />
                    )}
                    {currentQuestion.type === "email" && (
                      <TextInput
                        value={(answer as string) ?? ""}
                        onChange={setAnswer}
                        placeholder={currentQuestion.placeholder}
                        type="email"
                      />
                    )}
                    {currentQuestion.type === "textarea" && (
                      <TextareaInput
                        value={(answer as string) ?? ""}
                        onChange={setAnswer}
                        placeholder={currentQuestion.placeholder}
                      />
                    )}
                    {currentQuestion.type === "choice" && (
                      <ChoiceInput
                        options={currentQuestion.options ?? []}
                        value={(answer as string) ?? ""}
                        onChange={setAnswer}
                      />
                    )}
                    {currentQuestion.type === "multi" && (
                      <MultiInput
                        options={currentQuestion.options ?? []}
                        value={(answer as string[]) ?? []}
                        onChange={setAnswer}
                      />
                    )}
                    {currentQuestion.type === "chips" && (
                      <ChipsInput
                        options={currentQuestion.options ?? []}
                        value={(answer as string) ?? ""}
                        onChange={setAnswer}
                      />
                    )}
                    {currentQuestion.type === "rating" && (
                      <RatingInput
                        value={(answer as number) ?? 0}
                        onChange={setAnswer}
                        max={currentQuestion.max}
                      />
                    )}
                    {currentQuestion.type === "nps" && (
                      <NpsInput
                        value={answer !== undefined ? (answer as number) : -1}
                        onChange={setAnswer}
                      />
                    )}
                    {currentQuestion.type === "upload" && <UploadInput />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {!submitted && (
            <div className="relative border-t border-white/5 px-8 py-4 flex items-center justify-between">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                  currentIndex === 0
                    ? "text-white/15 cursor-not-allowed"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <ArrowLeft weight="bold" className="h-4 w-4" />
                Retour
              </button>

              <p className="hidden sm:block text-xs text-white/20">
                Appuyez sur <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-mono">Entree</kbd> pour continuer
              </p>

              <button
                onClick={goNext}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
              >
                {currentIndex === questions.length - 1 ? (
                  <>
                    Envoyer
                    <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    OK
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Feature grid */}
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
              "9 types de questions (texte, choix, NPS, upload...)",
              "Animations slide fluides entre questions",
              "Navigation clavier (Entree / fleches)",
              "Sauvegarde progressive JSONB en temps reel",
              "Upload drag & drop vers Supabase Storage",
              "Questions conditionnelles (showIf)",
              "Barre de progression animee",
              "Table admin des reponses + export CSV",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.04 }}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                  <Check weight="bold" className="h-3 w-3 text-red-500" />
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
