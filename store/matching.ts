import { UserProfile, MatchUser, MatchPreference, Archetype, Presentation } from './types';

export interface MatchResult {
  user: MatchUser;
  compatibility: number; // 0-100 (percentage of max 31 points)
  breakdown: {
    intentPoints: number;       // max 9
    identityPoints: number;     // max 7
    presentationPoints: number; // max 7
    presentationBonus: number;  // max 1
    archetypePoints: number;    // max 6
    archetypeBonus: number;     // max 1
    total: number;              // max 31
  };
}

const MAX_SCORE = 31;

// 1. Intent — max 9
function scoreIntent(a: MatchPreference[], b: MatchPreference[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const aSet = new Set(a);
  const overlap = b.filter((p) => aSet.has(p));
  if (overlap.length === a.length && overlap.length === b.length) return 9; // all match
  if (overlap.length > 0) return 5;                                          // at least one
  return 0;
}

// 2. Identity (BIPOC) — max 7
function scoreIdentity(a: boolean | null | undefined, b: boolean | null | undefined): number {
  if (a == null || b == null) return 0;
  return a === b ? 7 : 0;
}

// 3. Presentation — max 7
function scorePresentation(a: Presentation | null | undefined, b: Presentation | null | undefined): number {
  if (!a || !b) return 0;
  return a === b ? 7 : 0;
}

// 4. Presentation preference bonus — +1
// A's presentation is in B's drawnTo list AND B's presentation is in A's drawnTo list
// Note: drawnTo currently stores archetypes; this bonus will apply once a
// separate presentationPreference field is added to the profile.
function scorePresentationBonus(
  aPresentation: Presentation | null | undefined,
  bPresentation: Presentation | null | undefined,
  aPresentationPref: Presentation[] | undefined,
  bPresentationPref: Presentation[] | undefined
): number {
  if (!aPresentation || !bPresentation) return 0;
  if (!aPresentationPref?.length || !bPresentationPref?.length) return 0;
  const aInBPref = bPresentationPref.includes(aPresentation);
  const bInAPref = aPresentationPref.includes(bPresentation);
  return aInBPref && bInAPref ? 1 : 0;
}

// 5. Archetype — max 6
function scoreArchetype(a: Archetype[] | undefined, b: Archetype[] | undefined): number {
  if (!a?.length || !b?.length) return 0;
  const aSet = new Set(a);
  const hasOverlap = b.some((arch) => aSet.has(arch));
  return hasOverlap ? 6 : 0;
}

// 6. Archetype preference bonus — +1
// A's archetype appears in B's drawnTo AND B's archetype appears in A's drawnTo
function scoreArchetypeBonus(
  aArchetypes: Archetype[] | undefined,
  bArchetypes: Archetype[] | undefined,
  aDrawnTo: Archetype[] | undefined,
  bDrawnTo: Archetype[] | undefined
): number {
  if (!aArchetypes?.length || !bArchetypes?.length) return 0;
  if (!aDrawnTo?.length || !bDrawnTo?.length) return 0;
  const aInBDrawnTo = aArchetypes.some((a) => bDrawnTo.includes(a));
  const bInADrawnTo = bArchetypes.some((b) => aDrawnTo.includes(b));
  return aInBDrawnTo && bInADrawnTo ? 1 : 0;
}

export function calculateCompatibility(user: UserProfile, match: MatchUser): MatchResult {
  const intentPoints = scoreIntent(user.intent ?? [], match.intent ?? []);
  const identityPoints = scoreIdentity(user.identity, match.identity);
  const presentationPoints = scorePresentation(user.presentation, match.presentation);
  const presentationBonus = scorePresentationBonus(
    user.presentation,
    match.presentation,
    user.presentationPreference ?? [],
    match.presentationPreference ?? []
  );
  const archetypePoints = scoreArchetype(user.archetype ?? [], match.archetype ?? []);
  const archetypeBonus = scoreArchetypeBonus(
    user.archetype ?? [],
    match.archetype ?? [],
    user.archetypePreference ?? [],
    match.archetypePreference ?? []
  );

  const total = intentPoints + identityPoints + presentationPoints + presentationBonus + archetypePoints + archetypeBonus;
  const compatibility = Math.round((total / MAX_SCORE) * 100);

  return {
    user: match,
    compatibility,
    breakdown: {
      intentPoints,
      identityPoints,
      presentationPoints,
      presentationBonus,
      archetypePoints,
      archetypeBonus,
      total,
    },
  };
}

export function getMatches(user: UserProfile, users: MatchUser[]): MatchResult[] {
  return users
    .map((m) => calculateCompatibility(user, m))
    .sort((a, b) => b.compatibility - a.compatibility);
}

export function getCompatibilityLabel(score: number): string {
  if (score >= 80) return 'Great match';
  if (score >= 60) return 'Good match';
  if (score >= 40) return 'Potential';
  return 'Low match';
}

export function getCompatibilityColor(score: number): string {
  if (score >= 80) return '#4CAF50';
  if (score >= 60) return '#8BC34A';
  if (score >= 40) return '#FFC107';
  return '#9E9E9E';
}

// =============================================================================
// PREVIOUS IMPLEMENTATION (weighted average approach)
// =============================================================================

// import { UserProfile, MatchUser, MatchPreference, Intention } from './types';
//
// export interface MatchResult {
//   user: MatchUser;
//   compatibility: number;
//   breakdown: {
//     intentionScore: number;
//     preferencesScore: number;
//     eraScore: number;
//   };
// }
//
// const WEIGHTS = {
//   intention: 0.35,
//   preferences: 0.55,
//   era: 0.10,
// };
//
// function calculateIntentionScore(userIntent: Intention | null, matchIntent: Intention): number {
//   if (!userIntent) return 0;
//   return userIntent === matchIntent ? 100 : 0;
// }
//
// const PREFERENCE_COMPATIBILITY: Record<MatchPreference, Record<MatchPreference, number>> = {
//   'romantic-partner': {
//     'romantic-partner': 100,
//     'relationship': 90,
//     'open-to-exploring': 60,
//     'someone-to-go-out-with': 35,
//     'a-good-time': 30,
//     'new-bestie': 15,
//   },
//   'relationship': {
//     'romantic-partner': 90,
//     'relationship': 100,
//     'open-to-exploring': 40,
//     'someone-to-go-out-with': 35,
//     'a-good-time': 25,
//     'new-bestie': 15,
//   },
//   'open-to-exploring': {
//     'romantic-partner': 70,
//     'relationship': 40,
//     'open-to-exploring': 100,
//     'someone-to-go-out-with': 40,
//     'a-good-time': 80,
//     'new-bestie': 50,
//   },
//   'someone-to-go-out-with': {
//     'romantic-partner': 40,
//     'relationship': 35,
//     'open-to-exploring': 75,
//     'someone-to-go-out-with': 100,
//     'a-good-time': 85,
//     'new-bestie': 70,
//   },
//   'a-good-time': {
//     'romantic-partner': 50,
//     'relationship': 15,
//     'open-to-exploring': 80,
//     'someone-to-go-out-with': 85,
//     'a-good-time': 100,
//     'new-bestie': 60,
//   },
//   'new-bestie': {
//     'romantic-partner': 15,
//     'relationship': 20,
//     'open-to-exploring': 50,
//     'someone-to-go-out-with': 70,
//     'a-good-time': 60,
//     'new-bestie': 100,
//   },
// };
//
// function calculatePreferencesScore(
//   userPrefs: MatchPreference[],
//   matchPrefs: MatchPreference[]
// ): number {
//   if (userPrefs.length === 0 || matchPrefs.length === 0) return 0;
//   let totalScore = 0;
//   let pairCount = 0;
//   for (const userPref of userPrefs) {
//     for (const matchPref of matchPrefs) {
//       totalScore += PREFERENCE_COMPATIBILITY[userPref][matchPref];
//       pairCount++;
//     }
//   }
//   return pairCount > 0 ? Math.round(totalScore / pairCount) : 0;
// }
//
// function calculateEraScore(userEra: number, matchEra: number): number {
//   const eraDiff = Math.abs(userEra - matchEra);
//   switch (eraDiff) {
//     case 0: return 100;
//     case 1: return 60;
//     default: return 20;
//   }
// }
//
// export function calculateCompatibility(user: UserProfile, match: MatchUser): MatchResult {
//   const intentionScore = calculateIntentionScore(user.intention, match.intention);
//   const preferencesScore = calculatePreferencesScore(user.matchPreferences, match.matchPreferences);
//   const eraScore = calculateEraScore(user.era, match.era);
//   const compatibility = Math.round(
//     (intentionScore * WEIGHTS.intention) +
//     (preferencesScore * WEIGHTS.preferences) +
//     (eraScore * WEIGHTS.era)
//   );
//   return {
//     user: match,
//     compatibility,
//     breakdown: { intentionScore, preferencesScore, eraScore },
//   };
// }
//
// export function getMatches(user: UserProfile, mockUsers: MatchUser[]): MatchResult[] {
//   return mockUsers
//     .map((m) => calculateCompatibility(user, m))
//     .sort((a, b) => b.compatibility - a.compatibility);
// }
//
// export function getCompatibilityLabel(score: number): string {
//   if (score >= 80) return 'Great match';
//   if (score >= 60) return 'Good match';
//   if (score >= 40) return 'Potential';
//   return 'Low match';
// }
//
// export function getCompatibilityColor(score: number): string {
//   if (score >= 80) return '#4CAF50';
//   if (score >= 60) return '#8BC34A';
//   if (score >= 40) return '#FFC107';
//   return '#9E9E9E';
// }
