/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Check, ClipboardList, ShieldAlert, Zap, Layers, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { presentationData, PolicyItem } from "../data/presentationData";

export default function PolicySection() {
  const { title, subtitle, items } = presentationData.policies;

  // Track checked policies for interactive Government Action score simulation
  const [activePolicyIds, setActivePolicyIds] = useState<string[]>(
    items.slice(0, 3).map((item) => item.id) // Default first 3 active
  );

  const togglePolicy = (id: string) => {
    if (activePolicyIds.includes(id)) {
      setActivePolicyIds(activePolicyIds.filter((item) => item !== id));
    } else {
      setActivePolicyIds([...activePolicyIds, id]);
    }
  };

  const selectAll = () => {
    setActivePolicyIds(items.map((item) => item.id));
  };

  const resetAll = () => {
    setActivePolicyIds([]);
  };

  // Compute stats
  const totalCount = items.length;
  const activeCount = activePolicyIds.length;
  const percentage = Math.round((activeCount / totalCount) * 100);

  return (
    <section id="giai-phap" className="py-24 bg-slate-950 text-white relative">
      {/* Decorative gradients */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Công cụ vĩ mô chính sách</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* ================= POLICY PANEL INTERACTIVE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="policy-content-grid">
          
          {/* Left Block: Interactive Checklist */}
          <div className="lg:col-span-7 space-y-4" id="policy-checklist">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-mono">
                Danh mục đòn bẩy vĩ mô ({items.length})
              </span>
              <div className="flex space-x-3 text-xs">
                <button
                  id="btn-policy-select-all"
                  onClick={selectAll}
                  className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                >
                  Kích hoạt tất cả
                </button>
                <span className="text-slate-700">|</span>
                <button
                  id="btn-policy-reset"
                  onClick={resetAll}
                  className="text-slate-400 hover:text-slate-300 font-semibold cursor-pointer"
                >
                  Xóa chọn
                </button>
              </div>
            </div>

            {items.map((item) => {
              const isChecked = activePolicyIds.includes(item.id);
              const getCategoryBadge = (cat: string) => {
                switch (cat) {
                  case "Hỗ trợ":
                    return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
                  case "Điều tiết":
                    return "bg-blue-950/40 text-blue-400 border-blue-500/20";
                  case "Quản lý":
                    return "bg-purple-950/40 text-purple-400 border-purple-500/20";
                  default:
                    return "bg-slate-900 text-slate-400 border-slate-800";
                }
              };

              return (
                <button
                  key={item.id}
                  id={`policy-item-${item.id}`}
                  onClick={() => togglePolicy(item.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start space-x-4 cursor-pointer relative ${
                    isChecked
                      ? "bg-slate-900/60 border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                      : "bg-slate-950/40 border-slate-850 hover:border-slate-750"
                  }`}
                >
                  <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                    isChecked
                      ? "bg-emerald-500 border-emerald-400 text-slate-950"
                      : "border-slate-700 hover:border-slate-600 bg-slate-900"
                  }`}>
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 font-mono">
                        Tác động: {item.impact}
                      </span>
                    </div>
                    <h4 className={`text-base font-bold transition-colors ${
                      isChecked ? "text-emerald-300 font-semibold" : "text-white"
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Simulated Impact / Dashboard view */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-850 p-6 sm:p-8 rounded-3xl sticky top-28 shadow-2xl" id="policy-simulation-panel">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            
            <div className="flex items-center space-x-2 text-emerald-400 mb-6">
              <Zap className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
              <span className="text-xs font-bold uppercase tracking-widest font-mono">Simulated Impact Assessment</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Đánh Giá Hiệu Lực Can Thiệp</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">
              Kéo kích hoạt danh mục chính sách bên cạnh để đo đếm khả năng đáp ứng mục tiêu dân sinh của cơ chế Chính phủ.
            </p>

            {/* Simulated Progress bar */}
            <div className="mb-8" id="policy-progress-container">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider font-mono">Hiệu lực can thiệp vĩ mô</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{percentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <motion.div
                  id="policy-progress-bar"
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: "spring", stiffness: 80 }}
                  className={`h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400`}
                />
              </div>
            </div>

            {/* Detailed Evaluation Remarks */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4" id="policy-evaluation-box">
              <div className="flex items-start space-x-3 text-left">
                <div className="p-1.5 bg-slate-900 rounded-lg text-slate-400 font-mono text-[10px] uppercase font-bold mt-0.5">
                  STATUS
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold font-mono">ĐÁNH GIÁ CHUNG:</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {percentage === 0 && "Chưa áp dụng chính sách nào. Thị trường tự do hoàn toàn có thể dẫn đến thất bại hệ thống."}
                    {percentage > 0 && percentage <= 40 && "Can thiệp tối thiểu. Doanh nghiệp vẫn ưu tiên tối đa hóa lợi nhuận thương mại, nhà ở xã hội hầu như bị bế tắc."}
                    {percentage > 40 && percentage <= 80 && "Mô hình ổn định trung độ. Kết hợp đòn bẩy thuế đất và tiền tệ giúp bắt đầu tháo gỡ khó khăn cho các bên."}
                    {percentage > 80 && "Vận hành hoàn chỉnh định hướng XHCN. Sự kết hợp lý tưởng giữa bàn tay vô hình thị trường tạo vốn đầu tư và bàn tay hữu hình điều tiết sâu sắc của Nhà nước."}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-900 pt-4 text-center">
                <p className="text-[11px] text-slate-500 italic">
                  *Bộ công cụ được lập luận dựa trên Nghị định 100/2024/NĐ-CP hướng dẫn Luật Nhà ở vĩ mô tại Việt Nam.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
