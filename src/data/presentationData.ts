/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  name: string;
  role: string;
  id: string;
  avatar: string;
}

export interface ContextCard {
  id: string;
  title: string;
  shortDesc: string;
  detail: string;
  color: string;
  icon: string;
}

export interface TheoryCard {
  id: string;
  code: string;
  title: string;
  summary: string;
  content: string[];
  importance: string;
}

export interface PolicyItem {
  id: string;
  title: string;
  desc: string;
  category: "Hỗ trợ" | "Quản lý" | "Điều tiết";
  impact: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const presentationData = {
  hero: {
    badge: "MLN122 · Chương 5 · Nhóm thuyết trình",
    title: "Kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam",
    subtitle: "Phân tích lý thuyết Chương 5 và vận dụng thực tiễn vào bài toán phát triển Nhà ở Xã hội trong nền kinh tế thị trường hiện nay.",
    ctaStart: "Bắt đầu thuyết trình",
    ctaSituation: "Đến phần tình huống"
  },
  
  context: {
    title: "Bối cảnh bài học",
    description: "Chương 5 nghiên cứu mô hình kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam, trong đó nền kinh tế vận hành theo quy luật thị trường nhưng có sự quản lý của Nhà nước nhằm hướng tới mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
    cards: [
      {
        id: "kt-thitruong",
        title: "Kinh tế thị trường",
        shortDesc: "Vận hành linh hoạt theo các quy luật khách quan như cung cầu, cạnh tranh và giá trị.",
        detail: "Là phương thức phân bổ nguồn lực hiệu quả nhất, tạo động lực cạnh tranh mạnh mẽ, thúc đẩy phát triển công nghệ vượt trội và tối ưu hóa năng suất lao động trong toàn bộ nền kinh tế.",
        color: "blue",
        icon: "TrendingUp"
      },
      {
        id: "vai-tro-nhanuoc",
        title: "Vai trò Nhà nước",
        shortDesc: "Quản lý, kiến tạo phát triển và điều tiết vĩ mô bằng pháp luật và chính sách.",
        detail: "Nhà nước đóng vai trò dẫn dắt, hỗ trợ tạo hành lang pháp lý minh bạch, khắc phục các khuyết tật của thị trường, và bảo đảm các cân đối lớn cho nền kinh tế quốc dân.",
        color: "teal",
        icon: "ShieldAlert"
      },
      {
        id: "cong-bang-xh",
        title: "Công bằng xã hội",
        shortDesc: "Tăng trưởng kinh tế song hành với tiến bộ xã hội, không để ai bị bỏ lại phía sau.",
        detail: "Là giá trị cốt lõi mang tính định hướng xã hội chủ nghĩa. Tiến bộ và công bằng xã hội được thực hiện ngay trong từng bước đi và từng chính sách phát triển kinh tế.",
        color: "purple",
        icon: "Scale"
      }
    ] as ContextCard[]
  },

  theory: {
    title: "Nội dung lý thuyết chính",
    subtitle: "Kiến thức trọng tâm Chương 5 - Bản chất thể chế kinh tế của Việt Nam",
    sections: [
      {
        id: "sec-511",
        code: "5.1.1",
        title: "Khái niệm Kinh tế thị trường định hướng XHCN",
        summary: "Nền kinh tế vận hành theo các quy luật của thị trường, đồng thời từng bước xác lập một xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
        content: [
          "Là nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của thị trường, có sự điều tiết của Nhà nước pháp quyền XHCN do Đảng Cộng sản Việt Nam lãnh đạo.",
          "Vừa bao hàm đầy đủ các đặc trưng chung vốn có của kinh tế thị trường nhân loại, vừa mang đặc trưng riêng phù hợp với lịch sử, trình độ phát triển và hoàn cảnh chính trị - xã hội của Việt Nam.",
          "Định hướng XHCN thực chất là hướng tới các giá trị cốt lõi của xã hội mới: dân giàu, nước mạnh, dân chủ, công bằng, văn minh."
        ],
        importance: "Cốt lõi bản chất của mô hình kinh tế Việt Nam"
      },
      {
        id: "sec-512",
        code: "5.1.2",
        title: "Tính tất yếu khách quan của việc phát triển mô hình",
        summary: "Việc phát triển kinh tế thị trường định hướng XHCN ở Việt Nam là tất yếu khách quan, xuất phát từ ba lý do cơ bản.",
        content: [
          "Một là, phù hợp với xu hướng phát triển khách quan của Việt Nam trong bối cảnh thế giới hiện nay: kinh tế hàng hóa tất yếu phát triển tới trình độ kinh tế thị trường, các điều kiện cho kinh tế thị trường đang tồn tại khách quan ở Việt Nam.",
          "Hai là, do tính ưu việt của mô hình trong thúc đẩy phát triển: kinh tế thị trường là phương thức phân bổ nguồn lực hiệu quả, là động lực thúc đẩy lực lượng sản xuất phát triển nhanh và nâng cao năng suất lao động.",
          "Ba là, phù hợp với nguyện vọng dân giàu, nước mạnh, dân chủ, công bằng, văn minh của nhân dân: phá vỡ tính tự cấp tự túc, đẩy mạnh phân công lao động, tạo việc làm và cải thiện đời sống nhân dân."
        ],
        importance: "Cơ sở lý luận khoa học giải thích lý do lựa chọn con đường này"
      },
      {
        id: "sec-513",
        code: "5.1.3",
        title: "Đặc trưng của Kinh tế thị trường định hướng XHCN",
        summary: "Mô hình được nhận diện qua năm đặc trưng: mục tiêu, sở hữu, quản lý, phân phối và quan hệ giữa tăng trưởng với công bằng xã hội.",
        content: [
          "Về mục tiêu: Phát triển lực lượng sản xuất, xây dựng cơ sở vật chất - kỹ thuật của CNXH, nâng cao đời sống nhân dân, thực hiện \"dân giàu, nước mạnh, dân chủ, công bằng, văn minh\".",
          "Về sở hữu và thành phần kinh tế: Nhiều hình thức sở hữu, nhiều thành phần kinh tế bình đẳng trước pháp luật; kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân là một động lực quan trọng.",
          "Về quản lý: Nhà nước pháp quyền XHCN của dân, do dân, vì dân, dưới sự lãnh đạo của Đảng, quản lý bằng pháp luật, chiến lược, kế hoạch và công cụ kinh tế để khắc phục khuyết tật thị trường.",
          "Về phân phối: Phân phối công bằng yếu tố đầu vào và phân phối kết quả đầu ra chủ yếu theo kết quả lao động, hiệu quả kinh tế, mức đóng góp vốn cùng hệ thống an sinh, phúc lợi xã hội.",
          "Về tăng trưởng và công bằng: Gắn tăng trưởng kinh tế với tiến bộ, công bằng xã hội ngay trong từng chính sách; không \"hy sinh\" công bằng để chạy theo tăng trưởng đơn thuần."
        ],
        importance: "Nhận diện sự khác biệt rõ nét nhất so với kinh tế thị trường TBCN"
      },
      {
        id: "sec-52",
        code: "5.2",
        title: "Hoàn thiện thể chế kinh tế thị trường định hướng XHCN",
        summary: "Thể chế còn chưa đồng bộ, đầy đủ và hiệu lực chưa cao, do đó cần hoàn thiện trên bốn nhóm nội dung trọng tâm.",
        content: [
          "Hoàn thiện thể chế về sở hữu và phát triển các thành phần kinh tế: thể chế hóa quyền tài sản, hoàn thiện pháp luật đất đai, sở hữu trí tuệ; tạo mặt bằng pháp lý bình đẳng cho mọi doanh nghiệp.",
          "Phát triển đồng bộ các yếu tố thị trường và các loại thị trường: hàng hóa, giá cả, cạnh tranh, cung cầu vận hành theo nguyên tắc thị trường; phát triển thị trường vốn, công nghệ, sức lao động, bất động sản.",
          "Gắn tăng trưởng kinh tế với tiến bộ, công bằng xã hội và thúc đẩy hội nhập quốc tế, đa phương hóa, đa dạng hóa, không lệ thuộc vào một số ít thị trường.",
          "Nâng cao năng lực lãnh đạo của Đảng, vai trò quản lý của Nhà nước và phát huy vai trò làm chủ của nhân dân."
        ],
        importance: "Nhiệm vụ cấp bách để nền kinh tế vận hành thông suốt và hội nhập quốc tế"
      }
    ] as TheoryCard[]
  },

  comparison: {
    title: "So sánh hai mô hình kinh tế thị trường",
    subtitle: "Trả lời yêu cầu 1 của tình huống: phân biệt Kinh tế thị trường TBCN và Kinh tế thị trường định hướng XHCN",
    leftLabel: "KTTT Tư bản chủ nghĩa",
    rightLabel: "KTTT định hướng XHCN ở Việt Nam",
    rows: [
      {
        criterion: "Mục tiêu sản xuất",
        capitalist: "Chủ yếu phục vụ lợi ích của thiểu số giai cấp tư sản và các tập đoàn độc quyền, nhằm tối đa hóa giá trị thặng dư.",
        socialist: "Nâng cao đời sống toàn thể nhân dân lao động, hướng tới \"dân giàu, nước mạnh, dân chủ, công bằng, văn minh\"."
      },
      {
        criterion: "Sở hữu & thành phần kinh tế",
        capitalist: "Dựa trên chế độ chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất.",
        socialist: "Nhiều hình thức sở hữu, nhiều thành phần kinh tế; kinh tế nhà nước chủ đạo, kinh tế tư nhân là động lực quan trọng."
      },
      {
        criterion: "Quản lý & điều tiết vĩ mô",
        capitalist: "Nhà nước tư sản quản lý, thường bị chi phối bởi các tập đoàn tài phiệt và nhóm lợi ích tư nhân.",
        socialist: "Nhà nước pháp quyền XHCN của dân, do dân, vì dân, dưới sự lãnh đạo của Đảng, bảo đảm lợi ích nhân dân."
      },
      {
        criterion: "Quan hệ phân phối",
        capitalist: "Phân phối theo mức sở hữu tư bản, dẫn đến phân cực giàu nghèo và bần cùng hóa người lao động làm thuê.",
        socialist: "Phân phối công bằng đầu vào; đầu ra chủ yếu theo kết quả lao động, hiệu quả kinh tế, mức đóng góp vốn và qua an sinh, phúc lợi."
      },
      {
        criterion: "Tăng trưởng & công bằng xã hội",
        capitalist: "Chỉ giải quyết công bằng xã hội hạn chế, khi khuyết tật thị trường đe dọa sự tồn vong của chế độ.",
        socialist: "Thực hiện tiến bộ và công bằng xã hội ngay trong từng chính sách, từng giai đoạn; không chờ tăng trưởng cao mới làm công bằng."
      }
    ]
  },

  situation: {
    title: "Tình huống thực tế",
    subtitle: "Bài toán nhà ở xã hội và thị trường bất động sản Việt Nam hiện nay",
    narrative: {
      problem: "Nhu cầu nhà ở của người lao động có thu nhập thấp và trung bình là vô cùng lớn, đặc biệt là thế hệ trẻ mới ra trường có thu nhập từ 10 - 15 triệu đồng/tháng. Trong khi đó, các căn hộ thương mại tại Hà Nội hay TP.HCM liên tục đạt đỉnh mới, trung bình 55-80 triệu/m², khiến ước mơ sở hữu nhà vượt xa tầm tay của đại đa số người dân.",
      challenge: "Dù cơ quan quản lý liên tục kêu gọi, ban hành nhiều gói hỗ trợ lãi suất kích cầu và miễn thuế sử dụng đất để khuyến khích phát triển nhà ở xã hội, nhưng các doanh nghiệp bất động sản tư nhân vẫn ưu tiên dồn vốn và quỹ đất sạch để xây dựng phân khúc chung cư cao cấp do biên lợi nhuận cực cao (lên đến 30 - 50%), thay vì phân khúc bình dân vốn thu hồi chậm và bị khống chế trần lợi nhuận.",
      dilemma: "Nếu hoàn toàn để thị trường tự điều tiết dựa trên quy luật cung cầu tự do, người dân nghèo và người thu nhập thấp đô thị sẽ mãi mãi không có cơ hội tiếp cận nhà ở. Ngược lại, nếu Nhà nước sử dụng mệnh lệnh hành chính ép buộc quá mạnh tay hoặc bao cấp toàn bộ, nền kinh tế sẽ bộc lộ khuyết tật kém hiệu quả, triệt tiêu động lực kinh doanh của khối doanh nghiệp tư nhân, vi phạm nguyên tắc tự do kinh doanh hiến định."
    },
    infographics: [
      { label: "Mức lương giới trẻ", value: "10-15 triệu", unit: "/tháng", desc: "Không đủ trả góp căn hộ thương mại" },
      { label: "Giá chung cư Hà Nội - HCM", value: "3 - 5 tỷ", unit: "/căn trung cấp", desc: "Tương đương 25-30 năm tích lũy" },
      { label: "Lợi nhuận cao cấp", value: "30% - 50%", unit: "biên lợi nhuận", desc: "Hút dòng tiền đầu tư của các tập đoàn" },
      { label: "Tỷ lệ dự án nhà ở xã hội đạt mục tiêu", value: "Chỉ ~35%", unit: "kế hoạch 2025", desc: "Thiếu hụt nguồn cung trầm trọng" }
    ]
  },

  discussion: {
    title: "Câu hỏi thảo luận phản biện",
    subtitle: "Hệ thống câu hỏi gợi mở, mổ xẻ mâu thuẫn lợi ích kinh tế trong thực tiễn học thuật",
    questions: [
      {
        id: "q1",
        label: "Câu hỏi thảo luận 1",
        question: "Phân tích sự khác biệt bản chất và biểu hiện thực tế giữa kinh tế thị trường tư bản chủ nghĩa (TBCN) và kinh tế thị trường định hướng xã hội chủ nghĩa (XHCN) qua góc nhìn phúc lợi xã hội.",
        guideline: "Hãy đi sâu vào các tiêu chí về Mục đích sản xuất, Quan hệ sở hữu tư liệu sản xuất chính, Phương thức phân phối lợi tức, và vai trò thực tế của bộ máy Nhà nước trong việc tái phân phối của cải xã hội."
      },
      {
        id: "q2",
        label: "Câu hỏi thảo luận 2",
        question: "Trong tình huống phát triển nhà ở xã hội, cơ chế tự điều tiết của 'Bàn tay vô hình' thị trường đã rơi vào trạng thái thất bại ở điểm nào? Nhà nước định hướng XHCN cần can thiệp bằng những công cụ kinh tế vĩ mô cụ thể nào để hài hòa lợi ích giữa Người dân và Doanh nghiệp?",
        guideline: "Xác định rõ bản chất thất bại thị trường ở đây là phân phối không công bằng và bỏ qua nhu cầu phúc lợi cơ bản (an cư). Làm rõ bộ công cụ tài chính, chính sách thuế, tín dụng - lãi suất, quy hoạch đất đai để biến nhà ở xã hội thành sản phẩm hấp dẫn với doanh nghiệp nhưng vừa túi tiền với người dân."
      }
    ]
  },

  analysis: {
    title: "Phân tích lý luận Chương 5",
    subtitle: "Luận giải khoa học dựa trên các nguyên lý kinh tế chính trị",
    pillars: [
      {
        id: "p1",
        title: "1. Thất bại của thị trường tự do",
        badge: "Thị trường thiếu định hướng",
        points: [
          "Động cơ tối đa hóa lợi nhuận đẩy nguồn vốn xã hội chảy vào phân khúc chung cư cao cấp, đầu cơ thổi giá đất đai, bỏ quên nhu cầu sinh tồn cơ bản của người dân có thu nhập thấp.",
          "Quy luật cung cầu tự do không tự giải quyết được vấn đề an sinh nhà ở vì người kém may mắn bị loại trừ khỏi cơ chế thị trường do thiếu 'sức mua có khả năng thanh toán'."
        ],
        illustration: "Khi lợi nhuận làm mờ đi trách nhiệm xã hội, bàn tay vô hình trở thành bàn tay trục lợi cấu trúc bất công."
      },
      {
        id: "p2",
        title: "2. Vai trò chủ động của Nhà nước",
        badge: "Quản lý & Kiến tạo phát triển",
        points: [
          "Bằng quy hoạch sử dụng đất đai, Nhà nước cắt giảm rào cản pháp lý, bù đắp tài chính bằng ưu đãi thuế và cho vay tín dụng ưu đãi dài hạn.",
          "Bơm nguồn lực tài chính công (quỹ phát triển nhà ở) làm mồi nhử kêu gọi, dẫn dắt các tập đoàn cùng tham gia vào thị trường nhà ở xã hội bền vững."
        ],
        illustration: "Phục hồi trật tự thị trường thông qua bàn tay hữu hình của pháp luật và đòn bẩy tài chính thông minh."
      },
      {
        id: "p3",
        title: "3. Mục tiêu Phát triển & Công bằng",
        badge: "Định hướng Xã hội chủ nghĩa",
        points: [
          "Tăng trưởng kinh tế không chỉ đo bằng GDP mà phải đo bằng tỷ lệ người lao động ổn định an cư lạc nghiệp, bớt gánh nặng lo toan.",
          "Nhà ở không đơn thuần là hàng hóa sinh lời để tích lũy tài sản đầu cơ, mà là hạ tầng an sinh thiết yếu bảo đảm quyền con người cơ bản."
        ],
        illustration: "Sự dung hợp tuyệt vời giữa tính thị trường sắc bén và mục tiêu nhân văn sâu sắc của xã hội tương lai."
      }
    ]
  },

  policies: {
    title: "Công cụ chính sách đề xuất",
    subtitle: "Các đòn bẩy vĩ mô từ Chính phủ nhằm tái cấu trúc chuỗi cung ứng nhà ở xã hội",
    items: [
      {
        id: "po1",
        title: "Ưu đãi thuế suất đặc biệt cho nhà đầu tư",
        desc: "Giảm 50% thuế VAT và Thuế thu nhập doanh nghiệp đối với dự án nhà ở xã hội đạt chuẩn để nâng biên lợi nhuận ròng thực tế lên mức 10-12% hấp dẫn.",
        category: "Hỗ trợ",
        impact: "Cực kỳ cao"
      },
      {
        id: "po2",
        title: "Bàn giao Quỹ đất sạch quy hoạch sẵn",
        desc: "Khi duyệt chung cư thương mại, bắt buộc trích lũy 20% diện tích đất sạch làm nhà ở xã hội, hoặc Nhà nước đền bù trực tiếp giao đất thổ cư đã làm xong cơ sở hạ tầng.",
        category: "Điều tiết",
        impact: "Bền vững dài hạn"
      },
      {
        id: "po3",
        title: "Gói tín dụng ưu đãi mua nhà lãi suất thấp",
        desc: "Hỗ trợ vay mua nhà thời hạn 25 năm với lãi suất cố định 4.5 - 5% / năm, bảo đảm chi phí trả nợ gốc lẫn lãi không vượt quá 35% thu nhập gia đình.",
        category: "Hỗ trợ",
        impact: "Kích cầu thị trường"
      },
      {
        id: "po4",
        title: "Chống đầu cơ, kiểm soát nghiêm ngặt đối tượng",
        desc: "Sử dụng Cơ sở dữ liệu quốc gia về dân cư (VNeID) và Thuế thu nhập để kiểm tra: Chỉ duyệt hồ sơ cho người chưa có nhà, thu nhập dưới ngưỡng chịu thuế, cấm chuyển nhượng trái phép trong 5 năm.",
        category: "Quản lý",
        impact: "Minh bạch tuyệt đối"
      },
      {
        id: "po5",
        title: "Cắt giảm 1/2 thủ tục hành chính đầu tư",
        desc: "Thành lập cơ chế 'Một cửa liên thông' cấp phép xây dựng dự án nhà công cộng trong 45 ngày làm việc để giảm chi phí cơ hội cho doanh nghiệp kiến tạo.",
        category: "Quản lý",
        impact: "Đẩy nhanh tiến độ"
      }
    ] as PolicyItem[]
  },

  creativeProduct: {
    title: "Sản phẩm sáng tạo học thuật",
    subtitle: "Dự thảo 'Bản Kiến Nghị Đổi Mới Cơ Chế Nhà Ở Xã Hội' mô phỏng gửi Bộ Xây dựng",
    intro: "Để nội dung lý thuyết Chương 5 không chỉ nằm trên trang sách, nhóm chúng tôi đã cụ thể hóa bằng một 'Dự thảo mô phỏng bản kiến nghị gửi các cơ quan hoạch định chính sách'. Đây là ứng dụng thực tế sinh động của bài học.",
    mockDocument: {
      title: "BẢN KIẾN NGHỊ ĐỔI MỚI CƠ CHẾ QUẢN LÝ DỰ ÁN NHÀ Ở PHÚC LỢI VÀ AN SINH XÃ HỘI TẠI ĐÔ THỊ LỚN",
      meta: "Mã số: KN-MLN122_C5 / Nơi nhận đề xuất: Bộ Xây dựng Việt Nam",
      sections: [
        {
          key: "prob",
          title: "I. VẤN ĐỀ HIỆN TRẠNG (Bàn tay vô hình thất bại)",
          content: "Sự phân hóa thị trường bất động sản diễn ra gay gắt. Hơn 85% nguồn cung căn hộ thương mại tập trung vào tầng lớp thượng lưu, trong khi 90% nhu cầu thực tế của người lao động phổ thông, công nhân, công chức viên chức trẻ không được đáp ứng. Phát sinh rào cản kỹ thuật khiến các dự án nhà ở xã hội bị trì trệ nhiều năm."
        },
        {
          key: "cause",
          title: "II. NGUYÊN NHÂN CỐT LÕI (Xung đột lợi ích)",
          content: "Lợi ích kinh tế của doanh nghiệp tư nhân mâu thuẫn với mục tiêu chính trị-xã hội của Nhà nước. Thiếu cơ chế bù đắp tài chính đủ mạnh để bù đắp cho việc khống chế trần lợi nhuận của nhà ở xã hội ở mức thấp (quy định cũ giới hạn trần lợi nhuận chỉ 10%). Đồng thời, quỹ đất sạch thiếu trầm trọng và rào cản hành chính kéo dài gây đọng vốn lớn."
        },
        {
          key: "sol",
          title: "III. GIẢI PHÁP ĐỘT PHÁ (Sự kết hợp giữa Nhà nước & Thị trường)",
          content: "1. Thể chế hóa 'Voucher Nhà Ở': Nhà nước cấp tín dụng mua nhà cho người dân thay vì trợ cấp trực tiếp cho doanh nghiệp để tăng tính cạnh tranh tích cực.\n2. Thành lập 'Tổng Công ty Nhà Ở Quốc Gia' độc lập phi lợi nhuận hoạt động bằng vốn công làm mồi nhử đầu tư.\n3. Số hóa 100% việc đăng ký mua qua Cổng Dịch vụ công Quốc gia, ngăn chặn cò mồi bất động sản."
        },
        {
          key: "impact",
          title: "IV. TÁC ĐỘNG KỲ VỌNG (Đạt mục tiêu định hướng XHCN)",
          content: "Phân phối tối ưu hơn của cải xã hội, giúp 1.5 triệu hộ gia đình trẻ an cư lạc nghiệp trước năm 2030. Tạo lập dòng tiền lưu động minh bạch và lấy lại niềm tin cho thị trường tài chính bất động sản, đồng thời chứng minh hiệu quả tuyệt vời và tính ưu việt nhân văn của Kinh tế thị trường định hướng XHCN."
        }
      ]
    }
  },

  conclusion: {
    title: "Kết luận & Thông điệp Chương 5",
    subtitle: "Dẫn chứng từ kiến thức kinh tế quốc dân rút ra cho mỗi sinh viên",
    lessons: [
      {
        title: "Kinh tế thị trường cần có bánh lái định hướng",
        desc: "Thị trường là động cơ tăng trưởng mãnh liệt, nhưng nếu thiếu đi bánh lái định hướng XHCN và sự can thiệp nhân văn của Nhà nước, động cơ đó sẽ chỉ phục vụ lợi ích thiểu số, tạo ra hố sâu ngăn cách giàu nghèo gay gắt.",
        keyword: "BÁNH LÁI Định hướng"
      },
      {
        title: "Nhà nước giữ vai trò kiến tạo vĩ mô sắc sảo",
        desc: "Nhà nước định hướng XHCN không bóp nghẹt thị trường, không ôm đồm quản trị bao cấp cũ, mà đóng vai trò dẫn dắt bằng chính sách luật lệ thông minh, dùng đòn bẩy tài chính để tối ưu hóa nguồn lực cho an sinh.",
        keyword: "KIẾN TẠO Vĩ mô"
      },
      {
        title: "Phát triển bền vững phải hài hòa các quan hệ lợi ích",
        desc: "Tăng trưởng kinh tế chỉ thực sự vững bền và thiêng liêng khi thành quả của nó được phân phối công bằng, giúp mọi tầng lớp nhân dân đều có mái ấm gia đình để yên tâm cống hiến đóng góp cho đất nước.",
        keyword: "HÀI HÒA Lợi ích"
      }
    ]
  },

  qa: {
    title: "Diễn đàn Học thuật Q&A",
    subtitle: "Tương tác trực tiếp với các câu hỏi thường gặp của Hội đồng Phản biện và Giảng viên",
    description: "Hãy chọn bất kỳ một câu hỏi hóc búa nào phía dưới của giảng viên phản biện, hoặc tự đặt câu hỏi của riêng bạn để hệ thống giả lập lý thuyết chính trị phân tích hỗ trợ.",
    faqs: [
      {
        id: "faq-1",
        category: "Bản chất học thuật",
        question: "1. Tại sao nói việc Nhà nước can thiệp vào thị trường nhà ở xã hội không phải là hành vi 'bóp nghẹt' thị trường tự do?",
        answer: "Bởi vì đây là hành vi sửa chữa khuyết tật thị trường (Market Failures). Kinh tế học hiện đại đều thừa nhận thị trường tự do không thể giải quyết vấn đề hàng hóa công và ngoại ứng tích cực một cách tối ưu. Việc Nhà nước can thiệp để bù đắp các khoản lỗ rủi ro cho doanh nghiệp tài trợ giá giúp mở rộng quy mô thị trường, gia tăng phúc lợi chung chứ không hề triệt tiêu sự cạnh tranh của doanh nghiệp."
      },
      {
        id: "faq-2",
        category: "Liên hệ thực tiễn",
        question: "2. Tại sao quy định bắt buộc trích 20% quỹ đất trong các dự án thương mại làm nhà ở xã hội trước đây gặp nhiều trở ngại?",
        answer: "Trước đây quy định này yêu cầu thực hiện máy móc ở từng dự án riêng lẻ, dẫn đến các dự án cao cấp đắt đỏ phải gánh hạ tầng khó hòa hợp. Nhiều doanh nghiệp chấp nhận trả tiền thay vì chuyển giao 20% đất sạch. Hiện nay chính phủ đã linh hoạt hơn, cho phép doanh nghiệp hoán đổi quỹ đất tương đương ở nơi khác hoặc đóng tiền trực tiếp vào quỹ phát triển nhà ở của địa phương để tập trung xây dựng đồng bộ các đại đô thị nhà giá rẻ quy mô lớn."
      },
      {
        id: "faq-3",
        category: "Định hướng XHCN",
        question: "3. Thể hiện rõ nét tính định hướng xã hội chủ nghĩa trong chính sách nhà ở xã hội của Việt Nam nằm ở đâu?",
        answer: "Nằm ở 3 yếu tố cốt lõi:\n- Mục đích tối thượng: Bảo đảm quyền có chỗ ở hợp pháp của người dân có hoàn cảnh khó khăn, đặt trên mục tiêu kiếm lời thuần túy.\n- Nhà nước trực tiếp kiểm soát giá bán tối đa và đối tượng được mua, bảo đảm của cải xã hội đến đúng tay công nhân, người có công và người thu nhập thấp đô thị.\n- Sự chấp nhận bù đắp chi phí, cung cấp tài nguyên đất công ưu đãi để làm đòn bẩy an sinh xã hội."
      },
      {
        id: "faq-4",
        category: "Cơ chế tài chính",
        question: "4. Làm sao để giải quyết mâu thuẫn giữa 'Doanh nghiệp muốn lợi nhuận cao' và 'Người mua muốn giá rẻ nhất'?",
        answer: "Nhà nước đóng vai trò trung gian bù đắp bằng đòn bẩy tài chính (Voucher chính sách). Nhà nước không ép doanh nghiệp chịu lỗ hay ép dân vay nặng lãi, mà Nhà nước miễn tiền sử dụng đất cho doanh nghiệp, ưu đãi vay lãi suất thấp cho cả hai bên, đồng thời hỗ trợ xây dựng hạ tầng kết nối (đường sá, cầu cống, trạm y tế). Sự san sẻ chi phí từ ngân sách công này giúp nới rộng biên độ tối ưu cho cả doanh nghiệp lẫn người dân."
      }
    ] as FAQItem[]
  },
  footer: {
    studentGroup: "Nhóm thuyết trình Chương 5 · MLN122",
    academicYear: "Học kỳ 1 - Năm học 2026",
    copyright: "© 2026 MLN122 Presentation Applet. Made for Excellence in Education."
  }
};
