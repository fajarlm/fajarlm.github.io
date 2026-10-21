-- =============================================
-- Portfolio CMS - Seed Data
-- Migrated from portfolioData.ts
-- Run AFTER 001_create_tables.sql
-- =============================================

-- =============================================
-- 1. SITE SETTINGS
-- =============================================
INSERT INTO site_settings (
  site_name, site_tagline_en, site_tagline_id,
  owner_name, owner_role_en, owner_role_id,
  owner_email, owner_phone,
  owner_location_en, owner_location_id,
  availability_en, availability_id,
  formspree_endpoint,
  copyright_en, copyright_id,
  footer_tagline_en, footer_tagline_id
) VALUES (
  'fajarlm.',
  'Hi, I''m Fajar — I build web apps from front to back. Currently a vocational student at SMK Wikrama focused on real-world projects. Let''s connect!',
  'Halo, saya Fajar — saya membangun aplikasi web dari depan sampai belakang. Saat ini siswa SMK Wikrama yang fokus pada proyek nyata. Yuk terhubung!',
  'Fajar Kusuma',
  'Fullstack Developer',
  'Fullstack Developer',
  'kusumafajar080802@gmail.com',
  '6285779039757',
  'Bogor, West Java',
  'Bogor, Jawa Barat',
  'Available for internship & junior positions',
  'Tersedia untuk magang & posisi junior',
  'https://formspree.io/f/xlezlowg',
  '© 2024 Fajar Kusuma. All rights reserved.',
  '© 2024 Fajar Kusuma. Hak cipta dilindungi.',
  'Made with ♥ in Bogor, Indonesia',
  'Dibuat dengan ♥ di Bogor, Indonesia'
);


-- =============================================
-- 2. ABOUT SECTION
-- =============================================
INSERT INTO about_section (title_en, title_id, description_en, description_id) VALUES (
  'A bit about me.',
  'Sedikit tentang saya.',
  'I''m a Software Engineering student at SMK Wikrama Bogor. I enjoy turning ideas into working products — mostly with Laravel, React, and Next.js. Outside of class, I take on freelance projects and constantly learn new tools.',
  'Saya siswa Rekayasa Perangkat Lunak di SMK Wikrama Bogor. Saya suka mengubah ide menjadi produk nyata — terutama dengan Laravel, React, dan Next.js. Di luar jam sekolah, saya mengerjakan proyek freelance dan terus belajar hal baru.'
);


-- =============================================
-- 3. EDUCATION
-- =============================================
INSERT INTO education (school_name_en, school_name_id, period, description_en, description_id, sort_order) VALUES
  ('Wikrama Vocational High School', 'SMK Wikrama', '2024 - Present', 'Focus: Software Engineering, Web & Mobile Development.', 'Fokus: Rekayasa Perangkat Lunak, Pengembangan Web & Mobile.', 1),
  ('Arrasyid Islamic Junior High School', 'MTs Arrasyid 1', '2021 - 2024', NULL, NULL, 2);


-- =============================================
-- 4. EXPERIENCES
-- =============================================
INSERT INTO experiences (role_en, role_id, company, period_en, period_id, type_en, type_id, sort_order) VALUES
  ('Frontend Developer (Internship)', 'Frontend Developer (Magang)', 'PT. Petik Teknologi Nusantara', 'Jul 2025 - Oct 2025', 'Jul 2025 - Okt 2025', 'Hybrid - Internship', 'Hybrid - Magang', 1),
  ('Fullstack Web Developer (Freelance)', 'Fullstack Web Developer (Freelance)', 'Independent', '2024 - Present', '2024 - Sekarang', 'Remote - Freelance', 'Remote - Freelance', 2);


-- =============================================
-- 5. EXPERIENCE POINTS
-- =============================================
-- Experience 1: Frontend Developer (Internship)
INSERT INTO experience_points (experience_id, point_en, point_id, sort_order) VALUES
  (1, 'Built and maintained modular Vue 3 components using the Composition API and TypeScript.', 'Membangun dan memelihara komponen Vue 3 modular menggunakan Composition API dan TypeScript.', 1),
  (1, 'Implemented UI localization (i18n) across multiple modules for EN/ID support.', 'Mengimplementasikan lokalisasi UI (i18n) pada berbagai modul untuk dukungan EN/ID.', 2),
  (1, 'Collaborated with backend team integrating REST APIs for booking and facility management.', 'Berkolaborasi dengan tim backend dalam integrasi REST API untuk manajemen pemesanan dan fasilitas.', 3);

-- Experience 2: Fullstack Web Developer (Freelance)
INSERT INTO experience_points (experience_id, point_en, point_id, sort_order) VALUES
  (2, 'Developed custom web applications using Laravel, Next.js, and React for various clients.', 'Membangun aplikasi web kustom menggunakan Laravel, Next.js, dan React untuk berbagai klien.', 1),
  (2, 'Designed and implemented responsive UIs with Tailwind CSS and component libraries.', 'Merancang dan mengimplementasikan UI responsif dengan Tailwind CSS dan library komponen.', 2),
  (2, 'Deployed applications on VPS, Vercel, and managed MySQL/PostgreSQL databases.', 'Men-deploy aplikasi di VPS, Vercel, dan mengelola database MySQL/PostgreSQL.', 3);


-- =============================================
-- 6. TECH STACKS
-- =============================================
INSERT INTO tech_stacks (name, icon_url, description_en, description_id, sort_order) VALUES
  ('HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'Markup & Page Structure', 'Markup & Struktur Halaman', 1),
  ('CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'Styling & Responsive Layout', 'Styling & Layout Responsif', 2),
  ('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'Interactivity & Logic', 'Interaktivitas & Logika', 3),
  ('PHP', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', 'Backend Logic', 'Logika Backend', 4),
  ('Laravel', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', 'PHP Web Framework', 'Framework Web PHP', 5),
  ('Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', 'Fullstack React Framework', 'Framework React Fullstack', 6),
  ('React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'UI Components & SPA', 'Komponen UI & SPA', 7),
  ('Tailwind', 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', 'Utility-First CSS', 'CSS Berbasis Utility', 8),
  ('Bootstrap', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', 'CSS Component Library', 'Library Komponen CSS', 9),
  ('Prisma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', 'Database ORM for Node.js', 'ORM Database untuk Node.js', 10),
  ('MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'Relational Database Management', 'Manajemen Database Relasional', 11),
  ('PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'Advanced Relational Database', 'Database Relasional Tingkat Lanjut', 12),
  ('MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 'NoSQL Document Database', 'Database NoSQL Berbasis Dokumen', 13),
  ('Postman', 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', 'API Development & Testing', 'Pengembangan & Pengujian API', 14),
  ('Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'Version Control & Team Collaboration', 'Kontrol Versi & Kolaborasi Tim', 15),
  ('Figma', 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg', 'Interface Design & User Experience', 'Desain Antarmuka & Pengalaman Pengguna', 16);


-- =============================================
-- 7. PROJECTS
-- =============================================
INSERT INTO projects (title, description_en, description_id, type, github_url, demo_url, sort_order) VALUES
  ('Quranic', 'A modern Quran learning platform with interactive features.', 'Platform pembelajaran Al-Quran modern dengan fitur interaktif.', 'web', 'https://github.com/fajarlm/quranic', 'https://quranic-seven.vercel.app/', 1),
  ('Digital Attendance System', 'A digital attendance system for employees featuring real-time tracking.', 'Sistem absensi digital untuk karyawan dengan fitur pelacakan real-time.', 'web', 'https://github.com/fajarlm/AbsensikuV2', NULL, 2);


-- =============================================
-- 8. PROJECT TECH TAGS
-- =============================================
-- Project 1: Quranic
INSERT INTO project_tech_tags (project_id, tag_name) VALUES
  (1, 'React'),
  (1, 'Flowbite'),
  (1, 'Tailwind');

-- Project 2: Digital Attendance System
INSERT INTO project_tech_tags (project_id, tag_name) VALUES
  (2, 'Tailwind'),
  (2, 'MySQL'),
  (2, 'Laravel');


-- =============================================
-- 9. CERTIFICATES
-- =============================================
INSERT INTO certificates (title, issuer, date, sort_order) VALUES
  ('Belajar Dasar Pemrograman Web', 'Dicoding Academy', '2024', 1),
  ('Belajar Dasar JavaScript', 'Dicoding Academy', '2024', 2),
  ('Belajar Membuat Aplikasi Web dengan React', 'Dicoding Academy', '2024', 3),
  ('Frontend Developer Career Path', 'Dicoding', '2024', 4),
  ('Git & GitHub Certification', 'Digital Academy', '2024', 5),
  ('Programming Logic Certification', 'Course Academy', '2024', 6),
  ('Programming Fundamental', 'Tech Institute', '2024', 7),
  ('Frontend & Backend Development Basics', 'Fullstack Academy', '2024', 8),
  ('English Proficiency Certificate', 'Language Center', '2024', 9),
  ('Financial Literacy for Developers', 'Business School', '2024', 10),
  ('Professional Soft Skills', 'HR Development', '2024', 11),
  ('Official Web Developer Credential', 'BNSP / National Body', '2024', 12),
  ('Game Development Certification', 'IGDX', '2024', 13),
  ('Software Engineering Excellence', 'Vocational School', '2024', 14),
  ('Fullstack Web Development Course', 'Online Learning Platform', '2024', 15);


-- =============================================
-- 10. SOCIAL LINKS
-- =============================================
INSERT INTO social_links (platform, url, icon_name, sort_order) VALUES
  ('github', 'https://github.com/fajarlm', 'Globe', 1),
  ('linkedin', 'https://www.linkedin.com/in/fajar-kusuma-2f88/', 'User', 2),
  ('instagram', 'https://www.instagram.com/fajarkusuma_lm/', 'Camera', 3),
  ('whatsapp', 'https://wa.me/6285779039757', 'Phone', 4);


-- =============================================
-- 11. TRANSLATIONS
-- =============================================
-- Nav
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('nav', 'about', 'About', 'Tentang'),
  ('nav', 'projects', 'Projects', 'Proyek'),
  ('nav', 'certificates', 'Certificates', 'Sertifikat'),
  ('nav', 'contact', 'Contact', 'Kontak');

-- Hero
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('hero', 'role', 'Fullstack Developer', 'Fullstack Developer'),
  ('hero', 'tagline', 'Hi, I''m Fajar — I build web apps from front to back. Currently a vocational student at SMK Wikrama focused on real-world projects. Let''s connect!', 'Halo, saya Fajar — saya membangun aplikasi web dari depan sampai belakang. Saat ini siswa SMK Wikrama yang fokus pada proyek nyata. Yuk terhubung!');

-- About
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('about', 'title', 'A bit about me.', 'Sedikit tentang saya.'),
  ('about', 'desc', 'I''m a Software Engineering student at SMK Wikrama Bogor. I enjoy turning ideas into working products — mostly with Laravel, React, and Next.js. Outside of class, I take on freelance projects and constantly learn new tools.', 'Saya siswa Rekayasa Perangkat Lunak di SMK Wikrama Bogor. Saya suka mengubah ide menjadi produk nyata — terutama dengan Laravel, React, dan Next.js. Di luar jam sekolah, saya mengerjakan proyek freelance dan terus belajar hal baru.');

-- Tech
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('tech', 'title', 'Tech &', 'Teknologi &'),
  ('tech', 'subtitle', 'Tools.', 'Alat.');

-- Projects
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('projects', 'title', 'My', 'Proyek'),
  ('projects', 'subtitle', 'Projects.', 'Saya.'),
  ('projects', 'filterAll', 'All', 'Semua');

-- Certificates
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('certificates', 'title', 'My', 'Sertifikat'),
  ('certificates', 'subtitle', 'Certificates.', 'Saya.');

-- Contact
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('contact', 'title', 'GET IN', 'HUBUNGI'),
  ('contact', 'subtitle', 'TOUCH.', 'SAYA.'),
  ('contact', 'available', 'Available for internship & junior positions', 'Tersedia untuk magang & posisi junior'),
  ('contact', 'social', 'Find me on', 'Temukan saya di'),
  ('contact', 'send', 'Send Message', 'Kirim Pesan');

-- Footer
INSERT INTO translations (section, key, value_en, value_id) VALUES
  ('footer', 'copyright', '© 2024 Fajar Kusuma. All rights reserved.', '© 2024 Fajar Kusuma. Hak cipta dilindungi.');


-- =============================================
-- 12. THEME STYLES
-- =============================================
INSERT INTO theme_styles (theme_name, display_name, is_active, is_default, sort_order) VALUES
  ('light', 'Light Mode', true, true, 1),
  ('dark', 'Dark Mode', true, false, 2),
  ('cyan', 'Cyan Mode', true, false, 3);


-- =============================================
-- 13. THEME VARIABLES
-- =============================================
-- Light theme
INSERT INTO theme_variables (theme_id, variable_name, variable_value, category, label) VALUES
  (1, '--bg', '#f8faff', 'colors', 'Background'),
  (1, '--text', '#0f172a', 'colors', 'Text Color'),
  (1, '--text-muted', '#64748b', 'colors', 'Muted Text'),
  (1, '--accent', '#6366f1', 'colors', 'Accent Color'),
  (1, '--accent-hover', '#4f46e5', 'colors', 'Accent Hover'),
  (1, '--card', '#ffffff', 'colors', 'Card Background'),
  (1, '--border', '#e2e8f0', 'colors', 'Border Color'),
  (1, '--icon-bg', '#f1f5f9', 'colors', 'Icon Background'),
  (1, '--placeholder', '#94a3b8', 'colors', 'Placeholder Color'),
  (1, '--title-hero', '#0f172a', 'colors', 'Hero Title Color');

-- Dark theme
INSERT INTO theme_variables (theme_id, variable_name, variable_value, category, label) VALUES
  (2, '--bg', '#020617', 'colors', 'Background'),
  (2, '--text', '#f1f5f9', 'colors', 'Text Color'),
  (2, '--text-muted', '#94a3b8', 'colors', 'Muted Text'),
  (2, '--accent', '#818cf8', 'colors', 'Accent Color'),
  (2, '--accent-hover', '#6366f1', 'colors', 'Accent Hover'),
  (2, '--card', '#0f172a', 'colors', 'Card Background'),
  (2, '--border', '#1e293b', 'colors', 'Border Color'),
  (2, '--icon-bg', '#1e293b', 'colors', 'Icon Background'),
  (2, '--placeholder', '#475569', 'colors', 'Placeholder Color'),
  (2, '--title-hero', '#f1f5f9', 'colors', 'Hero Title Color');

-- Cyan theme
INSERT INTO theme_variables (theme_id, variable_name, variable_value, category, label) VALUES
  (3, '--bg', '#001219', 'colors', 'Background'),
  (3, '--text', '#e9ecef', 'colors', 'Text Color'),
  (3, '--text-muted', '#94d2bd', 'colors', 'Muted Text'),
  (3, '--accent', '#22d3ee', 'colors', 'Accent Color'),
  (3, '--accent-hover', '#06b6d4', 'colors', 'Accent Hover'),
  (3, '--card', '#001e26', 'colors', 'Card Background'),
  (3, '--border', '#0e3d4a', 'colors', 'Border Color'),
  (3, '--icon-bg', 'rgba(34, 211, 238, 0.08)', 'colors', 'Icon Background'),
  (3, '--placeholder', '#457a87', 'colors', 'Placeholder Color'),
  (3, '--title-hero', '#e9ecef', 'colors', 'Hero Title Color');


-- =============================================
-- 14. GLOBAL STYLES
-- =============================================
INSERT INTO global_styles (property_name, property_value, category, label) VALUES
  ('font_family', '''Plus Jakarta Sans'', ''Geist Variable'', system-ui, -apple-system, sans-serif', 'typography', 'Font Family'),
  ('border_radius_base', '0.625rem', 'layout', 'Base Border Radius'),
  ('scrollbar_width', '5px', 'layout', 'Scrollbar Width'),
  ('transition_duration', '0.3s', 'animation', 'Default Transition Duration'),
  ('marquee_speed', '30s', 'animation', 'Marquee Animation Speed'),
  ('grid_pattern_size', '36px', 'effects', 'Background Grid Pattern Size');


-- =============================================
-- 15. SECTION VISIBILITY
-- =============================================
INSERT INTO section_visibility (section_name, is_visible, sort_order) VALUES
  ('hero', true, 1),
  ('about', true, 2),
  ('experience', true, 3),
  ('techstack', true, 4),
  ('projects', true, 5),
  ('certificates', true, 6),
  ('contact', true, 7);
