import { UserProfile, MockUser, MatchPreference, Intention } from './types';

export interface MatchResult {
  user: MockUser;
  compatibility: number; // 0-100
  breakdown: {
    intentionScore: number;
    preferencesScore: number;
    eraScore: number;
  };
}

// Weights for each factor
const WEIGHTS = {
  intention: 0.35,
  preferences: 0.50,
  era: 0.15,
};

/**
 * Calculate intention compatibility score (0-100)
 * Same intent = 100%, closely aligned = 60-80%, conflicting = 0-20%
 */
function calculateIntentionScore(userIntent: Intention | null, matchIntent: Intention): number {
  if (!userIntent) return 0;

  // Same intention = 100%
  if (userIntent === matchIntent) {
    return 100;
  }

  // Different intentions - currently we only have 'matchmaking' and 'organizer'
  // Matchmaking vs Organizer = conflicting (20%)
  return 5; // Could be adjusted based on future intentions and user feedback  
}

/**
 * Preference compatibility matrix
 * Defines how compatible each preference pair is (0-100)
 */
const PREFERENCE_COMPATIBILITY: Record<MatchPreference, Record<MatchPreference, number>> = {
  'romantic-partner': {
    'romantic-partner': 100,
    'relationship': 90,
    'open-to-exploring': 60,
    'someone-to-go-out-with': 35,
    'a-good-time': 30,
    'new-bestie': 15,
  },
  'relationship': {
    'romantic-partner': 90,
    'relationship': 100,
    'open-to-exploring': 40,
    'someone-to-go-out-with': 35,
    'a-good-time': 25,
    'new-bestie': 15,
  },
  'open-to-exploring': {
    'romantic-partner': 70,
    'relationship': 40,
    'open-to-exploring': 100,
    'someone-to-go-out-with': 40,
    'a-good-time': 80,
    'new-bestie': 50,
  },
  'someone-to-go-out-with': {
    'romantic-partner': 40,
    'relationship': 35,
    'open-to-exploring': 75,
    'someone-to-go-out-with': 100,
    'a-good-time': 85,
    'new-bestie': 70,
  },
  'a-good-time': {
    'romantic-partner': 50,
    'relationship': 15,
    'open-to-exploring': 80,
    'someone-to-go-out-with': 85,
    'a-good-time': 100,
    'new-bestie': 60,
  },
  'new-bestie': {
    'romantic-partner': 15,
    'relationship': 20,
    'open-to-exploring': 50,
    'someone-to-go-out-with': 70,
    'a-good-time': 60,
    'new-bestie': 100,
  },
};

/**
 * Calculate preferences compatibility score (0-100)
 * Uses the preference compatibility matrix to find the best match
 */
function calculatePreferencesScore(
  userPrefs: MatchPreference[],
  matchPrefs: MatchPreference[]
): number {
  if (userPrefs.length === 0 || matchPrefs.length === 0) {
    return 0;
  }

  // Calculate average compatibility across all preference pairs
  let totalScore = 0;
  let pairCount = 0;

  for (const userPref of userPrefs) {
    for (const matchPref of matchPrefs) {
      totalScore += PREFERENCE_COMPATIBILITY[userPref][matchPref];
      pairCount++;
    }
  }

  // Also boost score if there are exact matches
  const exactMatches = userPrefs.filter((p) => matchPrefs.includes(p)).length;
  const exactMatchBonus = (exactMatches / Math.max(userPrefs.length, matchPrefs.length)) * 10;

  const averageScore = pairCount > 0 ? totalScore / pairCount : 0;

  // Cap at 100
  return Math.min(100, averageScore + exactMatchBonus);
}

/**
 * Calculate era compatibility score (0-100)
 * Same era = 100%, adjacent = 60%, far apart = 20%
 */
function calculateEraScore(userEra: number, matchEra: number): number {
  const eraDiff = Math.abs(userEra - matchEra);

  switch (eraDiff) {
    case 0:
      return 100; // Same era
    case 1:
      return 60;  // Adjacent era
    default:
      return 20;  // Far apart
  }
}

/**
 * Calculate compatibility between the current user and a potential match.
 *
 * Scoring weights:
 * - Intention: 35%
 * - Preferences (what you want): 50%
 * - Era: 15%
 */
export function calculateCompatibility(
  user: UserProfile,
  match: MockUser
): MatchResult {
  // Calculate individual scores (0-100 each)
  const intentionScore = calculateIntentionScore(user.intention, match.intention);
  const preferencesScore = calculatePreferencesScore(user.matchPreferences, match.matchPreferences);
  const eraScore = calculateEraScore(user.era, match.era);

  // Apply weights and sum up
  const compatibility = Math.round(
    (intentionScore * WEIGHTS.intention) +
    (preferencesScore * WEIGHTS.preferences) +
    (eraScore * WEIGHTS.era)
  );

  return {
    user: match,
    compatibility,
    breakdown: {
      intentionScore,
      preferencesScore,
      eraScore,
    },
  };
}

/**
 * Get sorted matches for the current user
 */
export function getMatches(
  user: UserProfile,
  mockUsers: MockUser[]
): MatchResult[] {
  // Calculate compatibility for each user
  const matches = mockUsers.map((m) => calculateCompatibility(user, m));

  // Sort by compatibility (highest first)
  return matches.sort((a, b) => b.compatibility - a.compatibility);
}

/**
 * Get a human-readable compatibility label
 */
export function getCompatibilityLabel(score: number): string {
  if (score >= 80) return 'Great match';
  if (score >= 60) return 'Good match';
  if (score >= 40) return 'Potential';
  return 'Low match';
}

/**
 * Get compatibility color
 */
export function getCompatibilityColor(score: number): string {
  if (score >= 80) return '#4CAF50'; // Green
  if (score >= 60) return '#8BC34A'; // Light green
  if (score >= 40) return '#FFC107'; // Amber
  return '#9E9E9E'; // Gray
}
