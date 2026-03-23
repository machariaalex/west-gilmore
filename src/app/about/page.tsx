import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiBook, FiHeart, FiUsers, FiStar, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the history, mission, vision, and leadership of West Gilmore St Church of Christ.",
};

const leaders = [
  {
    name: "Elder James Thompson",
    role: "Senior Minister",
    bio: "Elder Thompson has shepherded our congregation for over 25 years, leading with wisdom and grace rooted in Scripture.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    scripture: "2 Timothy 4:2",
  },
  {
    name: "Minister David Okafor",
    role: "Associate Minister",
    bio: "Minister Okafor oversees youth outreach and community programs, bringing energy and compassion to every ministry.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    scripture: "Mark 10:45",
  },
  {
    name: "Deacon Samuel Reed",
    role: "Worship & Music Leader",
    bio: "Deacon Reed leads our congregation in spirit-filled worship each Sunday, drawing hearts closer to God through music.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    scripture: "Psalm 150:6",
  },
];

const beliefs = [
  {
    icon: FiBook,
    title: "The Bible is Our Only Standard",
    description:
      "We believe the Bible is the inspired, infallible Word of God and the sole authority for faith and practice (2 Timothy 3:16–17).",
  },
  {
    icon: FiHeart,
    title: "Salvation Through Christ Alone",
    description:
      "Salvation is found only in Jesus Christ through faith, repentance, confession, and baptism (Acts 2:38).",
  },
  {
    icon: FiUsers,
    title: "The Church Belongs to Christ",
    description:
      "We strive to be the New Testament church — wearing no name but Christ's and following no creed but His Word.",
  },
  {
    icon: FiStar,
    title: "Weekly Lord's Supper",
    description:
      "We observe the Lord's Supper every first day of the week in remembrance of Christ's sacrifice (Acts 20:7).",
  },
  {
    icon: FiCheckCircle,
    title: "A Cappella Worship",
    description:
      "Our worship includes singing without instrumental accompaniment, following the New Testament pattern (Ephesians 5:19).",
  },
  {
    icon: FiBook,
    title: "Unity of All Believers",
    description:
      "We pray and work toward the unity of all Christians on the basis of Scripture alone (John 17:20–21).",
  },
];

const milestones = [
  { year: "1952", event: "Church founded by 12 faithful families on West Gilmore Street" },
  { year: "1964", event: "First permanent building constructed; congregation grows to 80 members" },
  { year: "1978", event: "Youth ministry launched; summer Bible camp begins" },
  { year: "1991", event: "Expansion of sanctuary to accommodate 300 worshippers" },
  { year: "2005", event: "Community outreach center opened; food pantry and counseling services" },
  { year: "2015", event: "Online worship and sermon archive launched" },
  { year: "2023", event: "Celebrating 70+ years of faithful service to God and community" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 50%, #1a2e4a 100%)",
          }}
        />
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />

        <div className="relative z-10 text-center px-6 py-20">
          <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-4">
            West Gilmore St Church of Christ
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Us</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Over seven decades of pointing souls to Christ through truth, love, and faithful service.
          </p>
        </div>
      </section>

      {/* Church History */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal direction="up">
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-3">
                Our Story
              </p>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">A Legacy of Faith</h2>
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                What began as a small gathering of twelve faithful families in 1952 has grown into a
                vibrant congregation deeply rooted in Scripture and committed to serving our community.
              </p>
            </div>
          </SectionReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <SectionReveal direction="left">
              <div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  The West Gilmore St Church of Christ was established in the spring of 1952 by a
                  small group of believers who desired to worship God according to the New Testament
                  pattern. Meeting initially in a modest home on West Gilmore Street, those founding
                  members set the tone for everything that would follow: a deep reverence for
                  Scripture, genuine love for one another, and an unwavering desire to share the
                  gospel with their neighbors.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Through the decades, our congregation has weathered trials and celebrated
                  triumphs together. We have mourned with those who mourn and rejoiced with those
                  who rejoice. We have baptized hundreds into Christ, married young couples,
                  buried beloved saints, and welcomed generation after generation of new families
                  into our fellowship.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, our congregation continues to grow in faith and in numbers. We remain
                  committed to the ancient paths — worshipping as the early church worshipped,
                  loving as Christ commanded us to love, and serving as He came to serve.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal direction="right">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">Our Journey Through the Years</h3>
                {milestones.map((milestone, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start p-4 rounded-xl card-hover"
                    style={{ background: i % 2 === 0 ? "#f8fafc" : "white", border: "1px solid #e2e8f0" }}
                  >
                    <div
                      className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
                    >
                      {milestone.year}
                    </div>
                    <p className="text-gray-700 leading-snug pt-1">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #e8edf5 100%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal direction="up">
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-3">
                Our Purpose
              </p>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Mission &amp; Vision</h2>
              <div className="gold-divider mx-auto" />
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionReveal direction="left" delay={0.1}>
              <div
                className="p-10 rounded-2xl h-full card-hover"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 100%)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(201,168,76,0.2)", border: "2px solid #c9a84c" }}
                >
                  <FiHeart className="text-[#c9a84c] text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Our Mission</h3>
                <div className="gold-divider mb-6" />
                <p className="text-blue-100 leading-relaxed text-lg mb-6">
                  To proclaim the gospel of Jesus Christ in its fullness, to make disciples of all
                  people, to equip the saints for works of service, and to demonstrate the love of
                  God through compassionate ministry to our community and beyond.
                </p>
                <blockquote className="border-l-4 border-[#c9a84c] pl-4 italic text-blue-200 text-sm">
                  &quot;Go therefore and make disciples of all nations&quot; — Matthew 28:19
                </blockquote>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={0.2}>
              <div
                className="p-10 rounded-2xl h-full card-hover"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #e8c97a 100%)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(30,58,95,0.15)", border: "2px solid #1e3a5f" }}
                >
                  <FiStar className="text-[#1e3a5f] text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Our Vision</h3>
                <div className="mb-6" style={{ width: 60, height: 3, background: "#1e3a5f", borderRadius: 2 }} />
                <p className="text-[#1a2e4a] leading-relaxed text-lg mb-6">
                  To be a beacon of light in our city — a congregation where every person encounters
                  the living God, grows in Christlikeness, finds belonging in community, and is sent
                  out as an ambassador of the Kingdom to their families, workplaces, and neighborhoods.
                </p>
                <blockquote
                  className="border-l-4 pl-4 italic text-[#3a2e1a] text-sm"
                  style={{ borderColor: "#1e3a5f" }}
                >
                  &quot;Let your light shine before others&quot; — Matthew 5:16
                </blockquote>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Leadership Profiles */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal direction="up">
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-3">
                Our Shepherds
              </p>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Meet Our Leadership</h2>
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our leadership team is committed to serving the congregation with humility,
                integrity, and a passion for God&apos;s Word.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <SectionReveal key={i} direction="up" delay={i * 0.15}>
                <div
                  className="rounded-2xl overflow-hidden card-hover border border-gray-100 shadow-sm"
                  style={{ background: "white" }}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(30,58,95,0.8) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ background: "rgba(201,168,76,0.9)" }}
                      >
                        {leader.scripture}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">{leader.name}</h3>
                    <p className="text-[#c9a84c] font-semibold text-sm mb-3">{leader.role}</p>
                    <div className="gold-divider mb-4" />
                    <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 100%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal direction="up">
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-3">
                What We Believe
              </p>
              <h2 className="text-4xl font-bold text-white mb-4">Our Core Beliefs</h2>
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-blue-200 max-w-2xl mx-auto">
                We strive to speak where the Bible speaks and be silent where the Bible is silent,
                calling Bible things by Bible names.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, i) => {
              const Icon = belief.icon;
              return (
                <SectionReveal key={i} direction="up" delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 h-full card-hover">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(201,168,76,0.2)" }}
                    >
                      <Icon className="text-[#c9a84c] text-xl" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">{belief.title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{belief.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal direction="up" delay={0.3}>
            <div className="text-center mt-14">
              <Link href="/contact" className="btn-gold inline-flex items-center gap-2">
                Get In Touch <FiArrowRight />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
