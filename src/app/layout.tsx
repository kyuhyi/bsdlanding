import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "BSD VIBE CODING - Future of Education",
  description: "Premium Offline Coding Education",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${outfit.variable} font-sans antialiased bg-space-black text-white selection:bg-brand-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
