import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { MockUser, MatchPreference, Intention, Era } from '@/store/types';

export function useRealUsers(excludeName?: string) {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, pronouns, image_url, intention, match_preferences, era, bipoc, presentation, archetypes, drawn_to, traits')
        .eq('is_onboarded', true);

      if (error || !data) {
        setLoading(false);
        return;
      }

      const mapped: MockUser[] = data
        .filter((row) => row.name !== excludeName)
        .map((row) => ({
          id: row.id,
          name: (row.name ?? '').toUpperCase(),
          pronouns: Array.isArray(row.pronouns) ? row.pronouns.join('/') : row.pronouns ?? '',
          intention: (row.intention ?? 'matchmaking') as Intention,
          matchPreferences: (row.match_preferences ?? []) as MatchPreference[],
          era: (row.era ?? 1) as Era,
          traits: [
            ...(row.presentation ? [row.presentation] : []),
            ...(row.archetypes ?? []),
          ],
        }));

      setUsers(mapped);
      setLoading(false);
    }

    fetchUsers();
  }, [excludeName]);

  return { users, loading };
}
