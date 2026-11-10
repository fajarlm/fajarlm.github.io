import type { Skill, Project, Certificate, ExperienceItem } from '../types';
import quranic from '../assets/projects/quranic.png';
import atten from '../assets/projects/attendances.png';
import wishoraImg from '../assets/projects/wishora.png';
import wishoraDoc from '../assets/projects/wishora-doc.png';
import monetaImg from '../assets/projects/moneta.png';
import monetaDoc from '../assets/projects/moneta-doc.png';
import docmorphImg from '../assets/projects/docmorph.png';
import docmorphDoc from '../assets/projects/docmorph-doc.png';
import gotohImg from '../assets/projects/gotoh.png';
import gotohDoc from '../assets/projects/gotoh-doc.png';
import chenErdImg from '../assets/projects/chen-erd.png';
import absensiFlow from '../assets/projects/absensi-flow.png';
import absensiErd from '../assets/projects/absensi-erd.png';
import aeroweatherImg from '../assets/projects/aeroweather.png';

// Certificate Imports
import certReactPemula from '../assets/sertifikat/br-pemula.pdf';
import certEnglish from '../assets/sertifikat/english.pdf';
import certFeBeDasar from '../assets/sertifikat/fe&be_dasar.pdf';
import certFe from '../assets/sertifikat/sertif-fe.pdf';
import certGit from '../assets/sertifikat/sertif-git.pdf';
import certJs from '../assets/sertifikat/sertif-js.pdf';
import certLogic from '../assets/sertifikat/logic.pdf';
import certFundamental from '../assets/sertifikat/fundamental.pdf';
import certSoft from '../assets/sertifikat/soft.pdf';
import certFinancial from '../assets/sertifikat/financial.pdf';
import certFajar1 from '../assets/sertifikat/cert-fajar-kusuma.pdf';
import certFajar2 from '../assets/sertifikat/IGDX.pdf';
import certFajar3 from '../assets/sertifikat/Fajar_kusuma-12410279.pdf';
import certCourse from '../assets/sertifikat/sertifikat_course_123_4363478_230125134956.pdf';

export const techStack: Skill[] = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', desc: { en: 'Markup & Page Structure', id: 'Markup & Struktur Halaman' } },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', desc: { en: 'Styling & Responsive Layout', id: 'Styling & Layout Responsif' } },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: { en: 'Interactivity & Logic', id: 'Interaktivitas & Logika' } },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', desc: { en: 'Backend Logic', id: 'Logika Backend' } },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', desc: { en: 'PHP Web Framework', id: 'Framework Web PHP' } },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', desc: { en: 'Fullstack React Framework', id: 'Framework React Fullstack' } },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: { en: 'UI Components & SPA', id: 'Komponen UI & SPA' } },
  { name: 'Tailwind', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', desc: { en: 'Utility-First CSS', id: 'CSS Berbasis Utility' } },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', desc: { en: 'CSS Component Library', id: 'Library Komponen CSS' } },
  { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', desc: { en: 'Database ORM for Node.js', id: 'ORM Database untuk Node.js' } },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', desc: { en: 'Relational Database Management', id: 'Manajemen Database Relasional' } },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', desc: { en: 'Advanced Relational Database', id: 'Database Relasional Tingkat Lanjut' } },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', desc: { en: 'NoSQL Document Database', id: 'Database NoSQL Berbasis Dokumen' } },
  { name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', desc: { en: 'API Development & Testing', id: 'Pengembangan & Pengujian API' } },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', desc: { en: 'Version Control & Team Collaboration', id: 'Kontrol Versi & Kolaborasi Tim' } },
  { name: 'Figma', icon: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg', desc: { en: 'Interface Design & User Experience', id: 'Desain Antarmuka & Pengalaman Pengguna' } }
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Wishora',
    description: {
      en: 'Interactive digital greeting cards and storytelling mini-website platform featuring virtual candle blowing, animated letters, and music.',
      id: 'Platform kartu ucapan digital interaktif dan website mini storytelling dengan fitur tiup lilin virtual, surat animasi, dan musik latar.'
    },
    type: 'web',
    tech: ['Next.js', 'React', 'Tailwind', 'TypeScript', 'Framer Motion'],
    img: wishoraImg,
    gallery: [wishoraDoc],
    github: 'https://github.com/fajarlm/wishora',
    demo: 'https://wishora.web.id'
  },
  {
    id: 2,
    title: 'Moneta',
    description: {
      en: 'AI-driven personal finance dashboard with real-time budget tracking, transaction analytics, and intelligent expense validation.',
      id: 'Dashboard keuangan pribadi bertenaga AI dengan pelacakan anggaran real-time, analitik transaksi, dan validasi pengeluaran pintar.'
    },
    type: 'web',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Gemini AI'],
    img: monetaImg,
    gallery: [monetaDoc],
    github: 'https://github.com/fajarlm/Moneta',
    demo: 'https://finmoneta.vercel.app'
  },
  {
    id: 3,
    title: 'DocMorph Studio',
    description: {
      en: 'In-browser neural document editor and multi-format converter powered by WebAssembly, client-side translation, and secure local processing.',
      id: 'Editor dokumen neural dan pengonversi format di browser bertenaga WebAssembly, terjemahan lokal, dan pemrosesan aman tanpa upload.'
    },
    type: 'web',
    tech: ['Next.js', 'WASM', 'Tailwind', 'TypeScript', 'Web APIs'],
    img: docmorphImg,
    gallery: [docmorphDoc],
    github: 'https://github.com/fajarlm/convert-file',
    demo: 'https://convert-file-vert.vercel.app'
  },
  {
    id: 4,
    title: 'GOTOH',
    description: {
      en: 'Community health platform connecting users with local health groups, personalized workout plans, and expert consultations.',
      id: 'Platform kesehatan komunitas yang menghubungkan pengguna dengan grup kesehatan lokal, rekomendasi olahraga personal, dan konsultasi.'
    },
    type: 'web',
    tech: ['React', 'Express.js', 'Vite', 'Tailwind', 'Node.js'],
    img: gotohImg,
    gallery: [gotohDoc],
    github: 'https://github.com/fajarlm/GOTOH',
    demo: 'https://gotoh.fajarlm.biz.id/'
  },
  {
    id: 5,
    title: 'Chen ERD Generator',
    description: {
      en: 'Interactive Chen notation ERD generator and visual SQL modeling tool with drag-and-drop schema design and instant diagram export.',
      id: 'Generator diagram ERD notasi Chen interaktif dan pemodel visual SQL dengan desain skema drag-and-drop dan ekspor instan.'
    },
    type: 'web',
    tech: ['React', 'Vite', 'Canvas/SVG', 'SQL Parser', 'Tailwind'],
    img: chenErdImg,
    gallery: [],
    github: 'https://github.com/fajarlm/chen-erd',
    demo: 'https://chen-erd.vercel.app'
  },
  { 
    id: 6, 
    title: 'Quranic', 
    description: {
      en: 'A modern Quran learning platform with interactive features.',
      id: 'Platform pembelajaran Al-Quran modern dengan fitur interaktif.'
    },
    type: 'web', 
    tech: ['React','Flowbite','Tailwind'], 
    img: quranic, 
    gallery: [
      
    ],
    github: 'https://github.com/fajarlm/quranic', 
    demo: 'https://quranic-seven.vercel.app/' 
  },
  { 
    id: 7, 
    title: 'AbsensiKu — Digital Attendance', 
    description: {
      en: 'Real-time school attendance management system with role-based access for admins, teachers, and students.',
      id: 'Sistem manajemen presensi sekolah real-time dengan kontrol akses peran untuk admin, guru, dan siswa.'
    },
    type: 'web', 
    tech: ['Laravel', 'Bootstrap 5', 'Livewire', 'MySQL'], 
    img: atten,
    gallery: [absensiFlow, absensiErd],
    github: 'https://github.com/fajarlm/AbsensikuV2' 
  },
  {
    id: 8,
    title: 'AeroWeather Mobile',
    description: {
      en: 'Real-time weather and air quality index (AQI) monitoring mobile app with GPS tracking, glassmorphism UI, and background notifications.',
      id: 'Aplikasi mobile pemantau cuaca dan kualitas udara (AQI) real-time dengan pelacakan GPS, UI glassmorphism, dan notifikasi latar belakang.'
    },
    type: 'mobile',
    tech: ['Flutter', 'Dart', 'OpenWeather API', 'Background Service', 'Geolocator'],
    img: aeroweatherImg,
    gallery: [],
    github: 'https://github.com/fajarlm/aeroweather_app'
  },
  
];

export const certificatesData: Certificate[] = [
  { id: 1, title: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding Academy', date: '2024', file: certFe },
  { id: 2, title: 'Belajar Dasar JavaScript', issuer: 'Dicoding Academy', date: '2024', file: certJs },
  { id: 3, title: 'Belajar Membuat Aplikasi Web dengan React', issuer: 'Dicoding Academy', date: '2024', file: certReactPemula },
  { id: 4, title: 'Frontend Developer Career Path', issuer: 'Dicoding', date: '2024', file: certFe },
  { id: 5, title: 'Git & GitHub Certification', issuer: 'Digital Academy', date: '2024', file: certGit },
  { id: 6, title: 'Programming Logic Certification', issuer: 'Course Academy', date: '2024', file: certLogic },
  { id: 7, title: 'Programming Fundamental', issuer: 'Tech Institute', date: '2024', file: certFundamental },
  { id: 8, title: 'Frontend & Backend Development Basics', issuer: 'Fullstack Academy', date: '2024', file: certFeBeDasar },
  { id: 9, title: 'English Proficiency Certificate', issuer: 'Language Center', date: '2024', file: certEnglish },
  { id: 10, title: 'Financial Literacy for Developers', issuer: 'Business School', date: '2024', file: certFinancial },
  { id: 11, title: 'Professional Soft Skills', issuer: 'HR Development', date: '2024', file: certSoft },
  { id: 12, title: 'Official Web Developer Credential', issuer: 'BNSP / National Body', date: '2024', file: certFajar1 },
  { id: 12, title: 'Game Development Certification', issuer: 'IGDX', date: '2024', file: certFajar2 },
  { id: 13, title: 'Software Engineering Excellence', issuer: 'Vocational School', date: '2024', file: certFajar3 },
  { id: 14, title: 'Fullstack Web Development Course', issuer: 'Online Learning Platform', date: '2024', file: certCourse }
];

export const experiencesData: ExperienceItem[] = [
  {
    role: { en: 'Frontend Developer (Internship)', id: 'Frontend Developer (Magang)' },
    company: 'PT. Surya Manggala Informatika',
    period: { en: 'Jul 2025 - Dec 2025', id: 'Jul 2025 - Des 2025' },
    type: { en: 'Hybrid - Internship', id: 'Hybrid - Magang' },
    points: {
      en: [
        'Built and maintained modular Vue 3 components using the Composition API .',
        'Implemented UI localization (i18n) across multiple modules for EN/ID support.',
      ],
      id: [
        'Membangun dan memelihara komponen Vue 3 modular menggunakan Composition API dan TypeScript.',
        'Mengimplementasikan lokalisasi UI (i18n) pada berbagai modul untuk dukungan EN/ID.',
      ],
    },
  },
  {
    role: { en: 'Fullstack Web Developer (Freelance)', id: 'Fullstack Web Developer (Freelance)' },
    company: 'Independent',
    period: { en: '2024 - Present', id: '2024 - Sekarang' },
    type: { en: 'Remote - Freelance', id: 'Remote - Freelance' },
    points: {
      en: [
        'Developed custom web applications using Laravel, Next.js, and React for various clients.',
        'Designed and implemented responsive UIs with Tailwind CSS and component libraries.',
        'Deployed applications on VPS, Vercel, and managed MySQL/PostgreSQL databases.',
      ],
      id: [
        'Membangun aplikasi web kustom menggunakan Laravel, Next.js, dan React untuk berbagai klien.',
        'Merancang dan mengimplementasikan UI responsif dengan Tailwind CSS dan library komponen.',
        'Men-deploy aplikasi di VPS, Vercel, dan mengelola database MySQL/PostgreSQL.',
      ],
    },
  },
];

export const socialLinks = {
  github: "https://github.com/fajarlm",
  linkedin: "https://www.linkedin.com/in/fajar-kusuma-2f88/",
  instagram: "https://www.instagram.com/fajarkusuma_lm/",
  whatsapp: "https://wa.me/6285779039757"
};

export const translations = {
  en: {
    nav: { about: 'About', projects: 'Projects', certificates: 'Certificates', contact: 'Contact' },
    hero: { role: 'Fullstack Developer', tagline: 'Hi, I\'m Fajar — I build web apps from front to back. Currently a vocational student at SMK Wikrama focused on real-world projects. Let\'s connect!' },
    about: { title: 'A bit about me.', desc: 'I\'m a Software Engineering student at SMK Wikrama Bogor. I enjoy turning ideas into working products — mostly with Laravel, React, and Next.js. Outside of class, I take on freelance projects and constantly learn new tools.' },
    tech: { title: 'Tech &', subtitle: 'Tools.' },
    projects: { title: 'My', subtitle: 'Projects.', filterAll: 'All' },
    certificates: { title: 'My', subtitle: 'Certificates.' },
    contact: { title: 'GET IN', subtitle: 'TOUCH.', available: 'Available for internship & junior positions', social: 'Find me on', send: 'Send Message' },
    footer: { copyright: '© 2024 Fajar Kusuma. All rights reserved.' }
  },
  id: {
    nav: { about: 'Tentang', projects: 'Proyek', certificates: 'Sertifikat', contact: 'Kontak' },
    hero: { role: 'Fullstack Developer', tagline: 'Halo, saya Fajar — saya membangun aplikasi web dari depan sampai belakang. Saat ini siswa SMK Wikrama yang fokus pada proyek nyata. Yuk terhubung!' },
    about: { title: 'Sedikit tentang saya.', desc: 'Saya siswa Rekayasa Perangkat Lunak di SMK Wikrama Bogor. Saya suka mengubah ide menjadi produk nyata — terutama dengan Laravel, React, dan Next.js. Di luar jam sekolah, saya mengerjakan proyek freelance dan terus belajar hal baru.' },
    tech: { title: 'Teknologi &', subtitle: 'Alat.' },
    projects: { title: 'Proyek', subtitle: 'Saya.', filterAll: 'Semua' },
    certificates: { title: 'Sertifikat', subtitle: 'Saya.' },
    contact: { title: 'HUBUNGI', subtitle: 'SAYA.', available: 'Tersedia untuk magang & posisi junior', social: 'Temukan saya di', send: 'Kirim Pesan' },
    footer: { copyright: '© 2024 Fajar Kusuma. Hak cipta dilindungi.' }
  }
};