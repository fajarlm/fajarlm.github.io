import type { Skill, Project, Certificate } from '../types';
import quranic from '../assets/projects/quranic.png';
import atten from '../assets/projects/attendances.png';

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
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', desc: { en: 'Semantic Web Architecture', id: 'Arsitektur Web Semantik' } },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', desc: { en: 'Responsive & Modern UI Implementation', id: 'Implementasi UI Modern & Responsif' } },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: { en: 'Client-side Logic & DOM Manipulation', id: 'Logika Sisi Klien & Manipulasi DOM' } },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', desc: { en: 'Server-side Scripting & Logic', id: 'Logika & Scripting Sisi Server' } },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', desc: { en: 'Scalable Backend Development (PHP)', id: 'Pengembangan Backend Skalabel (PHP)' } },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', desc: { en: 'Fullstack React Framework', id: 'Framework React Fullstack' } },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: { en: 'Component-Based UI Engineering', id: 'Rekayasa UI Berbasis Komponen' } },
  { name: 'Tailwind', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', desc: { en: 'Efficient Utility-First Styling', id: 'Styling Efisien Berbasis Utility' } },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', desc: { en: 'Rapid UI Development Framework', id: 'Framework Pengembangan UI Cepat' } },
  { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', desc: { en: 'Modern Type-safe ORM', id: 'ORM Modern Berbasis Type-safe' } },
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
    id: 2, 
    title: 'Digital Attendance System', 
    description: {
      en: 'A digital attendance system for employees featuring real-time tracking.',
      id: 'Sistem absensi digital untuk karyawan dengan fitur pelacakan real-time.'
    },
    type: 'web', 
    tech: ['tailwind', 'MySQL', 'Laravel'], 
    img: atten,
    gallery: [],
    github: 'https://github.com/fajarlm/AbsensikuV2' 
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

export const socialLinks = {
  github: "https://github.com/fajarlm",
  linkedin: "https://www.linkedin.com/in/fajar-kusuma-2f88/",
  instagram: "https://www.instagram.com/fajarkusuma_lm/",
  whatsapp: "https://wa.me/6285779039757"
};

export const translations = {
  en: {
    nav: { about: 'About', projects: 'Projects', certificates: 'Certificates', contact: 'Contact' },
    hero: { role: 'Fullstack Developer', tagline: 'Hi! I\'m Fajar, a Fullstack Developer passionate about building modern web applications. Feel free to reach out via email or connect with me on LinkedIn and GitHub!' },
    about: { title: 'Crafting digital experiences with purpose.', desc: 'I am a passionate software engineering student focused on building high-performance web and mobile applications that prioritize user experience.' },
    tech: { title: 'Tech &', subtitle: 'Tools.' },
    projects: { title: 'Featured', subtitle: 'Projects.', filterAll: 'All' },
    certificates: { title: 'Proof of', subtitle: 'Excellence.' },
    contact: { title: 'GET IN', subtitle: 'TOUCH.', available: 'Open for new opportunities', social: 'Connect with me', send: 'Send Message' },
    footer: { copyright: '© 2024 Fajar Kusuma. All rights reserved.' }
  },
  id: {
    nav: { about: 'Tentang', projects: 'Proyek', certificates: 'Sertifikat', contact: 'Kontak' },
    hero: { role: 'Fullstack Developer', tagline: 'Halo! Saya Fajar, seorang Fullstack Developer yang antusias dalam membangun aplikasi web modern. Jangan ragu untuk menghubungi saya melalui email atau terhubung via LinkedIn dan GitHub!' },
    about: { title: 'Menciptakan pengalaman digital yang bermakna.', desc: 'Saya adalah siswa rekayasa perangkat lunak yang berfokus pada pembuatan aplikasi web dan mobile berkinerja tinggi yang mengutamakan pengalaman pengguna.' },
    tech: { title: 'Teknologi &', subtitle: 'Alat.' },
    projects: { title: 'Proyek', subtitle: 'Unggulan.', filterAll: 'Semua' },
    certificates: { title: 'Bukti', subtitle: 'Kompetensi.' },
    contact: { title: 'HUBUNGI', subtitle: 'SAYA.', available: 'Terbuka untuk peluang baru', social: 'Mari Terhubung', send: 'Kirim Pesan' },
    footer: { copyright: '© 2024 Fajar Kusuma. Hak cipta dilindungi.' }
  }
};