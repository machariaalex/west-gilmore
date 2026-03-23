"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiHeadphones,
  FiCalendar,
  FiDownload,
  FiBell,
  FiUser,
  FiChevronRight,
  FiMessageSquare,
} from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

const QUICK_ACTIONS = [
  {
    href: "/portal/prayer",
    icon: <FiHeart className="w-6 h-6" />,
    label: "Submit Prayer Request",
    description: "Share a prayer need with the community",
    color: "bg-rose-50 text-rose-600",
    border: "border-rose-100",
  },
  {
    href: "/portal/news",
    icon: <FiBell className="w-6 h-6" />,
    label: "View Announcements",
    description: "Stay up to date with church news",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    href: "/portal/attendance",
    icon: <FiCalendar className="w-6 h-6" />,
    label: "My Attendance",
    description: "Track your service attendance",
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
  {
    href: "/resources",
    icon: <FiDownload className="w-6 h-6" />,
    label: "Download Resources",
    description: "Access Bible studies and guides",
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
];

const DEMO_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Sunday Service Time Change",
    body: "Starting this Sunday, our morning worship service will begin at 10:00 AM. Please update your schedules accordingly.",
    date: "March 20, 2026",
    category: "Worship",
  },
  {
    id: 2,
    title: "Youth Camp Registration Open",
    body: "Registration for the annual youth summer camp is now open. Spots are limited — sign up by April 15th to secure your place.",
    date: "March 18, 2026",
    category: "Youth",
  },
];

export default function PortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-[#1e3a5f]/20 border-t-[#1e3a5f] rounded-full"
        />
      </div>
    );
  }

  if (!session) return null;

  const userName = session.user?.name?.split(" ")[0] ?? "Member";

  const STATS = [
    { icon: <FiHeart className="w-5 h-5" />, label: "Prayer Requests", value: "4", color: "text-rose-500" },
    { icon: <FiHeadphones className="w-5 h-5" />, label: "Sermons Watched", value: "12", color: "text-blue-500" },
    { icon: <FiCalendar className="w-5 h-5" />, label: "Attendance Streak", value: "5 wks", color: "text-green-500" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a9e] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-[#c9a84c] text-sm font-medium mb-1">Member Portal</p>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-white/60 mt-2 text-sm">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <Link
              href="/portal/profile"
              className="flex items-center gap-3 glass rounded-2xl px-4 py-3 hover:bg-white/20 transition-colors"
            >
              <div className="w-10 h-10 bg-[#c9a84c] rounded-full flex items-center justify-center font-bold text-white">
                {(session.user?.name?.[0] ?? "M").toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{session.user?.name}</p>
                <p className="text-white/50 text-xs">{session.user?.email}</p>
              </div>
              <FiChevronRight className="text-white/40 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Stats Cards */}
        <SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-hover bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Quick Actions */}
        <SectionReveal delay={0.1}>
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action, i) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                <Link
                  href={action.href}
                  className={`card-hover flex items-center gap-4 bg-white rounded-2xl shadow-sm border ${action.border} p-5 group`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color}`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1e3a5f] group-hover:text-[#c9a84c] transition-colors">
                      {action.label}
                    </p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                  <FiChevronRight className="text-gray-300 group-hover:text-[#c9a84c] transition-colors flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Recent Announcements */}
        <SectionReveal delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1e3a5f]">Recent Announcements</h2>
            <Link
              href="/portal/news"
              className="text-sm text-[#1e3a5f] hover:text-[#c9a84c] font-medium transition-colors flex items-center gap-1"
            >
              View all <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {DEMO_ANNOUNCEMENTS.map((ann, i) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiMessageSquare className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-bold text-[#1e3a5f]">{ann.title}</h3>
                      <span className="text-xs bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-0.5 rounded-full font-medium">
                        {ann.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{ann.body}</p>
                    <p className="text-gray-400 text-xs">{ann.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Portal Links */}
        <SectionReveal delay={0.3}>
          <div className="bg-[#1e3a5f] rounded-2xl p-6 grid sm:grid-cols-2 gap-3">
            <p className="sm:col-span-2 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-2">Portal Sections</p>
            {[
              { href: "/portal/prayer", label: "Prayer Requests" },
              { href: "/portal/news", label: "News & Announcements" },
              { href: "/portal/attendance", label: "My Attendance" },
              { href: "/portal/profile", label: "My Profile" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors group"
              >
                <FiChevronRight className="w-4 h-4 text-[#c9a84c] group-hover:translate-x-0.5 transition-transform" />
                {link.label}
              </Link>
            ))}
          </div>
        </SectionReveal>
      </div>
    </main>
  );
}
