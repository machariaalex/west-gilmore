"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FiPlay, FiMapPin, FiChevronDown } from "react-icons/fi";

const SLIDES = [
  {
    id: 0,
    bg: "https://images.unsplash.com/photo-1519491050282-cf00c82424b3?w=1920&q=90",
    headline: "Welcome Home",
    sub: "A place where every soul is known and loved.",
    cta: { label: "Visit Us", href: "/contact", icon: FiMapPin },
  },
  {
    id: 1,
    bg: "/hero.webp",
    headline: "Rooted in Truth",
    sub: "Sound biblical teaching that anchors your faith.",
    cta: { label: "Watch Sermons", href: "/sermons", icon: FiPlay },
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=90",
    headline: "Bound by Love",
    sub: "Community that walks together through every season.",
    cta: { label: "Our Ministry", href: "/ministry", icon: FiPlay },
  },
];

const IMAGE_VARIANTS: Variants = {
  enter:  { scale: 1.08, opacity: 0 },
  center: { scale: 1,    opacity: 1, transition: { duration: 1.6, ease: "easeOut" } },
  exit:   { scale: 0.96, opacity: 0, transition: { duration: 0.9, ease: "easeIn"  } },
};

const TEXT_VARIANTS: Variants = {
  enter:  { y: 40,  opacity: 0 },
  center: { y: 0,   opacity: 1, transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } },
  exit:   { y: -20, opacity: 0, transition: { duration: 0.4 } },
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Animated background image ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          variants={IMAGE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-linear-to-br from-[#1e3a5f]/88 via-[#1e3a5f]/60 to-[#c9a84c]/30 pointer-events-none" />

      {/* ── Subtle scan-line texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)" }}
      />

      {/* ── Glowing orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-16 w-72 h-72 rounded-full bg-[#c9a84c] blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-16 w-96 h-96 rounded-full bg-[#2d5a9e] blur-[100px] pointer-events-none"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Logo + name badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#c9a84c] ring-offset-2 ring-offset-transparent shadow-xl">
            <Image src="/logo.jpg" alt="Church Logo" fill className="object-cover" priority />
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-base leading-tight drop-shadow">West Gilmore St</p>
            <p className="text-[#e8c97a] text-sm font-medium">Church of Christ</p>
          </div>
        </motion.div>

        {/* Animated headline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            variants={TEXT_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-none tracking-tight mb-5 drop-shadow-2xl">
              {slide.headline}
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="w-20 h-1 bg-linear-to-r from-[#c9a84c] to-[#e8c97a] mx-auto mb-6 rounded-full origin-left"
            />

            <p className="text-lg sm:text-2xl text-white/80 mb-2 font-light max-w-2xl mx-auto">
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[#e8c97a] italic text-base sm:text-lg mb-10 font-medium"
        >
          &ldquo;Pointing Souls to Christ Through Truth and Love&rdquo;
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${current}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={slide.cta.href} className="btn-gold flex items-center justify-center gap-2 text-base">
                <slide.cta.icon /> {slide.cta.label}
              </Link>
            </motion.div>
          </AnimatePresence>
          <Link href="/about" className="btn-outline flex items-center justify-center gap-2 text-base">
            Learn About Us
          </Link>
        </motion.div>

        {/* Service times */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-14 grid grid-cols-3 gap-3 sm:gap-5 max-w-xl mx-auto"
        >
          {[
            { day: "Sunday",    time: "9:30 AM",  label: "Bible Class" },
            { day: "Sunday",    time: "10:30 AM", label: "Worship"     },
            { day: "Wednesday", time: "7:00 PM",  label: "Bible Study" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl px-3 py-3 text-center backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
            >
              <p className="text-[#e8c97a] text-[10px] font-bold uppercase tracking-widest">{item.day}</p>
              <p className="text-white font-extrabold text-lg leading-tight">{item.time}</p>
              <p className="text-white/65 text-[11px] mt-0.5">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? "2rem" : "0.5rem" }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="absolute inset-0 bg-white/40 rounded-full" />
            {i === current && (
              <motion.span
                className="absolute inset-0 bg-[#c9a84c] rounded-full"
                layoutId="activeDot"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-20"
      >
        <FiChevronDown size={20} />
      </motion.div>
    </section>
  );
}
