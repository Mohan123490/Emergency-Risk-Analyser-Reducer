import { MissingPersonCase, Incident } from '@/types';
import { calculateDistanceMeters } from './geoUtils';

/**
 * Fuzzy matching algorithm between Missing and Found Person cases
 * Returns a score between 0 and 100
 */
export function matchMissingPerson(
  missing: MissingPersonCase,
  found: MissingPersonCase
): { score: number; matchReasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Gender check (Must match or be unspecified)
  if (missing.gender === found.gender) {
    score += 25;
    reasons.push(`Gender match (${missing.gender.toLowerCase()})`);
  } else {
    return { score: 0, matchReasons: ['Gender mismatch'] };
  }

  // 2. Age proximity (±2 years = high score, ±4 years = medium)
  const ageDiff = Math.abs(missing.age - found.age);
  if (ageDiff === 0) {
    score += 30;
    reasons.push(`Exact age match (${missing.age} years)`);
  } else if (ageDiff <= 1) {
    score += 24;
    reasons.push(`Close age proximity (approx ${found.age} vs ${missing.age})`);
  } else if (ageDiff <= 3) {
    score += 15;
    reasons.push(`Estimated age in range (±${ageDiff} yrs)`);
  }

  // 3. Clothing description keyword overlap
  const missingWords = (missing.clothingDescription || '').toLowerCase().split(/\s+/);
  const foundWords = (found.clothingDescription || '').toLowerCase().split(/\s+/);
  const commonKeywords = missingWords.filter((w) => w.length > 2 && foundWords.includes(w));

  if (commonKeywords.length >= 3) {
    score += 30;
    reasons.push(`High clothing description overlap (${commonKeywords.slice(0, 3).join(', ')})`);
  } else if (commonKeywords.length >= 1) {
    score += 18;
    reasons.push(`Clothing keyword match (${commonKeywords.join(', ')})`);
  }

  // 4. Geographic proximity
  const dist = calculateDistanceMeters(missing.lastKnownCoordinates, found.lastKnownCoordinates);
  if (dist < 300) {
    score += 15;
    reasons.push(`Found within ${dist}m of last reported sighting`);
  } else if (dist < 800) {
    score += 10;
    reasons.push(`Found within ${dist}m radius`);
  }

  const finalScore = Math.min(100, score);
  return {
    score: finalScore,
    matchReasons: reasons
  };
}

/**
 * Detects duplicate incident reports submitted within 150m and 10 minutes
 */
export function findPotentialDuplicates(
  targetIncident: Incident,
  allIncidents: Incident[]
): Incident[] {
  const duplicates: Incident[] = [];
  const targetTime = new Date(targetIncident.timestamp).getTime();

  for (const other of allIncidents) {
    if (other.id === targetIncident.id) continue;
    if (other.status === 'RESOLVED' || other.status === 'DISMISSED') continue;

    // Check category match or crowd/blockage similarity
    const sameCategory =
      other.category === targetIncident.category ||
      (targetIncident.category === 'dangerous_crowd' && other.category === 'crowd_blockage');

    if (!sameCategory) continue;

    // Distance check (<= 150 meters)
    const distance = calculateDistanceMeters(targetIncident.location, other.location);
    if (distance > 150) continue;

    // Time window check (<= 15 minutes)
    const otherTime = new Date(other.timestamp).getTime();
    const diffMinutes = Math.abs(targetTime - otherTime) / (1000 * 60);

    if (diffMinutes <= 15) {
      duplicates.push(other);
    }
  }

  return duplicates;
}
