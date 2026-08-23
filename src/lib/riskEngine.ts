import { RiskZone, Incident, CrowdRiskPrediction } from '@/types';

/**
 * Calculates current real-time Risk Score (0 - 100) for a zone
 */
export function calculateZoneRiskScore(
  zone: RiskZone,
  activeIncidentsInZone: Incident[]
): {
  score: number;
  level: 'SAFE' | 'CAUTION' | 'HIGH_RISK' | 'CRITICAL';
  explanation: string;
  recommendations: string[];
} {
  // 1. Density component (0 to 40 pts)
  // Normal density < 60% = 10 pts, 60-80% = 25 pts, >80% = 40 pts
  const densityRatio = Math.min(1, zone.currentPopulation / Math.max(1, zone.capacity));
  const densityScore = densityRatio * 40;

  // 2. Velocity / Stagnation penalty (0 to 25 pts)
  // Low speed (< 0.3 m/s) in dense crowd is dangerous stampede indicator
  let velocityScore = 0;
  if (zone.movementSpeed < 0.2) {
    velocityScore = 25;
  } else if (zone.movementSpeed < 0.5) {
    velocityScore = 15;
  } else if (zone.movementSpeed < 1.0) {
    velocityScore = 8;
  } else {
    velocityScore = 2;
  }

  // 3. Exit Blockage / Inflow Bottleneck (0 to 20 pts)
  let flowScore = 0;
  if (zone.exitBlocked) {
    flowScore += 15;
  }
  if (zone.inflowRate > zone.outflowRate * 1.5) {
    flowScore += 5;
  }

  // 4. Incident Severity & Concentration in Zone (0 to 15 pts)
  let incidentScore = 0;
  activeIncidentsInZone.forEach((inc) => {
    if (inc.status !== 'RESOLVED' && inc.status !== 'DISMISSED') {
      if (inc.severity === 'CRITICAL') incidentScore += 10;
      else if (inc.severity === 'HIGH') incidentScore += 5;
      else if (inc.severity === 'MEDIUM') incidentScore += 2;
      else incidentScore += 1;
    }
  });
  incidentScore = Math.min(15, incidentScore);

  const rawScore = Math.min(100, Math.round(densityScore + velocityScore + flowScore + incidentScore));

  let level: 'SAFE' | 'CAUTION' | 'HIGH_RISK' | 'CRITICAL' = 'SAFE';
  if (rawScore >= 85) level = 'CRITICAL';
  else if (rawScore >= 65) level = 'HIGH_RISK';
  else if (rawScore >= 40) level = 'CAUTION';
  else level = 'SAFE';

  // Explainable AI summary
  const reasons: string[] = [];
  if (densityRatio > 0.85) {
    reasons.push(`Crowd density exceeded ${(densityRatio * 100).toFixed(0)}% capacity`);
  }
  if (zone.movementSpeed < 0.3) {
    reasons.push(`Movement speed dropped to ${zone.movementSpeed} m/s (high stagnation)`);
  }
  if (zone.exitBlocked) {
    reasons.push(`Critical exit obstruction detected`);
  }
  if (activeIncidentsInZone.length > 0) {
    reasons.push(`${activeIncidentsInZone.length} active emergency reports in this sector`);
  }

  const explanation = reasons.length > 0
    ? `Risk increased because: ${reasons.join(', ')}.`
    : 'Crowd movement, capacity metrics, and exit corridors are within safe operating limits.';

  const recommendations: string[] = [];
  if (level === 'CRITICAL') {
    recommendations.push(`Halt all inward pedestrian traffic into ${zone.name}`);
    recommendations.push('Open all secondary emergency release gates immediately');
    recommendations.push('Deploy 6+ crowd management marshals and Rapid Action Force');
    recommendations.push('Broadcast directional audio evacuation guidance to nearby users');
  } else if (level === 'HIGH_RISK') {
    recommendations.push('Regulate entrance gates using staggered queue pulses');
    recommendations.push('Deploy 4 additional volunteers to clear exit bottlenecks');
    recommendations.push('Inspect emergency lane clearance');
  } else if (level === 'CAUTION') {
    recommendations.push('Monitor entry rates against hourly forecast');
    recommendations.push('Ensure medical first responder patrols are stationed nearby');
  } else {
    recommendations.push('Maintain routine patrol and standard surveillance');
  }

  return {
    score: rawScore,
    level,
    explanation,
    recommendations
  };
}

/**
 * Predicts crowd risk 10 minutes into future based on trend vector
 */
export function predictZoneRisk10Min(
  zone: RiskZone,
  activeIncidentsInZone: Incident[]
): CrowdRiskPrediction {
  const current = calculateZoneRiskScore(zone, activeIncidentsInZone);

  // Inflow vs outflow delta
  const netInflow = zone.inflowRate - zone.outflowRate;
  let deltaRisk = 0;

  if (netInflow > 500) deltaRisk += 12;
  else if (netInflow > 100) deltaRisk += 6;
  else if (netInflow < -200) deltaRisk -= 8;

  if (zone.exitBlocked) deltaRisk += 8;

  const predictedScore = Math.max(0, Math.min(100, current.score + deltaRisk));

  let trend: 'RISING_FAST' | 'RISING' | 'STABLE' | 'DECREASING' = 'STABLE';
  if (deltaRisk >= 10) trend = 'RISING_FAST';
  else if (deltaRisk > 3) trend = 'RISING';
  else if (deltaRisk < -3) trend = 'DECREASING';

  return {
    zoneId: zone.id,
    zoneName: zone.name,
    currentRiskScore: current.score,
    predictedRiskScore10Min: predictedScore,
    trend,
    factors: {
      densityContribution: Math.round(zone.densityPercentage * 0.4),
      velocityDropContribution: zone.movementSpeed < 0.3 ? 25 : 10,
      exitBlockageContribution: zone.exitBlocked ? 15 : 0,
      reportConcentrationContribution: activeIncidentsInZone.length * 4
    },
    aiRecommendations: current.recommendations,
    suggestedVolunteers: current.level === 'CRITICAL' ? 8 : current.level === 'HIGH_RISK' ? 4 : 2,
    securityInterventionRequired: current.score >= 80 || zone.exitBlocked
  };
}
