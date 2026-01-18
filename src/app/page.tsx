import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { VideoSection } from "@/components/home/VideoSection";
import { Services } from "@/components/home/Services";
import { Approach } from "@/components/home/Approach";
import { Pricing } from "@/components/home/Pricing";
import { BSDClass } from "@/components/home/BSDClass";
import { Contact } from "@/components/home/Contact";
import ExpandOnHover from "@/components/ui/expand-cards";
import InAppMessageTester from "@/components/InAppMessageTester";

export default function Home() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-brand-primary selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <VideoSection />
      <Services />
      <Approach />
      <Pricing />
      <BSDClass />
      <ExpandOnHover />
      <Contact />
      
      {/* 인앱 메시지 테스터 (개발용) */}
      <InAppMessageTester />
      
      <footer className="py-8 bg-black border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2026 BSD VIBE CODING. All rights reserved.</p>
      </footer>
    </main>
  );
}


