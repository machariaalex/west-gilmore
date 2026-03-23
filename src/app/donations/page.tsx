"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShield, FiLock, FiCheck, FiDollarSign, FiUser, FiMail } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

const PRESET_AMOUNTS = [25, 50, 100, 250];

const DESIGNATIONS = [
  { value: "general", label: "General Fund" },
  { value: "building", label: "Building Fund" },
  { value: "missions", label: "Missions" },
  { value: "youth", label: "Youth Ministry" },
];

const IMPACT_ITEMS = [
  { amount: 25, icon: "📖", description: "Provides Bibles and study materials for 2 new members" },
  { amount: 50, icon: "🍽️", description: "Feeds 10 families through our community outreach program" },
  { amount: 100, icon: "🎓", description: "Sponsors a youth member for a full month of programs" },
  { amount: 250, icon: "🌍", description: "Supports a week of mission outreach in an underserved community" },
];

export default function DonationsPage() {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [designation, setDesignation] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const displayAmount = selectedAmount !== null ? selectedAmount : Number(customAmount) || 0;

  const handlePreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden bg-[#1e3a5f]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a84c] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9a84c] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[#c9a84c] text-sm font-medium mb-6">
              <FiHeart className="w-4 h-4" />
              Give Generously
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support Our Ministry
            </h1>
            <div className="gold-divider mx-auto mb-6" />
            <p className="text-xl text-white/80 italic mb-2">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
              for God loves a cheerful giver.&rdquo;
            </p>
            <p className="text-[#c9a84c] font-semibold">— 2 Corinthians 9:7</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Donation Form */}
          <SectionReveal direction="left">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Make a Donation</h2>

              {/* Donation Type Tabs */}
              <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
                {(["one-time", "monthly"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setDonationType(type)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                      donationType === type
                        ? "bg-[#1e3a5f] text-white shadow"
                        : "text-gray-500 hover:text-[#1e3a5f]"
                    }`}
                  >
                    {type === "one-time" ? "One-Time" : "Monthly"}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      Your generous gift of{" "}
                      <span className="font-bold text-[#c9a84c]">${displayAmount}</span> has been received.
                      May God bless you for your generosity.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setName(""); setEmail(""); }}
                      className="mt-6 btn-primary text-sm"
                    >
                      Give Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Amount Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Amount
                      </label>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {PRESET_AMOUNTS.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handlePreset(amount)}
                            className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
                              selectedAmount === amount
                                ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#1e3a5f]"
                                : "border-gray-200 text-gray-600 hover:border-[#1e3a5f]"
                            }`}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <FiDollarSign />
                        </span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          value={customAmount}
                          onChange={(e) => handleCustomChange(e.target.value)}
                          min="1"
                          className="input-field pl-8"
                        />
                      </div>
                    </div>

                    {/* Designation */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Designation
                      </label>
                      <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="input-field"
                      >
                        {DESIGNATIONS.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Personal Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    {displayAmount > 0 && (
                      <div className="bg-[#1e3a5f]/5 rounded-xl p-4 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {donationType === "monthly" ? "Monthly donation" : "One-time donation"} to{" "}
                          {DESIGNATIONS.find((d) => d.value === designation)?.label}
                        </span>
                        <span className="text-xl font-bold text-[#1e3a5f]">${displayAmount}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || displayAmount <= 0}
                      className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#1e3a5f]/30 border-t-[#1e3a5f] rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiHeart />
                          Donate ${displayAmount > 0 ? displayAmount : ""}
                          {donationType === "monthly" ? "/mo" : ""}
                        </>
                      )}
                    </button>

                    {/* Security Badges */}
                    <div className="flex items-center justify-center gap-6 pt-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <FiLock className="w-3.5 h-3.5" />
                        SSL Secured
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <FiShield className="w-3.5 h-3.5" />
                        Stripe Protected
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <FiCheck className="w-3.5 h-3.5" />
                        Tax Deductible
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </SectionReveal>

          {/* Impact Section */}
          <SectionReveal direction="right" delay={0.15}>
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Your Impact</h2>
              <div className="gold-divider mb-6" />
              <p className="text-gray-600 mb-8">
                Every dollar you give goes directly to ministry work right here in our community and beyond.
              </p>

              <div className="space-y-4">
                {IMPACT_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.amount}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    onClick={() => handlePreset(item.amount)}
                    className={`card-hover cursor-pointer rounded-xl p-5 border-2 transition-all ${
                      selectedAmount === item.amount
                        ? "border-[#c9a84c] bg-[#c9a84c]/5"
                        : "border-gray-100 bg-white hover:border-[#1e3a5f]/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#1e3a5f] text-lg">${item.amount}</span>
                          {selectedAmount === item.amount && (
                            <span className="text-xs bg-[#c9a84c] text-white px-2 py-0.5 rounded-full">Selected</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-[#1e3a5f] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Other Ways to Give</h3>
                <div className="gold-divider mb-4" />
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2"><FiCheck className="text-[#c9a84c]" /> In-person during Sunday service</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-[#c9a84c]" /> Mail a check to the church office</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-[#c9a84c]" /> Planned giving &amp; estate gifts</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-[#c9a84c]" /> Stock &amp; non-cash donations accepted</li>
                </ul>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
