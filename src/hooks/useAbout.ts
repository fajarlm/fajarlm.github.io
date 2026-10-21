import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AboutSectionData {
  id: number;
  title_en: string | null;
  title_id: string | null;
  description_en: string | null;
  description_id: string | null;
  updated_at: string;
}

const FALLBACK: AboutSectionData = {
  id: 1,
  title_en: 'A bit about me.',
  title_id: 'Sedikit tentang saya.',
  description_en: 'I\'m a Software Engineering student at SMK Wikrama Bogor. I enjoy turning ideas into working products — mostly with Laravel, React, and Next.js. Outside of class, I take on freelance projects and constantly learn new tools.',
  description_id: 'Saya siswa Rekayasa Perangkat Lunak di SMK Wikrama Bogor. Saya suka mengubah ide menjadi produk nyata — terutama dengan Laravel, React, dan Next.js. Di luar jam sekolah, saya mengerjakan proyek freelance dan terus belajar hal baru.',
  updated_at: new Date().toISOString(),
};

export function useAbout() {
  const [data, setData] = useState<AboutSectionData>(FALLBACK);
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
          .from('about_section')
          .select('*')
          .limit(1)
          .single();

        if (err) throw err;
        if (row) setData(row as AboutSectionData);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to fetch about section';
        setError(msg);
        console.warn('[useAbout]', msg);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { data, loading, error };
}
