"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    
    // Simulate API call
    setTimeout(() => {
        setFormState("success");
        setTimeout(() => setFormState("idle"), 3000); // Reset after 3s
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="glass-panel p-8 md:p-12 rounded-3xl">
           <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">문의하기</h2>
              <p className="text-gray-400">궁금한 점이 있으신가요? 언제든 문의해주세요.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">이름</label>
                    <input 
                        required 
                        type="text" 
                        placeholder="홍길동"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-primary focus:bg-white/10 outline-none transition-all duration-300"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">이메일</label>
                    <input 
                        required 
                        type="email" 
                        placeholder="hello@vibecoding.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-primary focus:bg-white/10 outline-none transition-all duration-300"
                    />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">메시지</label>
                 <textarea 
                    required 
                    rows={4}
                    placeholder="문의하실 내용을 입력해주세요."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-primary focus:bg-white/10 outline-none transition-all duration-300 resize-none"
                 />
              </div>

              <button 
                type="submit" 
                disabled={formState !== "idle"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                 {formState === "idle" && (
                    <>
                        문의하기 <Send className="w-5 h-5" />
                    </>
                 )}
                 {formState === "loading" && (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" /> 전송 중...
                    </>
                 )}
                 {formState === "success" && (
                    <>
                        <CheckCircle2 className="w-5 h-5" /> 전송 완료!
                    </>
                 )}
              </button>
           </form>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
