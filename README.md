# 👨‍🍳 Rahasia Dapur

Rahasia Dapur adalah aplikasi pembelajaran memasak berbasis **Web dan Mobile** yang membantu pengguna belajar memasak dengan mudah, praktis, dan menyenangkan.

Aplikasi ini menyediakan berbagai resep lengkap dengan deskripsi, daftar bahan, langkah-langkah memasak, tingkat kesulitan, rating, dan video tutorial.

---

## 🚀 Fitur Utama

### 🔐 Autentikasi

* Register akun
* Login akun
* Logout
* Protected route (halaman detail hanya bisa diakses setelah login)

### 📋 Manajemen Resep

* Menampilkan daftar resep
* Pencarian resep
* Filter berdasarkan tingkat kesulitan (Mudah, Sedang, Sulit)
* Detail resep lengkap
* Rekomendasi resep terkait
* Rating dan jumlah ulasan

### 📱 Versi Mobile

* Login & Register
* List resep
* Detail resep
* Show / Hide password
* Filter tingkat kesulitan

---

## 🛠 Teknologi yang Digunakan

### 🌐 Frontend Web

* React JS
* React Router DOM
* Vite

### 📱 Frontend Mobile

* React Native
* Expo
* Axios

### 🔙 Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📂 Struktur Project

```
radapur/
│
├── backend/      → Server API & Database
├── frontend/     → Website React
├── mobile/       → Aplikasi React Native (Expo)
└── README.md
```

---

## ⚙️ Cara Menjalankan Project

### 1️⃣ Jalankan Backend

```bash
cd backend
npm install
npm run dev
```

Server berjalan di:

```
http://localhost:5000
```

---

### 2️⃣ Jalankan Frontend Web

```bash
cd frontend
npm install
npm run dev
```

Buka di browser:

```
http://localhost:5173
```

---

### 3️⃣ Jalankan Mobile (Expo)

```bash
cd mobile
npm install
npx expo start
```

Scan QR menggunakan aplikasi **Expo Go**.

---

## 🔐 Konfigurasi Environment

Buat file `.env` di folder `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 📌 Catatan

* Folder `node_modules` tidak disertakan dalam repository.
* File `.env` tidak disertakan dalam repository.
* Pastikan MongoDB sudah aktif sebelum menjalankan backend.

---

## 🎓 Informasi Project

Project ini dibuat sebagai bagian dari **Ulangan Specialize Design Platform**, yang berfokus pada perancangan dan pengembangan aplikasi fullstack berbasis web dan mobile.
Rahasia Dapur dikembangkan untuk mengimplementasikan konsep UI/UX design, arsitektur fullstack (Frontend, Backend, Database), serta integrasi antara platform web dan mobile.

---

## 👨‍💻 Author

Project ini dikembangkan sebagai aplikasi fullstack web & mobile untuk pembelajaran memasak.

---

© 2026 Rahasia Dapur. All rights reserved.
