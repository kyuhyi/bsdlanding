"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function FCMManager() {
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const setupFCM = async () => {
      try {
        // 1. 과거 서비스 워커 정리 (OneSignal 등)
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          const url = reg.active?.scriptURL || "";
          if (url.includes("OneSignal") || url.includes("onesignal")) {
            await reg.unregister();
            console.log("🗑️ 과거 서비스 워커 제거됨:", url);
          }
        }

        if (!user) return;

        // 2. 알림 권한 요청
        if (Notification.permission === "default") {
          await Notification.requestPermission();
        }

        if (Notification.permission !== "granted") {
          console.warn("알림 권한이 없습니다.");
          return;
        }

        const { messaging, db } = await import("@/lib/firebase");
        if (!messaging) return;

        // 3. 서비스 워커 등록 (캐시 문제 방지를 위해 버전 쿼리 추가)
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        
        // 4. FCM 토큰 획득
        const { getToken, onMessage } = await import("firebase/messaging");
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          serviceWorkerRegistration: registration
        });

        if (currentToken) {
          const { doc, updateDoc, arrayUnion, serverTimestamp } = await import("firebase/firestore");
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            fcmTokens: arrayUnion(currentToken),
            lastTokenSync: serverTimestamp()
          });
          console.log("✅ FCM 토큰이 성공적으로 등록되었습니다.");
        }

        // 5. 포그라운드 메시지 핸들러
        onMessage(messaging, (payload) => {
          console.log("📱 메시지 수신 (Foreground):", payload);
          if (payload.notification) {
            new Notification(payload.notification.title || "VIBE CODING", {
              body: payload.notification.body,
              icon: "/bsd-white.png"
            });
          }
        });

      } catch (err: any) {
        console.error("FCM 설정 실패:", err);
      }
    };

    setupFCM();
  }, [user]);

  return null;
}
