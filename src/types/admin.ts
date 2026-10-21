// ============================================
// Admin Panel TypeScript Types
// Matches Supabase PostgreSQL schema
// ============================================

// --- Auth & Users ---
export interface AdminUser {
  id: string; // uuid from auth.users
  full_name: string;
  avatar_url?: string | null;
  role: 'admin' | 'superadmin';
  created_at: string;
  updated_at: string;
}

// --- Site Settings ---
export interface SiteSettings {
  id: number;
  site_name: string;
  site_tagline_en?: string | null;
  site_tagline_id?: string | null;
  owner_name: string;
  owner_role_en?: string | null;
  owner_role_id?: string | null;
  owner_email?: string | null;
  owner_phone?: string | null;
  owner_location_en?: string | null;
  owner_location_id?: string | null;
  availability_en?: string | null;
  availability_id?: string | null;
  profile_image_url?: string | null;
  cv_file_url?: string | null;
  formspree_endpoint?: string | null;
  copyright_en?: string | null;
  copyright_id?: string | null;
  footer_tagline_en?: string | null;
  footer_tagline_id?: string | null;
  updated_at: string;
}

// --- About Section ---
export interface AboutSection {
  id: number;
  title_en?: string | null;
  title_id?: string | null;
  description_en?: string | null;
  description_id?: string | null;
  updated_at: string;
}

// --- Education ---
export interface Education {
  id: number;
  school_name_en: string;
  school_name_id: string;
  period?: string | null;
  description_en?: string | null;
  description_id?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// --- Experiences ---
export interface Experience {
  id: number;
  role_en: string;
  role_id: string;
  company: string;
  company_url?: string | null;
  period_en?: string | null;
  period_id?: string | null;
  type_en?: string | null;
  type_id?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  points?: ExperiencePoint[];
}

export interface ExperiencePoint {
  id: number;
  experience_id: number;
  point_en: string;
  point_id: string;
  sort_order: number;
}

// --- Tech Stack ---
export interface TechStack {
  id: number;
  name: string;
  icon_url: string;
  description_en?: string | null;
  description_id?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// --- Projects ---
export interface Project {
  id: number;
  title: string;
  description_en?: string | null;
  description_id?: string | null;
  type: 'web' | 'mobile' | 'desktop';
  thumbnail_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  tech_tags?: ProjectTechTag[];
  gallery?: ProjectGallery[];
}

export interface ProjectTechTag {
  id: number;
  project_id: number;
  tag_name: string;
}

export interface ProjectGallery {
  id: number;
  project_id: number;
  image_url: string;
  caption?: string | null;
  sort_order: number;
}

// --- Certificates ---
export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date?: string | null;
  file_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// --- Social Links ---
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_name?: string | null;
  is_active: boolean;
  sort_order: number;
}

// --- Translations ---
export interface Translation {
  id: number;
  section: string;
  key: string;
  value_en?: string | null;
  value_id?: string | null;
}

// --- Theme Styles ---
export interface ThemeStyle {
  id: number;
  theme_name: string;
  display_name?: string | null;
  is_active: boolean;
  is_default: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  // Joined
  variables?: ThemeVariable[];
}

export interface ThemeVariable {
  id: number;
  theme_id: number;
  variable_name: string;
  variable_value: string;
  category?: string | null;
  label?: string | null;
}

// --- Global Styles ---
export interface GlobalStyle {
  id: number;
  property_name: string;
  property_value: string;
  category?: string | null;
  label?: string | null;
  updated_at: string;
}

// --- Section Visibility ---
export interface SectionVisibility {
  id: number;
  section_name: string;
  is_visible: boolean;
  sort_order: number;
}

// --- Utility Types ---
export type InsertPayload<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type UpdatePayload<T> = Partial<Omit<T, 'id' | 'created_at'>>;
