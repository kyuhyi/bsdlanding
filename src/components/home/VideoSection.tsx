"use client";

import React, { useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export function VideoSection() {
  const videoId = "iHBnmsmX62c";
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc={youtubeUrl}
      bgImageSrc="/video-background.png"
      title="바이브코딩이 뭔가요?"
      date="BSD 바퍼 소개"
      scrollToExpand="스크롤하여 영상 확대"
      textBlend={false}
    >
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold mb-6 text-white'>
          AI와 함께하는 새로운 코딩 방식
        </h2>
        <p className='text-lg mb-8 text-gray-300 leading-relaxed'>
          바이브코딩은 AI와 협업하여 누구나 쉽게 코딩을 배우고 실전 프로젝트를 만들 수 있는 혁신적인 교육 방식입니다. 
          코딩을 포기했던 분들도 다시 시작할 수 있도록 설계된 커리큘럼으로, 실제로 작동하는 앱을 만들면서 배웁니다.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { 
              title: "AI 협업", 
              desc: "AI와 함께 코딩하는 새로운 경험을 통해 더 빠르고 효율적으로 학습합니다" 
            },
            { 
              title: "실전 프로젝트", 
              desc: "이론이 아닌 실제로 작동하는 앱을 만들면서 실력을 키웁니다" 
            },
            { 
              title: "누구나 가능", 
              desc: "코딩 포기자도 할 수 있도록 설계된 체계적인 커리큘럼" 
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className='text-lg mt-12 text-gray-300 leading-relaxed'>
          위 영상을 통해 바이브코딩의 핵심 개념과 학습 방법을 확인해보세요. 
          스크롤을 통해 영상이 확대되는 인터랙티브한 경험을 즐기실 수 있습니다.
        </p>
      </div>
    </ScrollExpandMedia>
  );
}
