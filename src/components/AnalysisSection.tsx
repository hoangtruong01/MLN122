/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Layers, Award, Sparkles, Pin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function AnalysisSection() {
  const { title, subtitle, pillars } = presentationData.analysis;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the vertical height of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate translation range for horizontal scrolling on desktop
  const x = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "-35%"]);
  
  // Calculate width for progress bar at the bottom
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Detect screen size for responsive scroll behaviors
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${isLargeScreen ? "h-[250vh]" : "h-auto py-24"} bg-slate-900 border-y border-slate-950`}
    >
      <div className={`${isLargeScreen ? "sticky top-0 h-screen flex flex-col justify-center overflow-hidden" : "relative"}`}>
        
        {/* Decorative Grid and Blur */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
          {/* ================= HEADER ================= */}
          <div className="text-center max-w-3xl mx-auto">
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
        </div>

        {/* ================= PILLARS CONTAINER ================= */}
        <div className="w-full relative z-10">
          <motion.div 
            style={{ x: isLargeScreen ? x : 0 }}
            className={`flex ${isLargeScreen ? "flex-row px-24 w-[140vw]" : "flex-col px-4 gap-8 max-w-7xl mx-auto"} gap-8`}
            id="analysis-pillars-grid"
          >
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
                    return "border-rose-500/20 hover:border-rose-500/40 bg-slate-950/40 shadow-rose-500/2";
                  case 1:
                    return "border-teal-500/20 hover:border-teal-500/40 bg-slate-950/40 shadow-teal-500/2";
                  case 2:
                    return "border-purple-500/20 hover:border-purple-500/40 bg-slate-950/40 shadow-purple-500/2";
                  default:
                    return "border-slate-800 bg-slate-950/40";
                }
              };

              return (
                <div
                  key={pillar.id}
                  id={`analysis-pillar-card-${pillar.id}`}
                  className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between shadow-2xl transition-all duration-300 ${
                    isLargeScreen ? "w-[30vw] min-w-[380px]" : "w-full"
                  } ${getColorStyles(idx)}`}
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

                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-350 text-xs font-semibold mb-4">
                      {pillar.badge}
                    </span>

                    <h3 className="text-xl font-bold text-white mb-6">
                      {pillar.title}
                    </h3>

                    <ul className="space-y-4 mb-8">
                      {pillar.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start text-xs sm:text-sm text-slate-350 leading-relaxed font-normal">
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
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ================= SUMMARY NOTE & TRACKING PROGRESS ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12 space-y-8">
          <div className="p-6 bg-gradient-to-r from-blue-950/20 to-teal-950/20 border border-blue-500/10 rounded-2xl text-center" id="analysis-summary-note">
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed max-w-4xl mx-auto">
              <strong className="text-white">Điểm cốt lõi lý luận:</strong> Phát triển nhà ở xã hội không phải là gánh nặng hành chính, mà là việc hiện sắc nét tính ưu việt của phát triển bền vững đi đôi với công bằng xã hội thuộc bản chất riêng của kinh tế thị trường định hướng XHCN Việt Nam.
            </p>
          </div>

          {/* Desktop Visual Scroll Indicator */}
          {isLargeScreen && (
            <div className="w-full flex items-center justify-between max-w-xl mx-auto pt-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-650 font-mono">Cuộn tiếp để xem</span>
              <div className="flex-1 mx-6 h-1 bg-slate-950 rounded-full overflow-hidden relative">
                <motion.div 
                  style={{ width: progressBarWidth }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-teal-400"
                />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-650 font-mono">Hoàn thành</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
