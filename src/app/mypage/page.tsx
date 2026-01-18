"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navbar } from "@/components/layout/Navbar";
import { User, Mail, Calendar, ShieldCheck } from "lucide-react";

export default function MyPage() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                }
            } else {
                window.location.href = "/";
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#030014] text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                <div className="glass-panel p-8 md:p-12 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        <div className="relative">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="profile" className="w-32 h-32 rounded-3xl border-2 border-brand-primary/30 p-1" />
                            ) : (
                                <div className="w-32 h-32 rounded-3xl bg-brand-primary/10 border-2 border-brand-primary/30 flex items-center justify-center">
                                    <User className="w-16 h-16 text-brand-primary/50" />
                                </div>
                            )}
                            <div className="absolute -bottom-2 -right-2 bg-brand-primary p-2 rounded-xl shadow-lg">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">{user?.displayName || "사용자"}</h1>
                            <p className="text-blue-300 font-medium">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4 text-brand-primary">
                                <Mail className="w-5 h-5" />
                                <h3 className="font-bold">계정 정보</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-1">가입 이메일</p>
                            <p className="text-white font-medium">{user?.email}</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4 text-brand-primary">
                                <Calendar className="w-5 h-5" />
                                <h3 className="font-bold">가입 정보</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-1">최근 로그인</p>
                            <p className="text-white font-medium">
                                {userData?.lastLogin?.toDate().toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) || "정보 없음"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <button className="px-8 py-3 glass-button rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">
                            프로필 수정 (준비중)
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
