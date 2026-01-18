import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AI VIBE CODING = 바퍼와 함께 | 코딩 포기자도 가능한 바이브코딩",
  description: "코딩 포기자도 가능한 바이브코딩! AI와 함께하는 새로운 코딩 교육의 시작. 바이브코딩, 퍼널마케팅, n8n 자동화를 한번에 배우세요.",
  keywords: ["바이브코딩", "vibe coding", "AI 코딩", "n8n", "퍼널마케팅", "코딩 교육", "노코드"],
  authors: [{ name: "BSD" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AI VIBE CODING = 바퍼와 함께",
    description: "코딩 포기자도 가능한 바이브코딩! AI와 함께하는 새로운 코딩 교육의 시작.",
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
    description: "코딩 포기자도 가능한 바이브코딩! AI와 함께하는 새로운 코딩 교육의 시작.",
    images: ["/open.jpeg"],
  },
};

const ONESIGNAL_SCRIPT = `
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.init({
      appId: "59c7f6c5-47bc-417d-a7a5-7410895a12b8",
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerParam: { scope: "/" },
      serviceWorkerPath: "OneSignalSDKWorker.js",
      safari_web_id: "web.onesignal.auto.17646d91-e737-4d9d-8f23-8618e47f5e3f",
      notifyButton: {
        enable: true,
      },
      promptOptions: {
        slidedown: {
          enabled: true,
          autoPrompt: true,
          timeDelay: 5,
          pageViews: 1
        }
      }
    }).catch(e => console.error("OneSignal Init Error:", e));

    // Link user to OneSignal if logged in
    const userId = localStorage.getItem("bsd_user_id"); // Temporary check
    if (userId) OneSignal.login(userId);
  });
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
        <script unsafe-inline="true" dangerouslySetInnerHTML={{ __html: ONESIGNAL_SCRIPT }} />
      </head>
      <body className={`${outfit.variable} font-sans antialiased bg-space-black text-white selection:bg-brand-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
