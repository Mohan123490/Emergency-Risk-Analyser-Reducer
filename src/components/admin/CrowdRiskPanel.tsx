'use client';

import React from 'react';
import { useAppState } from '@/context/AppStateContext';
import { predictZoneRisk10Min } from '@/lib/riskEngine';
import {
  Users,
  Activity,
  AlertOctagon,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

export const CrowdRiskPanel: React.FC = () => {
  const { currentEvent, incidents, broadcastCustomAlert } = useAppState();

  const handleIntervene = (zoneName: string, action: string) => {
    broadcastCustomAlert({
      title: `CROWD SAFETY DIRECTIVE: ${zoneName.toUpperCase()}`,
      message: `Control Room has enacted crowd balancing: ${action}. Please follow on-ground volunteer directions.`,
      level: 'ORANGE',
      severity: 'HIGH',
      targetAreaName: zoneName
    });
    soundFX.playAlertChime();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <span>Predictive Crowd Intelligence & Risk Engine</span>
              <span className="px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 font-mono text-[10px] font-bold">
                AI ACTIVE
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Real-time Density, Velocity Stagnation & 10-Min Projections</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-mono">
            Monitored Sectors: <strong className="text-white">{currentEvent.zones.length}</strong>
          </span>
        </div>
      </div>

      {/* Zone Risk Grid */}
      <div className="space-y-3.5">
        {currentEvent.zones.map((zone) => {
          const activeInZone = incidents.filter(
            (i) => i.zoneId === zone.id && i.status !== 'RESOLVED' && i.status !== 'DISMISSED'
          );
          const prediction = predictZoneRisk10Min(zone, activeInZone);

          const isCritical = zone.riskLevel === 'CRITICAL';
          const isHigh = zone.riskLevel === 'HIGH_RISK';

          return (
            <div
              key={zone.id}
              className={`bg-slate-950 border rounded-2xl p-4 space-y-3 transition ${
                isCritical
                  ? 'border-red-600/90 bg-red-950/20 shadow-xl siren-glow'
                  : isHigh
                  ? 'border-orange-600/80 bg-orange-950/10'
                  : 'border-slate-800/90'
              }`}
            >
              {/* Zone Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{zone.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isCritical
                          ? 'bg-red-600 text-white animate-pulse'
                          : isHigh
                          ? 'bg-orange-600 text-white'
                          : zone.riskLevel === 'CAUTION'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {zone.riskLevel} ({zone.riskScore}/100)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Sector Type: {zone.type.toUpperCase()} | Assigned Volunteers: {zone.assignedVolunteersCount}
                  </span>
                </div>

                {/* 10-Minute Predictive Forecast Badge */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">10-MIN PREDICTION:</span>
                  <span
                    className={`font-black font-mono text-xs flex items-center gap-1 ${
                      prediction.predictedRiskScore10Min >= 85
                        ? 'text-red-400'
                        : prediction.predictedRiskScore10Min >= 60
                        ? 'text-orange-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {prediction.trend === 'RISING_FAST' || prediction.trend === 'RISING' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {prediction.predictedRiskScore10Min}/100 ({prediction.trend.replace('_', ' ')})
                  </span>
                </div>
              </div>

              {/* Real-time Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                {/* Density Ratio */}
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-mono">CROWD DENSITY</span>
                  <span className="font-extrabold text-sm text-white">
                    {zone.densityPercentage}%{' '}
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({(zone.currentPopulation / 1000).toFixed(0)}k/{(zone.capacity / 1000).toFixed(0)}k)
                    </span>
                  </span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full ${
                        zone.densityPercentage > 85
                          ? 'bg-red-500'
                          : zone.densityPercentage > 70
                          ? 'bg-orange-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, zone.densityPercentage)}%` }}
                    />
                  </div>
                </div>

                {/* Flow Speed */}
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-mono">MOVEMENT VELOCITY</span>
                  <span
                    className={`font-extrabold text-sm ${
                      zone.movementSpeed < 0.3 ? 'text-red-400 font-mono' : 'text-slate-100 font-mono'
                    }`}
                  >
                    {zone.movementSpeed} m/s
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">{zone.movementDirection}</span>
                </div>

                {/* Inflow vs Outflow */}
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-mono">INFLOW / OUTFLOW</span>
                  <span className="font-extrabold text-sm text-white font-mono">
                    +{zone.inflowRate}{' '}
                    <span className="text-slate-500 font-normal">/</span>{' '}
                    <span className="text-slate-300">-{zone.outflowRate}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">people / min</span>
                </div>

                {/* Exit Status */}
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-mono">EXIT CORRIDORS</span>
                  <span
                    className={`font-extrabold text-sm ${
                      zone.exitBlocked ? 'text-red-400 animate-pulse' : 'text-emerald-400'
                    }`}
                  >
                    {zone.exitBlocked ? '⚠️ BLOCKED' : 'CLEAR & FLOWING'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{activeInZone.length} active reports</span>
                </div>
              </div>

              {/* Explainable AI Summary Box (Requirement #30) */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explainable AI Risk Rationale:</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{zone.aiExplanation}</p>
              </div>

              {/* Actionable Directives */}
              {zone.recommendations && zone.recommendations.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-200">Recommended Action: </span>
                    <span>{zone.recommendations[0]}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCritical && (
                      <button
                        onClick={() => handleIntervene(zone.name, 'Restrict inbound gates and open secondary bypass')}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition text-[10px]"
                      >
                        Restrict Inflow & Open Bypass
                      </button>
                    )}
                    <button
                      onClick={() => handleIntervene(zone.name, 'Deploy 4 additional crowd volunteers')}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition text-[10px]"
                    >
                      Deploy Volunteer Squad
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
