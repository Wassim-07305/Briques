"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cube, ArrowLeft, Sparkle } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 blur-[60px] bg-primary/20 rounded-full" />
            <span className="relative text-[120px] font-bold gradient-text leading-none">
              404
            </span>
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20"
        >
          <Cube weight="duotone" className="h-8 w-8 text-primary" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Page introuvable
          </h1>
          <p className="text-muted-foreground mb-8">
            Cette brique n&apos;existe pas encore... mais on y travaille !
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Retour a l&apos;accueil
          </Link>
          <Link
            href="/demo/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-card transition-colors"
          >
            <Sparkle weight="duotone" className="h-4 w-4 text-primary" />
            Explorer les demos
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
