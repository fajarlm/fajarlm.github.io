-- =============================================
-- Portfolio CMS - Supabase Database Migration
-- Run this in Supabase SQL Editor (Dashboard)
-- =============================================

-- 1. admin_users (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. site_settings (singleton row)
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(100) NOT NULL DEFAULT 'fajarlm.',
  site_tagline_en TEXT,
  site_tagline_id TEXT,
  owner_name VARCHAR(100) NOT NULL DEFAULT 'Fajar Kusuma',
  owner_role_en VARCHAR(100),
  owner_role_id VARCHAR(100),
  owner_email VARCHAR(200),
  owner_phone VARCHAR(20),
  owner_location_en VARCHAR(100),
  owner_location_id VARCHAR(100),
  availability_en VARCHAR(200),
  availability_id VARCHAR(200),
  profile_image_url TEXT,
  cv_file_url TEXT,
  formspree_endpoint TEXT,
  copyright_en TEXT,
  copyright_id TEXT,
  footer_tagline_en TEXT,
  footer_tagline_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. about_section (singleton row)
CREATE TABLE IF NOT EXISTS about_section (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(200),
  title_id VARCHAR(200),
  description_en TEXT,
  description_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. education
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  school_name_en VARCHAR(200) NOT NULL,
  school_name_id VARCHAR(200) NOT NULL,
  period VARCHAR(50),
  description_en TEXT,
  description_id TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. experiences
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  role_en VARCHAR(200) NOT NULL,
  role_id VARCHAR(200) NOT NULL,
  company VARCHAR(200) NOT NULL,
  company_url TEXT,
  period_en VARCHAR(100),
  period_id VARCHAR(100),
  type_en VARCHAR(100),
  type_id VARCHAR(100),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. experience_points
CREATE TABLE IF NOT EXISTS experience_points (
  id SERIAL PRIMARY KEY,
  experience_id INT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  point_en TEXT NOT NULL,
  point_id TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- 7. tech_stacks
CREATE TABLE IF NOT EXISTS tech_stacks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon_url TEXT NOT NULL,
  description_en VARCHAR(200),
  description_id VARCHAR(200),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. projects
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_id TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('web', 'mobile', 'desktop')),
  thumbnail_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. project_tech_tags
CREATE TABLE IF NOT EXISTS project_tech_tags (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag_name VARCHAR(50) NOT NULL
);

-- 10. project_gallery
CREATE TABLE IF NOT EXISTS project_gallery (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption VARCHAR(200),
  sort_order INT NOT NULL DEFAULT 0
);

-- 11. certificates
CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  issuer VARCHAR(200) NOT NULL,
  date VARCHAR(50),
  file_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. social_links
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50) NOT NULL UNIQUE,
  url TEXT NOT NULL,
  icon_name VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0
);

-- 13. translations
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value_en TEXT,
  value_id TEXT,
  UNIQUE(section, key)
);

-- 14. theme_styles
CREATE TABLE IF NOT EXISTS theme_styles (
  id SERIAL PRIMARY KEY,
  theme_name VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(100),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_default BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. theme_variables
CREATE TABLE IF NOT EXISTS theme_variables (
  id SERIAL PRIMARY KEY,
  theme_id INT NOT NULL REFERENCES theme_styles(id) ON DELETE CASCADE,
  variable_name VARCHAR(100) NOT NULL,
  variable_value VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  label VARCHAR(100),
  UNIQUE(theme_id, variable_name)
);

-- 16. global_styles
CREATE TABLE IF NOT EXISTS global_styles (
  id SERIAL PRIMARY KEY,
  property_name VARCHAR(100) NOT NULL UNIQUE,
  property_value TEXT NOT NULL,
  category VARCHAR(50),
  label VARCHAR(100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. section_visibility
CREATE TABLE IF NOT EXISTS section_visibility (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(50) NOT NULL UNIQUE,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0
);


-- =============================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN 
    SELECT unnest(ARRAY[
      'admin_users', 'site_settings', 'about_section',
      'experiences', 'projects', 'global_styles'
    ])
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON %I; 
       CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I 
       FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
      tbl, tbl
    );
  END LOOP;
END;
$$;


-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN 
    SELECT unnest(ARRAY[
      'admin_users', 'site_settings', 'about_section', 'education',
      'experiences', 'experience_points', 'tech_stacks', 'projects',
      'project_tech_tags', 'project_gallery', 'certificates',
      'social_links', 'translations', 'theme_styles', 'theme_variables',
      'global_styles', 'section_visibility'
    ])
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);
  END LOOP;
END;
$$;

-- Public READ policy (for frontend visitors)
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN 
    SELECT unnest(ARRAY[
      'site_settings', 'about_section', 'education',
      'experiences', 'experience_points', 'tech_stacks', 'projects',
      'project_tech_tags', 'project_gallery', 'certificates',
      'social_links', 'translations', 'theme_styles', 'theme_variables',
      'global_styles', 'section_visibility'
    ])
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS public_read ON %I;
       CREATE POLICY public_read ON %I FOR SELECT USING (true);',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- Admin WRITE policy (insert, update, delete — authenticated admins only)
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN 
    SELECT unnest(ARRAY[
      'admin_users', 'site_settings', 'about_section', 'education',
      'experiences', 'experience_points', 'tech_stacks', 'projects',
      'project_tech_tags', 'project_gallery', 'certificates',
      'social_links', 'translations', 'theme_styles', 'theme_variables',
      'global_styles', 'section_visibility'
    ])
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS admin_write ON %I;
       CREATE POLICY admin_write ON %I FOR ALL USING (
         auth.role() = ''authenticated''
         AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
       );',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- admin_users: users can read their own profile
DROP POLICY IF EXISTS own_profile_read ON admin_users;
CREATE POLICY own_profile_read ON admin_users
  FOR SELECT USING (auth.uid() = id);


-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_experience_points_exp_id ON experience_points(experience_id);
CREATE INDEX IF NOT EXISTS idx_project_tech_tags_proj_id ON project_tech_tags(project_id);
CREATE INDEX IF NOT EXISTS idx_project_gallery_proj_id ON project_gallery(project_id);
CREATE INDEX IF NOT EXISTS idx_theme_variables_theme_id ON theme_variables(theme_id);
CREATE INDEX IF NOT EXISTS idx_translations_section ON translations(section);
CREATE INDEX IF NOT EXISTS idx_translations_section_key ON translations(section, key);
