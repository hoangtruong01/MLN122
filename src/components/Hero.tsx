/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Play, Landmark, Sparkles, Building2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { presentationData } from "../data/presentationData";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { badge, title, subtitle, ctaStart, ctaSituation } = presentationData.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse" />

      {/* Decorative Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Badge */}
        <motion.div
          id="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg shadow-blue-500/10 mb-8"
        >
          <Sparkles className="h-4 w-4 text-amber-400 stroke-[2.5]" />
          <span>{badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black lg:font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-[1.1] max-w-5xl mx-auto"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          id="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            id="btn-start-presentation"
            onClick={() => onNavigate("ly-thuyet")}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 hover:scale-[1.02] active:shadow-md transition-all duration-300 cursor-pointer text-base"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>{ctaStart}</span>
          </button>
          
          <button
            id="btn-goto-situation"
            onClick={() => onNavigate("tinh-huong")}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-2xl border border-slate-700/80 hover:border-slate-600 active:scale-95 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-base"
          >
            <span>{ctaSituation}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Interactive Visual Dashboard teaser / Quick Stats */}
        <motion.div
          id="hero-teaser"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded-full">
              STATUS: THUYẾT TRÌNH LIVE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-900 hover:border-slate-850/80 transition-colors">
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Landmark className="h-4 w-4" />
                <span className="text-xs uppercase font-bold tracking-wider font-mono">Chủ đề lý luận</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Mô hình kinh tế thị trường định hướng XHCN</h3>
              <p className="text-xs text-slate-400">Các quy luật thị trường kết hợp định hướng xã hội chủ nghĩa nhân văn.</p>
            </div>

            <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-900 hover:border-slate-850/80 transition-colors">
              <div className="flex items-center space-x-2 text-teal-400 mb-2">
                <Building2 className="h-4 w-4" />
                <span className="text-xs uppercase font-bold tracking-wider font-mono">Thực tiễn mâu thuẫn</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Nhà ở xã hội & nhà thương mại cao cấp</h3>
              <p className="text-xs text-slate-400">Doanh nghiệp tối ưu lợi nhuận đẩy giá trị bất động sản lên cao vượt tầm tay.</p>
            </div>

            <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-900 hover:border-slate-850/80 transition-colors">
              <div className="flex items-center space-x-2 text-purple-400 mb-2">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-xs uppercase font-bold tracking-wider font-mono">Nhiệm vụ quản lý</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Giải pháp vĩ mô vì dân sinh</h3>
              <p className="text-xs text-slate-400">Tái lập sự công bằng, an cư lập nghiệp và hài hòa lợi ích các bên.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
