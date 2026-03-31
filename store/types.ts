export type Intention = 'matchmaking' | 'organizer';

export type MatchPreference =
  | 'romantic-partner'
  | 'open-to-exploring'
  | 'relationship'
  | 'someone-to-go-out-with'
  | 'a-good-time'
  | 'new-bestie';

export type Era = 0 | 1 | 2; // 0: Gen Z, 1: Zillenial, 2: Millennial

export type Presentation =
  | 'androgynous'
  | 'masc'
  | 'soft-masc'
  | 'gender-queer'
  | 'gender-fluid'
  | 'fairy'
  | 'soft femme'
  | 'femme'
  | 'other'
  | 'high femme queen'
  | 'tomboi'
  | 'butch';

export type Archetype =
  | 'moss'
  | 'blaze'
  | 'jade'
  | 'lune'
  | 'rio'
  | 'sage'
  | 'luz'
  | 'sol'
  | 'zea'
  | 'indigo';

export interface UserProfile {
  name: string;
  pronouns: string[];
  intention: Intention | null;
  matchPreferences: MatchPreference[];
  era: Era;
  bipoc: boolean | null;
  presentation: Presentation | null;
  archetypes: Archetype[];
  drawnTo: Archetype[];
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
