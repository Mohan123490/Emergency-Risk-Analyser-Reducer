import { Coordinates } from '@/types';

/**
 * Calculates the Haversine distance in meters between two coordinates
 */
export function calculateDistanceMeters(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371000; // Radius of Earth in meters
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Formats distance into a human-readable string (e.g., '140 m' or '1.2 km')
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Calculates compass direction / bearing from point A to point B
 */
export function calculateBearing(start: Coordinates, end: Coordinates): string {
  const y = Math.sin((end.lng - start.lng) * (Math.PI / 180)) * Math.cos(end.lat * (Math.PI / 180));
  const x =
    Math.cos(start.lat * (Math.PI / 180)) * Math.sin(end.lat * (Math.PI / 180)) -
    Math.sin(start.lat * (Math.PI / 180)) *
      Math.cos(end.lat * (Math.PI / 180)) *
      Math.cos((end.lng - start.lng) * (Math.PI / 180));
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  brng = (brng + 360) % 360;

  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.round(brng / 45) % 8;
  return directions[index];
}

/**
 * Checks if a point is within a given radius in meters of a center point
 */
export function isWithinRadius(point: Coordinates, center: Coordinates, radiusMeters: number): boolean {
  return calculateDistanceMeters(point, center) <= radiusMeters;
}

/**
 * Generates an estimated walking or driving ETA string
 */
export function estimateEtaMinutes(meters: number, speedMetersPerSec: number = 1.2): number {
  const seconds = meters / speedMetersPerSec;
  return Math.max(1, Math.ceil(seconds / 60));
}
