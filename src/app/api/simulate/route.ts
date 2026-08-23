import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { scenarioId } = await req.json();

    const scenarioDescriptions: Record<number, string> = {
      1: 'Thrissur Pooram Gate 3 Crowd Surge: Density reached 97%, velocity 0.08 m/s, exit B blocked. Risk score 96/100.',
      2: 'Missing Child at Food Court: Aarav Menon (6yo) matched with Found Child report #1008 (94% confidence).',
      3: 'Critical Medical Collapse at Main Stage: ALS Ambulance KL-08-CC-4421 dispatched (ETA: 2 mins).',
      4: 'Organized Theft Snatching: 3 suspects cornered by Police Squad at Swaraj North.',
      5: 'Global Disaster Mode Activated: Multi-sector evacuation directive issued by DDMA.'
    };

    return NextResponse.json({
      status: 'success',
      scenarioId,
      description: scenarioDescriptions[scenarioId] || 'Custom simulation executed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
  }
}
