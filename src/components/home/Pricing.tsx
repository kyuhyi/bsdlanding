"use client";

import React, { useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "바이브코딩",
    price: "₩1,990,000",
    period: "/월",
    desc: "코딩을 처음 접하는 분들을 위한 기초 과정",
    features: ["next.js 개발", "미니 프로젝트 4회", "온라인 VOD 제공", "바이브코딩 마스터"],
    featured: false
  },
  {
    name: "퍼널마케팅",
    price: "₩3,300,000",
    period: "/월",
    desc: "내 서비스를 팔리는 상품으로 전환",
    features: ["퍼널 초급", "퍼널 중급", "퍼널 고급", "실제 구현", "판매"],
    featured: true
  },
  {
    name: "바퍼 올인원",
    price: "₩5,500,000",
    period: "/월",
    desc: "내 아이디어로 서비스를 런칭하는 과정",
    features: ["n8n 기초 풀세팅", "n8n 기본 노드 마스터", "실습 워크플로우 제작", "퍼널마스터", "n8n 마스터"],
    featured: false
  }
];

function HolographicCard({ plan }: { plan: typeof PLANS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate calculation (Max 20 deg)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    // Glare calculation
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      className="relative perspective-[1000px] w-full max-w-sm mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className={cn(
            "relative w-full p-8 rounded-2xl border transition-all duration-200 ease-out transform-style-3d",
            plan.featured 
                ? "bg-brand-primary/10 border-brand-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]" 
                : "bg-white/5 border-white/10 hover:border-white/30"
        )}
        style={{ 
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Holographic Overlays */}
        <div 
            className="absolute inset-0 rounded-2xl pointer-events-none z-10 mix-blend-overlay transition-opacity duration-200"
            style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 80%)`,
                opacity: glare.opacity
            }}
        />
        
        {/* Content */}
        <div className="relative z-0 transform translate-z-[20px]">
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
            <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 mb-1">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-5 h-5 text-brand-primary" />
                        {feat}
                    </li>
                ))}
            </ul>

            <button className={cn(
                "w-full py-3 rounded-xl font-bold transition-all",
                plan.featured 
                    ? "bg-brand-primary text-white hover:bg-blue-600 shadow-lg" 
                    : "bg-white/10 text-white hover:bg-white/20"
            )}>
                수강 신청하기
            </button>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section className="py-20 bg-[#050510]" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white text-glow">수강료 안내</h2>
            <p className="text-blue-200/60">최고의 교육을 합리적인 가격에 만나보세요</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
                <HolographicCard key={i} plan={plan} />
            ))}
        </div>
      </div>
    </section>
  );
}
