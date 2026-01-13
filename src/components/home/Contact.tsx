"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVQjqlX3e9gWrhhP4FiJffLa_Z73GCukhTAGJCmoeJ3ugvboDmn-r3FScszrFS-MKAtg/exec";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    
    try {
      // Google Apps Script로 데이터 전송
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // CORS 우회
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          이름: formData.name,
          전화번호: formData.phone,
          이메일: formData.email,
          기타문의: formData.message,
        }),
      });
      
      // no-cors 모드에서는 response를 읽을 수 없으므로 성공으로 처리
      setFormState("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="glass-panel p-8 md:p-12 rounded-3xl">
           <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">무료 VOD 비밀특강 신청하기</h2>
              <p className="text-gray-400">곧 삭제 될지 모를 VOD 지금 시청해보세요!</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">이름</label>
                    <input 
                        required 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-primary focus:bg-white/10 outline-none transition-all duration-300"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">전화번호</label>
                    <input 
                        required 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010-1234-5678"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-primary focus:bg-white/10 outline-none transition-all duration-300"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">이메일</label>
                 <input 
                     required 
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="hello@example.com"
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-primary focus:bg-white/10 outline-none transition-all duration-300"
                 />
              </div>
              
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">기타문의</label>
                 <textarea 
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="(선택) 문의사항이 있으시면 입력해주세요."
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
                        무료 VOD 신청하기 <Send className="w-5 h-5" />
                    </>
                 )}
                 {formState === "loading" && (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" /> 전송 중...
                    </>
                 )}
                 {formState === "success" && (
                    <>
                        <CheckCircle2 className="w-5 h-5" /> 신청 완료!
                    </>
                 )}
                 {formState === "error" && (
                    <>
                        다시 시도해주세요
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

