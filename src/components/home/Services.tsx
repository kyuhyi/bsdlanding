"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Monitor, Cpu, Globe, Rocket, Layers } from "lucide-react";

const SERVICES = [
  { title: "웹 개발 마스터", desc: "React, Next.js 중심의 모던 웹 개발", icon: Monitor },
  { title: "앱 개발 부트캠프", desc: "React Native로 만드는 크로스 플랫폼 앱", icon: Code2 },
  { title: "AI & 딥러닝", desc: "Python과 TensorFlow로 배우는 인공지능", icon: Cpu },
  { title: "인터랙티브 웹", desc: "Three.js와 WebGL로 구현하는 3D 웹", icon: Globe },
  { title: "스타트업 인큐베이팅", desc: "아이디어 실현부터 배포까지 올인원", icon: Rocket },
  { title: "디자인 시스템", desc: "Figma와 Storybook을 활용한 협업", icon: Layers },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 50 } 
  }
};

export function Services() {
  return (
    <section className="py-20 md:py-32 relative z-10 bg-black/50 backdrop-blur-sm" id="services">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-glow">
                커리큘럼 안내
            </h2>
            <p className="text-blue-200/60 max-w-2xl mx-auto">
                현업 전문가가 설계한 체계적인 교육 과정을 만나보세요.
            </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="glass-panel p-8 rounded-2xl group hover:border-brand-primary transition-colors cursor-pointer"
            >
              <motion.div 
                className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-brand-primary/20 transition-colors"
                whileHover={{ rotate: 12 }}
              >
                <s.icon className="w-8 h-8 text-blue-400 group-hover:text-brand-primary transition-colors" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
