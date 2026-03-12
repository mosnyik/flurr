import { UserProfile, MockUser, MatchPreference } from './types';

export interface MatchResult {
  user: MockUser;
  compatibility: number; // 0-100
  breakdown: {
    intentionScore: number;
    preferencesScore: number;
    eraScore: number;
  };
}

/**
 * Calculate compatibility between the current user and a potential match.
 *
 * Scoring:
 * - Intention match: 30 points (must match for any score)
 * - Match preferences overlap: up to 40 points
 * - Era proximity: up to 30 points
 */
export function calculateCompatibility(
  user: UserProfile,
  match: MockUser
): MatchResult {
  const breakdown = {
    intentionScore: 0,
    preferencesScore: 0,
    eraScore: 0,
  };

  // Intention match (30 points) - must both be matchmaking
  if (user.intention === match.intention) {
    breakdown.intentionScore = 30;
  }

  // Match preferences overlap (40 points)
  const userPrefs = new Set(user.matchPreferences);
  const matchPrefs = new Set(match.matchPreferences);
  const overlap = user.matchPreferences.filter((p) => matchPrefs.has(p));

  if (userPrefs.size > 0 && matchPrefs.size > 0) {
    // Calculate Jaccard similarity for preferences
    const union = new Set([...userPrefs, ...matchPrefs]);
    const similarity = overlap.length / union.size;
    breakdown.preferencesScore = Math.round(similarity * 40);
  }

  // Era proximity (30 points)
  // 0 difference = 30 points, 1 difference = 15 points, 2 difference = 0 points
  const eraDiff = Math.abs(user.era - match.era);
  breakdown.eraScore = Math.max(0, 30 - eraDiff * 15);

  const compatibility =
    breakdown.intentionScore +
    breakdown.preferencesScore +
    breakdown.eraScore;

  return {
    user: match,
    compatibility,
    breakdown,
  };
}

/**
 * Get sorted matches for the current user
 */
export function getMatches(
  user: UserProfile,
  mockUsers: MockUser[]
): MatchResult[] {
  // Filter out users with different intentions (organizers don't match with matchmaking)
  const eligibleUsers = mockUsers.filter(
    (m) => m.intention === user.intention
  );

  // Calculate compatibility for each user
  const matches = eligibleUsers.map((m) => calculateCompatibility(user, m));

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
