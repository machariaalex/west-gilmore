"use client";

import Link from "next/link";
import { FiCalendar, FiMapPin, FiArrowRight, FiClock } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";
import { formatDate } from "@/lib/utils";

const DEMO_EVENTS = [
  {
    _id: "1",
    title: "Sunday Morning Worship",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Main Sanctuary",
    category: "Worship",
    time: "10:30 AM",
  },
  {
    _id: "2",
    title: "Youth Bible Study",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Fellowship Hall",
    category: "Youth",
    time: "6:00 PM",
  },
  {
    _id: "3",
    title: "Community Outreach Day",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: "City Park",
    category: "Community",
    time: "9:00 AM",
  },
];

const categoryColors: Record<string, string> = {
  Worship: "bg-blue-100 text-blue-800",
  Youth: "bg-purple-100 text-purple-800",
  Community: "bg-green-100 text-green-800",
  Education: "bg-yellow-100 text-yellow-800",
  Special: "bg-red-100 text-red-800",
  General: "bg-gray-100 text-gray-800",
};

export default function UpcomingEvents() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <p className="text-[#c9a84c] font-semibold uppercase tracking-wider text-sm mb-2">What&apos;s Coming Up</p>
              <h2 className="text-4xl font-bold text-[#1e3a5f]">Upcoming Events</h2>
            </div>
            <Link href="/events" className="btn-primary flex items-center gap-2 text-sm">
              View All Events <FiArrowRight />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {DEMO_EVENTS.map((event, i) => (
            <SectionReveal key={event._id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all card-hover">
                <div className="p-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[event.category] || categoryColors.General}`}>
                    {event.category}
                  </span>
                  <h3 className="font-bold text-[#1e3a5f] text-lg mt-3 mb-4">{event.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FiCalendar className="text-[#c9a84c]" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FiClock className="text-[#c9a84c]" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FiMapPin className="text-[#c9a84c]" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <Link href={`/events`} className="text-[#1e3a5f] font-medium text-sm hover:text-[#c9a84c] transition-colors flex items-center gap-1">
                    Learn More <FiArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
