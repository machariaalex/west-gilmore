"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministry", label: "Ministry" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const close = () => setUserMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#c9a84c] ring-offset-1 shadow-md group-hover:ring-offset-2 transition-all">
              <Image
                src="/logo.jpg"
                alt="West Gilmore St Church of Christ"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "font-bold text-sm leading-tight transition-colors duration-300",
                isTransparent ? "text-white" : "text-[#1e3a5f]"
              )}>
                West Gilmore St
              </p>
              <p className={cn(
                "text-xs font-medium transition-colors duration-300",
                isTransparent ? "text-[#e8c97a]" : "text-[#c9a84c]"
              )}>
                Church of Christ
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    active
                      ? isTransparent ? "text-[#e8c97a]" : "text-[#c9a84c]"
                      : isTransparent
                      ? "text-white/85 hover:text-white"
                      : "text-gray-700 hover:text-[#1e3a5f]"
                  )}
                >
                  {link.label}
                  {/* Active underline */}
                  <span className={cn(
                    "absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[#c9a84c] transition-all duration-300",
                    active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                  )} />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/donations" className="btn-gold text-sm px-5 py-2">
              Give
            </Link>

            {session ? (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all",
                    isTransparent
                      ? "text-white hover:bg-white/10"
                      : "text-[#1e3a5f] hover:bg-gray-100"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#1e3a5f] to-[#2d5a9e] flex items-center justify-center text-white text-sm font-semibold shadow">
                    {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <FiChevronDown
                    className={cn("text-sm transition-transform duration-200", userMenuOpen && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a84c]/5 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-[#c9a84c] capitalize font-medium">
                          {(session.user as { role?: string })?.role ?? "Member"}
                        </p>
                      </div>
                      <Link href="/portal" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <FiUser className="text-[#1e3a5f]" /> My Portal
                      </Link>
                      {(session.user as { role?: string })?.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <FiSettings className="text-[#c9a84c]" /> Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => { signOut({ callbackUrl: "/" }); setUserMenuOpen(false); }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200",
                  isTransparent
                    ? "border-white/60 text-white hover:bg-white hover:text-[#1e3a5f] hover:border-white"
                    : "border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
                )}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isTransparent ? "text-white" : "text-[#1e3a5f]"
            )}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      pathname === link.href
                        ? "bg-[#1e3a5f] text-white shadow"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#1e3a5f]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link href="/donations" onClick={() => setIsOpen(false)} className="btn-gold text-center text-sm">
                  Give
                </Link>
                {session ? (
                  <>
                    <Link href="/portal" onClick={() => setIsOpen(false)} className="btn-primary text-center text-sm">
                      My Portal
                    </Link>
                    <button
                      onClick={() => { signOut({ callbackUrl: "/" }); setIsOpen(false); }}
                      className="text-red-500 text-sm py-2 font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="btn-primary text-center text-sm">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
