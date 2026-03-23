"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiYoutube,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const SERVICE_TIMES = [
  { day: "Sunday", services: ["Bible Class — 9:30 AM", "Morning Worship — 10:30 AM", "Evening Worship — 5:00 PM"] },
  { day: "Wednesday", services: ["Mid-Week Bible Study — 7:00 PM"] },
];

const SOCIAL_LINKS = [
  { Icon: FiFacebook, label: "Facebook", href: "https://facebook.com", color: "#1877F2" },
  { Icon: FiYoutube, label: "YouTube", href: "https://youtube.com", color: "#FF0000" },
  { Icon: FiInstagram, label: "Instagram", href: "https://instagram.com", color: "#E4405F" },
  { Icon: FiTwitter, label: "Twitter / X", href: "https://twitter.com", color: "#1DA1F2" },
];

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!emailRe.test(form.email)) errors.email = "Please enter a valid email address.";

  if (form.phone && !/^[\d\s\-+().]{7,20}$/.test(form.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!form.subject.trim()) errors.subject = "Please enter a subject.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";

  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitState("loading");
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitState("success");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
  }

  function FieldError({ field }: { field: keyof FormErrors }) {
    if (!errors[field] || !touched[field]) return null;
    return (
      <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
        <FiAlertCircle size={12} /> {errors[field]}
      </p>
    );
  }

  function inputClass(field: keyof FormState) {
    return `input-field ${touched[field] && errors[field] ? "border-red-400 focus:border-red-400" : ""}`;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[360px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 50%, #1a2e4a 100%)" }}
        />
        <div
          className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }}
        />
        <div className="relative z-10 text-center px-6 py-16">
          <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-4">
            We&apos;d Love to Hear From You
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Reach out with questions, prayer requests, or to learn more about our congregation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Contact Form */}
            <SectionReveal direction="left">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Send Us a Message</h2>
                <div className="gold-divider mb-6" />

                {submitState === "success" ? (
                  <div className="py-12 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)" }}
                    >
                      <FiCheckCircle className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We will get back to you within 1–2 business days.
                    </p>
                    <button
                      className="btn-primary"
                      onClick={() => setSubmitState("idle")}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder="John Smith"
                          className={inputClass("name")}
                          style={{ paddingLeft: "2.5rem" }}
                          autoComplete="name"
                        />
                      </div>
                      <FieldError field="name" />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            placeholder="john@example.com"
                            className={inputClass("email")}
                            style={{ paddingLeft: "2.5rem" }}
                            autoComplete="email"
                          />
                        </div>
                        <FieldError field="email" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            placeholder="(555) 000-0000"
                            className={inputClass("phone")}
                            style={{ paddingLeft: "2.5rem" }}
                            autoComplete="tel"
                          />
                        </div>
                        <FieldError field="phone" />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        onBlur={() => handleBlur("subject")}
                        className={`${inputClass("subject")} appearance-none cursor-pointer`}
                        aria-label="Select subject"
                      >
                        <option value="">Select a subject...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Prayer Request">Prayer Request</option>
                        <option value="Membership">Membership Interest</option>
                        <option value="Events">Events & Programs</option>
                        <option value="Sermons">Sermon Request</option>
                        <option value="Giving">Giving & Donations</option>
                        <option value="Pastoral Care">Pastoral Care</option>
                        <option value="Other">Other</option>
                      </select>
                      <FieldError field="subject" />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
                        <textarea
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          onBlur={() => handleBlur("message")}
                          placeholder="How can we help you?"
                          rows={5}
                          className={`${inputClass("message")} resize-none`}
                          style={{ paddingLeft: "2.5rem" }}
                        />
                      </div>
                      <FieldError field="message" />
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {form.message.length} characters
                      </p>
                    </div>

                    {submitState === "error" && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        <FiAlertCircle className="flex-shrink-0" />
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitState === "loading" ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </SectionReveal>

            {/* Church Info */}
            <div className="space-y-6">
              <SectionReveal direction="right" delay={0.1}>
                {/* Address */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
                    >
                      <FiMapPin className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1e3a5f] text-lg mb-1">Location</h3>
                      <p className="text-gray-600">West Gilmore Street Church of Christ</p>
                      <p className="text-gray-600">1234 West Gilmore Street</p>
                      <p className="text-gray-600">Chicago, IL 60622</p>
                      <Link
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c9a84c] font-semibold text-sm mt-2 inline-block hover:underline"
                      >
                        Get Directions →
                      </Link>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal direction="right" delay={0.2}>
                {/* Phone & Email */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)" }}
                      >
                        <FiPhone className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1e3a5f]">Phone</h3>
                        <a href="tel:+13125550100" className="text-gray-600 hover:text-[#c9a84c] transition-colors">
                          (312) 555-0100
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
                      >
                        <FiMail className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1e3a5f]">Email</h3>
                        <a
                          href="mailto:info@westgilmorecoc.org"
                          className="text-gray-600 hover:text-[#c9a84c] transition-colors"
                        >
                          info@westgilmorecoc.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal direction="right" delay={0.3}>
                {/* Service Times */}
                <div
                  className="rounded-2xl p-6 card-hover"
                  style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: "rgba(201,168,76,0.2)", border: "2px solid #c9a84c" }}
                    >
                      <FiClock className="text-[#c9a84c] text-lg" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Service Times</h3>
                  </div>
                  <div className="space-y-4">
                    {SERVICE_TIMES.map((day) => (
                      <div key={day.day}>
                        <p className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider mb-1.5">
                          {day.day}
                        </p>
                        <ul className="space-y-1">
                          {day.services.map((s) => (
                            <li key={s} className="text-blue-100 text-sm flex items-center gap-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: "#c9a84c" }}
                              />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal direction="right" delay={0.4}>
                {/* Social Links */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
                  <h3 className="font-bold text-[#1e3a5f] text-lg mb-4">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {SOCIAL_LINKS.map(({ Icon, label, href, color }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${color}18` }}
                        >
                          <Icon style={{ color }} className="text-lg" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#1e3a5f] transition-colors">
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Placeholder */}
      <section className="pb-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal direction="up">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {/* Map header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
              >
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-[#c9a84c]" />
                  <span className="text-white font-semibold">
                    1234 West Gilmore Street, Chicago, IL 60622
                  </span>
                </div>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a84c] text-sm font-semibold hover:underline"
                >
                  Open in Maps →
                </Link>
              </div>
              {/* Map iframe placeholder */}
              <div
                className="w-full h-80 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)" }}
              >
                <iframe
                  title="Church Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.123456!2d-87.6298!3d41.8827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUyJzU3LjciTiA4N8KwMzcnNDcuMyJX!5e0!3m2!1sen!2sus!4v0"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
