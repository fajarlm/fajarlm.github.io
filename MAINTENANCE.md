# 🛠️ Panduan Pemeliharaan & Update Portofolio (Maintenance Guide)

Dokumen ini berisi panduan lengkap dan mudah dipahami untuk mengelola, memperbarui konten, serta merawat website portofolio Fajar Kusuma.

---

## 📋 Daftar Isi
1. [Struktur File Penting](#1-struktur-file-penting)
2. [Menambah / Mengubah Proyek](#2-menambah--mengubah-proyek)
3. [Mengaktifkan / Mematikan Mode Maintenance](#3-mengaktifkan--mematikan-mode-maintenance)
4. [Mengatur Fitur (Feature Toggles)](#4-mengatur-fitur-feature-toggles)
5. [Mengubah Kontak & Media Sosial](#5-mengubah-kontak--media-sosial)
6. [Menambah / Mengubah Sertifikat & Pengalaman](#6-menambah--mengubah-sertifikat--pengalaman)
7. [Menjalankan di Lokal & Deploy ke Vercel / GitHub](#7-menjalankan-di-lokal--deploy-ke-vercel--github)

---

## 1. Struktur File Penting

| Lokasi File | Fungsi Utama |
|---|---|
| `src/config/siteConfig.ts` | Konfigurasi utama: Mode maintenance, on/off fitur, dan data kontak. |
| `src/data/portfolioData.ts` | Pusat data: Daftar proyek (web & mobile), keahlian, pengalaman, sertifikat, dan terjemahan. |
| `src/assets/projects/` | Folder penyimpanan screenshot dan gambar dokumentasi proyek. |
| `src/assets/sertifikat/` | Folder penyimpanan file PDF/gambar sertifikat. |
| `src/components/` | Komponen halaman (Hero, Navbar, Dock, Projects, Reviews, ChatAssistant, dll.). |

---

## 2. Menambah / Mengubah Proyek

Semua data proyek disimpan di file **`src/data/portfolioData.ts`** pada array `projectsData`.

### Langkah Menambah Proyek Baru:
1. Masukkan foto thumbnail dan foto dokumentasi ke folder `src/assets/projects/` (contoh: `myproject.png`, `myproject-doc1.png`).
2. Di bagian atas `src/data/portfolioData.ts`, import foto tersebut:
   ```ts
   import myProjectImg from '../assets/projects/myproject.png';
   import myProjectDoc1 from '../assets/projects/myproject-doc1.png';
   ```
3. Tambahkan objek proyek baru ke dalam `projectsData`:
   ```ts
   {
     id: 11,
     title: 'Nama Proyek Anda',
     description: {
       en: 'English description of the project...',
       id: 'Deskripsi proyek dalam bahasa Indonesia...'
     },
     type: 'web', // Pilihan: 'web' | 'mobile' | 'desktop'
     tech: ['React', 'TypeScript', 'Tailwind'],
     img: myProjectImg,
     gallery: [myProjectDoc1], // Galeri dokumentasi tambahan
     github: 'https://github.com/fajarlm/repo-anda',
     demo: 'https://demo-anda.vercel.app',
     apk: 'https://github.com/.../release.apk' // Opsional untuk aplikasi mobile
   },
   ```

---

## 3. Mengaktifkan / Mematikan Mode Maintenance

Buka file **`src/config/siteConfig.ts`**:

```ts
export const siteConfig = {
  // Ubah ke true untuk mengaktifkan halaman maintenance
  // Ubah ke false untuk mengembalikan website aktif normal
  maintenanceMode: false,
  
  maintenanceInfo: {
    title: {
      id: 'Sedang Dalam Pemeliharaan',
      en: 'Under Scheduled Maintenance'
    },
    message: {
      id: 'Portofolio sedang diperbarui...',
      en: 'The portfolio is currently being updated...'
    },
    estimatedBack: 'Segera'
  },
  ...
};
```

> **Tips:** Saat mode maintenance aktif, pemilik website tetap dapat melihat tampilan portofolio dengan mengklik *"Mode Pratinjau Pemilik"* di bagian bawah dan memasukkan kunci rahasia: `fajar` atau `admin`.

---

## 4. Mengatur Fitur (Feature Toggles)

Anda bisa menyalakan atau mematikan fitur tertentu hanya dengan mengubah nilai `true`/`false` di `src/config/siteConfig.ts`:

```ts
features: {
  chatAssistant: true, // Chatbot Asisten Virtual AI & WhatsApp
  reviews: true,       // Seksi Ulasan & Testimoni
  floatingDock: true,  // React Bits Floating Dock di bawah layar
}
```

---

## 5. Mengubah Kontak & Media Sosial

Untuk mengubah nomor WhatsApp, email, atau link profil, cukup edit `src/config/siteConfig.ts`:

```ts
contact: {
  name: 'Fajar Kusuma',
  role: 'Fullstack Web & Mobile Developer',
  whatsapp: '6288809425411', // Format nomor internasional tanpa simbol '+'
  email: 'kusumafajar080802@gmail.com',
  github: 'https://github.com/fajarlm',
  linkedin: 'https://www.linkedin.com/in/fajar-kusuma-2f88/',
  instagram: 'https://www.instagram.com/fajarkusuma_lm/'
}
```

---

## 6. Menambah / Mengubah Sertifikat & Pengalaman

- **Sertifikat**: Simpan file PDF di `src/assets/sertifikat/`, import di `src/data/portfolioData.ts`, dan tambahkan entri pada array `certificatesData`.
- **Pengalaman**: Edit entri pada array `experienceData` di `src/data/portfolioData.ts`.
- **Keahlian (Tech Stack)**: Edit daftar `skillsData` di `src/data/portfolioData.ts`.

---

## 7. Menjalankan di Lokal & Deploy ke Vercel / GitHub

### Menjalankan di Lokal:
```bash
npm run dev
```
Akses di browser: `http://localhost:5173`

### Memastikan Tidak Ada Error (Build Test):
```bash
npm run build
```

### Menyimpan & Push ke GitHub:
```bash
git add .
git commit -m "feat(portfolio): your update message"
git push origin <nama-branch>
```

Setelah di-push ke GitHub, Vercel akan otomatis melakukan *deploy* versi terbaru ke website Anda.
