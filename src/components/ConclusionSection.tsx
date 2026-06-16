/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Milestone, Flag, Trophy, Target } from "lucide-react";
import { motion } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function ConclusionSection() {
  const { title, subtitle, lessons } = presentationData.conclusion;

  return (
    <section id="ket-luan" className="py-24 bg-slate-950 text-white relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Milestone className="w-3.5 h-3.5 text-blue-400" />
            <span>Thông điệp kết luận</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ================= 3 CONCLUSION LESSONS BENTO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" id="conclusion-grid">
          {lessons.map((less, idx) => {
            const getIcon = (i: number) => {
              switch (i) {
                case 0:
                  return <Flag className="w-6 h-6 text-blue-400" />;
                case 1:
                  return <Target className="w-6 h-6 text-teal-400" />;
                case 2:
                  return <Trophy className="w-6 h-6 text-purple-400" />;
                default:
                  return <Milestone className="w-6 h-6 text-blue-400" />;
              }
            };

            const getColorDecoration = (i: number) => {
              switch (i) {
                case 0:
                  return "border-blue-500/20 hover:border-blue-500/40 from-blue-950/20";
                case 1:
                  return "border-teal-500/20 hover:border-teal-500/40 from-teal-950/20";
                case 2:
                  return "border-purple-500/20 hover:border-purple-500/40 from-purple-950/20";
                default:
                  return "border-slate-850 from-slate-900/40";
              }
            };

            return (
              <motion.div
                key={idx}
                id={`conclusion-card-${idx}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group p-6 sm:p-8 rounded-3xl border bg-gradient-to-b to-slate-950/60 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 ${getColorDecoration(idx)}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-900/80">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-905">
                      {getIcon(idx)}
                    </div>
                    <span className="text-3xl font-black font-mono text-slate-800 tracking-tight group-hover:text-slate-700/80 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono display-block mb-3">
                    {less.keyword}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                    {less.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                    {less.desc}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 pt-4 border-t border-slate-900 text-[11px] font-semibold text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Bài học cốt lõi Việt Nam</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ending Quote block */}
        <div className="text-center pt-8 border-t border-slate-900 max-w-4xl mx-auto" id="conclusion-summary-block">
          <p className="text-sm font-medium text-slate-500 tracking-wider uppercase font-mono mb-2">Thông điệp cốt lõi chương học</p>
          <blockquote className="text-xl font-bold tracking-tight text-slate-350 italic">
            "Không hy sinh tiến bộ và công bằng xã hội để chạy theo tăng trưởng kinh tế đơn thuần."
          </blockquote>
        </div>

      </div>
    </section>
  );
}
