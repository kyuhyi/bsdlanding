"use client";

import React, { useRef, useLayoutEffect, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const STEPS = [
  { step: "01", title: "기초 다지기", desc: "탄탄한 기본기를 위한 핵심 이론 학습" },
  { step: "02", title: "실전 학습", desc: "현업 수준의 프로젝트 기획 및 개발" },
  { step: "03", title: "심화 학습", desc: "고급 최적화 기술과 아키텍처 설계" },
  { step: "04", title: "커리어 점프", desc: "이력서 첨삭 및 모의 면접 컨설팅" },
];

const CODE_KEYWORDS = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "AI", "WebGL"];

export function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [isHoveringSpline, setIsHoveringSpline] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState(0);

  // Rotate keywords every 500ms for neon effect
  useEffect(() => {
    if (!isHoveringSpline) return;
    
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % CODE_KEYWORDS.length);
    }, 400);
    
    return () => clearInterval(interval);
  }, [isHoveringSpline]);

  // High-performance cursor tracking using direct DOM manipulation
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cursorRef.current) return;
    // Use transform for GPU acceleration - no re-renders
    cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.fromTo(trackRef.current, 
        { scale: 0.5, opacity: 0.5, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }
      )
      .to(trackRef.current, {
        xPercent: -75,
        duration: 3,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full relative overflow-hidden bg-[#050510]" id="approach">
       {/* Neon Code Cursor - GPU Accelerated */}
       <div 
         ref={cursorRef}
         className={`fixed pointer-events-none z-[100] will-change-transform transition-opacity duration-200 ${
           isHoveringSpline ? "opacity-100" : "opacity-0"
         }`}
         style={{
           top: 0,
           left: 0,
           marginLeft: "-50px",
           marginTop: "-20px",
         }}
       >
         <span 
           className="text-xl font-mono font-bold whitespace-nowrap"
           style={{
             color: "#a78bfa",
             textShadow: `
               0 0 5px #a78bfa,
               0 0 10px #a78bfa,
               0 0 20px #a78bfa,
               0 0 40px #3b82f6,
               0 0 80px #3b82f6
             `,
             animation: "pulse 0.5s ease-in-out infinite alternate"
           }}
         >
           &lt;{CODE_KEYWORDS[currentKeyword]} /&gt;
         </span>
       </div>
       
       {/* Spline 3D Background - Interactive */}
       <div 
         className="absolute inset-0 z-[1] cursor-none"
         onMouseEnter={() => setIsHoveringSpline(true)}
         onMouseLeave={() => setIsHoveringSpline(false)}
       >
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
       </div>
       
       {/* Spotlight Effect */}
       <Spotlight 
         className="from-blue-500/30 via-indigo-500/20 to-purple-500/10" 
         size={400} 
       />
       
       {/* Title */}
       <div className="absolute top-10 w-full z-10 text-center pointer-events-none">
          <h2 className="text-4xl font-bold text-white mb-2">학습 방식</h2>
          <p className="text-blue-300">VIBE CODING만의 독보적인 커리큘럼</p>
       </div>
       
       {/* Horizontal Scroll Track */}
       <div ref={trackRef} className="flex h-full w-[400%] will-change-transform relative z-[5] pointer-events-none">
          {STEPS.map((s, i) => (
             <div key={i} className="w-screen h-full flex flex-col items-center justify-center p-12 border-r border-white/5 bg-gradient-to-b from-transparent to-[#0a0a20]/80">
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <span className="text-9xl font-black text-white/5 block mb-4">{s.step}</span>
                        <h3 className="text-5xl md:text-7xl font-bold mb-6 text-white">{s.title}</h3>
                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="order-1 md:order-2 h-[400px] bg-blue-500/10 rounded-3xl border border-blue-500/20 backdrop-blur-lg flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-brand-secondary/20 blur-[100px] group-hover:bg-brand-secondary/30 transition-colors" />
                       <div className="relative text-white font-mono text-lg z-10 p-8 border border-white/10 bg-black/40 rounded-xl">
                          Code Visualization <br/>
                          Step: {s.step} <br/>
                          Status: Active
                       </div>
                    </div>
                </div>
             </div>
          ))}
       </div>
       
       {/* Neon pulse animation */}
       <style jsx>{`
         @keyframes pulse {
           from { opacity: 0.8; }
           to { opacity: 1; }
         }
       `}</style>
    </section>
  );
}



