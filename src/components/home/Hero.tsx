"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { InteractiveScene } from "../3d/Scene";

export function Hero() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {mounted && (
            <Canvas eventSource={document.body} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                <InteractiveScene />
            </Canvas>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center select-none">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wider animate-fade-in">
          NEXT RENDER EDUCATION
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-brand-primary animate-fade-in slide-up">
          AI VIBE CODING
        </h1>
        <p className="text-xl md:text-2xl text-blue-200/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in slide-up delay-100">
          미래를 코딩하다. <br className="hidden md:block"/>
          프리미엄 오프라인 코딩 교육의 새로운 기준.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in slide-up delay-200">
          <button className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold hover:bg-blue-600 transition-all hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.6)] w-full md:w-auto">
            수강신청 바로가기
          </button>
          <button className="px-8 py-4 glass-button text-white rounded-full font-bold hover:bg-white/10 hover:scale-105 w-full md:w-auto">
            커리큘럼 확인하기
          </button>
        </div>
      </div>
    </section>
  );
}
