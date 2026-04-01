import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { MatchUser, MatchPreference, Intention, Era } from '@/store/types';

export function useRealUsers(excludeName?: string) {
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('id, name, pronouns, image_url, intention, match_preferences, era, bipoc, presentation, archetypes, drawn_to')
      .eq('is_onboarded', true);

    if (fetchError || !data) {
      console.error('[useRealUsers]', fetchError?.message);
      setError(fetchError?.message ?? 'Failed to load users');
      setLoading(false);
      return;
    }

    const mapped: MatchUser[] = data
      .filter((row) => row.name !== excludeName)
      .map((row) => ({
        id: row.id,
        name: (row.name ?? '').toUpperCase(),
        pronouns: Array.isArray(row.pronouns) ? row.pronouns.join('/') : row.pronouns ?? '',
        imageUrl: row.image_url ?? undefined,
        intention: (row.intention ?? 'matchmaking') as Intention,
        matchPreferences: (row.match_preferences ?? []) as MatchPreference[],
        era: (row.era ?? 1) as Era,
        bipoc: row.bipoc ?? undefined,
        presentation: row.presentation ?? undefined,
        archetypes: row.archetypes ?? undefined,
        drawnTo: row.drawn_to ?? undefined,
        traits: [
          ...(row.presentation ? [row.presentation] : []),
          ...(row.archetypes ?? []),
        ],
      }));

    setUsers(mapped);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [excludeName]);

  return { users, loading, error, refresh: fetchUsers };
}
