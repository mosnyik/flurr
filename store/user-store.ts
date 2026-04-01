import { create } from 'zustand';
import { UserProfile, Intention, MatchPreference, Era, Presentation, Archetype } from './types';
import { supabase } from '@/lib/supabase';

interface UserState extends UserProfile {
  setName: (name: string) => void;
  setPronouns: (pronouns: string[]) => void;
  setIntention: (intention: Intention) => void;
  setIntent: (intent: MatchPreference[]) => void;
  setEra: (era: Era) => void;
  setIdentity: (identity: boolean) => void;
  setPresentation: (presentation: Presentation) => void;
  setPresentationPreference: (presentationPreference: Presentation[]) => void;
  setArchetype: (archetype: Archetype[]) => void;
  setArchetypePreference: (archetypePreference: Archetype[]) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const initialState: UserProfile = {
  name: '',
  pronouns: [],
  intention: null,
  intent: [],
  era: 1,
  identity: null,
  presentation: null,
  presentationPreference: [],
  archetype: [],
  archetypePreference: [],
  isOnboarded: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  setName: (name) => set({ name }),
  setPronouns: (pronouns) => set({ pronouns }),
  setIntention: (intention) => set({ intention }),
  setIntent: (intent) => set({ intent }),
  setEra: (era) => set({ era }),
  setIdentity: (identity) => set({ identity }),
  setPresentation: (presentation) => set({ presentation }),
  setPresentationPreference: (presentationPreference) => set({ presentationPreference }),
  setArchetype: (archetype) => set({ archetype }),
  setArchetypePreference: (archetypePreference) => set({ archetypePreference }),

  completeOnboarding: () => {
    set({ isOnboarded: true });
    const state = useUserStore.getState();
    supabase.from('profiles').insert({
      name: state.name,
      pronouns: state.pronouns,
      intention: state.intention,
      match_preferences: state.intent,
      era: state.era,
      bipoc: state.identity,
      presentation: state.presentation,
      presentation_preference: state.presentationPreference,
      archetypes: state.archetype,
      drawn_to: state.archetypePreference,
      is_onboarded: true,
    }).then(({ error }) => {
      if (error) console.error('[Supabase] Failed to save profile:', error.message);
    });
  },

  reset: () => set(initialState),
}));
