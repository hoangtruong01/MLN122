/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitCompareArrows, Building2, Landmark, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function ComparisonSection() {
  const { title, subtitle, leftLabel, rightLabel, rows } = presentationData.comparison;

  return (
    <section id="so-sanh" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <GitCompareArrows className="w-3.5 h-3.5 text-emerald-400" />
            <span>Phân biệt hai mô hình</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block rounded-3xl border border-slate-800 overflow-hidden shadow-2xl" id="comparison-table">
          {/* Column header row */}
          <div className="grid grid-cols-12 bg-slate-950/80 border-b border-slate-800">
            <div className="col-span-2 p-5 flex items-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono">Tiêu chí</span>
            </div>
            <div className="col-span-5 p-5 border-l border-slate-800/80 bg-rose-950/15">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <Building2 className="w-4 h-4" />
                </span>
                <span className="text-sm font-bold text-rose-300">{leftLabel}</span>
              </div>
            </div>
            <div className="col-span-5 p-5 border-l border-slate-800/80 bg-emerald-950/15">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Landmark className="w-4 h-4" />
                </span>
                <span className="text-sm font-bold text-emerald-300">{rightLabel}</span>
              </div>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.08 }}
              className={`grid grid-cols-12 group transition-colors ${
                idx % 2 === 0 ? "bg-slate-950/30" : "bg-slate-950/10"
              } ${idx !== rows.length - 1 ? "border-b border-slate-800/60" : ""} hover:bg-slate-900/50`}
            >
              <div className="col-span-2 p-5 flex items-center">
                <span className="text-sm font-bold text-white leading-snug">{row.criterion}</span>
              </div>
              <div className="col-span-5 p-5 border-l border-slate-800/60">
                <p className="text-[13px] text-slate-350 leading-relaxed">{row.capitalist}</p>
              </div>
              <div className="col-span-5 p-5 border-l border-slate-800/60 relative">
                <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-500/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[13px] text-slate-200 leading-relaxed">{row.socialist}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= MOBILE STACKED CARDS ================= */}
        <div className="md:hidden space-y-5" id="comparison-cards-mobile">
          {rows.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-3xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-xl"
            >
              <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800">
                <span className="text-sm font-bold text-white">{row.criterion}</span>
              </div>
              <div className="p-5 border-b border-slate-900 bg-rose-950/10">
                <div className="flex items-center space-x-2 mb-2 text-rose-300">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{leftLabel}</span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">{row.capitalist}</p>
              </div>
              <div className="p-5 bg-emerald-950/10">
                <div className="flex items-center space-x-2 mb-2 text-emerald-300">
                  <Landmark className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{rightLabel}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{row.socialist}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= KEY TAKEAWAY ================= */}
        <div className="mt-12 p-6 bg-gradient-to-r from-rose-950/15 via-slate-950/40 to-emerald-950/20 border border-slate-800 rounded-2xl flex items-start gap-4" id="comparison-takeaway">
          <span className="hidden sm:flex flex-shrink-0 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ArrowRight className="w-5 h-5" />
          </span>
          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
            <strong className="text-white">Khác biệt mấu chốt:</strong> cả hai mô hình đều vận hành theo các quy luật của thị trường, nhưng kinh tế thị trường định hướng XHCN đặt mục tiêu phục vụ nhân dân và gắn tăng trưởng với công bằng xã hội ngay trong từng chính sách — thay vì để thị trường tự do quyết định tất cả. Đây chính là cơ sở để Nhà nước can thiệp vào bài toán nhà ở xã hội.
          </p>
        </div>

      </div>
    </section>
  );
}
