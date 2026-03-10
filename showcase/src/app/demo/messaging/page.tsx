"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatsCircle,
  PaperPlaneRight,
  Smiley,
  Paperclip,
  Check,
  Checks,
  MagnifyingGlass,
  DotsThree,
  Phone,
  VideoCamera,
  Image as ImageIcon,
  Plus,
  Circle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  time: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
  reactions?: string[];
  image?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Marie Dupont",
    avatar: "M",
    lastMessage: "Super session aujourd'hui !",
    time: "10:26",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Jean Martin",
    avatar: "J",
    lastMessage: "Merci pour les exercices",
    time: "09:45",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Sophie Bernard",
    avatar: "S",
    lastMessage: "A demain pour la seance !",
    time: "Hier",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Pierre Durand",
    avatar: "P",
    lastMessage: "J'ai une question sur le module 3",
    time: "Hier",
    unread: 1,
    online: false,
  },
  {
    id: "5",
    name: "# coaching-groupe",
    avatar: "#",
    lastMessage: "Bienvenue dans le groupe !",
    time: "Lun",
    unread: 0,
    online: false,
  },
];

const messagesByConversation: Record<string, Message[]> = {
  "1": [
    { id: "1-1", content: "Bonjour ! Comment allez-vous aujourd'hui ?", time: "10:15", isOwn: true, status: "read" },
    { id: "1-2", content: "Tres bien merci ! J'ai hate de commencer la session", time: "10:18", isOwn: false },
    { id: "1-3", content: "Parfait ! On va travailler sur les objectifs qu'on avait definis la semaine derniere", time: "10:20", isOwn: true, status: "read" },
    { id: "1-4", content: "Super session aujourd'hui !", time: "10:23", isOwn: false, reactions: ["❤️", "🔥"] },
    { id: "1-5", content: "Merci ! On continue demain ?", time: "10:25", isOwn: true, status: "read" },
    { id: "1-6", content: "Parfait, j'ai hate ! Voici mes notes de la session", time: "10:26", isOwn: false, image: "notes" },
  ],
  "2": [
    { id: "2-1", content: "Bonjour Jean ! Les exercices du module 4 sont prets", time: "09:10", isOwn: true, status: "read" },
    { id: "2-2", content: "Super, je vais les regarder ce matin", time: "09:25", isOwn: false },
    { id: "2-3", content: "N'hesitez pas si vous avez des questions", time: "09:30", isOwn: true, status: "read" },
    { id: "2-4", content: "Merci pour les exercices", time: "09:45", isOwn: false },
  ],
  "3": [
    { id: "3-1", content: "Sophie, voici le recap de notre derniere session", time: "14:00", isOwn: true, status: "read" },
    { id: "3-2", content: "Merci beaucoup ! J'ai bien progresse sur les objectifs", time: "14:15", isOwn: false },
    { id: "3-3", content: "A demain pour la seance !", time: "16:30", isOwn: false },
  ],
  "4": [
    { id: "4-1", content: "Bonjour, j'ai termine le module 2", time: "11:00", isOwn: false },
    { id: "4-2", content: "Excellent Pierre ! Le module 3 est maintenant accessible", time: "11:20", isOwn: true, status: "read" },
    { id: "4-3", content: "J'ai une question sur le module 3", time: "15:00", isOwn: false },
  ],
  "5": [
    { id: "5-1", content: "Bienvenue dans le groupe coaching ! 🎉", time: "Lun 09:00", isOwn: true, status: "read" },
    { id: "5-2", content: "Merci ! Ravi de rejoindre le groupe", time: "Lun 09:15", isOwn: false },
    { id: "5-3", content: "On se retrouve jeudi pour la session collective", time: "Lun 10:00", isOwn: true, status: "read" },
  ],
};

const emojiOptions = ["❤️", "👍", "🔥", "⭐", "😊", "🎉"];

const features = [
  "Messages temps reel via Supabase Realtime",
  "Channels publics et prives",
  "Messages directs (DM)",
  "Reactions avec emojis",
  "Partage de fichiers et images",
  "Messages epingles",
  "Recherche dans les conversations",
  "Indicateurs de lecture",
];

export default function MessagingDemo() {
  const [activeConv, setActiveConv] = useState(conversations[0]);
  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>(messagesByConversation);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = allMessages[activeConv.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeConv.id]);

  const updateConvMessages = (convId: string, updater: (prev: Message[]) => Message[]) => {
    setAllMessages((prev) => ({
      ...prev,
      [convId]: updater(prev[convId] || []),
    }));
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const convId = activeConv.id;
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      status: "sent",
    };

    updateConvMessages(convId, (prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate delivery
    setTimeout(() => {
      updateConvMessages(convId, (prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: "delivered" } : m
        )
      );
    }, 500);

    // Simulate typing indicator
    setTimeout(() => setIsTyping(true), 1000);

    // Simulate response
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "C'est note ! 👍",
        "Parfait, merci !",
        "Je m'en occupe",
        "Super idee !",
        "On en reparle demain ?",
      ];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: false,
      };
      updateConvMessages(convId, (prev) => [...prev, response]);

      // Mark own message as read
      updateConvMessages(convId, (prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: "read" } : m
        )
      );
    }, 2500);
  };

  const addReaction = (messageId: string, emoji: string) => {
    updateConvMessages(activeConv.id, (prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const reactions = m.reactions || [];
          if (reactions.includes(emoji)) {
            return { ...m, reactions: reactions.filter((r) => r !== emoji) };
          }
          return { ...m, reactions: [...reactions, emoji] };
        }
        return m;
      })
    );
    setShowEmojiPicker(null);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-6">
            <ChatsCircle weight="duotone" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Messaging</h1>
          <p className="text-muted-foreground">
            Chat temps reel avec channels et messages directs
          </p>
        </motion.div>

        {/* Interactive Chat Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-8 shadow-xl shadow-pink-500/5"
        >
          <div className="flex h-[500px]">
            {/* Sidebar */}
            <div
              className={cn(
                "w-72 border-r border-border flex flex-col bg-card/50 transition-all",
                showSidebar ? "block" : "hidden md:block"
              )}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Messages</h3>
                  <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                  <MagnifyingGlass className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {conversations.map((conv, index) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setActiveConv(conv);
                      setShowSidebar(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all relative",
                      activeConv.id === conv.id
                        ? "bg-primary/10"
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium",
                          conv.avatar === "#"
                            ? "bg-violet-500/20 text-violet-500"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "font-medium text-sm truncate",
                            activeConv.id === conv.id
                              ? "text-primary"
                              : "text-foreground"
                          )}
                        >
                          {conv.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-muted-foreground truncate">
                          {conv.lastMessage}
                        </span>
                        {conv.unread > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="md:hidden h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center"
                  >
                    <ChatsCircle className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {activeConv.avatar}
                      </span>
                    </div>
                    {activeConv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">
                      {activeConv.name}
                    </span>
                    {activeConv.online ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-500">
                        <Circle weight="fill" className="h-2 w-2" />
                        En ligne
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Vu recemment
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center">
                    <VideoCamera className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center">
                    <DotsThree className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Date separator */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Aujourd&apos;hui</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex gap-3 group",
                        msg.isOwn && "flex-row-reverse"
                      )}
                    >
                      {!msg.isOwn && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-primary">
                            {activeConv.avatar}
                          </span>
                        </div>
                      )}
                      <div
                        className={cn(
                          "relative max-w-[70%]",
                          msg.isOwn && "text-right"
                        )}
                      >
                        {/* Message bubble */}
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2 text-sm inline-block text-left",
                            msg.isOwn
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-muted rounded-tl-sm"
                          )}
                        >
                          {msg.image ? (
                            <div className="space-y-2">
                              <p>{msg.content}</p>
                              <div className="h-32 w-48 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            </div>
                          ) : (
                            msg.content
                          )}
                        </div>

                        {/* Reactions */}
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div
                            className={cn(
                              "flex gap-1 mt-1",
                              msg.isOwn ? "justify-end" : "justify-start"
                            )}
                          >
                            {msg.reactions.map((emoji, i) => (
                              <span
                                key={i}
                                className="text-sm bg-muted rounded-full px-1.5 py-0.5"
                              >
                                {emoji}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Time and status */}
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-1",
                            msg.isOwn ? "justify-end" : "justify-start"
                          )}
                        >
                          <span className="text-[10px] text-muted-foreground">
                            {msg.time}
                          </span>
                          {msg.isOwn && msg.status && (
                            <span className="text-muted-foreground">
                              {msg.status === "sent" && (
                                <Check className="h-3 w-3" />
                              )}
                              {msg.status === "delivered" && (
                                <Checks className="h-3 w-3" />
                              )}
                              {msg.status === "read" && (
                                <Checks className="h-3 w-3 text-primary" />
                              )}
                            </span>
                          )}
                        </div>

                        {/* Emoji picker button */}
                        <button
                          onClick={() =>
                            setShowEmojiPicker(
                              showEmojiPicker === msg.id ? null : msg.id
                            )
                          }
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm",
                            msg.isOwn ? "-left-10" : "-right-10"
                          )}
                        >
                          <Smiley className="h-4 w-4 text-muted-foreground" />
                        </button>

                        {/* Emoji picker */}
                        <AnimatePresence>
                          {showEmojiPicker === msg.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className={cn(
                                "absolute z-10 top-full mt-2 flex gap-1 p-2 rounded-xl bg-card border border-border shadow-lg",
                                msg.isOwn ? "right-0" : "left-0"
                              )}
                            >
                              {emojiOptions.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => addReaction(msg.id, emoji)}
                                  className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-lg transition-transform hover:scale-125"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex gap-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {activeConv.avatar}
                        </span>
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0,
                            }}
                            className="h-2 w-2 rounded-full bg-muted-foreground/50"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.15,
                            }}
                            className="h-2 w-2 rounded-full bg-muted-foreground/50"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.3,
                            }}
                            className="h-2 w-2 rounded-full bg-muted-foreground/50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

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
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ecrivez un message..."
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                    <button className="h-8 w-8 rounded-lg hover:bg-muted/50 flex items-center justify-center">
                      <Smiley className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                  <motion.button
                    onClick={handleSend}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                      inputValue.trim()
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <PaperPlaneRight weight="fill" className="h-5 w-5" />
                  </motion.button>
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
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/10">
                  <Check weight="bold" className="h-3 w-3 text-pink-500" />
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
