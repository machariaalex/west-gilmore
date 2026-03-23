"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiPlus, FiLock, FiGlobe, FiX, FiCheck } from "react-icons/fi";
import { formatDate } from "@/lib/utils";

const CATEGORIES = ["All", "Healing", "Family", "Guidance", "Thanksgiving", "General", "Financial", "Relationships"];

const DEMO_PRAYERS = [
  { _id: "1", title: "Healing for my mother", content: "Please pray for my mother who is undergoing surgery next week. Trusting God for complete healing.", author: "Mary J.", category: "Healing", isPublic: true, prayerCount: 14, answered: false, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { _id: "2", title: "Guidance in career change", content: "Seeking God's direction as I consider a major career transition. Need wisdom and clarity.", author: "David M.", category: "Guidance", isPublic: true, prayerCount: 8, answered: false, createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
  { _id: "3", title: "Thanksgiving for new baby", content: "Praising God for blessing our family with a healthy baby girl! God is so good.", author: "The Andersons", category: "Thanksgiving", isPublic: true, prayerCount: 22, answered: true, createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
  { _id: "4", title: "Marriage restoration", content: "Praying for God to restore and strengthen our marriage. Believing in His redemptive power.", author: "Anonymous", category: "Relationships", isPublic: true, prayerCount: 18, answered: false, createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
];

export default function PrayerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"community" | "mine">("community");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [prayedFor, setPrayedFor] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ title: "", content: "", category: "General", isPublic: true });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>;
  if (!session) { router.push("/login"); return null; }

  const filtered = DEMO_PRAYERS.filter(p => category === "All" || p.category === category);

  const handlePray = (id: string) => {
    setPrayedFor(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ title: "", content: "", category: "General", isPublic: true }); }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f]">Prayer Wall</h1>
            <p className="text-gray-500 mt-1">Bear one another&apos;s burdens — Galatians 6:2</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
            <FiPlus /> New Request
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-200 p-1 rounded-xl w-fit mb-6">
          {(["community", "mine"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === t ? "bg-white text-[#1e3a5f] shadow" : "text-gray-500 hover:text-gray-700"}`}>
              {t === "community" ? "Community" : "My Requests"}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${category === c ? "bg-[#1e3a5f] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Prayer cards */}
        <div className="space-y-4">
          {filtered.map((prayer, i) => (
            <motion.div key={prayer._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-sm">
                    {prayer.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{prayer.author}</p>
                    <p className="text-gray-400 text-xs">{formatDate(prayer.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {prayer.answered && (
                    <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                      <FiCheck size={10} /> Answered
                    </span>
                  )}
                  <span className="bg-[#1e3a5f]/8 text-[#1e3a5f] text-xs px-2.5 py-1 rounded-full font-medium">{prayer.category}</span>
                  {prayer.isPublic ? <FiGlobe size={14} className="text-gray-400" /> : <FiLock size={14} className="text-gray-400" />}
                </div>
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">{prayer.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{prayer.content}</p>
              <button onClick={() => handlePray(prayer._id)}
                className={`flex items-center gap-2 text-sm font-medium transition-all px-4 py-2 rounded-full ${prayedFor.has(prayer._id) ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"}`}>
                <FiHeart className={prayedFor.has(prayer._id) ? "fill-red-500" : ""} />
                {prayer.prayerCount + (prayedFor.has(prayer._id) ? 1 : 0)} Praying
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1e3a5f]">Submit Prayer Request</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-1"><FiX size={20} /></button>
              </div>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheck size={28} className="text-green-600" />
                  </div>
                  <p className="font-bold text-gray-800 text-lg">Prayer submitted!</p>
                  <p className="text-gray-500 text-sm mt-1">We are standing with you in prayer.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                      className="input-field" placeholder="Brief title for your request" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                      {["Healing","Family","Guidance","Thanksgiving","General","Financial","Relationships"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Request</label>
                    <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required rows={4}
                      className="input-field resize-none" placeholder="Share your prayer request..." />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => setForm(f => ({ ...f, isPublic: !f.isPublic }))}
                      className={`w-11 h-6 rounded-full relative transition-colors ${form.isPublic ? "bg-[#1e3a5f]" : "bg-gray-300"}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isPublic ? "left-6" : "left-1"}`} />
                    </div>
                    <span className="text-sm text-gray-700">Share publicly with congregation</span>
                  </label>
                  <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
                    {submitting ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiHeart /> Submit Request</>}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
