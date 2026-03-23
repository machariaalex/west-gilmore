"use client";

import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { FiArrowRight } from "react-icons/fi";

export default function AboutPreview() {
  const values = [
    { icon: "✝️", title: "Truth", desc: "We are anchored in God's Word and committed to sound biblical teaching." },
    { icon: "❤️", title: "Love", desc: "We love God and each other, welcoming all with grace and compassion." },
    { icon: "🙏", title: "Worship", desc: "We gather to honor and glorify God in spirit and in truth." },
    { icon: "🌍", title: "Community", desc: "We serve and support each other and our neighbors beyond our walls." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionReveal>
              <p className="text-[#c9a84c] font-semibold uppercase tracking-wider text-sm mb-3">Who We Are</p>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">A Community Built on Faith</h2>
              <div className="gold-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                West Gilmore St Church of Christ is a loving family of believers committed to following the New Testament pattern for Christian living and worship. We believe every soul matters to God, and we are dedicated to helping people know, love, and serve Jesus Christ.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you&apos;re searching for answers, returning to faith, or looking for a church home, you are welcome here. Come as you are — Christ meets us where we are.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us <FiArrowRight />
              </Link>
            </SectionReveal>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1} direction="up">
                <div className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#c9a84c]/30 transition-all card-hover">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-bold text-[#1e3a5f] mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
