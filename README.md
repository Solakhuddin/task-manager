# Tasks Manager

Aplikasi manajemen tugas modern dan responsif yang dibangun menggunakan React, Express.js, dan PostgreSQL. Aplikasi ini dilengkapi dengan fitur autentikasi pengguna (JWT), manajemen state, dan kemampuan CRUD penuh untuk mengelola tugas dengan desain antarmuka (UI) bergaya *glassmorphism* yang elegan dan intuitif.

![Dashboard Screenshot](./login.png)
![Dashboard Screenshot](./dashboard.png)

## Teknologi yang Digunakan

**Frontend:**
* React.js (Vite)
* React-Bootstrap & CSS (Desain UI Glassmorphism)
* React Router DOM
* Axios

**Backend:**
* Node.js & Express.js
* Prisma ORM
* PostgreSQL
* JSON Web Token (JWT) & bcrypt (Autentikasi)

---

## Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:
* **Node.js** (Disarankan menggunakan versi 18 atau lebih baru)
* **PostgreSQL** (Sudah terinstal dan berjalan di sistem lokal Anda)

---

## Instalasi & Pengaturan

### 1. Pengaturan Database
Buat database baru di server PostgreSQL Anda (contoh nama: `todo_app_db`). Anda dapat melakukannya melalui CLI (psql) atau menggunakan aplikasi GUI seperti pgAdmin 4.

### 2. Pengaturan Backend
Buka terminal dan masuk ke direktori backend:
```bash
cd Backend
```

Instal semua dependencies:
```bash
npm install
```

Konfigurasi Environment (Variabel Lingkungan):
Buat file .env di dalam folder utama backend dan salin format dari file .env.example. Ubah DATABASE_URL dengan username dan password PostgreSQL Anda:
```bash
# Contoh isi .env
DATABASE_URL="postgresql://USERNAME_ANDA:PASSWORD_ANDA@localhost:5432/todo_app_db?schema=public"
JWT_SECRET="kunci_rahasia_jwt_anda_disini"
PORT=5000
```

Jalankan Prisma Migrations (untuk membuat struktur tabel di database secara otomatis):
```bash
npx prisma migrate dev --name init
```

Jalankan server backend:
```bash
npm run dev
# Server akan berjalan di http://localhost:5000
```

### 3. Pengaturan Frontend
Buka jendela terminal baru dan masuk ke direktori frontend:
```bash
cd Frontend
```

Instal semua dependencies:
```bash
npm run dev
# Aplikasi akan terbuka di http://localhost:5173
```

## Manajemen Database
Untuk melihat, menguji, dan mengelola data di dalam database, Anda memiliki dua opsi:

#### Opsi A: Menggunakan Prisma Studio
Karena proyek ini dibangun menggunakan Prisma ORM, Anda dapat dengan mudah melihat database melalui browser tanpa perlu repot mengatur koneksi aplikasi eksternal. Cukup buka terminal di direktori backend dan jalankan:

```bash
npx prisma studio
# Perintah ini akan secara otomatis membuka antarmuka manajemen data yang bersih dan rapi di http://localhost:5555.
```

#### Opsi B: Menggunakan pgAdmin 4
Jika Anda lebih terbiasa menggunakan antarmuka GUI tradisional, silakan buka aplikasi pgAdmin 4, sambungkan ke server lokal Anda, dan akses database yang telah Anda buat pada Langkah 1.

## Fitur Utama
Autentikasi Pengguna: Sistem login dan registrasi yang aman menggunakan hashing password (bcrypt) dan JWT.

Dashboard Cerdas: Menampilkan semua tugas yang secara otomatis diurutkan berdasarkan tenggat waktu (due date) paling dekat.

Filter Dinamis: Beralih dengan cepat untuk melihat "Semua Tugas", tugas yang "Pending", atau yang sudah "Selesai (Done)".

Operasi CRUD: Menambah, membaca, mengubah, dan menghapus data tugas secara interaktif melalui antarmuka Modal.

Desain Responsif: Tampilan yang optimal dan rapi, baik saat diakses melalui perangkat desktop maupun mobile.