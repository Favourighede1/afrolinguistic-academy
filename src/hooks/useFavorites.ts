import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useFavorites(languageCode: string) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  // Fetch favorites on mount and when user/language changes
  useEffect(() => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_favorites')
        .select('entry_id')
        .eq('user_id', user.id)
        .eq('language_code', languageCode);

      if (!error && data) {
        setFavoriteIds(new Set(data.map(f => f.entry_id)));
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user, languageCode]);

  const toggleFavorite = useCallback(async (entryId: string): Promise<boolean> => {
    if (!user) return false;

    const isFavorite = favoriteIds.has(entryId);

    if (isFavorite) {
      // Remove favorite
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('entry_id', entryId)
        .eq('language_code', languageCode);

      if (!error) {
        setFavoriteIds(prev => {
          const next = new Set(prev);
          next.delete(entryId);
          return next;
        });
        return true;
      }
    } else {
      // Add favorite
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          entry_id: entryId,
          language_code: languageCode,
        });

      if (!error) {
        setFavoriteIds(prev => {
          const next = new Set(prev);
          next.add(entryId);
          return next;
        });
        return true;
      }
    }

    return false;
  }, [user, languageCode, favoriteIds]);

  const isFavorite = useCallback((entryId: string) => {
    return favoriteIds.has(entryId);
  }, [favoriteIds]);

  return {
    favoriteIds,
    loading,
    toggleFavorite,
    isFavorite,
  };
}
