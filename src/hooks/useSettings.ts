import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface SiteSettingsData {
  id: number;
  site_name: string;
  site_tagline_en: string | null;
  site_tagline_id: string | null;
  owner_name: string;
  owner_role_en: string | null;
  owner_role_id: string | null;
  owner_email: string | null;
  owner_phone: string | null;
  owner_location_en: string | null;
  owner_location_id: string | null;
  availability_en: string | null;
  availability_id: string | null;
  profile_image_url: string | null;
  cv_file_url: string | null;
  formspree_endpoint: string | null;
  copyright_en: string | null;
  copyright_id: string | null;
  footer_tagline_en: string | null;
  footer_tagline_id: string | null;
  updated_at: string;
}

const FALLBACK: SiteSettingsData = {
  id: 1,
  site_name: 'fajarlm.',
  site_tagline_en: 'Hi, I\'m Fajar — I build web apps from front to back.',
  site_tagline_id: 'Halo, saya Fajar — saya membangun aplikasi web dari depan sampai belakang.',
  owner_name: 'Fajar Kusuma',
  owner_role_en: 'Fullstack Developer',
  owner_role_id: 'Fullstack Developer',
  owner_email: 'kusumafajar080802@gmail.com',
  owner_phone: '6285779039757',
  owner_location_en: 'Bogor, West Java',
  owner_location_id: 'Bogor, Jawa Barat',
  availability_en: 'Available for internship & junior positions',
  availability_id: 'Tersedia untuk magang & posisi junior',
  profile_image_url: null,
  cv_file_url: null,
  formspree_endpoint: 'https://formspree.io/f/xlezlowg',
  copyright_en: '© 2024 Fajar Kusuma. All rights reserved.',
  copyright_id: '© 2024 Fajar Kusuma. Hak cipta dilindungi.',
  footer_tagline_en: 'Made with ♥ in Bogor, Indonesia',
  footer_tagline_id: 'Dibuat dengan ♥ di Bogor, Indonesia',
  updated_at: new Date().toISOString(),
};

export function useSettings() {
  const [data, setData] = useState<SiteSettingsData>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }
      try {
        const { data: row, error: err } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (err) throw err;
        if (row) setData(row as SiteSettingsData);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to fetch settings';
        setError(msg);
        console.warn('[useSettings]', msg);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { data, loading, error };
}
