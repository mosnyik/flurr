import { create } from 'zustand';
import { UserProfile, Intention, MatchPreference, Era } from './types';

interface UserState extends UserProfile {
  // Actions
  setName: (name: string) => void;
  setPronouns: (pronouns: string[]) => void;
  setIntention: (intention: Intention) => void;
  setMatchPreferences: (preferences: MatchPreference[]) => void;
  setEra: (era: Era) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const initialState: UserProfile = {
  name: '',
  pronouns: [],
  intention: null,
  matchPreferences: [],
  era: 1,
  isOnboarded: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  setName: (name) => set({ name }),

  setPronouns: (pronouns) => set({ pronouns }),

  setIntention: (intention) => set({ intention }),

  setMatchPreferences: (matchPreferences) => set({ matchPreferences }),

  setEra: (era) => set({ era }),

  completeOnboarding: () => set({ isOnboarded: true }),

  reset: () => set(initialState),
}));
