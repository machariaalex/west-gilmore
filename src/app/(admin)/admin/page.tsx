"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiUsers, FiVideo, FiCalendar, FiImage, FiMessageSquare,
  FiTrendingUp, FiCheckSquare, FiFileText, FiSettings, FiArrowRight,
} from "react-icons/fi";

const STATS = [
  { label: "Members", value: "124", change: "+8 this month", icon: FiUsers, color: "from-blue-500 to-blue-700" },
  { label: "Sermons", value: "48", change: "+2 this month", icon: FiVideo, color: "from-purple-500 to-purple-700" },
  { label: "Events", value: "6", change: "3 upcoming", icon: FiCalendar, color: "from-amber-500 to-amber-700" },
  { label: "Prayer Requests", value: "31", change: "5 unanswered", icon: FiMessageSquare, color: "from-rose-500 to-rose-700" },
];

const MODULES = [
  { label: "Manage Sermons", href: "/admin/sermons", icon: FiVideo, desc: "Add, edit, delete sermon recordings" },
  { label: "Manage Events", href: "/admin/events", icon: FiCalendar, desc: "Create and update church events" },
  { label: "Gallery", href: "/admin/gallery", icon: FiImage, desc: "Upload and organize photos" },
  { label: "Members", href: "/admin/users", icon: FiUsers, desc: "View and manage church members" },
  { label: "Prayer Requests", href: "/admin/prayer", icon: FiMessageSquare, desc: "Review and respond to prayers" },
  { label: "Attendance Reports", href: "/admin/attendance", icon: FiCheckSquare, desc: "View attendance analytics" },
  { label: "News & Bulletins", href: "/admin/news", icon: FiFileText, desc: "Post announcements for members" },
  { label: "Resources", href: "/admin/resources", icon: FiFileText, desc: "Upload Bible studies & PDFs" },
  { label: "Site Settings", href: "/admin/settings", icon: FiSettings, desc: "Configure site and preferences" },
];

const RECENT_ACTIVITY = [
  { text: "New member registered: Sarah Thompson", time: "2 hours ago", type: "member" },
  { text: "Sermon uploaded: 'Faith Over Fear'", time: "Yesterday", type: "sermon" },
  { text: "Event created: Youth Game Night", time: "2 days ago", type: "event" },
  { text: "Prayer answered: Healing for Michael", time: "3 days ago", type: "prayer" },
  { text: "New gallery photos added (12)", time: "4 days ago", type: "gallery" },
];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "admin") { router.push("/login"); return null; }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f]">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {session.user?.name?.split(" ")[0]}.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-500">
            <FiTrendingUp className="text-[#c9a84c]" />
            <span>Live dashboard</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${s.color} opacity-10 rounded-bl-full`} />
              <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center mb-3 shadow`}>
                <s.icon className="text-white" size={18} />
              </div>
              <p className="text-3xl font-extrabold text-[#1e3a5f]">{s.value}</p>
              <p className="text-gray-500 text-sm font-medium mt-0.5">{s.label}</p>
              <p className="text-xs text-[#c9a84c] mt-1">{s.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Modules */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-[#1e3a5f] text-lg mb-4">Manage</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {MODULES.map((mod, i) => (
                <motion.div key={mod.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <Link href={mod.href}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#c9a84c]/30 transition-all group">
                    <div className="w-10 h-10 bg-[#1e3a5f]/8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1e3a5f] transition-colors">
                      <mod.icon size={18} className="text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{mod.label}</p>
                      <p className="text-gray-400 text-xs truncate">{mod.desc}</p>
                    </div>
                    <FiArrowRight size={14} className="text-gray-300 group-hover:text-[#c9a84c] transition-colors flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="font-bold text-[#1e3a5f] text-lg mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {RECENT_ACTIVITY.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#c9a84c] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick attendance chart placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-4">
              <p className="font-semibold text-gray-700 mb-3 text-sm">Attendance — Last 4 Sundays</p>
              <div className="flex items-end gap-2 h-20">
                {[72, 88, 65, 94].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="w-full bg-linear-to-t from-[#1e3a5f] to-[#2d5a9e] rounded-t-lg origin-bottom"
                      style={{ height: `${v}%` }}
                    />
                    <span className="text-[10px] text-gray-400">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Mar 2","Mar 9","Mar 16","Mar 23"].map(d => (
                  <span key={d} className="text-[9px] text-gray-400">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
