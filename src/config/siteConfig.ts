export const siteConfig = {
  /**
   * Status Pemeliharaan Website
   * - false: Website aktif normal (default)
   * - true: Menampilkan halaman status pemeliharaan / maintenance page
   */
  maintenanceMode: false,

  /**
   * Keterangan Pemeliharaan
   */
  maintenanceInfo: {
    title: {
      id: 'Sedang Dalam Pemeliharaan',
      en: 'Under Scheduled Maintenance'
    },
    message: {
      id: 'Portofolio sedang diperbarui untuk menyajikan proyek, dokumentasi, dan pengalaman terbaru. Anda tetap dapat menghubungi Fajar secara langsung.',
      en: 'The portfolio is currently being updated with new projects, documentation, and experience. You can still get in touch with Fajar directly.'
    },
    estimatedBack: 'Segera / Soon'
  },

  /**
   * Fitur Toggles (On/Off Fitur dengan Mudah)
   */
  features: {
    chatAssistant: true, // Chatbot Asisten AI & WhatsApp
    reviews: true,       // Sistem Ulasan & Testimoni
    floatingDock: true,  // React Bits Floating Dock di bawah layar
  },

  /**
   * Informasi Kontak Utama
   */
  contact: {
    name: 'Fajar Kusuma',
    role: 'Fullstack Web & Mobile Developer',
    whatsapp: '6288809425411',
    email: 'kusumafajar080802@gmail.com',
    github: 'https://github.com/fajarlm',
    linkedin: 'https://www.linkedin.com/in/fajar-kusuma-2f88/',
    instagram: 'https://www.instagram.com/fajarkusuma_lm/'
  }
};
