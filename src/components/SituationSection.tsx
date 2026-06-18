/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AlertTriangle, HelpCircle, ArrowRightLeft, Building2, Flame, Scale, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function SituationSection() {
  const { title, subtitle, narrative, infographics } = presentationData.situation;
  const { title: discTitle, subtitle: discSubtitle, questions } = presentationData.discussion;

  // Active state for discussion questions guidelines drawer
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  // Active scroll step for narrative
  const [activeStep, setActiveStep] = useState<string>("problem");

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  // Setup IntersectionObserver for narrative steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = entry.target.id.replace("narrative-step-", "");
            setActiveStep(step);
          }
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    const steps = ["problem", "challenge", "dilemma"];
    steps.forEach((stepId) => {
      const el = document.getElementById(`narrative-step-${stepId}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tinh-huong" className="py-24 bg-slate-950 text-white relative">
      {/* Visual Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Tình huống thực tiễn</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-teal-200 to-emerald-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ================= CONTENT & INFOGRAPHICS (SCROLLYTELLING VIEW) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 relative">
          
          {/* Left Col: Scrollable Narrative steps */}
          <div className="lg:col-span-7 space-y-16" id="situation-narrative">
            
            {/* Step 1: Problem */}
            <div
              id="narrative-step-problem"
              className="scroll-mt-32 py-4"
            >
              <div className={`transition-all duration-500 p-6 sm:p-8 rounded-3xl border ${
                activeStep === "problem"
                  ? "bg-slate-900/60 border-teal-500/40 shadow-xl shadow-teal-500/5 scale-[1.01]"
                  : "bg-slate-900/20 border-slate-900 opacity-60"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-teal-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400" /> Nhu cầu thực tế thế hệ trẻ
                  </h3>
                  <Building2 className={`w-8 h-8 transition-colors ${
                    activeStep === "problem" ? "text-teal-400" : "text-slate-700"
                  }`} />
                </div>
                <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                  {narrative.problem}
                </p>
              </div>
            </div>

            {/* Step 2: Challenge */}
            <div
              id="narrative-step-challenge"
              className="scroll-mt-32 py-4"
            >
              <div className={`transition-all duration-500 p-6 sm:p-8 rounded-3xl border ${
                activeStep === "challenge"
                  ? "bg-slate-900/60 border-rose-500/40 shadow-xl shadow-rose-500/5 scale-[1.01]"
                  : "bg-slate-900/20 border-slate-900 opacity-60"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-rose-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" /> Động cơ tối đa lợi nhuận của doanh nghiệp
                  </h3>
                  <Flame className={`w-8 h-8 transition-colors ${
                    activeStep === "challenge" ? "text-rose-500 animate-pulse" : "text-slate-700"
                  }`} />
                </div>
                <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                  {narrative.challenge}
                </p>
              </div>
            </div>

            {/* Step 3: Dilemma */}
            <div
              id="narrative-step-dilemma"
              className="scroll-mt-32 py-4"
            >
              <div className={`transition-all duration-500 p-6 sm:p-8 rounded-3xl border ${
                activeStep === "dilemma"
                  ? "bg-gradient-to-r from-red-950/30 to-amber-950/30 border-red-500/40 shadow-2xl shadow-red-500/10 scale-[1.01]"
                  : "bg-slate-900/20 border-slate-900 opacity-60"
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl border transition-all duration-500 ${
                    activeStep === "dilemma"
                      ? "bg-red-500/10 border-red-500/40 text-red-400 shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    <ArrowRightLeft className={`w-6 h-6 ${activeStep === "dilemma" ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-extrabold uppercase tracking-wider mb-2 transition-colors ${
                      activeStep === "dilemma" ? "text-red-300" : "text-slate-400"
                    }`}>Mâu thuẫn nan giải (Trọng tâm bài học)</h4>
                    <p className={`text-sm leading-relaxed font-medium transition-colors duration-500 ${
                      activeStep === "dilemma" ? "text-amber-200" : "text-slate-400"
                    }`}>
                      "{narrative.dilemma}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Col: Sticky Metrics Grid */}
          <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-4 lg:sticky lg:top-36 self-start" id="situation-metrics">
            {infographics.map((info, idx) => {
              // Determine if card is active based on active scroll step
              let isHighlighted = false;
              let highlightBorderColor = "border-slate-850";
              let badgeColor = "text-slate-500";

              if (activeStep === "problem" && (idx === 0 || idx === 1)) {
                isHighlighted = true;
                highlightBorderColor = "border-teal-500/40 shadow-teal-500/10 bg-slate-900/70";
                badgeColor = "text-teal-400";
              } else if (activeStep === "challenge" && idx === 2) {
                isHighlighted = true;
                highlightBorderColor = "border-rose-500/40 shadow-rose-500/10 bg-slate-900/70";
                badgeColor = "text-rose-400";
              } else if (activeStep === "dilemma" && idx === 3) {
                isHighlighted = true;
                highlightBorderColor = "border-red-500/40 shadow-red-500/10 bg-slate-900/70";
                badgeColor = "text-red-400";
              }

              return (
                <div
                  key={idx}
                  className={`border p-6 rounded-3xl transition-all duration-500 text-left ${
                    isHighlighted
                      ? `scale-[1.05] z-10 shadow-xl ${highlightBorderColor}`
                      : "bg-slate-950/20 border-slate-900/50 opacity-30 scale-95"
                  }`}
                >
                  <span className={`text-xs font-semibold block mb-3 transition-colors duration-500 ${badgeColor}`}>{info.label}</span>
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{info.value}</span>
                    <span className={`text-xs font-bold ml-1.5 transition-colors duration-500 ${badgeColor}`}>{info.unit}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{info.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= SECTION: CÂU HỎI THẢO LUẬN PHẢN BIỆN ================= */}
        <div id="section-thao-luan" className="pt-16 border-t border-slate-900">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Phần Hỏi Đáp Giảng Đường</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              {discTitle}
            </h2>
            <p className="text-slate-400 text-sm">
              {discSubtitle}
            </p>
          </div>

          {/* 2 Big Discussion Cards with Expandable Guideline Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="discussion-cards-container">
            {questions.map((q) => {
              const isOpen = openQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  id={`discussion-card-${q.id}`}
                  className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-indigo-950/55 border border-indigo-500/25 text-indigo-300 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                      {q.id.toUpperCase()} - {q.label}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-6 leading-relaxed">
                      "{q.question}"
                    </h3>
                  </div>

                  <div className="border-t border-slate-900 pt-4">
                    <button
                      id={`btn-toggle-answer-${q.id}`}
                      onClick={() => toggleQuestion(q.id)}
                      className="inline-flex items-center space-x-2 text-xs sm:text-sm text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
                    >
                      <span>{isOpen ? "Ẩn gợi ý mổ xẻ phân tích" : "Xem gợi ý mổ xẻ phân tích học thuật"}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`guideline-content-${q.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-4 bg-slate-950 p-4 rounded-xl border border-slate-900"
                        >
                          <div className="flex items-center space-x-1.5 text-xs text-amber-500 mb-2">
                            <Scale className="w-3.5 h-3.5" />
                            <span className="font-bold tracking-wider uppercase font-mono">Định hướng giải quyết:</span>
                          </div>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {q.guideline}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
