import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EdoName {
  id: string;
  name: string;
  meaning: string;
  gender: string;
  notes: string | null;
  created_at: string;
}

export function useEdoNames() {
  const [names, setNames] = useState<EdoName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNames() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('edo_names')
          .select('*')
          .order('name', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setNames(data || []);
      } catch (err) {
        console.error('Error fetching Edo names:', err);
        setError('Failed to load names. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchNames();
  }, []);

  return { names, loading, error };
}
