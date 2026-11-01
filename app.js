const KEY='30YL_state_v1';
let questions=[],careers=[],state={profile:{},answers:{},current:0,result:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const chapters={personality:{title:'Personality',desc:'Khám phá cách bạn suy nghĩ, cảm nhận và tương tác.',start:0,end:12},interests:{title:'Interests',desc:'Tìm hiểu những hoạt động khiến bạn tò mò.',start:12,end:22},strengths:{title:'Strengths',desc:'Nhận diện những năng lực bạn tự tin và muốn phát triển.',start:22,end:32},values:{title:'Values',desc:'Điều gì quan trọng với bạn trong công việc và cuộc sống?',start:32,end:40},life_choices:{title:'Life Choices',desc:'Khám phá cách bạn tiếp cận tình huống giả định.',start:40,end:50}};
const bigNames={openness:'Cởi mở với trải nghiệm',conscientiousness:'Tận tâm',extraversion:'Hướng ngoại',agreeableness:'Hợp tác và dễ chịu',neuroticism:'Nhạy cảm với cảm xúc tiêu cực'};
const riaNames={R:'Thực tế',I:'Nghiên cứu',A:'Nghệ thuật',S:'Xã hội',E:'Quản lý',C:'Nghiệp vụ'};
const strengthNames={logic:'Tư duy logic',analysis:'Tư duy phân tích',communication:'Giao tiếp',empathy:'Thấu hiểu',creativity:'Sáng tạo',self_learning:'Tự học',focus:'Tập trung',teamwork:'Làm việc nhóm',adaptability:'Thích nghi',decision_making:'Ra quyết định'};
const valueNames={financial:'Thu nhập và tài chính',purpose:'Ý nghĩa và đóng góp',stability:'Ổn định',flexibility:'Linh hoạt',expertise:'Phát triển chuyên môn',leadership:'Lãnh đạo',balance:'Cân bằng cuộc sống',achievement:'Thành tựu',recognition:'Ghi nhận cá nhân',contribution:'Đóng góp tập thể',learning:'Học hỏi',autonomy:'Tự chủ',structure:'Quy trình rõ ràng'};
const tagNames={ANALYTICAL:'Phân tích',CREATIVE:'Sáng tạo',SOCIAL:'Hợp tác',ORGANIZED:'Tổ chức',EXPERIMENTAL:'Thử nghiệm',LEADERSHIP:'Chủ động dẫn dắt',ADAPTABILITY:'Thích nghi',RESEARCH:'Nghiên cứu'};
const catNames={technology:'Công nghệ thông tin',engineering:'Kỹ thuật – Công nghệ',creative:'Sáng tạo – Truyền thông',business:'Kinh doanh – Quản trị',education:'Giáo dục – Xã hội',health:'Y tế – Sức khỏe',science:'Khoa học – Nghiên cứu',services:'Luật – Dịch vụ – Vận hành'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer;let resultCharts=[];
let detailSourceScreen='library';
let showAllMatches=false;

// Hồ sơ phong cách làm việc Big Five độc lập cho 40 nghề (Primary: 60%, Secondary: 40%)
const careerBigFiveProfiles = {
  IT01: { primary: 'conscientiousness', secondary: 'openness' },
  IT02: { primary: 'conscientiousness', secondary: 'openness' },
  IT03: { primary: 'conscientiousness', secondary: 'openness' },
  IT04: { primary: 'openness', secondary: 'conscientiousness' },
  IT05: { primary: 'conscientiousness', secondary: 'openness' },

  EN01: { primary: 'conscientiousness', secondary: 'openness' },
  EN02: { primary: 'openness', secondary: 'conscientiousness' },
  EN03: { primary: 'conscientiousness', secondary: 'openness' },
  EN04: { primary: 'conscientiousness', secondary: 'openness' },
  EN05: { primary: 'conscientiousness', secondary: 'openness' },

  CR01: { primary: 'openness', secondary: 'conscientiousness' },
  CR02: { primary: 'openness', secondary: 'agreeableness' },
  CR03: { primary: 'openness', secondary: 'extraversion' },
  CR04: { primary: 'openness', secondary: 'conscientiousness' },
  CR05: { primary: 'openness', secondary: 'conscientiousness' },

  BU01: { primary: 'extraversion', secondary: 'openness' },
  BU02: { primary: 'conscientiousness', secondary: 'openness' },
  BU03: { primary: 'conscientiousness', secondary: 'agreeableness' },
  BU04: { primary: 'agreeableness', secondary: 'extraversion' },
  BU05: { primary: 'extraversion', secondary: 'openness' },

  SO01: { primary: 'agreeableness', secondary: 'extraversion' },
  SO02: { primary: 'agreeableness', secondary: 'openness' },
  SO03: { primary: 'agreeableness', secondary: 'conscientiousness' },
  SO04: { primary: 'extraversion', secondary: 'conscientiousness' },
  SO05: { primary: 'agreeableness', secondary: 'openness' },

  HE01: { primary: 'agreeableness', secondary: 'conscientiousness' },
  HE02: { primary: 'agreeableness', secondary: 'conscientiousness' },
  HE03: { primary: 'conscientiousness', secondary: 'agreeableness' },
  HE04: { primary: 'conscientiousness', secondary: 'openness' },
  HE05: { primary: 'agreeableness', secondary: 'conscientiousness' },

  SC01: { primary: 'openness', secondary: 'conscientiousness' },
  SC02: { primary: 'openness', secondary: 'conscientiousness' },
  SC03: { primary: 'openness', secondary: 'conscientiousness' },
  SC04: { primary: 'openness', secondary: 'conscientiousness' },
  SC05: { primary: 'openness', secondary: 'conscientiousness' },

  SV01: { primary: 'conscientiousness', secondary: 'extraversion' },
  SV02: { primary: 'conscientiousness', secondary: 'openness' },
  SV03: { primary: 'conscientiousness', secondary: 'openness' },
  SV04: { primary: 'conscientiousness', secondary: 'extraversion' },
  SV05: { primary: 'extraversion', secondary: 'agreeableness' }
};

// 30 tổ hợp Archetype RIASEC hai chiều có thứ tự + Mẫu dự phòng The Curious Explorer
const archetypes = {
  RI: { code: 'RI', en: 'The Analytical Explorer', vn: 'Nhà Khám Phá Phân Tích', keywords: ['Thực tế', 'Nghiên cứu', 'Công nghệ'], desc: 'Bạn có xu hướng quan sát thế giới qua lăng kính kỹ thuật và thích tìm hiểu các nguyên lý khoa học phía sau các hệ thống vận hành.', advice: 'Hãy thử sức với các dự án STEM, lập trình phần cứng hoặc nghiên cứu ứng dụng thực tế để phát huy thế mạnh.' },
  IR: { code: 'IR', en: 'The Scientific Pioneer', vn: 'Nhà Tiên Phong Khoa Học', keywords: ['Nghiên cứu', 'Thực nghiệm', 'Quy luật'], desc: 'Bạn có xu hướng say mê nghiên cứu chuyên sâu, tìm hiểu nguyên nhân gốc rễ và kiểm chứng các quy luật tự nhiên qua dữ liệu.', advice: 'Hãy tham gia các dự án nghiên cứu khoa học, đọc tài liệu chuyên khảo và trải nghiệm phương pháp nghiên cứu thực nghiệm.' },
  IA: { code: 'IA', en: 'The Creative Researcher', vn: 'Nhà Nghiên Cứu Sáng Tạo', keywords: ['Tri thức', 'Ý tưởng', 'Đột phá'], desc: 'Bạn có xu hướng kết hợp chiều sâu tư duy lý thuyết với những ý tưởng mới mẻ để tiếp cận vấn đề một cách độc đáo.', advice: 'Hãy thử nghiệm các hình thức trình bày ý tưởng mới như viết luận sáng tạo, thiết kế thông tin trực quan hoặc nghiên cứu liên ngành.' },
  AI: { code: 'AI', en: 'The Conceptual Designer', vn: 'Nhà Thiết Kế Ý Niệm', keywords: ['Ý niệm', 'Thẩm mỹ', 'Chiều sâu'], desc: 'Bạn có xu hướng sáng tạo dựa trên nền tảng tìm hiểu sâu sắc, thích lồng ghép thông điệp và ý nghĩa chiều sâu vào tác phẩm.', advice: 'Hãy rèn luyện kỹ năng tư duy thiết kế, xây dựng câu chuyện cho sản phẩm và học hỏi từ các trường phái nghệ thuật.' },
  IS: { code: 'IS', en: 'The Human-Centered Inquirer', vn: 'Nhà Nghiên Cứu Vị Nhân Sinh', keywords: ['Khoa học', 'Con người', 'Ý nghĩa'], desc: 'Bạn có xu hướng quan tâm đến các vấn đề liên quan đến con người, sức khỏe, tâm lý và xã hội dưới góc nhìn khoa học.', advice: 'Hãy tham gia các hoạt động khảo sát cộng đồng, dự án tâm lý học đường hoặc tìm hiểu y sinh học ứng dụng.' },
  SI: { code: 'SI', en: 'The Insightful Mentor', vn: 'Người Hướng Dẫn Thấu Cảm', keywords: ['Thấu hiểu', 'Định hướng', 'Giáo dục'], desc: 'Bạn có xu hướng lắng nghe, đồng cảm kết hợp với tư duy phân tích để giúp đỡ người khác tháo gỡ khó khăn.', advice: 'Hãy thử sức với vai trò người trợ giảng, thành viên ban tư vấn bạn bè hoặc tình nguyện viên hỗ trợ học tập.' },
  IE: { code: 'IE', en: 'The Intellectual Strategist', vn: 'Chiến Lược Gia Tri Thức', keywords: ['Chiến lược', 'Dữ liệu', 'Tầm nhìn'], desc: 'Bạn có xu hướng sử dụng tri thức và dữ liệu để xây dựng định hướng phát triển và giải pháp tối ưu cho tổ chức.', advice: 'Hãy tìm hiểu về phân tích kinh doanh, dự báo xu hướng thị trường và thử xây dựng kế hoạch dự án thực tế.' },
  EI: { code: 'EI', en: 'The Visionary Innovator', vn: 'Nhà Đổi Mới Tầm Nhìn', keywords: ['Khởi xướng', 'Tầm nhìn', 'Cải tiến'], desc: 'Bạn có xu hướng chủ động khởi xướng các ý tưởng mới và thích dẫn dắt tập thể hướng đến những mục tiêu đột phá.', advice: 'Hãy thử dẫn dắt một nhóm dự án nhỏ, tham gia các cuộc thi ý tưởng đổi mới hoặc học cách trình bày thuyết phục.' },
  IC: { code: 'IC', en: 'The Methodical Analyst', vn: 'Chuyên Gia Phân Tích Hệ Thống', keywords: ['Hệ thống', 'Chính xác', 'Logic'], desc: 'Bạn có xu hướng làm việc chặt chẽ với dữ liệu, thích sự chính xác và việc tổ chức thông tin theo trật tự logic rõ ràng.', advice: 'Hãy thực hành kỹ năng xử lý dữ liệu, học ngôn ngữ lập trình thống kê hoặc xây dựng bảng tính tự động hóa.' },
  CI: { code: 'CI', en: 'The Information Architect', vn: 'Kiến Trúc Sư Thông Tin', keywords: ['Quy chuẩn', 'Cấu trúc', 'Dữ liệu'], desc: 'Bạn có xu hướng xây dựng và duy trì các hệ thống thông tin, quy trình làm việc chuẩn mực và đáng tin cậy.', advice: 'Hãy khám phá các lĩnh vực như cơ sở dữ liệu, quản trị thông tin hoặc tiêu chuẩn quản lý chất lượng.' },
  RA: { code: 'RA', en: 'The Practical Creator', vn: 'Nhà Chế Tác Thực Tiễn', keywords: ['Chế tác', 'Vật liệu', 'Khéo léo'], desc: 'Bạn có xu hướng thích tạo ra những sản phẩm hữu hình kết hợp giữa độ khéo léo kỹ thuật và tính thẩm mỹ.', advice: 'Hãy thử sức với thiết kế công nghiệp, thủ công mỹ nghệ, mô hình kiến trúc hoặc in 3D.' },
  AR: { code: 'AR', en: 'The Hands-on Designer', vn: 'Nhà Thiết Kế Thực Nghiệm', keywords: ['Tạo mẫu', 'Không gian', 'Chất liệu'], desc: 'Bạn có xu hướng thích biến những phác thảo trừu tượng thành mô hình thực tế, hiểu rõ chất liệu và không gian.', advice: 'Hãy thực hành với các phần mềm dựng hình 3D, thử nghiệm chất liệu mới và xây dựng các nguyên mẫu thử nghiệm.' },
  RS: { code: 'RS', en: 'The Practical Collaborator', vn: 'Người Đồng Hành Kỹ Thuật', keywords: ['Kỹ thuật', 'Hiện trường', 'Hợp tác'], desc: 'Bạn có xu hướng thích làm công việc kỹ thuật, thực địa nhưng luôn coi trọng sự phối hợp nhịp nhàng với đồng nghiệp.', advice: 'Hãy tham gia các dự án kỹ thuật có tính cộng đồng, hoạt động bảo dưỡng thiết bị hoặc chế tạo theo nhóm.' },
  SR: { code: 'SR', en: 'The Direct Caregiver', vn: 'Người Trợ Giúp Thực Tế', keywords: ['Tận tụy', 'Hành động', 'Thực tế'], desc: 'Bạn có xu hướng thích giúp đỡ người khác bằng những hành động cụ thể, hữu hình và có ích ngay trong đời sống.', advice: 'Hãy học các kỹ năng sơ cấp cứu, kỹ thuật phục hồi chức năng hoặc tham gia các hoạt động công ích cứu trợ.' },
  RE: { code: 'RE', en: 'The Technical Manager', vn: 'Nhà Quản Lý Kỹ Thuật', keywords: ['Thiết bị', 'Điều hành', 'Thực tiễn'], desc: 'Bạn có xu hướng yêu thích công nghệ, thiết bị nhưng cũng muốn phát triển khả năng chỉ đạo và giám sát thi công.', advice: 'Hãy rèn luyện thêm kỹ năng giao tiếp, lập bảng theo dõi tiến độ và học cách ủy quyền công việc cho nhóm.' },
  ER: { code: 'ER', en: 'The Practical Leader', vn: 'Nhà Điều Hành Thực Nghiệm', keywords: ['Hiện trường', 'Quyết đoán', 'Sản xuất'], desc: 'Bạn có xu hướng thích quản lý và điều hành những dự án gắn với máy móc, xây dựng, sản xuất hoặc logistics thực địa.', advice: 'Hãy trải nghiệm quản lý đội nhóm thi công kỹ thuật, tham quan nhà máy hoặc tìm hiểu về quản trị sản xuất.' },
  RC: { code: 'RC', en: 'The Precision Technician', vn: 'Kỹ Thuật Viên Chuẩn Xác', keywords: ['Quy chuẩn', 'Kỹ thuật', 'An toàn'], desc: 'Bạn có xu hướng làm việc kiên nhẫn với các thiết bị kỹ thuật đòi hỏi sự cẩn trọng và tuân thủ quy trình an toàn nghiêm ngặt.', advice: 'Hãy làm quen với việc đọc sơ đồ kỹ thuật, bảo trì thiết bị và thực hành các tiêu chuẩn kiểm tra chất lượng.' },
  CR: { code: 'CR', en: 'The Operations Specialist', vn: 'Chuyên Viên Tiêu Chuẩn Kỹ Thuật', keywords: ['Hồ sơ', 'Kiểm soát', 'Quy trình'], desc: 'Bạn có xu hướng thích quản lý hồ sơ kỹ thuật, theo dõi thông số vận hành và duy trì sự ổn định của hệ thống.', advice: 'Hãy trau dồi kỹ năng quản lý dữ liệu kiểm định, tìm hiểu quy chuẩn ISO và bảo trì tài liệu kỹ thuật số.' },
  SE: { code: 'SE', en: 'The People Catalyst', vn: 'Người Thúc Đẩy Hợp Tác', keywords: ['Gắn kết', 'Lan tỏa', 'Hành động'], desc: 'Bạn có xu hướng thích kết nối mọi người, xây dựng tinh thần đồng đội và tạo ra ảnh hưởng tích cực trong tập thể.', advice: 'Hãy tham gia ban điều hành câu lạc bộ, tổ chức các sự kiện thanh niên hoặc hoạt động giao lưu văn hóa.' },
  ES: { code: 'ES', en: 'The Dynamic Leader', vn: 'Nhà Lãnh Đạo Năng Động', keywords: ['Dẫn dắt', 'Thuyết phục', 'Kết nối'], desc: 'Bạn có xu hướng nhiệt huyết, chủ động truyền cảm hứng và thích tập hợp các nguồn lực để đạt được mục tiêu chung.', advice: 'Hãy rèn luyện kỹ năng đàm phán, quản lý xung đột và học cách lắng nghe phản hồi từ các thành viên trong nhóm.' },
  SA: { code: 'SA', en: 'The Expressive Educator', vn: 'Người Truyền Cảm Hứng Giáo Dục', keywords: ['Truyền cảm hứng', 'Ngôn từ', 'Phát triển'], desc: 'Bạn có xu hướng sử dụng ngôn từ, nghệ thuật và sự ấm áp để truyền đạt kiến thức và chạm đến cảm xúc người khác.', advice: 'Hãy thử sức với viết lách, thuyết trình trước đám đông hoặc tổ chức các buổi chia sẻ kỹ năng cho bạn bè.' },
  AS: { code: 'AS', en: 'The Empathetic Artist', vn: 'Nghệ Sĩ Lan Tỏa Cảm Xúc', keywords: ['Cảm xúc', 'Sáng tạo', 'Nhân văn'], desc: 'Bạn có xu hướng dùng các hình thức sáng tạo để biểu đạt trải nghiệm con người và xây dựng sự đồng cảm xã hội.', advice: 'Hãy sáng tạo các tác phẩm mang thông điệp xã hội, làm phim ngắn hoặc tham gia các dự án nghệ thuật cộng đồng.' },
  SC: { code: 'SC', en: 'The Dedicated Coordinator', vn: 'Người Điều Phối Tận Tâm', keywords: ['Chu đáo', 'Điều phối', 'Hỗ trợ'], desc: 'Bạn có xu hướng quan tâm chu đáo đến nhu cầu của mọi người và thích duy trì môi trường làm việc ổn định, trật tự.', advice: 'Hãy phát triển kỹ năng quản lý thời gian, điều phối hậu cần sự kiện và chăm sóc các mối quan hệ tập thể.' },
  CS: { code: 'CS', en: 'The Supportive Administrator', vn: 'Người Quản Trị Hỗ Trợ', keywords: ['Tổ chức', 'Quy trình', 'Đồng hành'], desc: 'Bạn có xu hướng hỗ trợ người khác bằng cách thiết lập quy trình làm việc rõ ràng, minh bạch và có thể dự đoán.', advice: 'Hãy tìm hiểu về quản trị hành chính, chăm sóc khách hàng chuyên nghiệp hoặc xây dựng tài liệu hướng dẫn.' },
  EC: { code: 'EC', en: 'The Strategic Builder', vn: 'Nhà Xây Dựng Chiến Lược', keywords: ['Kế hoạch', 'Nguồn lực', 'Thực thi'], desc: 'Bạn có xu hướng thích biến những ý tưởng lớn thành các bước triển khai cụ thể, có kiểm soát rủi ro và ngân sách.', advice: 'Hãy học cách lập kế hoạch kinh doanh nhỏ, quản lý tài chính cá nhân và làm quen với phần mềm quản lý dự án.' },
  CE: { code: 'CE', en: 'The Operations Director', vn: 'Nhà Quản Trị Vận Hành', keywords: ['Tối ưu', 'Hiệu suất', 'Vận hành'], desc: 'Bạn có xu hướng theo đuổi sự tối ưu, thích thiết lập các cơ chế quản trị tài chính và kiểm soát chất lượng chặt chẽ.', advice: 'Hãy tìm hiểu về quản trị chuỗi cung ứng, phân tích chi phí - lợi ích và các phương pháp nâng cao hiệu suất làm việc.' },
  EA: { code: 'EA', en: 'The Creative Entrepreneur', vn: 'Doanh Nhân Sáng Tạo', keywords: ['Ý tưởng', 'Thương mại', 'Đổi mới'], desc: 'Bạn có xu hướng nhận ra tiềm năng thương mại trong các ý tưởng sáng tạo và thích xây dựng thương hiệu mới lạ.', advice: 'Hãy tìm hiểu về khởi nghiệp sáng tạo, marketing số và xây dựng danh mục dự án cá nhân.' },
  AE: { code: 'AE', en: 'The Enterprising Artist', vn: 'Nghệ Sĩ Khởi Nghiệp', keywords: ['Bản sắc', 'Thương hiệu', 'Tự chủ'], desc: 'Bạn có xu hướng muốn đưa những sản phẩm nghệ thuật độc đáo ra thị trường và khẳng định dấu ấn cá nhân.', advice: 'Hãy trau dồi cả kỹ năng chuyên môn nghệ thuật lẫn kiến thức bản quyền, truyền thông và kinh doanh sáng tạo.' },
  AC: { code: 'AC', en: 'The Structured Creative', vn: 'Nhà Sáng Tạo Quy Chuẩn', keywords: ['Biên tập', 'Bố cục', 'Chỉn chu'], desc: 'Bạn có xu hướng sáng tạo nhưng yêu cầu cao về cấu trúc, bố cục chặt chẽ và sự nhất quán trong từng chi tiết.', advice: 'Hãy thử sức trong các lĩnh vực như dàn trang sách báo, thiết kế hệ thống nhận diện thương hiệu hoặc biên tập nội dung.' },
  CA: { code: 'CA', en: 'The Creative Administrator', vn: 'Nhà Quản Trị Trình Bày', keywords: ['Trình bày', 'Trực quan', 'Khoa học'], desc: 'Bạn có xu hướng thích biến những số liệu, quy trình phức tạp thành các bản báo cáo trực quan, đẹp mắt và dễ hiểu.', advice: 'Hãy nâng cao kỹ năng thiết kế báo cáo tài chính trực quan, dashboard số liệu hoặc tài liệu đào tạo nội bộ.' },
  fallback: { code: 'Curious', en: 'The Curious Explorer', vn: 'Người Khám Phá Tò Mò', keywords: ['Tò mò', 'Mở rộng', 'Thử nghiệm'], desc: 'Bạn đang có sự quan tâm phân bố khá đồng đều ở nhiều lĩnh vực khác nhau và chưa có xu hướng thiên lệch rõ nét.', advice: 'Đây là thời điểm tuyệt vời để bạn trải nghiệm nhiều hoạt động ngoại khóa, câu lạc bộ và thử thách mới để hiểu rõ hơn điều gì thực sự truyền cảm hứng cho mình.' }
};

const archetypeIcons = {
  RI: '⌕', IR: '⚗', IA: '✧', AI: '◇', IS: '◎', SI: '◈',
  IE: '⌘', EI: '↗', IC: '▦', CI: '⌥', RA: '⚒', AR: '◷',
  RS: '◎', SR: '♡', RE: '⚙', ER: '🏗', RC: '📐', CR: '📋',
  AE: '🎭', EA: '💡', AS: '🎨', SA: '📖', AC: '🖋', CA: '📊',
  SE: '🤝', ES: '🌟', SC: '🕊', CS: '📑', EC: '🏢', CE: '📈',
  fallback: '✦'
};

function toast(s){const e=$('#toast');e.textContent=s;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2300)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));updateNavState();}catch(e){toast('Không thể lưu dữ liệu trên trình duyệt này.')}}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x)state={...state,...x,profile:x.profile||{},answers:x.answers||{}}}catch(e){localStorage.removeItem(KEY)}}

function updateNavState(){
  const hasFinished = Boolean(state.result && Object.keys(state.answers).length === 50);
  const inProgress = !hasFinished && Object.keys(state.answers).length > 0;

  const navRes = $('#navResultsBtn');
  const topRes = $('#topbarResultsBtn');
  const heroRes = $('#heroResultsBtn');
  if(navRes) navRes.style.display = hasFinished ? 'inline-flex' : 'none';
  if(topRes) topRes.style.display = hasFinished ? 'inline-flex' : 'none';
  if(heroRes) heroRes.style.display = hasFinished ? 'inline-flex' : 'none';

  $$('[data-action="start"]').forEach(b => {
    if(hasFinished){
      b.innerHTML = 'Làm bài lại ↻';
      b.onclick = restart;
    } else if(inProgress){
      b.innerHTML = `Tiếp tục làm bài (${state.current + 1}/50) ↗`;
      b.onclick = () => { beginQuiz(); };
    } else {
      b.innerHTML = 'Bắt đầu ↗';
      b.onclick = profileStart;
    }
  });
}

function go(id){
  $$('.screen').forEach(x=>x.classList.toggle('active',x.id===id));
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='library')renderLibrary();
  if(id==='results'&&state.result)renderResults();
  if(id==='letter')renderLetter();
  updateNavState();
}

function profileStart(){const p=state.profile||{};$('#nickname').value=p.nickname||'';$('#grade').value=p.grade||'';$('#age').value=p.age||'';$('#note').value=p.note||'';$$('#subjects .chip').forEach(b=>b.classList.toggle('selected',(p.subjects||[]).includes(b.textContent)));go('profile')}
function chapterAt(i){return Object.entries(chapters).find(([k,v])=>i>=v.start&&i<v.end)}
function beginQuiz(){if(!questions.length)return toast('Dữ liệu câu hỏi chưa tải xong.');state.current=Math.min(state.current||0,49);save();renderQuestion();go('quiz')}

function renderQuestion(){
  const q=questions[state.current],[key,ch]=chapterAt(state.current);
  const chIdx=Object.keys(chapters).indexOf(key)+1;
  const chCurrent=state.current-ch.start+1;
  const chTotal=ch.end-ch.start;

  $('#counter').innerHTML=`<span>CÂU <strong>${String(state.current+1).padStart(2,'0')}</strong> / 50</span> <small style="color:var(--lav);margin-left:8px;font-size:11px;">(Chương ${chIdx}: ${chCurrent}/${chTotal})</small>`;
  $('#progress').style.width=`${(state.current/50)*100}%`;
  $('#chapterNo').textContent=`CHAPTER ${chIdx} · ${key.toUpperCase()}`;
  $('#chapterTitle').textContent=ch.title;
  $('#chapterDesc').textContent=ch.desc;
  $('#qtext').textContent=q.text;
  
  const chProgEl=$('#chapterProgressText');
  if(chProgEl) chProgEl.textContent=`Tiến độ Chương ${chIdx}: ${chCurrent}/${chTotal} câu`;

  $('#qtype').textContent=q.type==='likert'?(key==='personality'?'PERSONALITY · SELF REFLECTION':key==='interests'?'INTERESTS · ACTIVITY PREFERENCE':'SELF-ASSESSMENT · 1–5'):q.type==='choice'?'VALUES · FORCED CHOICE':'LIFE CHOICES · SCENARIO';
  $('#qhint').textContent=q.type==='likert'?(key==='interests'?'Bạn hứng thú với hoạt động này ở mức độ nào?':'Bạn đồng ý với nhận định này ở mức độ nào?'):'Hãy chọn phương án gần với cách bạn thường ưu tiên. Không có đáp án đúng hay sai.';
  
  const opts=q.type==='likert'?[['1','Hoàn toàn không đồng ý'],['2','Không đồng ý'],['3','Phân vân / Bình thường'],['4','Đồng ý'],['5','Hoàn toàn đồng ý']]:q.options.map(o=>[o.id,o.text]);
  $('#options').innerHTML=opts.map(([id,t])=>`<button class="option ${String(state.answers[q.id])===String(id)?'selected':''}" data-answer="${id}"><span class="key">${id}</span><span>${esc(t)}</span></button>`).join('');
  $$('#options .option').forEach(b=>b.onclick=()=>{
    state.answers[q.id]=q.type==='likert'?Number(b.dataset.answer):b.dataset.answer;
    save();
    renderQuestion();
  });
  $('#previous').disabled=state.current===0;
  $('#next').disabled=state.answers[q.id]===undefined;
  $('#next').innerHTML=state.current===49?'Hoàn thành ✧':'Tiếp tục →';
  $('#answered').textContent=`${Object.keys(state.answers).length}/50 đã trả lời`;
  $('#chapterDots').innerHTML=Object.entries(chapters).map(([k,v])=>`<span class="${state.current>=v.start?'done':''}"></span>`).join('');
}

function handleQuizKeydown(e){
  const quizScreen=$('#quiz');
  if(!quizScreen||!quizScreen.classList.contains('active'))return;
  if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;

  const q=questions[state.current];
  if(!q)return;

  // Likert options: keys 1-5
  if(q.type==='likert'&&['1','2','3','4','5'].includes(e.key)){
    e.preventDefault();
    state.answers[q.id]=Number(e.key);
    save();
    renderQuestion();
    return;
  }

  // Choice / Scenario options: A-D (hoặc phím số 1-4)
  if(q.type!=='likert'){
    const keyUpper=e.key.toUpperCase();
    const optIds=(q.options||[]).map(o=>o.id);
    if(optIds.includes(keyUpper)){
      e.preventDefault();
      state.answers[q.id]=keyUpper;
      save();
      renderQuestion();
      return;
    }
    const num=parseInt(e.key,10);
    if(!isNaN(num)&&num>=1&&num<=optIds.length){
      e.preventDefault();
      state.answers[q.id]=optIds[num-1];
      save();
      renderQuestion();
      return;
    }
  }

  // Enter to advance if answered
  if(e.key==='Enter'){
    if(state.answers[q.id]!==undefined){
      e.preventDefault();
      next();
    }
    return;
  }

  // ArrowLeft to go back
  if(e.key==='ArrowLeft'){
    if(state.current>0){
      e.preventDefault();
      prev();
    }
    return;
  }

  // ArrowRight to go next if answered
  if(e.key==='ArrowRight'){
    if(state.answers[q.id]!==undefined){
      e.preventDefault();
      next();
    }
    return;
  }
}

function next(){if(state.answers[questions[state.current].id]===undefined)return toast('Hãy chọn một phương án trước khi tiếp tục.');if(state.current<49){state.current++;save();renderQuestion()}else analyze()}
function prev(){if(state.current>0){state.current--;save();renderQuestion()}}
function avg(a){return a.length?a.reduce((x,y)=>x+y,0)/a.length:0}
function norm(v){return Math.round((v-1)/4*100)}

function calculate(){
  const get=id=>state.answers[id],personality={};
  const groups={openness:['P01','P02','P03'],conscientiousness:['P04','P05','P06'],extraversion:['P07','P08'],agreeableness:['P09','P10'],neuroticism:['P11','P12']};
  for(const [d,ids] of Object.entries(groups)){
    const vals=ids.map(id=>{const q=questions.find(x=>x.id===id),v=Number(get(id));return q.reverse?6-v:v});
    personality[d]=norm(avg(vals));
  }

  const iGroups={R:[],I:[],A:[],S:[],E:[],C:[]};
  questions.filter(q=>q.chapter==='interests').forEach(q=>{
    if(get(q.id)!==undefined)iGroups[q.dimension.toUpperCase()].push(Number(get(q.id)));
  });
  const interests={};
  Object.entries(iGroups).forEach(([k,a])=>interests[k]=a.length?norm(avg(a)):0);

  const strengthScores={};
  questions.filter(q=>q.chapter==='strengths').forEach(q=>strengthScores[q.dimension]=norm(Number(get(q.id))));

  const valueScores={},scenarioScores={};
  questions.filter(q=>q.chapter==='values'||q.chapter==='life_choices').forEach(q=>{
    const o=q.options.find(x=>x.id===get(q.id));
    (o?.tags||[]).forEach(t=>{
      const target=q.chapter==='values'?valueScores:scenarioScores;
      target[t]=(target[t]||0)+1;
    });
  });

  const topInterests=Object.entries(interests).sort((a,b)=>b[1]-a[1]).slice(0,3),
        topStrengths=Object.entries(strengthScores).sort((a,b)=>b[1]-a[1]).slice(0,3),
        topTags=Object.entries(scenarioScores).sort((a,b)=>b[1]-a[1]).slice(0,4);

  // Ánh xạ kỹ năng (đã bổ sung đầy đủ EN05 và SV02)
  const skillMap={
    logic:['IT01','IT02','IT03','IT04','IT05','EN01','EN02','EN03','EN04','EN05','SC04','SC05'],
    analysis:['IT02','IT03','IT04','BU02','SC01','SC02','SC03','SC04','SC05','SV02'],
    communication:['CR03','BU01','BU04','SO01','SO04','SO05','SV01','SV04'],
    empathy:['SO01','SO02','SO03','SO05','HE01','HE02','HE05'],
    creativity:['CR01','CR02','CR03','CR04','CR05','BU01','BU05'],
    self_learning:['IT01','IT02','IT04','SC01','SC02','SC04'],
    focus:['IT02','BU03','HE03','HE04','SC02','EN05','SV02'],
    teamwork:['EN01','EN02','BU04','SO01','HE01','HE02','SV04'],
    adaptability:['IT01','IT02','CR03','BU05','SV03','SV05'],
    decision_making:['IT03','BU02','BU05','SV04','EN05','SV02']
  };

  // Tính toán mẫu số tối đa thực tế cho từng tag giá trị từ dữ liệu câu hỏi Chương 4
  const valueMaxCounts={};
  questions.filter(q=>q.chapter==='values').forEach(q=>{
    const seen=new Set();
    (q.options||[]).forEach(o=>(o.tags||[]).forEach(t=>seen.add(t)));
    seen.forEach(t=>{valueMaxCounts[t]=(valueMaxCounts[t]||0)+1});
  });

  const matches=careers.map(c=>{
    // 1. RIASEC Interest Matching: Trọng số Heuristic 3:2:1 (khử trùng lặp ký tự)
    const distinctCodes=[...new Set(c.riasec)];
    let interest=0;
    if(distinctCodes.length>=3){
      interest=(3*(interests[distinctCodes[0]]||0)+2*(interests[distinctCodes[1]]||0)+1*(interests[distinctCodes[2]]||0))/6;
    }else if(distinctCodes.length===2){
      interest=(3*(interests[distinctCodes[0]]||0)+2*(interests[distinctCodes[1]]||0))/5;
    }else if(distinctCodes.length===1){
      interest=interests[distinctCodes[0]]||0;
    }
    interest=Math.round(interest);

    // 2. Strengths Matching: Tự đánh giá năng lực
    const relevant=Object.entries(strengthScores).filter(([k])=>(skillMap[k]||[]).includes(c.id)).map(([,v])=>v);
    const strength=relevant.length?Math.round(avg(relevant)):50;

    // 3. Big Five Matching: Hồ sơ phong cách làm việc độc lập (Primary 60%, Secondary 40%)
    const prof=careerBigFiveProfiles[c.id]||{primary:'conscientiousness',secondary:'openness'};
    const p1=personality[prof.primary]??50;
    const p2=personality[prof.secondary]??50;
    const p=Math.round(0.60*p1+0.40*p2);

    // 4. ValueFit Matching: Chuẩn hóa theo số câu hỏi thực tế của từng tag
    const valueTags={
      technology:['learning','autonomy','expertise'],
      engineering:['expertise','achievement','stability'],
      creative:['autonomy','achievement','flexibility'],
      business:['financial','achievement','leadership'],
      education:['purpose','contribution','balance'],
      health:['purpose','contribution','stability'],
      science:['learning','expertise','purpose'],
      services:['stability','structure','financial']
    };
    const vt=valueTags[c.category]||[];
    const valueFit=vt.length?Math.round(avg(vt.map(k=>Math.min(100,Math.round(((valueScores[k]||0)/(valueMaxCounts[k]||1))*100))))):50;

    // Tổng trọng số Career Matching: 55% + 25% + 10% + 10% = 100%
    const score=Math.round(.55*interest+.25*strength+.10*p+.10*valueFit);
    return {...c,score,details:{interest,strength,p,valueFit}};
  }).sort((a,b)=>b.score-a.score);

  // Xác định Archetype: nếu các sở thích quá đồng đều hoặc thấp, chuyển về The Curious Explorer
  const diff=topInterests[0][1]-topInterests[1][1];
  const isBalanced=topInterests[0][1]===0||(diff<=5&&topInterests[0][1]<40);
  const code=topInterests.slice(0,2).map(x=>x[0]).join('');
  const arch=(!isBalanced&&archetypes[code])?archetypes[code]:archetypes.fallback;

  return {
    personality,
    interests,
    strengthScores,
    valueScores,
    scenarioScores,
    topInterests,
    topStrengths,
    topTags,
    matches:matches.slice(0,6),
    archetype:arch.en,
    archetypeVn:arch.vn,
    archetypeDesc:arch.desc,
    archetypeKeywords:arch.keywords,
    archetypeAdvice:arch.advice,
    archetypeCode:arch.code||code
  };
}

function analyze(){
  go('analyzing');
  let i=0;
  const msgs=['Tổng hợp câu trả lời của bạn...','Nhận diện xu hướng nổi bật...','Đối chiếu thư viện nghề nghiệp...','Hoàn thiện hồ sơ khám phá...'];
  $('#analyzeProgress').style.width='0%';
  const timer=setInterval(()=>{
    i++;
    $('#analyzeProgress').style.width=i*25+'%';
    $('#analyzeMsg').textContent=msgs[i-1];
    if(i===4){
      clearInterval(timer);
      state.result=calculate();
      save();
      go('results'); // go('results') đã tự động gọi renderResults(), không gọi thêm lần 2
    }
  },400);
}

function destroyResultCharts(){resultCharts.forEach(c=>c.destroy());resultCharts=[]}
function makeRadar(id,labels,values,max=100){
  const canvas=document.getElementById(id);
  if(!canvas||!window.Chart)return;
  const chart=new Chart(canvas,{
    type:'radar',
    data:{
      labels,
      datasets:[{
        data:values,
        fill:true,
        backgroundColor:'rgba(166,160,255,.20)',
        borderColor:'#b49cff',
        borderWidth:2.5,
        pointBackgroundColor:'#b5e7f5',
        pointBorderColor:'#fff',
        pointBorderWidth:2,
        pointRadius:4,
        pointHoverRadius:6
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'#101a30',
          titleColor:'#fff',
          bodyColor:'#dce4f4',
          borderColor:'#ffffff30',
          borderWidth:1,
          callbacks:{label:c=>` ${c.formattedValue}/100`}
        }
      },
      scales:{
        r:{
          min:0,
          max,
          beginAtZero:true,
          ticks:{display:false,stepSize:20},
          grid:{color:'rgba(255,255,255,.12)'},
          angleLines:{color:'rgba(255,255,255,.14)'},
          pointLabels:{
            color:'#d6dced',
            font:{family:'Be Vietnam Pro',size:10,weight:'500'},
            padding:10
          }
        }
      }
    }
  });
  resultCharts.push(chart);
}

function renderRecommendations(){
  const r=state.result;
  if(!r)return;
  const list=showAllMatches?r.matches.slice(0,6):r.matches.slice(0,3);
  $('#recommendations').innerHTML=list.map(c=>careerCard(c,true)).join('');
  const toggleBtn=$('#toggleMoreMatches');
  if(toggleBtn){
    toggleBtn.textContent=showAllMatches?'Thu gọn còn Top 3 ↑':'Khám phá thêm 3 nghề phù hợp (Top 4–6) ↓';
  }
}

function renderResults(){
  const r=state.result;
  if(!r)return;
  destroyResultCharts();
  $('#greeting').textContent=state.profile.nickname?`${state.profile.nickname}, đây là bức tranh khám phá của bạn.`:'Đây là bức tranh khám phá của bạn.';
  
  // Hiển thị Archetype với tên tiếng Việt, từ khóa và lời khuyên phát triển
  const archTitle=r.archetypeVn?`${r.archetype} · ${r.archetypeVn}`:r.archetype;
  $('#archetype').textContent=archTitle;
  const kwHtml=(r.archetypeKeywords||[]).map(k=>`<span class="tag">✦ ${esc(k)}</span>`).join(' ');
  const adviceHtml=r.archetypeAdvice?`<span style="display:block;margin-top:8px;color:var(--ice);font-size:10px;line-height:1.7;"><strong>↗ Lời khuyên phát triển:</strong> ${esc(r.archetypeAdvice)}</span>`:'';
  const kwWrap=kwHtml?`<div class="tags" style="margin-top:8px;">${kwHtml}</div>`:'';
  $('#archetypeDesc').innerHTML=`${esc(r.archetypeDesc)}${kwWrap}${adviceHtml}`;

  const pLabels=['Cởi mở','Tận tâm','Hướng ngoại','Hợp tác','Nhạy cảm cảm xúc'];
  const pKeys=['openness','conscientiousness','extraversion','agreeableness','neuroticism'];
  makeRadar('personalityChart',pLabels,pKeys.map(k=>r.personality[k]));
  $('#personalityLegend').innerHTML=pKeys.map((k,i)=>`<span><i class="legend-dot dot-${i}"></i>${pLabels[i]} <b>${r.personality[k]}</b></span>`).join('');

  const rKeys=['R','I','A','S','E','C'];
  const rLabels=['Thực tế','Nghiên cứu','Nghệ thuật','Xã hội','Quản lý','Nghiệp vụ'];
  makeRadar('interestChart',rLabels,rKeys.map(k=>r.interests[k]));
  $('#interestLegend').innerHTML=rKeys.map((k,i)=>`<span><b>${k}</b> ${rLabels[i]} <em>${r.interests[k]}</em></span>`).join('');

  const strengthEntries=Object.entries(r.strengthScores).sort((a,b)=>b[1]-a[1]).slice(0,6);
  if(window.Chart){
    const c=new Chart($('#strengthChart'),{
      type:'bar',
      data:{
        labels:strengthEntries.map(([k])=>strengthNames[k]),
        datasets:[{
          data:strengthEntries.map(([,v])=>v),
          backgroundColor:['#a69cff','#8d9df4','#79b9df','#70c9ce','#a28bd8','#7c8dc2'],
          borderRadius:7,
          borderSkipped:false,
          barThickness:13
        }]
      },
      options:{
        indexAxis:'y',
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{label:c=>` ${c.formattedValue}/100`}}
        },
        scales:{
          x:{min:0,max:100,grid:{color:'rgba(255,255,255,.09)'},ticks:{color:'#8794ad',font:{size:9},stepSize:25}},
          y:{grid:{display:false},ticks:{color:'#d6dced',font:{size:9}}}
        }
      }
    });
    resultCharts.push(c);
  }

  const values=Object.entries(r.valueScores).sort((a,b)=>b[1]-a[1]).slice(0,5);
  $('#valuesVisual').innerHTML=values.length?values.map(([k,v],i)=>`<div class="value-row"><span class="value-rank">0${i+1}</span><div class="value-main"><strong>${valueNames[k]||k}</strong><div class="value-track"><i style="width:${Math.max(8,v/Math.max(...values.map(x=>x[1]))*100)}%"></i></div></div><b>${v}</b></div>`).join(''):'<p class="fine">Chưa đủ dữ liệu để hiển thị.</p>';

  const symbolMap={ANALYTICAL:['⌕','Phân tích'],CREATIVE:['✧','Sáng tạo'],SOCIAL:['◎','Hợp tác'],ORGANIZED:['▦','Tổ chức'],EXPERIMENTAL:['⚗','Thử nghiệm'],LEADERSHIP:['↗','Dẫn dắt'],ADAPTABILITY:['〰','Thích nghi'],RESEARCH:['⌘','Nghiên cứu']};
  $('#scenarioVisual').innerHTML=r.topTags.length?r.topTags.map(([k,v])=>{const x=symbolMap[k]||['◇',tagNames[k]||k];return `<div class="symbol-item"><span>${x[0]}</span><strong>${x[1]}</strong><small>${v} lựa chọn</small></div>`}).join(''):'<p class="fine">Chưa có dữ liệu nổi bật.</p>';

  $('#archetypeSymbol').textContent=archetypeIcons[r.archetypeCode]||archetypeIcons[r.archetype]||'✧';
  $('#archetypeShort').textContent=r.archetype;
  $('#archetypeMini').textContent=(r.archetypeKeywords||[]).join(' · ')||r.topInterests.slice(0,3).map(([k])=>riaNames[k]).join(' · ');

  renderRecommendations();
  $('#roadmapText').textContent=`Bạn có thể bắt đầu từ ${r.matches[0]?.name||'một lĩnh vực đang quan tâm'}: tìm hiểu chương trình học, thử dự án nhỏ và trò chuyện với người có trải nghiệm thực tế. Điểm số chỉ là gợi ý ban đầu, bạn hoàn toàn có thể rèn luyện thêm kỹ năng và tích lũy trải nghiệm mới theo thời gian.`;
}

function careerCard(c,score=false){
  let breakdownHtml='';
  let reasonHtml='';
  if(score&&c.details){
    breakdownHtml=`
      <div class="match-breakdown">
        <div class="breakdown-item"><small>Sở thích</small><b>${c.details.interest}</b></div>
        <div class="breakdown-item"><small>Thế mạnh</small><b>${c.details.strength}</b></div>
        <div class="breakdown-item"><small>Tính cách</small><b>${c.details.p}</b></div>
        <div class="breakdown-item"><small>Giá trị</small><b>${c.details.valueFit}</b></div>
      </div>`;
    const primaryInterest=riaNames[c.riasec[0]]||c.riasec[0];
    reasonHtml=`<div class="match-reason">✦ Tương thích cao với sở thích <b>${primaryInterest}</b>, năng lực tự đánh giá và môi trường làm việc <b>${catNames[c.category]||c.category}</b>.</div>`;
  }
  return `
    <article class="career-card">
      <div class="top">
        <span>${c.id} · ${catNames[c.category]}</span>
        ${score?`<span class="score">⭐ ${c.score}/100</span>`:''}
      </div>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.description)}</p>
      ${reasonHtml}
      ${breakdownHtml}
      <div class="codes">${c.riasec.map(x=>`<span>${x} · ${riaNames[x]}</span>`).join('')}</div>
      <button data-career="${c.id}">Khám phá nghề này →</button>
    </article>`;
}

function renderLibrary(){
  if(!careers.length)return;
  const q=($('#search')?.value||'').toLowerCase().trim(),cat=$('#filter')?.value||'all';
  const list=careers.filter(c=>(cat==='all'||c.category===cat)&&[c.name,c.description,...c.skills,...c.subjects].join(' ').toLowerCase().includes(q));
  $('#careerCount').textContent=`Hiển thị ${list.length} / ${careers.length} nghề nghiệp`;
  $('#careerGrid').innerHTML=list.map(c=>careerCard(c)).join('')||'<div class="notice">Không tìm thấy nghề phù hợp.</div>';
}

function detail(id){
  const c=careers.find(x=>x.id===id);
  if(!c)return;
  const active=$('.screen.active');
  detailSourceScreen=(active&&active.id==='results')?'results':'library';
  const backBtn=$('#detailBackBtn');
  if(backBtn){
    backBtn.textContent=detailSourceScreen==='results'?'← Quay lại kết quả khám phá':'← Quay lại thư viện nghề';
  }
  const block=(title,a)=>`<article class="detail-block"><h3>${title}</h3><ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>`;
  $('#detailContent').innerHTML=`<div class="detail-head"><span class="eyebrow">${c.id} · ${catNames[c.category]}</span><h1>${esc(c.name)}</h1><p>Mã RIASEC: ${c.riasec.join(' – ')} (${c.riasec.map(k=>riaNames[k]).join(', ')})</p><p>${esc(c.description)}</p></div><div class="detail-grid">${block('Công việc thường ngày',c.responsibilities)}${block('Kỹ năng cần phát triển',c.skills)}${block('Môn học liên quan',c.subjects)}${block('Hướng học tập',c.education)}${block('Môi trường làm việc',c.environment)}${block('Điểm thuận lợi',c.advantages)}${block('Thách thức',c.challenges)}${block('Nhóm sở thích liên quan',c.riasec.map(k=>`${k} — ${riaNames[k]}`))}</div>`;
  go('detail');
}

function renderLetter(){
  const r=state.result;
  if(!r){$('#letterText').innerHTML='<p>Hãy hoàn thành hành trình khám phá trước khi đọc lá thư này.</p>';return}
  const name=esc(state.profile.nickname||'bạn'),skills=r.topStrengths.map(([k])=>strengthNames[k]).join(', '),career=r.matches.slice(0,3).map(c=>c.name).join(', ');
  $('#letterText').innerHTML=`<p>Chào ${name},</p><p>Nếu bạn đang đọc những dòng này, có lẽ bạn vẫn đang trên hành trình tìm hiểu mình là ai và muốn trở thành người như thế nào. Mình muốn nhắc bạn rằng không cần phải có tất cả câu trả lời ngay hôm nay.</p><p>Qua những lựa chọn vừa rồi, bạn đã thể hiện sự quan tâm đến ${r.topInterests.slice(0,2).map(([k])=>riaNames[k].toLowerCase()).join(' và ')}. Bạn cũng tự tin ở một số năng lực như ${esc(skills)}. Hãy xem đó là manh mối để tiếp tục trải nghiệm, không phải chiếc nhãn cố định.</p><p>Một vài hướng nghề nghiệp bạn có thể tìm hiểu thêm là ${esc(career)}. Đừng chọn chúng chỉ vì một con số trên màn hình. Hãy đọc về công việc thật, thử dự án nhỏ, hỏi người có kinh nghiệm và quan sát xem hoạt động nào khiến bạn muốn học sâu hơn.</p><p>Sẽ có lúc bạn đổi ý. Điều đó không có nghĩa là bạn thất bại. Mỗi trải nghiệm giúp bạn hiểu rõ hơn điều mình coi trọng và điều mình muốn đóng góp.</p><p>Hãy tiếp tục tò mò, kiên nhẫn với quá trình học tập và cho bản thân cơ hội thử những con đường mới.</p>`;
}

function restart(){
  if(!confirm('Bắt đầu lại? Câu trả lời và kết quả hiện tại sẽ bị xóa khỏi trình duyệt.'))return;
  state={profile:state.profile||{},answers:{},current:0,result:null};
  showAllMatches=false;
  save();
  profileStart();
}

function bind(){
  $$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
  $$('[data-action="start"]').forEach(b=>b.onclick=profileStart);
  
  const backBtn=$('#detailBackBtn');
  if(backBtn) backBtn.onclick=()=>go(detailSourceScreen);

  const toggleBtn=$('#toggleMoreMatches');
  if(toggleBtn) toggleBtn.onclick=()=>{
    showAllMatches=!showAllMatches;
    renderRecommendations();
  };

  window.addEventListener('keydown',handleQuizKeydown);

  $('#profileForm').addEventListener('submit',e=>{
    e.preventDefault();
    state.profile={nickname:$('#nickname').value.trim(),grade:$('#grade').value,age:$('#age').value,note:$('#note').value.trim(),subjects:$$('#subjects .selected').map(x=>x.textContent)};
    save();
    beginQuiz();
  });

  $$('#subjects .chip').forEach(b=>b.onclick=()=>b.classList.toggle('selected'));
  $('#next').onclick=next;
  $('#previous').onclick=prev;
  $$('[data-action="exit"],[data-action="saveExit"]').forEach(b=>b.onclick=()=>{save();go('home');toast('Tiến độ đã được lưu trên trình duyệt.')});
  $$('[data-action="restart"]').forEach(b=>b.onclick=restart);
  $$('[data-action="print"]').forEach(b=>b.onclick=()=>window.print());
  $('#search').addEventListener('input',renderLibrary);
  $('#filter').addEventListener('change',renderLibrary);
  document.addEventListener('click',e=>{const b=e.target.closest('[data-career]');if(b)detail(b.dataset.career)});
}

async function init(){
  load();
  try{
    const [q,c]=await Promise.all([fetch('./data/questions.json'),fetch('./data/careers.json')]);
    if(!q.ok||!c.ok)throw Error('fetch');
    questions=await q.json();
    careers=await c.json();
  }catch(e){
    console.error(e);
    toast('Không tải được dữ liệu. Hãy mở bằng Live Server.');
    return;
  }
  bind();
  renderLibrary();
  updateNavState();
  if(state.result&&Object.keys(state.answers).length===50)renderResults();

  // Hỗ trợ điều hướng deep link qua URL hash hoặc query param
  const urlParams=new URLSearchParams(window.location.search);
  const screenParam=urlParams.get('screen')||window.location.hash.replace('#','');
  if(screenParam==='quiz'){
    beginQuiz();
  }else if(screenParam==='detail'){
    detail(urlParams.get('id')||'IT01');
  }else if(screenParam==='results'){
    if(!state.result){
      for(let i=0;i<50;i++){
        const q=questions[i];
        if(q.type==='likert')state.answers[q.id]=(i%4)+2;
        else if(q.options&&q.options.length)state.answers[q.id]=q.options[0].id;
      }
      state.result=calculate();
    }
    go('results');
  }else if(screenParam&&$('#'+screenParam)){
    go(screenParam);
  }
}

init();
