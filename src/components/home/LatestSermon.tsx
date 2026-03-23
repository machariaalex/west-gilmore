"use client";

import Link from "next/link";
import { FiPlay, FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";
import { formatDate } from "@/lib/utils";

const DEMO_SERMON = {
  title: "Walking in the Light of God's Word",
  speaker: "Pastor James Wilson",
  date: new Date().toISOString(),
  scripture: "John 8:12",
  description: "In this powerful message, we explore what it means to walk in the light as followers of Christ, drawing from the timeless truths of John 8.",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
};

export default function LatestSermon() {
  const ytId = "dQw4w9WgXcQ";

  return (
    <section className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f2240]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] font-semibold uppercase tracking-wider text-sm mb-3">Latest Sermon</p>
            <h2 className="text-4xl font-bold text-white">This Week&apos;s Message</h2>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Video thumbnail */}
          <SectionReveal direction="left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img
                src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                alt={DEMO_SERMON.title}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#c9a84c] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <FiPlay className="text-white text-2xl ml-1" />
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Info */}
          <SectionReveal direction="right">
            <div className="glass-dark rounded-2xl p-8">
              <div className="flex items-center gap-2 text-[#c9a84c] text-sm mb-4">
                <span className="px-3 py-1 bg-[#c9a84c]/20 rounded-full">{DEMO_SERMON.scripture}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{DEMO_SERMON.title}</h3>
              <p className="text-white/70 leading-relaxed mb-6">{DEMO_SERMON.description}</p>
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <FiUser /> {DEMO_SERMON.speaker}
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <FiCalendar /> {formatDate(DEMO_SERMON.date)}
                </div>
              </div>
              <div className="flex gap-3">
                <a href={DEMO_SERMON.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2">
                  <FiPlay /> Watch Now
                </a>
                <Link href="/sermons" className="btn-outline flex items-center gap-2 text-sm">
                  All Sermons <FiArrowRight />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
