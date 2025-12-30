# 🌟 Capstone Project

## 🚀 Giới thiệu
**Capstone** là dự án tốt nghiệp được xây dựng nhằm thể hiện kỹ năng lập trình.  
Dự án bao gồm **Frontend** phát triển bằng **Vue.js** và **Backend** sử dụng **PHP (Laravel)**, kết hợp cơ sở dữ liệu MySQL.

Mục tiêu của dự án là xây dựng một nền tảng web giúp người dùng.

---

## 🧩 Tính năng chính
- 👤 Đăng ký, đăng nhập, quản lý tài khoản người dùng.  
- 📦 Quản lý dữ liệu (CRUD) cho các đối tượng chính trong hệ thống.  
- 🔍 Tìm kiếm và lọc thông tin theo nhiều tiêu chí.  
- 💬 Giao diện thân thiện, responsive với TailwindCSS.  
- 🔐 Xác thực và phân quyền người dùng (Admin /Staff /User).  
- 📊 Trang quản trị hiển thị thống kê cơ bản.  

---

## 🛠️ Công nghệ sử dụng
### Frontend
- **Vue.js 3 (Composition API)**
- **Vite**
- **TailwindCSS**
- **Axios**
- **Vue Router**
- **Pusher**

### Backend
- **PHP (Laravel Framework)**
- **MySQL**
- **RESTful API**

---

## 📂 Cấu trúc thư mục
```bash
Capstone/
│
├── Fe/        # Giao diện người dùng (Vue.js)
├── Be/         # API backend (Laravel / PHP)
├── README.md        # Tài liệu mô tả dự án
└── ...

⚙️ Hướng dẫn cài đặt & chạy (Local)

Phần sau là hướng dẫn mẫu — tùy vào cấu hình thực tế trong repo, bạn cần sửa các lệnh tương ứng.

1) Backend (Laravel)
cd BE
cp .env.example .env
# cập nhật .env: DB_DATABASE, DB_USERNAME, DB_PASSWORD, APP_URL
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8000
2) Frontend (Vue)
cd FE
npm install
# nếu dùng Vite
npm run dev
# hoặc nếu dùng Vue CLI
npm run serve

Mở trình duyệt: http://localhost:5173 (frontend) và http://127.0.0.1:8000 (backend)
