export type Intention = 'matchmaking' | 'organizer';

export type MatchPreference =
  | 'romantic-partner'
  | 'open-to-exploring'
  | 'relationship'
  | 'someone-to-go-out-with'
  | 'a-good-time'
  | 'new-bestie';

export type Era = 0 | 1 | 2; // 0: Gen Z, 1: Zillenial, 2: Millennial

export interface UserProfile {
  name: string;
  pronouns: string[];
  intention: Intention | null;
  matchPreferences: MatchPreference[];
  era: Era;
  isOnboarded: boolean;
}

export interface MockUser {
  id: string;
  name: string;
  pronouns: string;
  imageUrl?: string;
  intention: Intention;
  matchPreferences: MatchPreference[];
  era: Era;
  traits: string[];
}
