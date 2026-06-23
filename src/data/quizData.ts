/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed index of options
  explanation: string;
}

export type RewardType = "banana" | "small_gift" | "large_gift" | "heart" | "shield" | "unlucky";

export interface Reward {
  type: RewardType;
  name: string;
  icon: string;
  description: string;
  effect: {
    scoreBonus?: number;
    heartsBonus?: number;
    shieldsBonus?: number;
  };
  weight: number; // probability weight for drawing
}

export const quizQuestions: Question[] = [
  {
    id: "q-1",
    question: "Thành phần kinh tế nào nắm giữ vai trò chủ đạo trong nền kinh tế thị trường định hướng XHCN ở Việt Nam?",
    options: [
      "A. Kinh tế tập thể",
      "B. Kinh tế nhà nước",
      "C. Kinh tế tư nhân",
      "D. Kinh tế có vốn đầu tư nước ngoài (FDI)"
    ],
    correctAnswer: 1,
    explanation: "Theo Hiến pháp và các văn kiện Đại hội Đảng, kinh tế nhà nước đóng vai trò chủ đạo, là công cụ vật lý quan trọng để Nhà nước điều tiết vĩ mô."
  },
  {
    id: "q-2",
    question: "Đâu là đặc trưng cốt lõi về mục tiêu phát triển phân biệt KTTT định hướng XHCN với KTTT tư bản chủ nghĩa?",
    options: [
      "A. Tối đa hóa lợi nhuận thặng dư cho tầng lớp tư sản",
      "B. Giải quyết việc làm bán thời gian cho đa số thanh niên",
      "C. Phát triển lực lượng sản xuất, thực hiện 'dân giàu, nước mạnh, dân chủ, công bằng, văn minh'",
      "D. Xóa bỏ hoàn toàn cơ chế thị trường và các quy luật cung cầu tự do"
    ],
    correctAnswer: 2,
    explanation: "Định hướng xã hội chủ nghĩa hướng tới việc phân phối của cải công bằng hơn, thúc đẩy cả lực lượng sản xuất lẫn tiến bộ, an sinh xã hội."
  },
  {
    id: "q-3",
    question: "Dưới góc độ kinh tế chính trị, vì sao Nhà nước định hướng XHCN phải chủ động can thiệp vào thị trường Nhà ở Xã hội?",
    options: [
      "A. Vì thị trường tự do thất bại (Market Failure) trong phân phối công bằng phân khúc bình dân",
      "B. Để ngăn chặn hoàn toàn doanh nghiệp tư nhân tìm kiếm lợi nhuận hợp pháp",
      "C. Để bao cấp 100% tiền nhà cho tất cả công dân sống tại đô thị",
      "D. Để đẩy giá bất động sản cao cấp lên mức kỷ lục"
    ],
    correctAnswer: 0,
    explanation: "Thị trường tự do chỉ phân bổ nguồn lực dựa trên sức mua có khả năng thanh toán. Người nghèo có nhu cầu nhà ở nhưng không đủ tài chính sẽ bị thị trường bỏ qua. Nhà nước cần can thiệp để bảo đảm an sinh xã hội."
  },
  {
    id: "q-4",
    question: "Trong nền KTTT định hướng XHCN, chế độ phân phối nào đóng vai trò thực tế chủ đạo?",
    options: [
      "A. Phân phối hoàn toàn bình quân cào bằng mọi thu nhập",
      "B. Phân phối theo kết quả lao động, hiệu quả kinh tế, mức đóng góp vốn và qua hệ thống an sinh xã hội",
      "C. Chỉ phân phối thông qua các tổ chức quyên góp từ thiện tự nguyện",
      "D. Phân phối độc quyền theo sở hữu gia đình dòng họ"
    ],
    correctAnswer: 1,
    explanation: "Hệ thống phân phối kết hợp đảm bảo cả động lực kinh tế (phần lớn theo lao động và vốn góp) lẫn tính nhân văn xã hội chủ nghĩa (qua quỹ an sinh)."
  },
  {
    id: "q-5",
    question: "Chính sách vĩ mô nào sau đây giúp kích thích doanh nghiệp tư nhân hào hứng xây dựng Nhà ở Xã hội?",
    options: [
      "A. Buộc doanh nghiệp chịu lỗ hoàn toàn và cấm huy động vốn",
      "B. Áp dụng cơ chế hình sự hóa các tranh chấp thương mại",
      "C. Miễn tiền sử dụng đất, giảm 50% thuế VAT/TNDN và tạo gói tín dụng ưu đãi",
      "D. Độc quyền nhà nước toàn bộ chuỗi cung ứng vật liệu xây dựng"
    ],
    correctAnswer: 2,
    explanation: "Bằng cách giảm chi phí thuế và chi phí sử dụng đất, Nhà nước giúp nâng biên lợi nhuận ròng của dự án an sinh lên mức hợp lý (10-12%), thu hút vốn tư nhân."
  },
  {
    id: "q-6",
    question: "Mối quan hệ giữa tăng trưởng kinh tế và công bằng xã hội ở nước ta được chỉ đạo thực hiện như thế nào?",
    options: [
      "A. Chờ kinh tế thật phát triển giàu mạnh rồi mới làm công bằng xã hội",
      "B. Hy sinh công bằng xã hội để ưu tiên tuyệt đối cho tốc độ tăng trưởng GDP",
      "C. Thực hiện tiến bộ và công bằng xã hội ngay trong từng bước đi và từng chính sách phát triển",
      "D. Không cần quan tâm tăng trưởng kinh tế, chỉ cần phân chia cào bằng của cải"
    ],
    correctAnswer: 2,
    explanation: "Đây là một nguyên tắc cơ bản của KTTT định hướng XHCN ở Việt Nam nhằm tránh sự phân cực giàu nghèo sâu sắc ở các nước TBCN thời kỳ đầu."
  },
  {
    id: "q-7",
    question: "Thành phần kinh tế nào được xác định là 'một động lực quan trọng' của nền kinh tế nước ta?",
    options: [
      "A. Kinh tế nhà nước",
      "B. Kinh tế tập thể",
      "C. Kinh tế tư nhân",
      "D. Kinh tế cá thể tiểu thương"
    ],
    correctAnswer: 2,
    explanation: "Đảng và Nhà nước xác định kinh tế nhà nước giữ vai trò chủ đạo, trong khi kinh tế tư nhân là một động lực quan trọng của nền kinh tế thị trường định hướng XHCN."
  },
  {
    id: "q-8",
    question: "Gói tín dụng ưu đãi 120,000 tỷ đồng mua nhà ở xã hội tập trung ưu tiên hỗ trợ cho nhóm đối tượng nào?",
    options: [
      "A. Người nước ngoài sang làm việc ngắn hạn",
      "B. Công nhân, công chức viên chức thu nhập thấp, người có công chưa có nhà ở",
      "C. Các tập đoàn bất động sản đầu cơ dự án cao cấp",
      "D. Người có thu nhập đóng thuế bậc cao nhất"
    ],
    correctAnswer: 1,
    explanation: "Gói tín dụng an sinh hỗ trợ vay lãi suất thấp dài hạn để hiện thực hóa ước mơ sở hữu căn nhà đầu tiên của người lao động phổ thông chịu khó."
  },
  {
    id: "q-9",
    question: "'Bàn tay hữu hình' của Nhà nước định hướng XHCN điều tiết thị trường thông qua công cụ chính yếu nào?",
    options: [
      "A. Sử dụng pháp luật, quy hoạch phát triển, chính sách tài khóa và tiền tệ vĩ mô",
      "B. Ra lệnh đóng cửa tất cả các doanh nghiệp tư nhân hoạt động ngoài quốc doanh",
      "C. Quy định giá bán cố định cho mọi mặt hàng nhỏ lẻ ngoài chợ",
      "D. Thả nổi cho cung cầu tự do cạnh tranh không kiểm soát"
    ],
    correctAnswer: 0,
    explanation: "Nhà nước sử dụng pháp luật và các công cụ kinh tế gián tiếp để định hướng, dẫn dắt thị trường đi đúng hướng, hạn chế đầu cơ tích lũy."
  },
  {
    id: "q-10",
    question: "Thể chế kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam cần hoàn thiện nội dung cốt lõi nào hiện nay?",
    options: [
      "A. Xây dựng thị trường bất động sản và thị trường vốn vận hành minh bạch, đồng bộ",
      "B. Trở lại thời kỳ bao cấp kế hoạch tập trung toàn bộ",
      "C. Xóa bỏ hoàn toàn sự lãnh đạo của Đảng và quản lý của Nhà nước",
      "D. Tự cung tự cấp hoàn toàn, không tham gia hội nhập kinh tế quốc tế"
    ],
    correctAnswer: 0,
    explanation: "Hoàn thiện thể chế đồng bộ giúp giải phóng mọi nguồn lực phát triển, thu hút đầu tư nước ngoài và thúc đẩy kinh doanh trong nước năng động."
  }
];

export const luckyRewards: Reward[] = [
  {
    type: "banana",
    name: "Chuối Vàng May Mắn",
    icon: "🍌",
    description: "Nhận ngay nguồn năng lượng vàng từ chuối! Cộng điểm thưởng.",
    effect: { scoreBonus: 15 },
    weight: 30
  },
  {
    type: "small_gift",
    name: "Quà Nhỏ Rừng Xanh",
    icon: "🎁",
    description: "Một hộp quà nhỏ thắt nơ bằng lá cây. Cộng kha khá điểm.",
    effect: { scoreBonus: 30 },
    weight: 20
  },
  {
    type: "large_gift",
    name: "Rương Báu Đại Ngàn",
    icon: "💎",
    description: "Một chiếc rương cổ đầy kim cương báu vật! Cộng rất nhiều điểm.",
    effect: { scoreBonus: 50 },
    weight: 10
  },
  {
    type: "heart",
    name: "Trái Tim Sự Sống",
    icon: "❤️",
    description: "Khỉ con được hồi sức! Tăng thêm 1 tim mạng sống.",
    effect: { heartsBonus: 1 },
    weight: 15
  },
  {
    type: "shield",
    name: "Khiên Chuối Hộ Mệnh",
    icon: "🛡️",
    description: "Khiên bảo vệ kiên cố. Trả lời sai tiếp theo không mất tim!",
    effect: { shieldsBonus: 1 },
    weight: 15
  },
  {
    type: "unlucky",
    name: "Vỏ Chuối Trơn Trượt",
    icon: "💨",
    description: "Ui da! Trượt vỏ chuối rồi, xui xẻo ghê không nhận được gì hết trơn.",
    effect: {},
    weight: 10
  }
];
