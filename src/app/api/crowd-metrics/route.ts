import { NextResponse } from 'next/server';
import { KERALA_EVENTS } from '@/data/keralaEvents';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId') || 'thrissur-pooram-2026';

  const event = KERALA_EVENTS.find((e) => e.id === eventId) || KERALA_EVENTS[0];

  return NextResponse.json({
    status: 'success',
    eventId: event.id,
    eventName: event.name,
    timestamp: new Date().toISOString(),
    zones: event.zones.map((z) => ({
      id: z.id,
      name: z.name,
      population: z.currentPopulation,
      capacity: z.capacity,
      densityPercentage: z.densityPercentage,
      velocityMps: z.movementSpeed,
      riskScore: z.riskScore,
      riskLevel: z.riskLevel,
      exitBlocked: z.exitBlocked,
      aiExplanation: z.aiExplanation
    }))
  });
}
