"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLock, FiCheck, FiSave } from "react-icons/fi";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: "", phone: "", address: "", bio: "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>;
  if (!session) { router.push("/login"); return null; }

  const user = session.user!;
  const role = (user as { role?: string }).role ?? "member";

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePwChange = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setChangingPw(true);
    await new Promise(r => setTimeout(r, 1000));
    setChangingPw(false);
    setPasswords({ current: "", next: "", confirm: "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">My Profile</h1>

        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
            <FiCheck /> Changes saved successfully.
          </motion.div>
        )}

        {/* Avatar & basic info */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#1e3a5f] to-[#2d5a9e] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span className={`mt-1 inline-block text-xs px-3 py-1 rounded-full font-semibold capitalize
                ${role === "admin" ? "bg-red-100 text-red-700" : role === "pastor" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                {role}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-700">Personal Information</h3>
            <button onClick={() => setEditMode(!editMode)} className="flex items-center gap-1.5 text-sm text-[#1e3a5f] font-medium hover:text-[#c9a84c] transition-colors">
              <FiEdit2 size={14} /> {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><FiUser size={11} /> Full Name</label>
                  <input value={profile.name || user.name || ""} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="input-field text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><FiPhone size={11} /> Phone</label>
                  <input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} className="input-field text-sm" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5"><FiMapPin size={11} /> Address</label>
                <input value={profile.address} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} className="input-field text-sm" placeholder="123 Main St, City, State" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Bio</label>
                <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3} className="input-field text-sm resize-none" placeholder="A little about yourself..." />
              </div>
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave />}
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-3 text-sm">
              {[
                { icon: FiMail, label: "Email", value: user.email },
                { icon: FiPhone, label: "Phone", value: profile.phone || "Not set" },
                { icon: FiMapPin, label: "Address", value: profile.address || "Not set" },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3 py-2 border-b border-gray-50">
                  <row.icon className="text-[#c9a84c] flex-shrink-0" />
                  <span className="text-gray-400 w-16">{row.label}</span>
                  <span className="text-gray-700">{row.value}</span>
                </div>
              ))}
              {profile.bio && <p className="text-gray-600 italic pt-2">&ldquo;{profile.bio}&rdquo;</p>}
            </div>
          )}
        </div>

        {/* Change password */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-5 flex items-center gap-2"><FiLock className="text-[#c9a84c]" /> Change Password</h3>
          <form onSubmit={handlePwChange} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Current Password</label>
              <input type="password" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} required className="input-field text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">New Password</label>
                <input type="password" value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} required className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Confirm New Password</label>
                <input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} required className="input-field text-sm" />
              </div>
            </div>
            {passwords.next && passwords.confirm && passwords.next !== passwords.confirm && (
              <p className="text-red-500 text-xs">Passwords do not match.</p>
            )}
            <button type="submit" disabled={changingPw || (!!passwords.next && passwords.next !== passwords.confirm)} className="btn-primary flex items-center gap-2">
              {changingPw ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiLock />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
