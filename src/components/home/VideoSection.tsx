"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  const videoId = "iHBnmsmX62c";

  return (
    <section 
      className="relative py-32 overflow-hidden" 
      id="video"
      style={{
        background: 'linear-gradient(180deg, #030014 0%, #0a0520 50%, #030014 100%)',
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-secondary/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-8 backdrop-blur-sm">
            <Play className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary tracking-wide">BSD 바퍼 소개영상</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            바이브코딩이 뭔가요?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI와 함께하는 새로운 코딩 방식, 바이브코딩을 영상으로 만나보세요
          </p>
        </motion.div>

        {/* Video Container with Enhanced Effects */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-3xl opacity-75 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
            
            {/* Video wrapper */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black/50 backdrop-blur-sm border border-white/10">
              {/* 16:9 aspect ratio container */}
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

            {/* Decorative corner accents */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-brand-primary rounded-tl-3xl opacity-50" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-brand-secondary rounded-br-3xl opacity-50" />
          </div>

          {/* Caption */}
          <motion.p 
            className="text-center text-gray-400 text-sm mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="inline-block w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            영상을 통해 바이브코딩의 핵심을 이해해보세요
            <span className="inline-block w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
          </motion.p>
        </motion.div>

        {/* Additional content */}
        <motion.div
          className="max-w-4xl mx-auto mt-20 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { title: "AI 협업", desc: "AI와 함께 코딩하는 새로운 경험" },
            { title: "실전 프로젝트", desc: "실제로 작동하는 앱을 만들어요" },
            { title: "누구나 가능", desc: "코딩 포기자도 할 수 있어요" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
