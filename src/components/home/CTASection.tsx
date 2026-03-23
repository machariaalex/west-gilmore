"use client";

import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { FiHeart, FiUsers, FiBook } from "react-icons/fi";

export default function CTASection() {
  const cards = [
    {
      icon: FiUsers,
      title: "Join Our Family",
      desc: "Become a member and connect with a loving community of believers.",
      link: "/register",
      label: "Become a Member",
      color: "from-[#1e3a5f] to-[#2d5a9e]",
    },
    {
      icon: FiHeart,
      title: "Support Our Ministry",
      desc: "Your generous giving helps us reach souls and serve the community.",
      link: "/donations",
      label: "Give Today",
      color: "from-[#c9a84c] to-[#e8c97a]",
      dark: true,
    },
    {
      icon: FiBook,
      title: "Study God's Word",
      desc: "Access sermons, Bible studies, and devotional materials anytime.",
      link: "/resources",
      label: "Explore Resources",
      color: "from-[#1e3a5f] to-[#2d5a9e]",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] font-semibold uppercase tracking-wider text-sm mb-3">Get Involved</p>
            <h2 className="text-4xl font-bold text-[#1e3a5f]">Next Steps</h2>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.1}>
              <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 text-center card-hover shadow-lg`}>
                <div className={`w-14 h-14 rounded-full ${card.dark ? "bg-[#1e3a5f]/20" : "bg-white/20"} flex items-center justify-center mx-auto mb-5`}>
                  <card.icon size={24} className={card.dark ? "text-[#1e3a5f]" : "text-white"} />
                </div>
                <h3 className={`font-bold text-xl mb-3 ${card.dark ? "text-[#1e3a5f]" : "text-white"}`}>{card.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${card.dark ? "text-[#1e3a5f]/80" : "text-white/80"}`}>{card.desc}</p>
                <Link
                  href={card.link}
                  className={`inline-block px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                    card.dark
                      ? "bg-[#1e3a5f] text-white hover:bg-[#0f2240]"
                      : "bg-white text-[#1e3a5f] hover:bg-[#c9a84c] hover:text-white"
                  }`}
                >
                  {card.label}
                </Link>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
