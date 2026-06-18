/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, SVGProps } from "react";
import { MessageSquareText, Search, User, HelpCircle, Send, Plus, ChevronDown, Check, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { presentationData, FAQItem } from "../data/presentationData";

export default function QASection() {
  const { title, subtitle, description, faqs: defaultFaqs } = presentationData.qa;
  const { copyright, academicYear, studentGroup } = presentationData.footer;

  // Search filter
  const [searchTerm, setSearchTerm] = useState("");
  // Expanded FAQ ID
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");
  // Custom user queries states
  const [customFaqs, setCustomFaqs] = useState<FAQItem[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Filter default FAQs + custom ones
  const allFaqs = [...defaultFaqs, ...customFaqs];
  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmitting(true);
    const questionText = newQuestion;
    setNewQuestion("");

    // Simulate smart political eco helper answer after delay
    setTimeout(() => {
      const generatedAnswer = generateSimulatedAnswer(questionText);
      const newFaq: FAQItem = {
        id: `custom-${Date.now()}`,
        category: "Khán giả đặt câu hỏi",
        question: questionText,
        answer: generatedAnswer,
      };

      setCustomFaqs((prev) => [newFaq, ...prev]);
      setExpandedId(newFaq.id);
      setSubmitting(false);
    }, 1500);
  };

  // Help generate high quality simulated answers based on keywords
  const generateSimulatedAnswer = (qText: string): string => {
    const text = qText.toLowerCase();
    if (text.includes("doanh nghiệp") || text.includes("lợi nhuận")) {
      return "Dưới góc độ Kinh tế chính trị, doanh nghiệp luôn tìm cách tối đa hóa lợi tức thặng dư. Lợi ích tư nhân này hoàn toàn hợp pháp và là động cơ thúc đẩy thị trường phát triển mạnh mẽ. Tuy nhiên, tính định hướng XHCN đòi hỏi Nhà nước phải dẫn dắt lợi ích doanh nghiệp hài hòa với lợi ích công cộng thông qua chính sách pháp luật đất đai và hỗ trợ thuế quan thiết thực.";
    }
    if (text.includes("nhà nước") || text.includes("can thiệp")) {
      return "Chúng ta khẳng định Nhà nước định hướng XHCN không can thiệp cơ học hay phản thị trường. Trái lại, Nhà nước dùng luật chơi bình đẳng, kiến tạo hạ tầng pháp lý, điều hòa cung cầu và thiết lập phúc lợi xã hội (đặc biệt là nhà ở, y tế, giáo dục) làm bệ phóng vững vàng để bảo hộ quyền tự do kinh doanh của nhân dân toàn diện.";
    }
    if (text.includes("giá" ) || text.includes("tiền") || text.includes("trợ cấp")) {
      return "Chính sách giá cho nhà ở thương mại hoàn toàn tuân thủ cung cầu tự do. Nhưng với hàng hóa an sinh như nhà ở xã hội, việc Nhà nước khống chế biên lợi nhuận ròng của doanh nghiệp và cung cấp vốn vay ưu đãi kéo dài là phương pháp tài chính kỹ thuật đặc biệt, giúp triệt tiêu yếu tố đầu cơ tích trữ, kéo giá trị cốt lõi về đúng giá trị sử dụng đích thực.";
    }
    return "Cảm ơn câu hỏi sâu sắc của bạn! Chủ đề bạn nêu phản ánh trực tiếp nguyên lý Chương 5: Thống nhất biện chứng giữa phát triển lực lượng sản xuất sắc bén và bảo đảm an sinh xã hội toàn dân. Sự kiểm soát chặt chẽ của Nhà nước kết hợp cơ chế thỏa thuận thương mại thị trường chính là công thức trung tâm giúp Việt Nam đạt được mục tiêu dân sinh công bằng.";
  };

  return (
    <section id="qa" className="py-24 bg-slate-900 text-white relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Phần hỏi & đáp tương tác</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* ================= INTERACTIVE Q&A FORUM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24" id="qa-forum-grid">
          
          {/* Left Block: Search & FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6" id="qa-accordion-panel">
            {/* Search Input bar */}
            <div className="relative">
              <Search className="absolute left-4 top-2/5 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                id="qa-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm nhanh nội dung câu hỏi phản biện lý thuyết..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors shadow-inner"
              />
            </div>

            {/* Accordion container */}
            <div className="space-y-4" id="qa-faqs-accordion">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedId === faq.id;
                  const isCustom = faq.id.startsWith("custom-");

                  return (
                    <div
                      key={faq.id}
                      id={`qa-item-${faq.id}`}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? "bg-slate-950/85 border-blue-500/40 shadow-lg shadow-blue-500/5"
                          : "bg-slate-950/40 border-slate-850 hover:border-slate-750"
                      }`}
                    >
                      {/* Accordion Header button toggle */}
                      <button
                        id={`btn-qa-toggle-${faq.id}`}
                        onClick={() => handleToggle(faq.id)}
                        className="w-full px-5 py-4 sm:py-5 flex items-start justify-between text-left cursor-pointer transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border mb-2.5 ${
                            isCustom
                              ? "bg-purple-950/40 text-purple-400 border-purple-500/20"
                              : "bg-blue-950/40 text-blue-400 border-blue-500/10"
                          }`}>
                            {faq.category}
                          </span>
                          <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                            isExpanded ? "text-blue-300 font-semibold" : "text-white"
                          }`}>
                            {faq.question}
                          </h4>
                        </div>
                        <span className={`ml-2 mt-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                          isExpanded ? "rotate-180 text-blue-400 border-blue-500/20" : ""
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>

                      {/* Accordion Answer Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`qa-answer-content-${faq.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-slate-900 bg-slate-950/30 overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line border-l-2 border-blue-500">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-slate-950/20 border border-slate-850 rounded-2xl" id="qa-empty-state">
                  <HelpCircle className="w-8 h-8 text-slate-650 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Không tìm thấy câu hỏi phù hợp với thuật ngữ của bạn.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Block: Ask a New Question Form (Mock simulation) */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-850 rounded-3xl p-6 sm:p-8 shadow-2xl relative sticky top-28" id="qa-ask-form-panel">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="flex items-center space-x-2 text-blue-400 mb-6 font-mono font-bold text-xs uppercase tracking-widest">
              <Zap className="w-4.5 h-4.5" />
              <span>Simulated Q&A AI Engine</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Đăng câu hỏi phản biện của bạn</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Bạn có thể tự gõ thử một câu hỏi bất kỳ dưới đây (Vd: nhập các từ khóa như 'Doanh nghiệp', 'Nhà nước', 'Can thiệp'). Hệ thống mô phỏng học thuyết chính trị Chương 5 sẽ trả lời tức thì!
            </p>

            <form onSubmit={handleAskQuestion} className="space-y-4" id="qa-custom-form">
              <div className="relative">
                <textarea
                  id="qa-textarea-input"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Vd: Tại sao Doanh nghiệp lại từ chối xây nhà ở xã hội?... "
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors resize-none scrollbar-none"
                />
              </div>

              <button
                id="btn-submit-qa"
                type="submit"
                disabled={submitting || !newQuestion.trim()}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold rounded-2xl active:scale-95 transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshIcon className="animate-spin w-4 h-4" />
                    <span>Hệ thống đang lập luận phân tích...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi câu hỏi lên diễn đàn</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-slate-900 mt-6 flex items-center space-x-3 text-left">
              <div className="p-2.5 bg-blue-950/80 border border-blue-500/20 text-blue-400 rounded-xl">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 italic">Trưởng nhóm kiểm soát:</p>
                <p className="text-xs font-semibold text-slate-350">Hệ thống hỗ trợ đỗ kết quả tự động MLN122_C5</p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= FOOTER LANDING PAGE SIGNATURE ================= */}
        <footer className="pt-16 border-t border-slate-850 text-center space-y-6" id="qa-footer">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-xs sm:text-sm text-slate-500 font-medium">
            <span className="text-slate-400">{studentGroup}</span>
            <span className="bg-slate-950 border border-slate-850 px-3.5 py-1.5 rounded-full font-mono text-[10px] sm:text-xs">
              {academicYear}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600">
            {copyright}
          </p>
        </footer>

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
