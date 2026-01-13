"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Code2, Target, Workflow } from "lucide-react";

const bsdCards = [
  {
    icon: <Code2 className="size-4 text-purple-300" />,
    title: "바이브 코딩",
    description: "AI와 함께 직관적으로 코딩",
    date: "Create with AI",
    iconClassName: "bg-purple-800",
    titleClassName: "text-purple-400",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Target className="size-4 text-blue-300" />,
    title: "퍼널 마케팅",
    description: "고객 전환율 극대화 전략",
    date: "Convert & Scale",
    iconClassName: "bg-blue-800",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Workflow className="size-4 text-emerald-300" />,
    title: "n8n 자동화",
    description: "노코드 워크플로우 자동화",
    date: "Automate Everything",
    iconClassName: "bg-emerald-800",
    titleClassName: "text-emerald-400",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export function BSDClass() {
  return (
    <section className="py-24 bg-[#030014] relative overflow-hidden" id="bsd-class">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BSD 통합 교육
          </h2>
          <p className="text-blue-300/70 text-lg max-w-2xl mx-auto">
            세 가지 핵심 기술의 완벽한 시너지로 비즈니스를 성장시키세요
          </p>
        </div>

        {/* Display Cards */}
        <div className="flex min-h-[400px] w-full items-center justify-center py-10">
          <div className="w-full max-w-3xl">
            <DisplayCards cards={bsdCards} />
          </div>
        </div>

        {/* Bottom Description */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">Step 1</div>
            <p className="text-gray-400">바이브 코딩으로<br/>아이디어를 현실로</p>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">Step 2</div>
            <p className="text-gray-400">퍼널 마케팅으로<br/>고객을 유치</p>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-emerald-400 mb-2">Step 3</div>
            <p className="text-gray-400">n8n으로<br/>모든 것을 자동화</p>
          </div>
        </div>
      </div>
    </section>
  );
}
