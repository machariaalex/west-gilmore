"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCheck, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { formatDate } from "@/lib/utils";

const SERVICES = ["Sunday Morning", "Sunday Evening", "Wednesday Bible Study", "Special Service", "Youth Service"];

const DEMO_HISTORY = [
  { _id: "1", date: new Date(Date.now() - 3 * 86400000).toISOString(), service: "Sunday Morning", notes: "Great sermon on faith" },
  { _id: "2", date: new Date(Date.now() - 10 * 86400000).toISOString(), service: "Wednesday Bible Study", notes: "" },
  { _id: "3", date: new Date(Date.now() - 17 * 86400000).toISOString(), service: "Sunday Morning", notes: "" },
  { _id: "4", date: new Date(Date.now() - 20 * 86400000).toISOString(), service: "Sunday Evening", notes: "Youth night" },
  { _id: "5", date: new Date(Date.now() - 24 * 86400000).toISOString(), service: "Wednesday Bible Study", notes: "" },
];

export default function AttendancePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ service: "Sunday Morning", date: new Date().toISOString().slice(0, 10), notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>;
  if (!session) { router.push("/login"); return null; }

  const thisMonth = DEMO_HISTORY.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length;
  const thisYear = DEMO_HISTORY.length;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Attendance</h1>
          <p className="text-gray-500 mt-1">Mark your service attendance and view your history.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "This Month", value: thisMonth, icon: FiCalendar },
            { label: "This Year", value: thisYear, icon: FiTrendingUp },
            { label: "Streak (weeks)", value: 3, icon: FiCheck },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-[#1e3a5f]/8 rounded-xl flex items-center justify-center mx-auto mb-2">
                <s.icon className="text-[#1e3a5f]" />
              </div>
              <p className="text-3xl font-bold text-[#1e3a5f]">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mark Attendance */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
            <h2 className="font-bold text-[#1e3a5f] text-xl mb-5 flex items-center gap-2"><FiCheck /> Mark Attendance</h2>
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                <FiCheck /> Attendance recorded!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Service</label>
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className="input-field">
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Notes (optional)</label>
                <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="input-field" placeholder="Any notes about this service..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
                {submitting ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiCheck /> Mark Present</>}
              </button>
            </form>
          </div>

          {/* History */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
            <h2 className="font-bold text-[#1e3a5f] text-xl mb-5 flex items-center gap-2"><FiCalendar /> My History</h2>
            <div className="space-y-3">
              {DEMO_HISTORY.map((r, i) => (
                <motion.div key={r._id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{r.service}</p>
                    {r.notes && <p className="text-gray-400 text-xs mt-0.5 italic">{r.notes}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{formatDate(r.date, { month: "short", day: "numeric" })}</p>
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full mt-1">
                      <FiCheck size={9} /> Present
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
