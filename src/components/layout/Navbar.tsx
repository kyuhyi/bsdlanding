"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { AuthModal } from "../auth/AuthModal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

const NAV_LINKS = [
  { href: "#hero", label: "홈" },
  { href: "#services", label: "커리큘럼" },
  { href: "#approach", label: "학습방식" },
  { href: "#pricing", label: "수강료" },
  { href: "#contact", label: "문의하기" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-[#030014]/80 backdrop-blur-md border-white/10 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/bsd-white.png"
            alt="BSD Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 glass-button px-4 py-2 rounded-full text-sm font-semibold text-white hover:scale-105 transition-all"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="profile" className="w-6 h-6 rounded-full border border-white/20" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/40">
                    <User className="w-4 h-4 text-brand-primary" />
                  </div>
                )}
                <span>{user.displayName || user.email?.split('@')[0]}님</span>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#030014] border border-white/10 rounded-2xl py-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link href="/mypage" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" /> 마이페이지
                  </Link>
                  {user.email === "test100@test.com" && ( // Default admin check
                    <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> 관리자 대시보드
                    </Link>
                  )}
                  <hr className="my-2 border-white/5" />
                  <button
                    onClick={() => signOut(auth)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> 로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="glass-button px-6 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2 hover:scale-105 transition-all"
            >
              <User className="w-4 h-4" />
              로그인 / 회원가입
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#030014] border-b border-white/10 p-6 md:hidden flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg font-medium text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/5 my-2" />
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full border border-white/20" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/40">
                    <User className="w-6 h-6 text-brand-primary" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{user.displayName || "사용자"}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <Link
                href="/mypage"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl text-gray-300 hover:text-white"
              >
                <Settings className="w-5 h-5" /> 마이페이지
              </Link>
              {user.email === "test100@test.com" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl text-gray-300 hover:text-white"
                >
                  <LayoutDashboard className="w-5 h-5" /> 관리자 대시보드
                </Link>
              )}
              <button
                onClick={() => {
                  signOut(auth);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 rounded-xl text-red-400 font-bold"
              >
                <LogOut className="w-5 h-5" /> 로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}
              className="glass-button px-6 py-4 rounded-xl text-lg font-bold text-white flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              로그인 / 회원가입
            </button>
          )}
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </nav>
  );
}
