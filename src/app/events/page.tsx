"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiList,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";
import { formatDate } from "@/lib/utils";

interface ChurchEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  category: "Worship" | "Study" | "Outreach" | "Youth" | "Social";
  description: string;
  featured?: boolean;
  registrationRequired: boolean;
}

const EVENTS: ChurchEvent[] = [
  {
    id: 1,
    title: "Spring Gospel Meeting",
    date: "2025-04-06",
    time: "7:00 PM",
    endTime: "8:30 PM",
    location: "Main Auditorium",
    category: "Worship",
    description:
      "Join us for four nights of gospel preaching with visiting minister Brother Andrew Collins. Doors open at 6:30 PM.",
    featured: true,
    registrationRequired: false,
  },
  {
    id: 2,
    title: "Youth Retreat — Camp Gilmore",
    date: "2025-04-18",
    time: "8:00 AM",
    endTime: "5:00 PM",
    location: "Camp Gilmore, Lake County",
    category: "Youth",
    description:
      "A full day of Bible study, fellowship, and outdoor activities for teens ages 13–18. Lunch provided.",
    registrationRequired: true,
  },
  {
    id: 3,
    title: "Community Food Pantry",
    date: "2025-04-26",
    time: "9:00 AM",
    endTime: "12:00 PM",
    location: "Fellowship Hall",
    category: "Outreach",
    description:
      "Monthly distribution of non-perishable food items to neighbors in need. Volunteers welcome.",
    registrationRequired: false,
  },
  {
    id: 4,
    title: "Ladies' Bible Class",
    date: "2025-05-03",
    time: "10:00 AM",
    endTime: "11:30 AM",
    location: "Room 102",
    category: "Study",
    description:
      "An in-depth study of the women of the Bible, led by Sister Margaret Thompson. Light refreshments served.",
    registrationRequired: false,
  },
  {
    id: 5,
    title: "Congregation Picnic & Games",
    date: "2025-05-17",
    time: "1:00 PM",
    endTime: "5:00 PM",
    location: "Riverside Park, Pavilion B",
    category: "Social",
    description:
      "Our annual spring picnic! Bring a dish to share, your lawn chairs, and your whole family for an afternoon of fun and fellowship.",
    registrationRequired: true,
  },
];

const CATEGORY_COLORS: Record<ChurchEvent["category"], { bg: string; text: string; border: string }> = {
  Worship: { bg: "#1e3a5f", text: "white", border: "#1e3a5f" },
  Study: { bg: "#2d5a9e", text: "white", border: "#2d5a9e" },
  Outreach: { bg: "#c9a84c", text: "#1a1a2e", border: "#c9a84c" },
  Youth: { bg: "#e8c97a", text: "#1a1a2e", border: "#e8c97a" },
  Social: { bg: "#f0f4f8", text: "#1e3a5f", border: "#cbd5e1" },
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const monthName = new Date(calYear, calMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const getEventsForDay = (day: number) => {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return EVENTS.filter((e) => e.date === dateStr);
  };

  const featured = EVENTS.find((e) => e.featured);
  const regular = EVENTS.filter((e) => !e.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[360px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 50%, #1a2e4a 100%)" }}
        />
        <div className="absolute top-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center px-6 py-16">
          <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-4">
            Join Us
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Events</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Stay connected with what&apos;s happening at West Gilmore St Church of Christ.
          </p>
        </div>
      </section>

      {/* Featured Event Banner */}
      {featured && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal direction="up">
              <div
                className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #e8c97a 100%)",
                }}
              >
                <div className="flex-shrink-0 text-center">
                  <div
                    className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-lg"
                    style={{ background: "#1e3a5f" }}
                  >
                    <span className="text-[#c9a84c] font-bold text-3xl leading-none">
                      {new Date(featured.date + "T00:00:00").getDate()}
                    </span>
                    <span className="text-white text-xs uppercase tracking-wider mt-1">
                      {new Date(featured.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <FiStar className="text-[#1e3a5f]" />
                    <span className="text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider">
                      Featured Event
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-[#1a2e4a] mb-4 leading-relaxed">{featured.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#1a2e4a] justify-center md:justify-start">
                    <span className="flex items-center gap-1 font-medium">
                      <FiClock /> {featured.time} – {featured.endTime}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <FiMapPin /> {featured.location}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <FiCalendar /> {formatDate(featured.date)}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                    Learn More <FiArrowRight />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* View Toggle */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-bold text-[#1e3a5f]">
            {EVENTS.length} Upcoming Events
          </h2>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-200">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "list"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-[#1e3a5f]"
              }`}
              style={view === "list" ? { background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" } : {}}
            >
              <FiList /> List View
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "calendar"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-[#1e3a5f]"
              }`}
              style={view === "calendar" ? { background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" } : {}}
            >
              <FiGrid /> Calendar View
            </button>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          {/* List View */}
          {view === "list" && (
            <div className="space-y-6">
              {regular.map((event, i) => {
                const colors = CATEGORY_COLORS[event.category];
                const dayNum = new Date(event.date + "T00:00:00").getDate();
                const monthStr = new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" });
                return (
                  <SectionReveal key={event.id} direction="up" delay={i * 0.1}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 card-hover overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Date block */}
                        <div
                          className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-6 md:py-0 min-w-[100px]"
                          style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
                        >
                          <span className="text-[#c9a84c] font-bold text-4xl leading-none">{dayNum}</span>
                          <span className="text-white text-sm uppercase tracking-wider mt-1">{monthStr}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{
                                  background: colors.bg,
                                  color: colors.text,
                                  border: `1px solid ${colors.border}`,
                                }}
                              >
                                {event.category}
                              </span>
                              {event.registrationRequired && (
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
                                  Registration Required
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{event.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 leading-relaxed">{event.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <FiClock className="text-[#c9a84c]" />
                                {event.time} – {event.endTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiMapPin className="text-[#c9a84c]" />
                                {event.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            {event.registrationRequired ? (
                              <Link href="/contact" className="btn-gold inline-flex items-center gap-2 text-sm whitespace-nowrap">
                                Register <FiArrowRight />
                              </Link>
                            ) : (
                              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm whitespace-nowrap">
                                Details <FiArrowRight />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          )}

          {/* Calendar View */}
          {view === "calendar" && (
            <SectionReveal direction="fade">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Calendar Header */}
                <div
                  className="flex items-center justify-between px-6 py-5"
                  style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
                >
                  <button
                    onClick={() => {
                      if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
                      else setCalMonth((m) => m - 1);
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Previous month"
                  >
                    <FiChevronLeft />
                  </button>
                  <h3 className="text-white font-bold text-xl">{monthName}</h3>
                  <button
                    onClick={() => {
                      if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
                      else setCalMonth((m) => m + 1);
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Next month"
                  >
                    <FiChevronRight />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {DAYS_OF_WEEK.map((d) => (
                    <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase py-3">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for first day */}
                  {Array.from({ length: firstDay }, (_, i) => (
                    <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-gray-50 bg-gray-50/50" />
                  ))}

                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const isToday =
                      day === today.getDate() &&
                      calMonth === today.getMonth() &&
                      calYear === today.getFullYear();
                    return (
                      <div
                        key={day}
                        className={`min-h-[80px] p-2 border-b border-r border-gray-100 ${isToday ? "bg-blue-50" : "hover:bg-gray-50"} transition-colors`}
                      >
                        <span
                          className={`text-sm font-semibold inline-flex items-center justify-center w-7 h-7 rounded-full mb-1 ${
                            isToday ? "text-white" : "text-gray-700"
                          }`}
                          style={isToday ? { background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" } : {}}
                        >
                          {day}
                        </span>
                        <div className="space-y-1">
                          {dayEvents.map((ev) => {
                            const col = CATEGORY_COLORS[ev.category];
                            return (
                              <div
                                key={ev.id}
                                className="text-xs px-1.5 py-0.5 rounded font-medium truncate cursor-pointer"
                                style={{ background: col.bg, color: col.text }}
                                title={ev.title}
                              >
                                {ev.title}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="p-4 border-t border-gray-100 flex flex-wrap gap-3">
                  {(Object.keys(CATEGORY_COLORS) as ChurchEvent["category"][]).map((cat) => {
                    const col = CATEGORY_COLORS[cat];
                    return (
                      <span key={cat} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className="w-3 h-3 rounded-sm" style={{ background: col.bg }} />
                        {cat}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>
    </div>
  );
}
