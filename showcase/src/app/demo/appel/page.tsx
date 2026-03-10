"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Microphone,
  MicrophoneSlash,
  VideoCamera,
  VideoCameraSlash,
  Monitor,
  TextAa,
  PhoneDisconnect,
  Check,
  User,
  Clock,
  CaretLeft,
  CaretRight,
  Plus,
  Circle,
  CalendarBlank,
  Download,
  Waveform,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
type Phase = "calendar" | "lobby" | "connecting" | "connected" | "ended";

type CallType = "visio" | "telephone" | "manuel" | "externe";

interface ScheduledCall {
  id: string;
  title: string;
  participant: string;
  time: string;
  duration: number;
  type: CallType;
  day: number; // 0-6 (Mon-Sun)
}

interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  time: string;
}

/* ─── Data ─── */
const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const scheduledCalls: ScheduledCall[] = [
  { id: "1", title: "Coaching Leadership", participant: "Marie Dupont", time: "09:00", duration: 60, type: "visio", day: 0 },
  { id: "2", title: "Appel decouverte", participant: "Thomas Bernard", time: "11:00", duration: 30, type: "telephone", day: 0 },
  { id: "3", title: "Bilan trimestriel", participant: "Sophie Laurent", time: "14:00", duration: 45, type: "visio", day: 1 },
  { id: "4", title: "Session groupe", participant: "Equipe Vente", time: "10:00", duration: 90, type: "visio", day: 2 },
  { id: "5", title: "Suivi mensuel", participant: "Nicolas Martin", time: "16:00", duration: 30, type: "telephone", day: 3 },
  { id: "6", title: "Formation React", participant: "Julie Moreau", time: "09:30", duration: 60, type: "visio", day: 4 },
];

const typeColors: Record<CallType, string> = {
  visio: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  telephone: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  manuel: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  externe: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

const typeLabels: Record<CallType, string> = {
  visio: "Visio",
  telephone: "Tel",
  manuel: "Manuel",
  externe: "Externe",
};

const mockTranscript: TranscriptEntry[] = [
  { id: "1", speaker: "Vous", text: "Bonjour Marie, comment allez-vous aujourd'hui ?", time: "00:05" },
  { id: "2", speaker: "Marie D.", text: "Tres bien merci ! J'ai applique les exercices de la semaine derniere.", time: "00:12" },
  { id: "3", speaker: "Vous", text: "Excellent ! Quels resultats avez-vous observe ?", time: "00:24" },
  { id: "4", speaker: "Marie D.", text: "J'ai reussi a deleguer 3 taches importantes a mon equipe. Ca m'a libere 2 heures par jour.", time: "00:38" },
  { id: "5", speaker: "Vous", text: "C'est un progres significatif. On va travailler sur la suite maintenant.", time: "00:52" },
];

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h-19h

/* ─── Audio Level Bars ─── */
function AudioLevelMeter({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          animate={
            active
              ? {
                  height: [4, 8 + Math.random() * 12, 4],
                }
              : { height: 4 }
          }
          transition={
            active
              ? {
                  duration: 0.3 + Math.random() * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }
              : {}
          }
          className="w-1 rounded-full bg-emerald-400"
          style={{ height: 4 }}
        />
      ))}
    </div>
  );
}

/* ─── Call Timer ─── */
function CallTimer({ startTime }: { startTime: number }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return (
    <span className="font-mono text-sm text-white/60 tabular-nums">
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  );
}

/* ─── Calendar View ─── */
function CalendarView({
  calls,
  onJoinCall,
}: {
  calls: ScheduledCall[];
  onJoinCall: (call: ScheduledCall) => void;
}) {
  return (
    <div className="overflow-hidden">
      {/* Week header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <button className="h-7 w-7 rounded-lg hover:bg-white/5 flex items-center justify-center">
            <CaretLeft className="h-4 w-4 text-white/40" />
          </button>
          <span className="text-sm font-medium text-white">10 — 16 Mars 2026</span>
          <button className="h-7 w-7 rounded-lg hover:bg-white/5 flex items-center justify-center">
            <CaretRight className="h-4 w-4 text-white/40" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-white/40 hover:text-white/60 px-2 py-1 rounded hover:bg-white/5">
            Aujourd&apos;hui
          </button>
          <button className="flex items-center gap-1 text-xs text-white/60 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/10">
            <Plus className="h-3 w-3" />
            Nouvel appel
          </button>
        </div>
      </div>

      {/* Day columns header */}
      <div className="grid grid-cols-[50px_repeat(5,1fr)] border-b border-white/5">
        <div />
        {weekDays.slice(0, 5).map((day, i) => (
          <div
            key={day}
            className={cn(
              "text-center py-2 text-xs border-l border-white/5",
              i === 0 ? "text-blue-400 font-medium" : "text-white/30"
            )}
          >
            <div>{day}</div>
            <div className={cn("text-lg font-bold", i === 0 ? "text-blue-400" : "text-white/50")}>
              {10 + i}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="max-h-[320px] overflow-y-auto">
        <div className="grid grid-cols-[50px_repeat(5,1fr)]">
          {hours.slice(0, 10).map((hour) => (
            <div key={hour} className="contents">
              <div className="text-[10px] text-white/20 text-right pr-2 py-3 font-mono">
                {hour}:00
              </div>
              {[0, 1, 2, 3, 4].map((day) => {
                const call = calls.find(
                  (c) => c.day === day && parseInt(c.time) === hour
                );
                return (
                  <div
                    key={day}
                    className="border-l border-t border-white/3 min-h-[48px] p-0.5 relative"
                  >
                    {call && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => onJoinCall(call)}
                        className={cn(
                          "w-full rounded-md p-1.5 text-left transition-all hover:ring-1 hover:ring-white/20",
                          call.type === "visio"
                            ? "bg-blue-500/15 hover:bg-blue-500/25"
                            : "bg-emerald-500/15 hover:bg-emerald-500/25"
                        )}
                      >
                        <p className="text-[10px] font-medium text-white truncate">
                          {call.title}
                        </p>
                        <p className="text-[9px] text-white/40 truncate">
                          {call.participant} • {call.duration}min
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded px-1 py-0.5 text-[8px] font-medium border mt-0.5",
                            typeColors[call.type]
                          )}
                        >
                          {typeLabels[call.type]}
                        </span>
                      </motion.button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Lobby ─── */
function Lobby({
  call,
  micOn,
  cameraOn,
  onToggleMic,
  onToggleCamera,
  onJoin,
  onBack,
}: {
  call: ScheduledCall;
  micOn: boolean;
  cameraOn: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onJoin: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <p className="text-xs text-white/30 mb-2">Pre-rejoindre</p>
      <h3 className="text-lg font-semibold text-white mb-1">{call.title}</h3>
      <p className="text-sm text-white/40 mb-6">avec {call.participant}</p>

      {/* Camera preview */}
      <div className="relative w-72 h-44 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 overflow-hidden mb-6">
        {cameraOn ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white">
              WK
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <VideoCameraSlash className="h-10 w-10 text-white/20" />
          </div>
        )}

        {/* Audio meter */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
          <AudioLevelMeter active={micOn} />
          {micOn ? (
            <Microphone className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <MicrophoneSlash className="h-3.5 w-3.5 text-red-400" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onToggleMic}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all",
            micOn
              ? "bg-white/10 hover:bg-white/15 text-white"
              : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
          )}
        >
          {micOn ? (
            <Microphone weight="fill" className="h-5 w-5" />
          ) : (
            <MicrophoneSlash weight="fill" className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={onToggleCamera}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all",
            cameraOn
              ? "bg-white/10 hover:bg-white/15 text-white"
              : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
          )}
        >
          {cameraOn ? (
            <VideoCamera weight="fill" className="h-5 w-5" />
          ) : (
            <VideoCameraSlash weight="fill" className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:bg-white/5"
        >
          Retour
        </button>
        <motion.button
          onClick={onJoin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <Phone weight="fill" className="h-4 w-4" />
          Rejoindre
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Connected View ─── */
function ConnectedView({
  call,
  micOn,
  cameraOn,
  screenSharing,
  transcribing,
  showTranscript,
  callStartTime,
  visibleTranscriptCount,
  onToggleMic,
  onToggleCamera,
  onToggleScreen,
  onToggleTranscript,
  onToggleShowTranscript,
  onHangUp,
}: {
  call: ScheduledCall;
  micOn: boolean;
  cameraOn: boolean;
  screenSharing: boolean;
  transcribing: boolean;
  showTranscript: boolean;
  callStartTime: number;
  visibleTranscriptCount: number;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreen: () => void;
  onToggleTranscript: () => void;
  onToggleShowTranscript: () => void;
  onHangUp: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-white">{call.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <CallTimer startTime={callStartTime} />
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Connecte
          </span>
        </div>
      </div>

      {/* Video area */}
      <div className="flex-1 flex">
        <div className={cn("flex-1 grid gap-2 p-3", showTranscript ? "grid-cols-1" : "grid-cols-2")}>
          {/* Remote video */}
          <div className="relative rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl font-bold text-white mb-2">
                {call.participant.charAt(0)}
              </div>
              <p className="text-sm text-white/60">{call.participant}</p>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white/60">
              <span>{call.participant.split(" ")[0]}</span>
            </div>
          </div>

          {/* Local video (small if transcript shown) */}
          {!showTranscript && (
            <div className="relative rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center">
              {screenSharing ? (
                <div className="text-center">
                  <Monitor className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-white/40">Partage d&apos;ecran actif</p>
                </div>
              ) : cameraOn ? (
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
                  WK
                </div>
              ) : (
                <VideoCameraSlash className="h-8 w-8 text-white/20" />
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white/60">
                <span>Vous</span>
                {!micOn && <MicrophoneSlash className="h-3 w-3 text-red-400" />}
              </div>
            </div>
          )}
        </div>

        {/* Transcript panel */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-white/5 flex flex-col overflow-hidden shrink-0"
            >
              <div className="p-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TextAa className="h-4 w-4 text-white/40" />
                  <span className="text-xs font-medium text-white/60">
                    Transcription
                  </span>
                  <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/30">
                    {mockTranscript.length}
                  </span>
                </div>
                <button className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center">
                  <Download className="h-3.5 w-3.5 text-white/30" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {mockTranscript.slice(0, visibleTranscriptCount).map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[10px] font-mono text-white/20">[{entry.time}]</span>
                      <span className="text-[10px] font-medium text-white/50">{entry.speaker}</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{entry.text}</p>
                  </motion.div>
                ))}
                {transcribing && visibleTranscriptCount < mockTranscript.length && (
                  <div className="flex items-center gap-2">
                    <Waveform className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                    <span className="text-[10px] text-blue-400">Ecoute en cours...</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-white/5 bg-black/20">
        <button
          onClick={onToggleMic}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-all",
            micOn
              ? "bg-white/10 hover:bg-white/15 text-white"
              : "bg-red-500/20 text-red-400"
          )}
        >
          {micOn ? <Microphone weight="fill" className="h-5 w-5" /> : <MicrophoneSlash weight="fill" className="h-5 w-5" />}
        </button>
        <button
          onClick={onToggleCamera}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-all",
            cameraOn
              ? "bg-white/10 hover:bg-white/15 text-white"
              : "bg-red-500/20 text-red-400"
          )}
        >
          {cameraOn ? <VideoCamera weight="fill" className="h-5 w-5" /> : <VideoCameraSlash weight="fill" className="h-5 w-5" />}
        </button>
        <button
          onClick={onToggleScreen}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-all",
            screenSharing
              ? "bg-blue-500/20 text-blue-400"
              : "bg-white/10 hover:bg-white/15 text-white"
          )}
        >
          <Monitor weight={screenSharing ? "fill" : "regular"} className="h-5 w-5" />
        </button>
        <button
          onClick={onToggleTranscript}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-all",
            transcribing
              ? "bg-blue-500/20 text-blue-400"
              : "bg-white/10 hover:bg-white/15 text-white"
          )}
        >
          <TextAa weight={transcribing ? "fill" : "regular"} className="h-5 w-5" />
        </button>
        <button
          onClick={onToggleShowTranscript}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-all",
            showTranscript
              ? "bg-violet-500/20 text-violet-400"
              : "bg-white/10 hover:bg-white/15 text-white"
          )}
        >
          <Waveform weight={showTranscript ? "fill" : "regular"} className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button
          onClick={onHangUp}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
        >
          <PhoneDisconnect weight="fill" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Ended View ─── */
function EndedView({
  call,
  duration,
  onBack,
}: {
  call: ScheduledCall;
  duration: number;
  onBack: () => void;
}) {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4"
      >
        <PhoneDisconnect className="h-8 w-8 text-white/30" />
      </motion.div>
      <h3 className="text-lg font-semibold text-white mb-1">Appel termine</h3>
      <p className="text-sm text-white/40 mb-2">{call.title} avec {call.participant}</p>
      <p className="text-xs font-mono text-white/30 mb-6">
        Duree: {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </p>

      {/* Transcript preview */}
      <div className="w-full max-w-sm rounded-xl border border-white/5 bg-white/3 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-white/50">Transcription</span>
          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/30">
            {mockTranscript.length} entrees
          </span>
        </div>
        <div className="space-y-2">
          {mockTranscript.slice(0, 3).map((entry) => (
            <p key={entry.id} className="text-[10px] text-white/40 truncate">
              <span className="text-white/60">{entry.speaker}:</span> {entry.text}
            </p>
          ))}
        </div>
        <button className="mt-3 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
          <Download className="h-3 w-3" />
          Telecharger la transcription
        </button>
      </div>

      <button
        onClick={onBack}
        className="px-5 py-2.5 rounded-xl bg-white/10 text-sm text-white hover:bg-white/15 transition-colors"
      >
        Retour au calendrier
      </button>
    </div>
  );
}

/* ─── Main ─── */
export default function AppelDemo() {
  const [phase, setPhase] = useState<Phase>("calendar");
  const [selectedCall, setSelectedCall] = useState<ScheduledCall | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [callStartTime, setCallStartTime] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [visibleTranscriptCount, setVisibleTranscriptCount] = useState(0);

  // Progressive transcript reveal during call
  useEffect(() => {
    if (phase !== "connected" || !transcribing) return;
    if (visibleTranscriptCount >= mockTranscript.length) return;

    const timer = setTimeout(() => {
      setVisibleTranscriptCount((c) => c + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [phase, transcribing, visibleTranscriptCount]);

  const handleJoinCall = (call: ScheduledCall) => {
    setSelectedCall(call);
    setPhase("lobby");
  };

  const handleStartCall = () => {
    setPhase("connecting");
    setVisibleTranscriptCount(0);
    setTimeout(() => {
      setPhase("connected");
      setCallStartTime(Date.now());
      // Auto-enable transcription after 2s
      setTimeout(() => setTranscribing(true), 2000);
    }, 1500);
  };

  const handleHangUp = () => {
    const duration = Math.floor((Date.now() - callStartTime) / 1000);
    setCallDuration(duration);
    setPhase("ended");
    setTranscribing(false);
    setScreenSharing(false);
    setShowTranscript(false);
  };

  const handleBack = () => {
    setPhase("calendar");
    setSelectedCall(null);
    setMicOn(true);
    setCameraOn(true);
    setScreenSharing(false);
    setTranscribing(false);
    setShowTranscript(false);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 mb-6">
            <Phone weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Appel</h1>
          <p className="text-muted-foreground">
            Visioconference WebRTC avec transcription live et calendrier
          </p>
        </motion.div>

        {/* Main Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border overflow-hidden mb-8 shadow-xl shadow-violet-500/5"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,12,18,1) 0%, rgba(20,15,30,0.9) 50%, rgba(12,12,18,1) 100%)",
          }}
        >
          <div className="min-h-[480px] flex flex-col">
            <AnimatePresence mode="wait">
              {phase === "calendar" && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CalendarView calls={scheduledCalls} onJoinCall={handleJoinCall} />
                </motion.div>
              )}

              {phase === "lobby" && selectedCall && (
                <motion.div
                  key="lobby"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1"
                >
                  <Lobby
                    call={selectedCall}
                    micOn={micOn}
                    cameraOn={cameraOn}
                    onToggleMic={() => setMicOn(!micOn)}
                    onToggleCamera={() => setCameraOn(!cameraOn)}
                    onJoin={handleStartCall}
                    onBack={handleBack}
                  />
                </motion.div>
              )}

              {phase === "connecting" && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center py-16"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="h-12 w-12 mx-auto mb-4 rounded-full border-2 border-white/10 border-t-violet-500"
                    />
                    <p className="text-sm text-white/50">Connexion en cours...</p>
                    <p className="text-xs text-white/25 mt-1">Etablissement du lien WebRTC</p>
                  </div>
                </motion.div>
              )}

              {phase === "connected" && selectedCall && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <ConnectedView
                    call={selectedCall}
                    micOn={micOn}
                    cameraOn={cameraOn}
                    screenSharing={screenSharing}
                    transcribing={transcribing}
                    showTranscript={showTranscript}
                    callStartTime={callStartTime}
                    visibleTranscriptCount={visibleTranscriptCount}
                    onToggleMic={() => setMicOn(!micOn)}
                    onToggleCamera={() => setCameraOn(!cameraOn)}
                    onToggleScreen={() => setScreenSharing(!screenSharing)}
                    onToggleTranscript={() => setTranscribing(!transcribing)}
                    onToggleShowTranscript={() => setShowTranscript(!showTranscript)}
                    onHangUp={handleHangUp}
                  />
                </motion.div>
              )}

              {phase === "ended" && selectedCall && (
                <motion.div
                  key="ended"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <EndedView
                    call={selectedCall}
                    duration={callDuration}
                    onBack={handleBack}
                  />
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
            {[
              "WebRTC peer-to-peer natif (zero service externe)",
              "Signaling via Supabase Realtime broadcast",
              "Transcription live (Web Speech API)",
              "Partage d'ecran en un clic",
              "Lobby avec apercu camera et niveau audio",
              "Calendrier hebdomadaire avec creneaux",
              "Gestion d'appels (planifie/realise/no-show)",
              "Export transcription en .txt",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.04 }}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                  <Check weight="bold" className="h-3 w-3 text-violet-500" />
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
