/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AlertTriangle, HelpCircle, ArrowRightLeft, Building2, UserCheck, Flame, Scale, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function SituationSection() {
  const { title, subtitle, narrative, infographics } = presentationData.situation;
  const { title: discTitle, subtitle: discSubtitle, questions } = presentationData.discussion;

  // Active state for discussion questions guidelines drawer
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

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

        {/* ================= CONTENT & INFOGRAPHICS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Col: Narrative & Dilemma box */}
          <div className="lg:col-span-7 space-y-6" id="situation-narrative">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative">
              <div className="absolute top-4 right-4 text-emerald-500/10"><Building2 className="w-12 h-12" /></div>
              <h3 className="text-lg font-bold text-teal-300 mb-3 flex items-center gap-1.5ClassName">
                <span className="w-2 h-2 rounded-full bg-teal-400" /> Nhu cầu thực tế thế hệ trẻ
              </h3>
              <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                {narrative.problem}
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative">
              <div className="absolute top-4 right-4 text-rose-500/10"><Flame className="w-12 h-12" /></div>
              <h3 className="text-lg font-bold text-rose-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Động cơ tối đa lợi nhuận của doanh nghiệp
              </h3>
              <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                {narrative.challenge}
              </p>
            </div>

            {/* Dilemma Warning Box */}
            <motion.div
              initial={{ scale: 0.98 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-red-950/40 to-amber-950/40 border border-red-500/20 rounded-2xl flex items-start space-x-4 shadow-xl"
              id="situation-dilemma-box"
            >
              <div className="p-3 bg-red-900/30 rounded-xl text-red-400 border border-red-500/20 mt-1">
                <ArrowRightLeft className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-red-300 mb-1">Mâu thuẫn nan giải (Trọng tâm bài học)</h4>
                <p className="text-sm text-amber-200 leading-relaxed font-medium">
                  "{narrative.dilemma}"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Col: Interactive Visual Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4" id="situation-metrics">
            {infographics.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-b from-slate-900 to-slate-950/70 border border-slate-850 p-5 rounded-2xl hover:border-slate-700 hover:shadow-lg transition-all text-left"
              >
                <span className="text-xs font-semibold text-slate-500 block mb-2">{info.label}</span>
                <div className="flex items-baseline mb-1">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{info.value}</span>
                  <span className="text-xs font-bold text-teal-400 ml-1.5">{info.unit}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{info.desc}</p>
              </motion.div>
            ))}
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
                  className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-950/80 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                      {q.id.toUpperCase()} - {q.label}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-6 leading-relaxed">
                      "{q.question}"
                    </h3>
                  </div>

                  <div className="border-t border-slate-950 pt-4">
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
