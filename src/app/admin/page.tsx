"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { Navbar } from "@/components/layout/Navbar";
import { Users, Send, Bell, Loader2, CheckCircle2, LayoutDashboard } from "lucide-react";

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    lastLogin: Timestamp;
}

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [pushTitle, setPushTitle] = useState("");
    const [pushMessage, setPushMessage] = useState("");
    const [sendingPush, setSendingPush] = useState(false);
    const [pushStatus, setPushStatus] = useState<"idle" | "success" | "error">("idle");
    const [oneSignalActive, setOneSignalActive] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const checkOneSignal = setInterval(() => {
            const os = (window as any).OneSignal;
            if (os?.initialized) {
                setOneSignalActive(true);
                setIsSubscribed(os.User.PushSubscription.optedIn);
                clearInterval(checkOneSignal);
            }
        }, 1000);
        return () => clearInterval(checkOneSignal);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // Simple admin check: test100@test.com
            if (currentUser && currentUser.email === "test100@test.com") {
                setIsAdmin(true);
                fetchUsers();
            } else if (currentUser) {
                window.location.href = "/";
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchUsers = async () => {
        try {
            const q = query(collection(db, "users"), orderBy("lastLogin", "desc"));
            const querySnapshot = await getDocs(q);
            const usersList: UserProfile[] = [];
            querySnapshot.forEach((doc) => {
                usersList.push(doc.data() as UserProfile);
            });
            setUsers(usersList);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleSendPush = async (e: React.FormEvent) => {
        e.preventDefault();
        setSendingPush(true);
        setPushStatus("idle");

        try {
            const response = await fetch("/api/push", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: pushTitle, message: pushMessage }),
            });

            if (response.ok) {
                setPushStatus("success");
                setPushTitle("");
                setPushMessage("");
            } else {
                setPushStatus("error");
            }
        } catch (error) {
            console.error("Error sending push:", error);
            setPushStatus("error");
        } finally {
            setSendingPush(false);
            setTimeout(() => setPushStatus("idle"), 3000);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!isAdmin) return null;

    return (
        <main className="min-h-screen bg-[#030014] text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-12 flex items-center gap-4">
                    <LayoutDashboard className="w-10 h-10 text-brand-primary" />
                    관리자 대시보드
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel p-6 rounded-3xl border border-white/10">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <Users className="w-6 h-6 text-brand-primary" />
                                    회원 관리 ({users.length}명)
                                </h2>
                                <button onClick={fetchUsers} className="text-sm text-blue-400 hover:underline">새로고침</button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400 text-sm">
                                            <th className="pb-4 font-medium">사용자</th>
                                            <th className="pb-4 font-medium">이메일</th>
                                            <th className="pb-4 font-medium">최근 로그인</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {users.map((u) => (
                                            <tr key={u.uid} className="group">
                                                <td className="py-4 flex items-center gap-3">
                                                    {u.photoURL ? (
                                                        <img src={u.photoURL} alt="avatar" className="w-8 h-8 rounded-full border border-white/10" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/30 text-xs text-brand-primary font-bold">
                                                            {u.displayName?.charAt(0) || u.email.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="font-medium group-hover:text-brand-primary transition-colors">
                                                        {u.displayName || "GUEST"}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-gray-400 text-sm">{u.email}</td>
                                                <td className="py-4 text-gray-400 text-sm">
                                                    {u.lastLogin ? u.lastLogin.toDate().toLocaleDateString('ko-KR') : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-primary/5">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <Bell className="w-6 h-6 text-brand-primary" />
                                    웹 푸시 발송
                                </h2>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${oneSignalActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {oneSignalActive ? 'SDK Online' : 'SDK Offline'}
                                </div>
                            </div>

                            {!isSubscribed && oneSignalActive && (
                                <div className="mb-6 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-between">
                                    <div className="text-sm">
                                        <p className="font-bold text-white">알림 미구독 상태</p>
                                        <p className="text-gray-400 text-xs">푸시를 받으려면 구독이 필요합니다.</p>
                                    </div>
                                    <button
                                        onClick={() => (window as any).OneSignal.Notifications.requestPermission()}
                                        className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        지금 구독하기
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSendPush} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">알림 제목</label>
                                    <input
                                        required
                                        type="text"
                                        value={pushTitle}
                                        onChange={(e) => setPushTitle(e.target.value)}
                                        placeholder="공지사항 제목"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">내용</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={pushMessage}
                                        onChange={(e) => setPushMessage(e.target.value)}
                                        placeholder="알림 내용을 입력하세요."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sendingPush}
                                    className="w-full py-4 rounded-xl bg-brand-primary text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                                >
                                    {sendingPush ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> 전체 푸시 발송</>}
                                </button>

                                {pushStatus === "success" && (
                                    <p className="text-green-400 text-sm text-center flex items-center justify-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" /> 푸시가 성공적으로 예약되었습니다.
                                    </p>
                                )}
                                {pushStatus === "error" && (
                                    <p className="text-red-400 text-sm text-center">발송 중 오류가 발생했습니다.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
