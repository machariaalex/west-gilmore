"use client";

import { useState } from "react";
import Image from "next/image";
import { FiSearch, FiPlay, FiX, FiChevronLeft, FiChevronRight, FiBookOpen, FiUser, FiCalendar, FiTag } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";
import { formatDate } from "@/lib/utils";

const YT_ID = "dQw4w9WgXcQ";

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  topic: string;
  scripture: string;
  description: string;
  ytId: string;
}

const ALL_SERMONS: Sermon[] = [
  {
    id: 1,
    title: "Walking in the Light",
    speaker: "Elder James Thompson",
    date: "2025-03-16",
    topic: "Christian Living",
    scripture: "1 John 1:5–7",
    description: "Exploring what it means to walk daily in the light of Christ's truth.",
    ytId: YT_ID,
  },
  {
    id: 2,
    title: "The Power of the Resurrection",
    speaker: "Minister David Okafor",
    date: "2025-03-09",
    topic: "Salvation",
    scripture: "Romans 6:1–11",
    description: "Why the resurrection of Christ is the cornerstone of our faith.",
    ytId: YT_ID,
  },
  {
    id: 3,
    title: "Faith That Moves Mountains",
    speaker: "Elder James Thompson",
    date: "2025-03-02",
    topic: "Faith",
    scripture: "Matthew 17:20",
    description: "Understanding the nature and power of genuine, active faith.",
    ytId: YT_ID,
  },
  {
    id: 4,
    title: "Love One Another",
    speaker: "Deacon Samuel Reed",
    date: "2025-02-23",
    topic: "Love & Community",
    scripture: "John 13:34–35",
    description: "Christ's new commandment and what it demands of us as a congregation.",
    ytId: YT_ID,
  },
  {
    id: 5,
    title: "The Good Shepherd",
    speaker: "Minister David Okafor",
    date: "2025-02-16",
    topic: "Identity of Christ",
    scripture: "John 10:11–18",
    description: "A meditation on Christ as the shepherd who lays down His life.",
    ytId: YT_ID,
  },
  {
    id: 6,
    title: "Bearing Fruit in Season",
    speaker: "Elder James Thompson",
    date: "2025-02-09",
    topic: "Spiritual Growth",
    scripture: "Psalm 1:1–3",
    description: "How rooting ourselves in God's Word produces lasting spiritual fruit.",
    ytId: YT_ID,
  },
];

const SPEAKERS = ["All Speakers", "Elder James Thompson", "Minister David Okafor", "Deacon Samuel Reed"];
const TOPICS = ["All Topics", "Christian Living", "Salvation", "Faith", "Love & Community", "Identity of Christ", "Spiritual Growth"];
const SERMONS_PER_PAGE = 6;

export default function SermonsPage() {
  const [speaker, setSpeaker] = useState("All Speakers");
  const [topic, setTopic] = useState("All Topics");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  const filtered = ALL_SERMONS.filter((s) => {
    const matchSpeaker = speaker === "All Speakers" || s.speaker === speaker;
    const matchTopic = topic === "All Topics" || s.topic === topic;
    const matchSearch =
      search === "" ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.scripture.toLowerCase().includes(search.toLowerCase());
    return matchSpeaker && matchTopic && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / SERMONS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * SERMONS_PER_PAGE, page * SERMONS_PER_PAGE);

  function handleFilter(type: "speaker" | "topic", value: string) {
    setPage(1);
    if (type === "speaker") setSpeaker(value);
    else setTopic(value);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[360px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 50%, #1a2e4a 100%)" }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center px-6 py-16">
          <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-4">
            West Gilmore St Church of Christ
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Sermons</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Dive into the Word of God through our library of sermons, teachings, and devotionals.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sermons..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="input-field pl-9 text-sm"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>

            {/* Speaker dropdown */}
            <div className="relative">
              <select
                value={speaker}
                onChange={(e) => handleFilter("speaker", e.target.value)}
                className="input-field pr-8 text-sm cursor-pointer appearance-none min-w-[180px]"
                aria-label="Filter by speaker"
              >
                {SPEAKERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Topic dropdown */}
            <div className="relative">
              <select
                value={topic}
                onChange={(e) => handleFilter("topic", e.target.value)}
                className="input-field pr-8 text-sm cursor-pointer appearance-none min-w-[160px]"
                aria-label="Filter by topic"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <span className="text-sm text-gray-500 ml-auto whitespace-nowrap">
              {filtered.length} sermon{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>
      </section>

      {/* Sermon Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <FiBookOpen className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No sermons found matching your filters.</p>
              <button
                className="btn-primary mt-6 inline-block"
                onClick={() => { setSpeaker("All Speakers"); setTopic("All Topics"); setSearch(""); setPage(1); }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((sermon, i) => (
                <SectionReveal key={sermon.id} direction="up" delay={i * 0.08}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover flex flex-col h-full">
                    {/* Thumbnail */}
                    <div
                      className="relative h-44 cursor-pointer group"
                      onClick={() => setActiveSermon(sermon)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setActiveSermon(sermon)}
                      aria-label={`Play ${sermon.title}`}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${sermon.ytId}/hqdefault.jpg`}
                        alt={sermon.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                          style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)" }}
                        >
                          <FiPlay className="text-white text-xl ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                          style={{ background: "rgba(30,58,95,0.85)" }}
                        >
                          {sermon.topic}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="text-[#1e3a5f] font-bold text-lg mb-3 cursor-pointer hover:text-[#c9a84c] transition-colors line-clamp-2"
                        onClick={() => setActiveSermon(sermon)}
                      >
                        {sermon.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                        {sermon.description}
                      </p>

                      <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiUser className="text-[#c9a84c] flex-shrink-0" />
                          <span>{sermon.speaker}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiCalendar className="text-[#c9a84c] flex-shrink-0" />
                          <span>{formatDate(sermon.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiBookOpen className="text-[#c9a84c] flex-shrink-0" />
                          <span className="font-medium">{sermon.scripture}</span>
                        </div>
                      </div>

                      <button
                        className="btn-primary mt-4 flex items-center justify-center gap-2 w-full text-sm"
                        onClick={() => setActiveSermon(sermon)}
                      >
                        <FiPlay className="text-sm" /> Watch Sermon
                      </button>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                className="w-10 h-10 rounded-full border-2 border-[#1e3a5f] flex items-center justify-center text-[#1e3a5f] disabled:opacity-30 hover:bg-[#1e3a5f] hover:text-white transition-colors"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <FiChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
                    p === page
                      ? "text-white"
                      : "border-2 border-gray-200 text-gray-600 hover:border-[#1e3a5f] hover:text-[#1e3a5f]"
                  }`}
                  style={p === page ? { background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" } : {}}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                className="w-10 h-10 rounded-full border-2 border-[#1e3a5f] flex items-center justify-center text-[#1e3a5f] disabled:opacity-30 hover:bg-[#1e3a5f] hover:text-white transition-colors"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* YouTube Modal */}
      {activeSermon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setActiveSermon(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="flex items-start justify-between p-5"
              style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
            >
              <div className="flex-1 pr-4">
                <h2 className="text-white font-bold text-xl leading-tight">{activeSermon.title}</h2>
                <div className="flex items-center gap-3 mt-2 text-sm text-blue-200 flex-wrap">
                  <span className="flex items-center gap-1"><FiUser size={12} /> {activeSermon.speaker}</span>
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> {formatDate(activeSermon.date)}</span>
                  <span className="flex items-center gap-1"><FiTag size={12} /> {activeSermon.topic}</span>
                  <span className="flex items-center gap-1"><FiBookOpen size={12} /> {activeSermon.scripture}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSermon(null)}
                className="text-white hover:text-[#c9a84c] transition-colors flex-shrink-0 mt-1"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* YouTube Embed */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeSermon.ytId}?autoplay=1&rel=0`}
                title={activeSermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
