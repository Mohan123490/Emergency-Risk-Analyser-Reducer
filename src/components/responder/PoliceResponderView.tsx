'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { IncidentStatus } from '@/types';
import {
  Shield,
  Radio,
  MapPin,
  Lock,
  Flame,
  Users,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Navigation,
  ArrowRight,
  Crosshair,
  Zap
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { calculateDistanceMeters, formatDistance } from '@/lib/geoUtils';

export const PoliceResponderView: React.FC = () => {
  const {
    incidents,
    currentUser,
    currentEvent,
    updateIncidentStatus
  } = useAppState();

  const [activeTab, setActiveTab] = useState<'security' | 'crowd_containment' | 'police_points'>('security');

  const securityIncidents = incidents.filter(
    (i) =>
      (i.category === 'theft' ||
        i.category === 'fight' ||
        i.category === 'dangerous_crowd' ||
        i.category === 'suspicious_activity' ||
        i.category === 'infrastructure_damage' ||
        i.category === 'road_blocked' ||
        i.category === 'fire') &&
      i.status !== 'RESOLVED' &&
      i.status !== 'DISMISSED'
  );

  const handleCordon = (incidentId: string) => {
    updateIncidentStatus(
      incidentId,
      'IN_PROGRESS',
      'Kerala Police & RAF units deployed. Perimeter cordoned and suspect containment active.'
    );
    soundFX.playSuccessChime();
  };

  const handleResolve = (incidentId: string) => {
    updateIncidentStatus(
      incidentId,
      'RESOLVED',
      'Situation brought under control by Law & Order division. Area safe.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 text-xs font-sans">
      {/* Header & Sector Authority */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-[#030712] to-[#030712] border border-indigo-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl cyber-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-white">TACTICAL SECURITY & LAW ENFORCEMENT GRID</h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold">
                  SECTOR LAW & ORDER
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono">
                Commanding Officer: <span className="text-white font-semibold">{currentUser.name}</span> | Outpost: {currentEvent.policePoints[0]?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <div className="bg-black/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-24">
              <span className="text-[10px] text-slate-500 block">THREAT HOTSPOTS</span>
              <span className="text-lg font-black text-indigo-400">{securityIncidents.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-2 font-mono">
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span>ACTIVE THREAT STREAM ({securityIncidents.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('crowd_containment')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'crowd_containment'
              ? 'bg-amber-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>SURGE CONTAINMENT</span>
        </button>
        <button
          onClick={() => setActiveTab('police_points')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'police_points'
              ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>OUTPOSTS & RAF STRIKE UNITS</span>
        </button>
      </div>

      {/* Tab 1: Security Feed */}
      {activeTab === 'security' && (
        <div className="space-y-3">
          {securityIncidents.length === 0 ? (
            <div className="bg-[#030712] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 cyber-card font-mono">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="font-bold text-white">ALL SECURITY SECTORS CLEAR & STABILIZED</p>
              <p className="text-xs text-slate-500 mt-0.5">High-visibility patrolling active.</p>
            </div>
          ) : (
            securityIncidents.map((inc) => {
              const dist = currentUser.currentLocation
                ? calculateDistanceMeters(currentUser.currentLocation, inc.location)
                : 150;

              return (
                <div
                  key={inc.id}
                  className="bg-[#030712] border border-indigo-500/50 rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(99,102,241,0.2)] space-y-3 cyber-card"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inc.severity === 'CRITICAL'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {inc.severity}
                        </span>
                        <span className="text-cyan-400">#{inc.id}</span>
                        <span className="text-indigo-400 font-bold text-xs">{inc.locationName}</span>
                      </div>
                      <h3 className="font-extrabold text-base text-white mt-1">{inc.title}</h3>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/50 font-mono font-bold">
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs bg-black/60 p-3 rounded-xl border border-slate-800">
                    {inc.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      Distance: <span className="text-white font-bold">{formatDistance(dist)}</span>
                    </span>
                    <span>Reporter: {inc.reporterName} (Node Trust: {inc.reporterTrustScore}%)</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800 font-mono">
                    {inc.status !== 'IN_PROGRESS' ? (
                      <button
                        onClick={() => handleCordon(inc.id)}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition uppercase"
                      >
                        DEPLOY STRIKE UNIT & ESTABLISH PERIMETER CORDON
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResolve(inc.id)}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition uppercase"
                      >
                        TRANSMIT: THREAT DEFUSED & SECTOR SECURED
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Surge Containment */}
      {activeTab === 'crowd_containment' && (
        <div className="bg-[#030712] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 cyber-card">
          <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>HIGH-PRESSURE CROWD SURGE SECTORS UNDER TACTICAL SURVEILLANCE</span>
          </h3>

          <div className="space-y-3">
            {currentEvent.zones
              .filter((z) => z.riskLevel === 'CRITICAL' || z.riskLevel === 'HIGH_RISK')
              .map((zone) => (
                <div
                  key={zone.id}
                  className="bg-black/70 border border-red-500/40 rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{zone.name}</span>
                    <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-300 font-mono font-bold border border-red-500">
                      DENSITY: {zone.densityPercentage}% | RISK SCORE: {zone.riskScore}/100
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs">{zone.aiExplanation}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">CURRENT POPULATION</span>
                      <span className="font-bold text-white">{zone.currentPopulation.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">CIRCULATION VELOCITY</span>
                      <span className="font-bold text-amber-400">{zone.movementSpeed} m/s</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">INFLOW / OUTFLOW</span>
                      <span className="font-bold text-white">+{zone.inflowRate} / -{zone.outflowRate}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">EGRESS STATE</span>
                      <span className={`font-bold ${zone.exitBlocked ? 'text-red-400' : 'text-emerald-400'}`}>
                        {zone.exitBlocked ? 'BLOCKED' : 'CLEAR'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab 3: Police Outposts & Contact Points */}
      {activeTab === 'police_points' && (
        <div className="bg-[#030712] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 cyber-card">
          <h3 className="font-mono font-bold text-sm text-white">FIXED POLICE OUTPOSTS & RAPID DEPLOYMENT STATIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentEvent.policePoints.map((pol) => (
              <div key={pol.id} className="bg-black/70 border border-slate-800 rounded-xl p-3.5 space-y-2 font-mono">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs font-sans">{pol.name}</h4>
                    <span className="text-[10px] text-cyan-400">{pol.unitType}</span>
                  </div>
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <p>In-Charge: <span className="text-white font-semibold font-sans">{pol.inCharge}</span></p>
                  <p className="text-indigo-300">Hotline: {pol.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
