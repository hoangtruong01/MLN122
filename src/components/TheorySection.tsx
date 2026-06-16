/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TrendingUp, Scale, Shield, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import { presentationData, ContextCard, TheoryCard } from "../data/presentationData";

export default function TheorySection() {
  const { title: contextTitle, description: contextDesc, cards: contextCards } = presentationData.context;
  const { title: theoryTitle, subtitle: theorySubtitle, sections: theorySections } = presentationData.theory;

  const [activeTheoryId, setActiveTheoryId] = useState<string | null>("sec-511");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Helper to render icons dynamically
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className={className} />;
      case "ShieldAlert":
        return <Shield className={className} />;
      case "Scale":
        return <Scale className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  return (
    <section id="ly-thuyet" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION: BỐI CẢNH BÀI HỌC ================= */}
        <div id="section-boi-canh" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Bối cảnh bài học</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6"
            >
              {contextTitle}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed"
            >
              {contextDesc}
            </motion.p>
          </div>

          {/* 3 Context Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contextCards.map((card, index) => {
              const borderColors: { [key: string]: string } = {
                blue: "border-blue-500/30 group-hover:border-blue-400/60 shadow-blue-500/5",
                teal: "border-teal-500/30 group-hover:border-teal-400/60 shadow-teal-500/5",
                purple: "border-purple-500/30 group-hover:border-purple-400/60 shadow-purple-500/5",
              };
              const iconColors: { [key: string]: string } = {
                blue: "text-blue-400 bg-blue-950/50",
                teal: "text-teal-400 bg-teal-950/50",
                purple: "text-purple-400 bg-purple-950/50",
              };

              return (
                <motion.div
                  key={card.id}
                  id={`context-card-${card.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative p-6 sm:p-8 bg-slate-950/50 border rounded-2xl shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                    borderColors[card.color] || "border-slate-800"
                  }`}
                >
                  <div>
                    <div className={`p-3 rounded-xl w-fit mb-6 ${iconColors[card.color]}`}>
                      {renderIcon(card.icon, "w-6 h-6")}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {card.shortDesc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-900">
                    <p className="text-slate-500 text-xs italic leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION: NỘI DUNG LÝ THUYẾT CHÍNH ================= */}
        <div id="section-ly-thuyet-chinh" className="pt-12 border-t border-slate-800/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nội Dung Trọng Tâm</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {theoryTitle}
            </h2>
            <p className="text-slate-400 text-base">
              {theorySubtitle}
            </p>
          </div>

          {/* Theory Split Screen Layout (Left: Grid of Cards, Right: High-impact Interactive Slide detailing contents of active card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col - Card Grid */}
            <div className="lg:col-span-6 space-y-4" id="theory-left-cards">
              {theorySections.map((sect) => {
                const isActive = activeTheoryId === sect.id;
                return (
                  <button
                    key={sect.id}
                    id={`theory-tab-${sect.id}`}
                    onClick={() => setActiveTheoryId(sect.id)}
                    onMouseEnter={() => setHoveredCard(sect.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-950/40 to-slate-950/80 border-blue-500/40 shadow-blue-500/5 shadow-2xl"
                        : "bg-slate-950/20 border-slate-850 hover:bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    {/* Active dynamic gradient accent lines */}
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-teal-400 to-purple-500 animate-pulse" />
                    )}

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-blue-400 text-xs font-bold font-mono space-x-1 mb-2.5">
                          Mục {sect.code}
                        </span>
                        <h4 className={`text-base sm:text-lg font-bold transition-colors ${
                          isActive ? "text-blue-300" : "text-white group-hover:text-blue-200"
                        }`}>
                          {sect.title}
                        </h4>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                          {sect.summary}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 mt-1">
                        <ArrowRight className={`w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-all ${
                          isActive ? "rotate-90 text-blue-400 lg:rotate-0" : ""
                        }`} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Col - High-fidelity Detail Presentation Panel */}
            <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[440px] shadow-2xl flex flex-col justify-between relative" id="theory-right-detail">
              {/* Nice top glowing strip */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              
              {theorySections.map((sect) => {
                if (sect.id !== activeTheoryId) return null;
                return (
                  <div key={sect.id} className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-black font-mono text-blue-500/20">{sect.code}</span>
                          <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-mono">Chi tiết thuyết trình</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                          <Tag className="w-3 h-3" />
                          <span>Trọng tâm thi</span>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight leading-snug">
                        {sect.title}
                      </h3>

                      <div className="space-y-4">
                        {sect.content.map((point, idx) => (
                          <div key={idx} className="flex items-start space-x-3 group">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400 mt-2.5 group-hover:scale-125 transition-transform" />
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-900 bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                      <p className="text-xs text-slate-400 font-medium">Bản chất rút ra:</p>
                      <p className="text-xs text-blue-400 mt-1 font-mono tracking-wide">
                        {sect.importance}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
