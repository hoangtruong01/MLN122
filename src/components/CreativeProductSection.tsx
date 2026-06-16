/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, SVGProps } from "react";
import { FileText, Download, Play, Check, Send, Sparkles, X, HeartHandshake, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { presentationData } from "../data/presentationData";

export default function CreativeProductSection() {
  const { title, subtitle, intro, mockDocument } = presentationData.creativeProduct;

  // Customization states
  const [authorName, setAuthorName] = useState("Nhóm 5 - Lớp MLN111_02");
  const [targetCity, setTargetCity] = useState("Hà Nội và TP.HCM");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const startDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 2000);
  };

  return (
    <section id="san-pham" className="py-24 bg-slate-900 text-white relative">
      {/* Decorative glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
            <span>Sản phẩm sáng tạo Chương 5</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {intro}
          </p>
        </div>

        {/* ================= MAIN CONTENT SPLIT WINDOWS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="creative-product-grid">
          
          {/* Left Block: Interactive Customizer Panel */}
          <div className="lg:col-span-4 bg-slate-950/65 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl" id="creative-customizer">
            <div className="flex items-center space-x-2 mb-2 pb-3 border-b border-slate-900/80">
              <Sparkles className="w-4.5 h-4.5 text-purple-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Tùy biến tài liệu kiến nghị</h3>
            </div>

            {/* Input: Author name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Tác giả đề xuất:</label>
              <input
                id="doc-author-input"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2 text-sm text-ellipsis text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                placeholder="Nhập tên nhóm hoặc sinh viên..."
              />
            </div>

            {/* Input: Target regions */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Thành phố trọng tâm:</label>
              <select
                id="doc-city-select"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition-colors"
              >
                <option value="Hà Nội và TP.HCM">Hà Nội và TP.HCM</option>
                <option value="Bình Dương và Đồng Nai">Bình Dương và Đồng Nai</option>
                <option value="Đà Nẵng và Hải Phòng">Đà Nẵng và Hải Phòng</option>
                <option value="Phạm vi Toàn quốc">Phạm vi Toàn quốc</option>
              </select>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-900">
              <button
                id="btn-trigger-download"
                onClick={startDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-2xl active:scale-95 transition-all text-sm cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <RefreshIcon className="animate-spin w-4 h-4" />
                    <span>Đang chuẩn bị PDF tài liệu...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã lưu file thành công!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Tải bản đề nghị chính sách (PDF)</span>
                  </>
                )}
              </button>

              <button
                id="btn-play-video-simulate"
                onClick={() => setIsVideoOpen(true)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-2xl border border-slate-800 hover:border-slate-700 active:scale-95 transition-all text-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-200" />
                <span>Xem sơ đồ đề xuất tương tác</span>
              </button>
            </div>

            <div className="p-4 bg-purple-950/20 rounded-2xl border border-purple-500/10 flex items-start space-x-3 text-left">
              <HeartHandshake className="w-4.5 h-4.5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-[11px] text-purple-300 leading-relaxed font-medium">
                *Bản thảo kiến nghị là sản phẩm trí tuệ hoàn toàn tự tạo của nhóm giúp rèn luyện khả năng tư duy chính trị vĩ mô vào định hình cuộc sống.
              </p>
            </div>
          </div>

          {/* Right Block: Dynamic Mock Document View */}
          <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 relative shadow-2xl font-sans" id="creative-pdf-previewer">
            <div className="absolute top-4 right-6 text-slate-650 text-xs font-mono select-none">
              DỰ THẢO KIẾN NGHỊ · DO{targetCity.toUpperCase().substring(0,6)}
            </div>

            {/* Document Header */}
            <div className="text-center pb-8 border-b border-slate-900 mb-8">
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wide uppercase leading-snug">
                {mockDocument.title}
              </h1>
              <p className="text-[10px] sm:text-xs text-blue-400 font-bold font-mono tracking-wide mt-2">
                {mockDocument.meta}
              </p>
              <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-slate-500 font-mono">
                <span>ĐỀ XUẤT BỞI:</span>
                <span className="text-purple-400 font-bold tracking-wider">{authorName.toUpperCase()}</span>
                <span>|</span>
                <span>ĐỊA BÀN: {targetCity.toUpperCase()}</span>
              </div>
            </div>

            {/* Document Sections */}
            <div className="space-y-8 text-left max-h-[500px] overflow-y-auto pr-2 custom-scrollbar" id="document-scrollbar">
              {mockDocument.sections.map((sec) => (
                <div key={sec.key} className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-extrabold text-blue-300 tracking-wider uppercase font-sans flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{sec.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed whitespace-pre-line pl-3.5 border-l border-slate-900/60 font-normal">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Document Footer stamp */}
            <div className="bg-slate-900/30 p-4 rounded-2xl border border-slate-900 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase font-mono">TRẠNG THÁI</span>
                <p className="text-xs text-emerald-400 font-bold font-mono tracking-wide mt-0.5">CHƯƠNG TRÌNH PHÁT TRIỂN TIỀM NĂNG</p>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                <Check className="w-4 h-4" />
                <span>BẢN THOẢ HỢP LỆ VÀ SẴN SÀNG TRÌNH BÀY</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= INTERACTIVE SIMULATED MODAL (Xem Sơ đồ đề xuất tương tác) ================= */}
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              id="video-sim-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-55 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl text-left"
              >
                <button
                  id="btn-close-video-modal"
                  onClick={() => setIsVideoOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2 text-purple-400 mb-4">
                  <Sparkles className="w-4.5 h-4.5 text-purple-400 stroke-[2.5]" />
                  <span className="text-xs font-bold font-mono uppercase tracking-widest">Sơ Đồ Đề Xuất Tương Tác</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Mô hình giải pháp tổng hóa cho Đề xuất</h3>

                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-dashed border-slate-800 space-y-4">
                    <div className="relative">
                      <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900" />
                      <h4 className="text-sm font-bold text-blue-300">Bước 1: Chuyển giao Đất sạch quy hoạch sẫn</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Nhà nước trực tiếp hoàn thiện quy hoạch hạ tầng kết nối, đền bù và thu hồi đất sạch rồi bàn giao miễn phí hoặc ưu đãi đất rẻ cho doanh nghiệp đạt chuẩn.
                      </p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-900" />
                      <h4 className="text-sm font-bold text-teal-300">Bước 2: Hỗ trợ Tín dụng thông qua Voucher</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Thay vì bao cấp nhà mạng chung, Nhà nước hỗ trợ lãi suất cho người lao động thu nhập thấp thông qua các gói vay số tích hợp (VNeID) nhằm minh bạch tuyệt đối đối tượng tiếp cận quỹ an sinh.
                      </p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-900" />
                      <h4 className="text-sm font-bold text-purple-300">Bước 3: Khống chế giá trần và kiểm soát giám sát đầu cơ</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Yêu cầu chặt chẽ về việc giữ trần lợi nhuận của đơn vị thi công ở mức hợp lý (10-12%) đi cùng việc cấm mua đi bán lại căn hộ trong vòng 5 năm để cắt đứt dòng tiền đầu cơ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                  <button
                    id="btn-modal-close-action"
                    onClick={() => setIsVideoOpen(false)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold rounded-xl text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
                  >
                    Đóng sơ đồ để xuất
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// Simple rotation loader icon component
function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}
