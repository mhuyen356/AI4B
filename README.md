# AI Story-Living Experience (web public)

Cấu trúc: index.html (web bảo tàng + game + chat + quản trị), bot-studio.html (Bot Studio), api/chat.js (gọi AI, giữ API key ở server).

## Đưa lên mạng bằng Vercel (miễn phí)
1. Tạo tài khoản GitHub, tạo repo mới, tải toàn bộ file trong thư mục này lên (giữ nguyên thư mục api).
2. Vào vercel.com, đăng nhập bằng GitHub, bấm Add New > Project, chọn repo, bấm Deploy.
3. Vào Project > Settings > Environment Variables, thêm ANTHROPIC_API_KEY (lấy tại console.anthropic.com), rồi Redeploy.
4. Vercel cấp link dạng ten-ban.vercel.app, ai cũng mở được.

Không có key thì web vẫn chạy, chat tự dùng tra cứu từ khóa.

## Lưu ý
- Đặt giới hạn chi tiêu trong console.anthropic.com để tránh bị lạm dụng.
- Bản mẫu cho client gửi cả prompt. Triển khai thật nên chuyển kho tri thức và system prompt về server, thêm giới hạn số lượt gọi theo IP.
- Đổi model bằng biến môi trường MODEL.

## Chạy hoàn toàn miễn phí (Gemini)
1. Vào aistudio.google.com, tạo API key (gói miễn phí, không cần thẻ).
2. Trên Vercel thêm GEMINI_API_KEY và GEMINI_MODEL (copy đúng model ID dạng Flash trong AI Studio), rồi Redeploy.
3. Gói miễn phí có giới hạn số lượt hỏi mỗi phút và mỗi ngày, vượt quá thì chat tự chuyển về tra cứu từ khóa.
