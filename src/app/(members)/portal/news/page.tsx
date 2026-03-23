"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiBookmark, FiTag, FiCalendar } from "react-icons/fi";
import { formatDate } from "@/lib/utils";

const CATEGORIES = ["All", "Announcement", "Newsletter", "Bulletin", "Leadership Message"];

const DEMO_NEWS = [
  {
    _id: "1", title: "Annual Church Family Retreat — Registration Open",
    content: "We are excited to announce that registration is now open for our Annual Church Family Retreat happening next month. This year's theme is 'Renewing Our Minds' based on Romans 12:2. Cost is $75/adult, $35/child. Register at the welcome desk.",
    category: "Announcement", author: "Elder James Wilson", pinned: true,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    _id: "2", title: "March Church Bulletin",
    content: "This week's bulletin includes service order, memory verse (Psalm 119:105), upcoming events, prayer list, and announcements. Printed copies are available at the entrance.",
    category: "Bulletin", author: "Church Office", pinned: false,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    _id: "3", title: "A Word from Our Pastor",
    content: "Dear beloved congregation, as we enter this new season together, I want to encourage each one of you to deepen your commitment to daily Bible reading and prayer. The strength of our church is built on the strength of each member's personal walk with God.",
    category: "Leadership Message", author: "Pastor John Andrews", pinned: false,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    _id: "4", title: "New Members Class Starting April",
    content: "Are you new to West Gilmore St Church of Christ? Our New Members Orientation class begins April 6th at 2 PM in Room 104. The 4-week class covers our history, beliefs, ministries, and how to get connected. RSVP to the church office.",
    category: "Announcement", author: "Church Office", pinned: false,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
];

const categoryColors: Record<string, string> = {
  "Announcement": "bg-blue-100 text-blue-700",
  "Newsletter": "bg-teal-100 text-teal-700",
  "Bulletin": "bg-purple-100 text-purple-700",
  "Leadership Message": "bg-amber-100 text-amber-700",
};

export default function NewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>;
  if (!session) { router.push("/login"); return null; }

  const filtered = DEMO_NEWS.filter(n => category === "All" || n.category === category);
  const pinned = filtered.filter(n => n.pinned);
  const regular = filtered.filter(n => !n.pinned);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a5f]">News & Announcements</h1>
          <p className="text-gray-500 mt-1">Stay up to date with your church family.</p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${category === c ? "bg-[#1e3a5f] text-white shadow" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Pinned */}
        {pinned.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <FiBookmark /> Pinned
            </p>
            {pinned.map(n => <NewsCard key={n._id} news={n} expanded={expanded} setExpanded={setExpanded} />)}
          </div>
        )}

        {/* Regular */}
        <div className="space-y-4">
          {regular.map((n, i) => (
            <motion.div key={n._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <NewsCard news={n} expanded={expanded} setExpanded={setExpanded} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsCard({ news, expanded, setExpanded }: {
  news: typeof DEMO_NEWS[0];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  const isOpen = expanded === news._id;
  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${news.pinned ? "border-[#c9a84c]/40 ring-1 ring-[#c9a84c]/20" : "border-gray-100"}`}>
      <button onClick={() => setExpanded(isOpen ? null : news._id)} className="w-full text-left p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {news.pinned && <span className="bg-[#c9a84c]/15 text-[#8a6a20] text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><FiBookmark size={10} /> Pinned</span>}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 ${categoryColors[news.category]}`}>
                <FiTag size={9} /> {news.category}
              </span>
            </div>
            <h3 className="font-bold text-[#1e3a5f] leading-snug">{news.title}</h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
              <span className="flex items-center gap-1"><FiCalendar size={10} /> {formatDate(news.createdAt, { month: "short", day: "numeric" })}</span>
              <span>By {news.author}</span>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 mt-1 ${isOpen ? "rotate-180" : ""}`}>▾</span>
        </div>
        {!isOpen && <p className="text-gray-500 text-sm mt-2 line-clamp-2">{news.content}</p>}
      </button>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 border-t border-gray-50 pt-4">
          <p className="text-gray-700 text-sm leading-relaxed">{news.content}</p>
        </motion.div>
      )}
    </div>
  );
}
