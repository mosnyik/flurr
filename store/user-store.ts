import { create } from 'zustand';
import { UserProfile, Intention, MatchPreference, Era, Presentation, Archetype } from './types';
import { supabase } from '@/lib/supabase';

interface UserState extends UserProfile {
  // Actions
  setName: (name: string) => void;
  setPronouns: (pronouns: string[]) => void;
  setIntention: (intention: Intention) => void;
  setMatchPreferences: (preferences: MatchPreference[]) => void;
  setEra: (era: Era) => void;
  setBipoc: (bipoc: boolean) => void;
  setPresentation: (presentation: Presentation) => void;
  setArchetypes: (archetypes: Archetype[]) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const initialState: UserProfile = {
  name: '',
  pronouns: [],
  intention: null,
  matchPreferences: [],
  era: 1,
  bipoc: null,
  presentation: null,
  archetypes: [],
  isOnboarded: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  setName: (name) => set({ name }),

  setPronouns: (pronouns) => set({ pronouns }),

  setIntention: (intention) => set({ intention }),

  setMatchPreferences: (matchPreferences) => set({ matchPreferences }),

  setEra: (era) => set({ era }),

  setBipoc: (bipoc) => set({ bipoc }),

  setPresentation: (presentation) => set({ presentation }),

  setArchetypes: (archetypes) => set({ archetypes }),

  completeOnboarding: () => {
    set({ isOnboarded: true });
    const state = useUserStore.getState();
    supabase.from('profiles').insert({
      name: state.name,
      pronouns: state.pronouns,
      intention: state.intention,
      match_preferences: state.matchPreferences,
      era: state.era,
      bipoc: state.bipoc,
      presentation: state.presentation,
      archetypes: state.archetypes,
      is_onboarded: true,
    }).then(({ error }) => {
      if (error) console.error('[Supabase] Failed to save profile:', error.message);
    });
  },

  reset: () => set(initialState),
}));
