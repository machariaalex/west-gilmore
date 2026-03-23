"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { getDailyVerse } from "@/lib/utils";

export default function ScriptureHighlight() {
  const verse = getDailyVerse();

  return (
    <section className="py-20 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-64 h-64 border-4 border-white/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-16 -left-16 w-48 h-48 border-4 border-white/20 rounded-full"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <SectionReveal>
          <p className="text-[#1e3a5f]/60 font-semibold uppercase tracking-wider text-sm mb-6">Verse of the Day</p>
          <div className="text-6xl mb-6 opacity-30 font-serif">&ldquo;</div>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a5f] leading-relaxed mb-6 font-serif italic">
            {verse.verse}
          </blockquote>
          <div className="text-6xl opacity-30 font-serif leading-none">&rdquo;</div>
          <p className="text-[#1e3a5f] font-bold text-lg mt-2">{verse.reference}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
