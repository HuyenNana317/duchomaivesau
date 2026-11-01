# 30 YEARS LATER — Interactive Career Discovery

Website MVP sử dụng HTML5, CSS3 và JavaScript thuần.

## Cách chạy
1. Giải nén ZIP và mở thư mục bằng VS Code.
2. Cài extension **Live Server**.
3. Nhấp phải `index.html` → **Open with Live Server**.
4. Không mở trực tiếp bằng `file://`, vì website cần tải các file JSON.

## Cấu trúc
- `index.html`: các màn hình website.
- `css/styles.css`: giao diện responsive.
- `js/app.js`: điều hướng, quiz, chấm điểm, matching, thư viện nghề.
- `data/questions.json`: 50 câu hỏi.
- `data/careers.json`: 40 hồ sơ nghề nghiệp.

## Chức năng
- Hồ sơ khách, không cần đăng nhập.
- 50 câu hỏi trong 5 chương.
- Lưu câu trả lời và tiến độ bằng LocalStorage.
- Tính điểm Big Five-inspired, RIASEC, thế mạnh, giá trị và tình huống.
- Gợi ý nghề nghiệp, thư viện tìm kiếm/lọc và trang chi tiết.
- Thư tương lai và in báo cáo qua Print của trình duyệt.

## Lưu ý & Phương pháp tính điểm
- Bộ câu hỏi do dự án tự xây dựng với mục đích gợi mở và tự chiêm nghiệm (self-reflection), chưa phải thang đo tâm lý chuẩn hóa hay công cụ chẩn đoán đã qua kiểm định.
- Mô hình tính điểm sở thích RIASEC áp dụng trọng số vị trí heuristic 3:2:1 (với mã 3 ký tự) hoặc 3:2 (với mã 2 ký tự) để phản ánh mức độ ưu tiên giảm dần giữa nhóm sở thích chủ đạo, thứ cấp và bổ trợ. Đây là quy tắc tính toán thử nghiệm của dự án 30 YEARS LATER, không phải tiêu chuẩn bắt buộc chính thức của John Holland.
- Điểm tương thích phong cách làm việc Big Five được xây dựng độc lập cho từng nghề (60% nét thuận lợi chính, 40% nét thuận lợi phụ), không dùng để kết luận tuyệt đối về năng lực hay ngăn cản người dùng theo đuổi đam mê. Điểm số phản ánh mức độ thuận lợi tự nhiên ban đầu; kỹ năng và thái độ làm việc luôn có thể rèn luyện và phát triển qua thời gian.
- Dữ liệu lưu trong LocalStorage của trình duyệt; xóa dữ liệu trình duyệt có thể làm mất tiến độ. Không nhập thông tin nhạy cảm.
