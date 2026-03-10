"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Robot,
  PaperPlaneRight,
  Sparkle,
  Check,
  Brain,
  FileText,
  Upload,
  Paperclip,
  BookOpen,
  Lightning,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  isTyping?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: "pdf" | "doc";
  chunks: number;
}

const suggestions = [
  "Comment demarrer avec le coaching ?",
  "Quels sont les tarifs ?",
  "Comment prendre RDV ?",
  "Parle-moi de la methode",
  "Quels resultats attendre ?",
  "Combien de temps dure un accompagnement ?",
];

const aiResponses: Record<string, { content: string; sources: string[] }> = {
  "Comment demarrer avec le coaching ?": {
    content:
      "Pour demarrer avec le coaching, je vous recommande de commencer par un appel decouverte gratuit de 30 minutes. Cela nous permettra de faire connaissance, de comprendre vos objectifs et de voir si nous sommes faits pour travailler ensemble. Vous pouvez prendre rendez-vous directement depuis la page iClosed.",
    sources: ["Guide du coaching", "FAQ"],
  },
  "Quels sont les tarifs ?": {
    content:
      "Nos tarifs varient selon le type d'accompagnement :\n\n• **Coaching individuel** : 150 EUR/session (1h)\n• **Pack 5 sessions** : 650 EUR (economisez 100 EUR)\n• **Accompagnement VIP** : 1500 EUR/mois\n\nTous nos packs incluent un acces a la formation en ligne et au groupe de soutien.",
    sources: ["Grille tarifaire 2024", "Conditions generales"],
  },
  "Comment prendre RDV ?": {
    content:
      "Prendre rendez-vous est tres simple ! Rendez-vous sur notre page de reservation (brique iClosed), choisissez le type de session souhaite, selectionnez une date et un creneau disponible, puis remplissez le formulaire. Vous recevrez une confirmation par email avec le lien de visio.",
    sources: ["Guide de reservation"],
  },
  "Parle-moi de la methode": {
    content:
      "Ma methode de coaching repose sur 3 piliers fondamentaux :\n\n1. **La clarification** : Definir precisement vos objectifs et identifier les obstacles\n2. **L'action** : Mettre en place des strategies concretes et mesurables\n3. **L'ancrage** : Integrer durablement les changements dans votre quotidien\n\nChaque session combine ecoute active, questionnement puissant et exercices pratiques.",
    sources: ["Methodologie", "Temoignages clients"],
  },
  "Quels resultats attendre ?": {
    content:
      "Les resultats varient selon votre engagement, mais voici ce que nos clients observent en moyenne :\n\n• **Apres 1 mois** : Meilleure clarte sur vos priorites\n• **Apres 3 mois** : +30% de productivite, delegation efficace\n• **Apres 6 mois** : Transformation durable des habitudes\n\n92% de nos clients atteignent leurs objectifs principaux dans les 6 premiers mois d'accompagnement.",
    sources: ["Etude d'impact 2024", "Temoignages clients"],
  },
  "Combien de temps dure un accompagnement ?": {
    content:
      "La duree depend de vos objectifs :\n\n• **Sprint** (1 mois) : Ideal pour debloquer une situation precise\n• **Standard** (3 mois) : Pour un changement significatif et mesurable\n• **Transformation** (6 mois) : Pour une evolution profonde et durable\n\nJe recommande generalement 3 mois minimum pour observer des resultats concrets. Chaque parcours est ajuste en fonction de vos progres.",
    sources: ["Guide d'accompagnement", "FAQ"],
  },
};

const mockDocuments: Document[] = [
  { id: "1", name: "Guide du coaching.pdf", type: "pdf", chunks: 24 },
  { id: "2", name: "FAQ Clients.docx", type: "doc", chunks: 12 },
  { id: "3", name: "Grille tarifaire 2024.pdf", type: "pdf", chunks: 8 },
];

const features = [
  "Chatbot IA avec personnalite configurable",
  "RAG avec base de connaissances pgvector",
  "Upload de documents (PDF, DOCX)",
  "Historique des conversations",
  "Suggestions de questions",
  "Badge 'Propulse par' personnalisable",
  "Interface drag & drop pour documents",
  "API OpenAI ou Anthropic",
];

export default function NameiaDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Bonjour ! Je suis votre assistant IA. Je peux repondre a vos questions en me basant sur la base de connaissances. Comment puis-je vous aider ?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [documents, setDocuments] = useState(mockDocuments);
  const [showDocs, setShowDocs] = useState(false);
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  const typeResponse = async (response: { content: string; sources: string[] }) => {
    setIsTyping(true);
    setTypingText("");

    const words = response.content.split(" ");
    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 40));
      setTypingText((prev) => (prev ? prev + " " + words[i] : words[i]));
    }

    setIsTyping(false);
    setTypingText("");

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: response.content,
      sources: response.sources,
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Find matching response or use default
    const response = aiResponses[messageText] || {
      content:
        "Je comprends votre question. Laissez-moi chercher dans la base de connaissances... D'apres les documents disponibles, je peux vous dire que notre equipe est a votre disposition pour repondre a toutes vos questions specifiques. N'hesitez pas a prendre un rendez-vous pour en discuter de vive voix !",
      sources: ["Base de connaissances generale"],
    };

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Type the response
    await typeResponse(response);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const handleDeleteDoc = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-6">
            <Robot weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">NamEIA</h1>
          <p className="text-muted-foreground">
            Chatbot IA avec RAG et base de connaissances
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-8 shadow-xl shadow-amber-500/5"
        >
          <div className="grid lg:grid-cols-4">
            {/* Documents Panel */}
            <div
              className={cn(
                "border-r border-border bg-card/50 lg:block",
                showDocs ? "block" : "hidden"
              )}
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Brain className="h-4 w-4 text-amber-500" />
                    Base de connaissances
                  </h3>
                  <button
                    onClick={() => setShowDocs(false)}
                    className="lg:hidden h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 rotate-45" />
                  </button>
                </div>
              </div>

              <div className="p-3 space-y-2">
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 group"
                  >
                    <div
                      className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                        doc.type === "pdf" ? "bg-red-500/10" : "bg-blue-500/10"
                      )}
                    >
                      <FileText
                        weight="duotone"
                        className={cn(
                          "h-5 w-5",
                          doc.type === "pdf" ? "text-red-500" : "text-blue-500"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc.chunks} chunks indexes
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="h-7 w-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </button>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-amber-500/50 hover:text-amber-500 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Ajouter un document
                </motion.button>
              </div>

              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lightning className="h-3 w-3 text-amber-500" />
                  <span>{documents.reduce((acc, d) => acc + d.chunks, 0)} chunks indexes</span>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 flex flex-col h-[500px]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDocs(true)}
                    className="lg:hidden h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center"
                  >
                    <BookOpen className="h-5 w-5" />
                  </button>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Robot weight="duotone" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Assistant IA</span>
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      En ligne — RAG actif
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                  <Sparkle weight="fill" className="h-3 w-3" />
                  Anthropic Claude
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" && "flex-row-reverse"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                          <Robot weight="duotone" className="h-4 w-4 text-amber-500" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%]",
                          message.role === "user" && "text-right"
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-muted rounded-tl-sm"
                          )}
                        >
                          {message.content}
                        </div>
                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.sources.map((source, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20"
                              >
                                📄 {source}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {(isTyping || typingText) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Robot weight="duotone" className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                        {typingText ? (
                          <p className="text-sm whitespace-pre-wrap">
                            {typingText}
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="inline-block w-2 h-4 bg-amber-500 ml-1"
                            />
                          </p>
                        ) : (
                          <div className="flex gap-1 py-1">
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="h-2 w-2 rounded-full bg-amber-500/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                              className="h-2 w-2 rounded-full bg-amber-500/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                              className="h-2 w-2 rounded-full bg-amber-500/50"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">
                    Suggestions de questions :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <motion.button
                        key={s}
                        onClick={() => handleSuggestionClick(s)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-amber-500/50 hover:bg-amber-500/5 transition-colors"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2">
                  <button className="h-10 w-10 rounded-xl hover:bg-muted flex items-center justify-center">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <div className="flex-1 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !isTyping && handleSend()}
                      placeholder="Posez votre question..."
                      className="flex-1 bg-transparent text-sm outline-none"
                      disabled={isTyping}
                    />
                  </div>
                  <motion.button
                    onClick={() => handleSend()}
                    whileTap={{ scale: 0.95 }}
                    disabled={isTyping || !inputValue.trim()}
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                      inputValue.trim() && !isTyping
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <PaperPlaneRight weight="fill" className="h-5 w-5" />
                  </motion.button>
                </div>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Sparkle weight="duotone" className="h-3 w-3 text-amber-500" />
                  Propulse par NamEIA
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.04 }}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <Check weight="bold" className="h-3 w-3 text-amber-500" />
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
