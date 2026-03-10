"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Play,
  Pause,
  Check,
  Clock,
  Trophy,
  FileText,
  CaretDown,
  CaretRight,
  CheckCircle,
  Circle,
  Speedometer,
  ArrowLeft,
  Certificate,
  Download,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const courseModules: Module[] = [
  {
    id: "1",
    title: "Introduction au Coaching",
    lessons: [
      { id: "1-1", title: "Bienvenue dans la formation", duration: "5 min", completed: true },
      { id: "1-2", title: "Les fondamentaux du coaching", duration: "12 min", completed: true },
      { id: "1-3", title: "Votre premier client", duration: "8 min", completed: false },
    ],
  },
  {
    id: "2",
    title: "Techniques avancees",
    lessons: [
      { id: "2-1", title: "L'ecoute active", duration: "15 min", completed: false },
      { id: "2-2", title: "Poser les bonnes questions", duration: "10 min", completed: false },
      { id: "2-3", title: "Gerer les emotions", duration: "18 min", completed: false },
      { id: "2-4", title: "Le feedback constructif", duration: "12 min", completed: false },
    ],
  },
  {
    id: "3",
    title: "Developper votre activite",
    lessons: [
      { id: "3-1", title: "Definir votre offre", duration: "20 min", completed: false },
      { id: "3-2", title: "Attirer vos premiers clients", duration: "15 min", completed: false },
      { id: "3-3", title: "Fideliser et faire recommander", duration: "12 min", completed: false },
    ],
  },
];

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const features = [
  "Grille de formations avec filtres",
  "Lecteur video personnalise (0.5x-2x)",
  "Progression automatique (80%)",
  "Modules et lecons organisables (DnD)",
  "Commentaires sous les lecons",
  "Certificats PDF automatiques",
  "Pieces jointes par lecon",
  "Admin CRUD complet",
];

export default function SkoolDemo() {
  const [modules, setModules] = useState(courseModules);
  const [expandedModule, setExpandedModule] = useState<string>("1");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const courseProgress = Math.round((completedLessons / totalLessons) * 100);

  const handleCompleteLesson = (lessonId: string) => {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l
        ),
      }))
    );
  };

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (currentLesson) {
              handleCompleteLesson(currentLesson.id);
            }
            return 0;
          }
          return prev + (0.5 * playbackSpeed);
        });
      }, 100);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playbackSpeed, currentLesson]);

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setProgress(0);
    setIsPlaying(false);
  };

  const findNextLesson = () => {
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          return lesson;
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 mb-6">
            <GraduationCap weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Skool</h1>
          <p className="text-muted-foreground">
            LMS complet avec formations, progression et certificats
          </p>
        </motion.div>

        {/* Course Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-8 shadow-xl shadow-indigo-500/5"
        >
          <div className="grid lg:grid-cols-3">
            {/* Video Player */}
            <div className="lg:col-span-2 bg-gray-950">
              {currentLesson ? (
                <>
                  {/* Video area */}
                  <div className="aspect-video relative bg-gradient-to-br from-indigo-950 via-violet-950/80 to-blue-950 flex items-center justify-center overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.3),transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.2),transparent_50%)]" />
                    </div>
                    {/* Fake video content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-20 w-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                          <GraduationCap className="h-10 w-10 text-indigo-400/60" />
                        </div>
                        <p className="text-white/50 text-sm font-medium">{currentLesson.title}</p>
                        <p className="text-white/25 text-xs mt-1">{currentLesson.duration}</p>
                      </div>
                    </div>

                    {/* Play/Pause overlay */}
                    <motion.button
                      onClick={() => setIsPlaying(!isPlaying)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative z-10 h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause weight="fill" className="h-10 w-10 text-white" />
                      ) : (
                        <Play weight="fill" className="h-10 w-10 text-white ml-1" />
                      )}
                    </motion.button>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <motion.div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-primary"
                      >
                        {isPlaying ? (
                          <Pause weight="fill" className="h-5 w-5" />
                        ) : (
                          <Play weight="fill" className="h-5 w-5" />
                        )}
                      </button>
                      <span className="text-sm text-white/60">
                        {Math.floor(progress * 0.12)}:{String(Math.floor((progress * 0.12 * 60) % 60)).padStart(2, "0")} / 12:00
                      </span>
                    </div>

                    {/* Speed control */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="flex items-center gap-1 text-sm text-white/60 hover:text-white"
                      >
                        <Speedometer className="h-4 w-4" />
                        {playbackSpeed}x
                      </button>
                      <AnimatePresence>
                        {showSpeedMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-lg p-1 shadow-xl"
                          >
                            {playbackSpeeds.map((speed) => (
                              <button
                                key={speed}
                                onClick={() => {
                                  setPlaybackSpeed(speed);
                                  setShowSpeedMenu(false);
                                }}
                                className={cn(
                                  "block w-full px-3 py-1.5 text-sm rounded text-left",
                                  speed === playbackSpeed
                                    ? "bg-primary text-primary-foreground"
                                    : "text-white/60 hover:bg-white/10"
                                )}
                              >
                                {speed}x
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">Selectionnez une lecon</p>
                    <button
                      onClick={() => {
                        const next = findNextLesson();
                        if (next) handleSelectLesson(next);
                      }}
                      className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
                    >
                      Continuer la formation
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Course content */}
            <div className="border-l border-border flex flex-col max-h-[500px]">
              {/* Header */}
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Coaching Pro</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${courseProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{courseProgress}%</span>
                </div>
                {courseProgress === 100 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowCertificate(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-amber-500/10 text-amber-500 text-sm font-medium hover:bg-amber-500/20"
                  >
                    <Trophy weight="duotone" className="h-4 w-4" />
                    Obtenir mon certificat
                  </motion.button>
                )}
              </div>

              {/* Modules */}
              <div className="flex-1 overflow-y-auto">
                {modules.map((module) => {
                  const moduleProgress = module.lessons.filter((l) => l.completed).length;
                  const isExpanded = expandedModule === module.id;

                  return (
                    <div key={module.id} className="border-b border-border last:border-0">
                      <button
                        onClick={() => setExpandedModule(isExpanded ? "" : module.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30"
                      >
                        {isExpanded ? (
                          <CaretDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <CaretRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {module.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {moduleProgress}/{module.lessons.length} lecons
                          </p>
                        </div>
                        {moduleProgress === module.lessons.length && (
                          <CheckCircle weight="duotone" className="h-5 w-5 text-emerald-500" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {module.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => handleSelectLesson(lesson)}
                                className={cn(
                                  "w-full flex items-center gap-3 px-4 py-3 pl-10 text-left hover:bg-muted/30 transition-colors",
                                  currentLesson?.id === lesson.id && "bg-primary/10"
                                )}
                              >
                                {lesson.completed ? (
                                  <CheckCircle
                                    weight="duotone"
                                    className="h-4 w-4 text-emerald-500 shrink-0"
                                  />
                                ) : currentLesson?.id === lesson.id ? (
                                  <Play weight="fill" className="h-4 w-4 text-primary shrink-0" />
                                ) : (
                                  <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={cn(
                                      "text-sm truncate",
                                      currentLesson?.id === lesson.id
                                        ? "text-primary font-medium"
                                        : "text-foreground"
                                    )}
                                  >
                                    {lesson.title}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0">
                                  {lesson.duration}
                                </span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {showCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowCertificate(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg"
              >
                <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 text-center border-4 border-amber-300 shadow-2xl">
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20"
                  >
                    <X className="h-4 w-4 text-amber-800" />
                  </button>

                  <div className="mb-4">
                    <Certificate weight="duotone" className="h-16 w-16 text-amber-600 mx-auto" />
                  </div>
                  <p className="text-amber-600 text-sm font-medium mb-2">CERTIFICAT DE COMPLETION</p>
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">Coaching Pro</h3>
                  <div className="w-16 h-1 bg-amber-400 mx-auto mb-4" />
                  <p className="text-amber-700 mb-6">
                    Ce certificat atteste que vous avez complete avec succes
                    la formation "Coaching Pro" comprenant 10 lecons.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-amber-600 text-sm mb-6">
                    <GraduationCap className="h-4 w-4" />
                    {new Date().toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors">
                    <Download className="h-4 w-4" />
                    Telecharger le PDF
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
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <Check weight="bold" className="h-3 w-3 text-indigo-500" />
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
