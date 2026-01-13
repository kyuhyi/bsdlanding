"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  // YouTube video ID extracted from the URL
  const videoId = "4hkSakzamV0";

  return (
    <section className="py-20 bg-gradient-to-b from-[#030014] to-[#050510] relative overflow-hidden" id="video">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Play className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">BSD 바퍼 소개영상</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            바이브코딩이 뭔가요?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AI와 함께하는 새로운 코딩 방식, 바이브코딩을 영상으로 만나보세요
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-primary/20 border border-white/10 bg-black/50 backdrop-blur-sm">
            {/* Decorative gradient border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-3xl opacity-50 blur-sm -z-10" />
            
            {/* Video iframe wrapper - 16:9 aspect ratio */}
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="BSD 바퍼 소개영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-gray-500 text-sm mt-6">
            ▲ 영상을 통해 바이브코딩의 핵심을 이해해보세요
          </p>
        </motion.div>
      </div>
    </section>
  );
}
