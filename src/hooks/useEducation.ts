import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface EducationData {
  id: number;
  school_name_en: string;
  school_name_id: string;
  period: string | null;
  description_en: string | null;
  description_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const FALLBACK: EducationData[] = [
  { id: 1, school_name_en: 'Wikrama Vocational High School', school_name_id: 'SMK Wikrama', period: '2024 - Present', description_en: 'Focus: Software Engineering, Web & Mobile Development.', description_id: 'Fokus: Rekayasa Perangkat Lunak, Pengembangan Web & Mobile.', sort_order: 1, is_active: true, created_at: '' },
  { id: 2, school_name_en: 'Arrasyid Islamic Junior High School', school_name_id: 'MTs Arrasyid 1', period: '2021 - 2024', description_en: null, description_id: null, sort_order: 2, is_active: true, created_at: '' },
];

export function useEducation() {
  const [data, setData] = useState<EducationData[]>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }
      try {
        const { data: rows, error: err } = await supabase
          .from('education')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');

        if (err) throw err;
        if (rows && rows.length > 0) setData(rows as EducationData[]);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to fetch education';
        setError(msg);
        console.warn('[useEducation]', msg);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { data, loading, error };
}
