import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

import { AuthProvider } from "@/context/AuthContext";
import { FCMManager } from "@/components/fcm/FCMManager";

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
