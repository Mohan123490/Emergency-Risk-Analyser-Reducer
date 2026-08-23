import { NextResponse } from 'next/server';
import { SEED_INCIDENTS } from '@/data/seedIncidents';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    count: SEED_INCIDENTS.length,
    incidents: SEED_INCIDENTS
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newIncident = {
      id: `inc-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      status: 'REPORTED',
      ...body
    };

    return NextResponse.json({
      status: 'success',
      message: 'Incident registered in Suraksha Grid',
      incident: newIncident
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
  }
}
