"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiHeart, FiUsers, FiBook, FiMusic, FiStar, FiGlobe } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

const MINISTRIES = [
  {
    icon: FiBook,
    title: "Sunday School",
    age: "All Ages",
    time: "Sundays 9:30 AM",
    desc: "Deep, age-appropriate Bible teaching for every stage of life — from nursery to seniors.",
    color: "from-blue-500 to-blue-700",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    icon: FiUsers,
    title: "Youth Ministry",
    age: "Ages 13–25",
    time: "Fridays 6:00 PM",
    desc: "A vibrant community helping young people build a lasting faith in a relevant, engaging environment.",
    color: "from-purple-500 to-purple-700",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    icon: FiHeart,
    title: "Women's Ministry",
    age: "Women of all ages",
    time: "Tuesdays 10:00 AM",
    desc: "Equipping women to grow spiritually, build meaningful friendships, and serve boldly.",
    color: "from-rose-500 to-rose-700",
    image: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?w=600&q=80",
  },
  {
    icon: FiStar,
    title: "Men's Ministry",
    age: "Men of all ages",
    time: "Saturdays 7:00 AM",
    desc: "Men growing together in Christ, accountability, leadership, and service to family and church.",
    color: "from-amber-500 to-amber-700",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
  },
  {
    icon: FiMusic,
    title: "Worship & Music",
    age: "All Ages",
    time: "Rehearsals Wed 6:00 PM",
    desc: "Uplifting the name of God through Spirit-led, scripture-based worship every Sunday.",
    color: "from-teal-500 to-teal-700",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  {
    icon: FiGlobe,
    title: "Outreach & Missions",
    age: "All Ages",
    time: "Monthly",
    desc: "Taking the Gospel beyond our walls — locally and globally — through service and evangelism.",
    color: "from-green-500 to-green-700",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  },
];

const STATS = [
  { value: "6+", label: "Active Ministries" },
  { value: "200+", label: "Lives Touched" },
  { value: "15+", label: "Years Serving" },
  { value: "3", label: "Mission Partners" },
];

export default function MinistryPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=85')" }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#1e3a5f]/90 via-[#1e3a5f]/70 to-[#c9a84c]/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#e8c97a] font-semibold uppercase tracking-widest text-sm mb-3"
          >
            Get Involved
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4"
          >
            Our <span className="text-[#c9a84c]">Ministry</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 text-lg max-w-xl"
          >
            Serving God and one another through purposeful, Spirit-led ministry for every age and stage of life.
          </motion.p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-[#1e3a5f] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-4xl font-extrabold text-[#c9a84c]">{s.value}</p>
              <p className="text-white/70 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Ministry cards ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] font-semibold uppercase tracking-widest text-sm mb-3">How We Serve</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1e3a5f]">Ministry Programs</h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MINISTRIES.map((m, i) => (
              <SectionReveal key={m.title} delay={i * 0.08}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-linear-to-br ${m.color} opacity-60`} />
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2.5">
                      <m.icon size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-[#1e3a5f] text-xl">{m.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-[#1e3a5f]/8 text-[#1e3a5f] px-2.5 py-1 rounded-full font-medium">
                        {m.age}
                      </span>
                      <span className="text-xs bg-[#c9a84c]/15 text-[#8a6a20] px-2.5 py-1 rounded-full font-medium">
                        {m.time}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{m.desc}</p>
                    <Link
                      href="/contact"
                      className="text-[#1e3a5f] font-semibold text-sm flex items-center gap-1.5 hover:text-[#c9a84c] transition-colors"
                    >
                      Get Involved <FiArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Children's ministry highlight ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <SectionReveal direction="left">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
                  alt="Children's Ministry"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-5 -right-5 bg-[#c9a84c] text-[#1e3a5f] rounded-2xl px-5 py-3 shadow-lg font-bold text-sm">
                  Ages 0–12 Welcome!
                </div>
              </div>
            </SectionReveal>
            <SectionReveal direction="right">
              <p className="text-[#c9a84c] font-semibold uppercase tracking-widest text-sm mb-3">Children&apos;s Ministry</p>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Raising the Next Generation</h2>
              <div className="gold-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                We believe children are not the future of the church — they are the church today. Our children&apos;s ministry creates a safe, fun, and deeply biblical environment where kids encounter Jesus in a real and age-appropriate way.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From nursery care to junior classes, every child is seen, known, and loved here.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Register Your Child <FiArrowRight />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-linear-to-r from-[#c9a84c] to-[#e8c97a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Find Your Place to Serve</h2>
            <p className="text-[#1e3a5f]/75 text-lg mb-8">
              Every member has a gift. Every gift has a place. Come discover yours with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-[#1e3a5f] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0f2240] transition-colors shadow-lg">
                Join a Ministry
              </Link>
              <Link href="/contact" className="bg-white/30 backdrop-blur-sm text-[#1e3a5f] px-8 py-3 rounded-full font-semibold border-2 border-[#1e3a5f]/30 hover:bg-white/50 transition-colors">
                Contact Us
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
