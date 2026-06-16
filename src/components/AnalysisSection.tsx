/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Layers, Award, Sparkles, Pin } from "lucide-react";
import { motion } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function AnalysisSection() {
  const { title, subtitle, pillars } = presentationData.analysis;

  return (
    <section id="phan-tich" className="py-24 bg-slate-900 border-y border-slate-900 text-white relative">
      {/* Decorative Grid and Blur */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Phân tích học thuyết lý luận</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* ================= 3-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16" id="analysis-pillars-grid">
          {pillars.map((pillar, idx) => {
            // Pick appropriate icon based on index
            const getIcon = (i: number) => {
              switch (i) {
                case 0:
                  return <Layers className="w-6 h-6 text-rose-400" />;
                case 1:
                  return <ShieldCheck className="w-6 h-6 text-teal-400" />;
                case 2:
                  return <Award className="w-6 h-6 text-purple-400" />;
                default:
                  return <Sparkles className="w-6 h-6 text-blue-400" />;
              }
            };

            const getColorStyles = (i: number) => {
              switch (i) {
                case 0:
                  return "border-rose-500/20 hover:border-rose-500/40 bg-slate-950/40";
                case 1:
                  return "border-teal-500/20 hover:border-teal-500/40 bg-slate-950/40";
                case 2:
                  return "border-purple-500/20 hover:border-purple-500/40 bg-slate-950/40";
                default:
                  return "border-slate-800 bg-slate-950/40";
              }
            };

            return (
              <motion.div
                key={pillar.id}
                id={`analysis-pillar-card-${pillar.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between shadow-2xl transition-all duration-300 ${getColorStyles(idx)}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      {getIcon(idx)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-500">
                      CỘT 0{idx + 1}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-805 text-slate-300 text-xs font-semibold mb-4">
                    {pillar.badge}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-6">
                    {pillar.title}
                  </h3>

                  <ul className="space-y-4 mb-8">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-900 bg-slate-950/60 p-4 rounded-xl border border-slate-900/80">
                  <div className="flex items-center space-x-1.5 mb-1.5 text-[11px] text-amber-500 font-bold font-mono uppercase tracking-wider">
                    <Pin className="w-3 h-3" />
                    <span>Bài học thực tế</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 italic leading-relaxed">
                    "{pillar.illustration}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* High impact background note of Socialist-oriented state */}
        <div className="p-6 bg-gradient-to-r from-blue-950/20 to-teal-950/20 border border-blue-500/10 rounded-2xl text-center" id="analysis-summary-note">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl mx-auto">
            <strong className="text-white">Điểm cốt lõi lý luận:</strong> Phát triển nhà ở xã hội không phải là gánh nặng hành chính, mà là việc hiện sắc nét tính ưu việt của phát triển bền vững đi đôi với công bằng xã hội thuộc bản chất riêng của kinh tế thị trường định hướng XHCN Việt Nam.
          </p>
        </div>

      </div>
    </section>
  );
}
