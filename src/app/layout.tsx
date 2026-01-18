import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "AI VIBE CODING = 바퍼와 함께 | 코딩 포기자도 가능한 바이브코딩",
  description:
    "코딩 포기자도 가능한 바이브코딩! AI와 함께하는 새로운 코딩 교육의 시작. 바이브코딩, 퍼널마케팅, n8n 자동화를 한번에 배우세요.",
  keywords: [
    "바이브코딩",
    "vibe coding",
    "AI 코딩",
    "n8n",
    "퍼널마케팅",
    "코딩 교육",
    "노코드",
  ],
  authors: [{ name: "BSD" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/bsd-white.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VIBE CODING",
  },
  openGraph: {
    title: "AI VIBE CODING = 바퍼와 함께",
    description:
      "코딩 포기자도 가능한 바이브코딩! AI와 함께하는 새로운 코딩 교육의 시작.",
    url: "https://vibe-coding-two-beta.vercel.app",
    siteName: "BSD VIBE CODING",
    images: [
      {
        url: "/open.jpeg",
        width: 1200,
        height: 630,
        alt: "AI VIBE CODING - 바이브코딩 교육",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI VIBE CODING = 바퍼와 함께",
    description:
      "코딩 포기자도 가능한 바이브코딩! AI와 함께하는 새로운 코딩 교육의 시작.",
    images: ["/open.jpeg"],
  },
};

// 📡 FCM(구글 푸시) 관리 및 서비스 워커 클린업 컴포넌트
function FCMManager() {
  const { user } = useAuth();

  useEffect(() => {
    // 🧹 불필요하거나 꼬인 서비스 워커 강제 정리
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          const swUrl = registration.active?.scriptURL || "";
          // firebase-messaging-sw.js가 아닌 모든 워커는 제거 (OneSignal 등 잔재 방지)
          if (!swUrl.includes("firebase-messaging-sw.js")) {
            registration.unregister().then(() => {
              console.log("🗑️ 비표준 서비스 워커 제거 완료:", swUrl);
            });
          }
        }
      });
    }

    if (!user || typeof window === "undefined") return;

    const setupFCM = async () => {
      try {
        const { messaging, db } = await import("@/lib/firebase");
        if (!messaging) return;

        // 1. 알림 권한 요청
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("알림 권한이 거부되었습니다.");
          return;
        }

        // 2. 서비스 워커 명시적 등록 (백그라운드 푸시의 핵심)
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          scope: "/"
        });
        
        // 워커가 활성화될 때까지 잠시 대기
        await navigator.serviceWorker.ready;

        // 3. FCM 토큰 가져오기
        const { getToken, onMessage } = await import("firebase/messaging");
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          serviceWorkerRegistration: registration
        });

        if (currentToken) {
          console.log("FCM 토큰 수집 성공:", currentToken);
          const { doc, updateDoc, arrayUnion, serverTimestamp } = await import("firebase/firestore");
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            fcmTokens: arrayUnion(currentToken),
            lastTokenSync: serverTimestamp()
          });
        }

        // 4. 포그라운드 메시지 핸들러 (앱이 켜져 있을 때)
        onMessage(messaging, (payload) => {
          console.log("📱 포그라운드 메시지 수신:", payload);
          if (payload.notification) {
            alert(`[${payload.notification.title}]\n${payload.notification.body}`);
          }
        });

      } catch (err) {
        console.error("FCM 설정 중 오류 발생:", err);
      }
    };

    setupFCM();
  }, [user]);

  return null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${outfit.variable} font-sans antialiased bg-space-black text-white selection:bg-brand-primary selection:text-white`}
      >
        <AuthProvider>
          {children}
          <FCMManager />
        </AuthProvider>
      </body>
    </html>
  );
}
