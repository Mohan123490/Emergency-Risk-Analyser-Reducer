'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { VolunteerStatus, IncidentStatus } from '@/types';
import {
  Award,
  Radio,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  AlertTriangle,
  UserCheck,
  Shield,
  HeartPulse,
  Users,
  Compass,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { calculateDistanceMeters, formatDistance, estimateEtaMinutes } from '@/lib/geoUtils';

export const VolunteerDashboard: React.FC = () => {
  const {
    currentUser,
    updateVolunteerStatus,
    incidents,
    updateIncidentStatus,
    assignResponder,
    currentEvent
  } = useAppState();

  const [activeTab, setActiveTab] = useState<'assigned' | 'nearby' | 'crowd_flow'>('assigned');

  // Filter assigned tasks vs nearby available tasks
  const myAssignedIncidents = incidents.filter(
    (i) => i.assignedResponderId === currentUser.id && i.status !== 'RESOLVED' && i.status !== 'DISMISSED'
  );

  const nearbyUnassignedIncidents = incidents.filter((i) => {
    if (i.status === 'RESOLVED' || i.status === 'DISMISSED' || i.assignedResponderId === currentUser.id) return false;
    const dist = currentUser.currentLocation
      ? calculateDistanceMeters(currentUser.currentLocation, i.location)
      : 300;
    return dist <= 600; // Within 600m radar
  });

  const handleAcceptTask = (incidentId: string) => {
    assignResponder(incidentId, currentUser.id);
    updateIncidentStatus(incidentId, 'RESPONDER_EN_ROUTE', `${currentUser.name} accepted task and is en route.`);
    updateVolunteerStatus('busy');
    soundFX.playSuccessChime();
  };

  const handleUpdateStatus = (incidentId: string, nextStatus: IncidentStatus) => {
    updateIncidentStatus(incidentId, nextStatus);
    if (nextStatus === 'RESOLVED') {
      updateVolunteerStatus('available');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-xs font-sans">
      {/* 1. Volunteer Header & Availability Switcher */}
      <div className="bg-[#030712] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl cyber-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-white">{currentUser.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
                  {currentUser.volunteerCategory || 'Crowd Management'}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono">
                Sector: <span className="text-white font-semibold">{currentEvent.zones[0]?.name.split('—')[0]}</span> | Node Trust: {currentUser.trustScore}%
              </p>
            </div>
          </div>

          {/* Availability Radio Buttons */}
          <div className="flex items-center gap-1.5 bg-black/80 p-1.5 rounded-xl border border-slate-800 w-full sm:w-auto justify-between font-mono">
            {[
              { status: 'available' as VolunteerStatus, label: 'AVAILABLE', color: 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
              { status: 'busy' as VolunteerStatus, label: 'ON MISSION', color: 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
              { status: 'offline' as VolunteerStatus, label: 'STANDBY', color: 'bg-slate-800 text-slate-300' }
            ].map((s) => (
              <button
                key={s.status}
                onClick={() => updateVolunteerStatus(s.status)}
                className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                  currentUser.volunteerStatus === s.status
                    ? `${s.color}`
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Volunteer Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-2 font-mono">
        <button
          onClick={() => setActiveTab('assigned')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'assigned'
              ? 'bg-amber-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>ASSIGNED MISSIONS ({myAssignedIncidents.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('nearby')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'nearby'
              ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROXIMITY RADAR ({nearbyUnassignedIncidents.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('crowd_flow')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'crowd_flow'
              ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>CROWD MARSHALLING</span>
        </button>
      </div>

      {/* Tab 1: Assigned Tasks */}
      {activeTab === 'assigned' && (
        <div className="space-y-3">
          {myAssignedIncidents.length === 0 ? (
            <div className="bg-[#030712] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2 cyber-card">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-sm font-mono">NO ACTIVE TASKS ASSIGNED</h3>
              <p className="text-xs">
                Your tactical beacon is broadcasting <span className="text-emerald-400 font-bold font-mono">AVAILABLE</span>. Proximity alerts within 600m will stream to this console.
              </p>
            </div>
          ) : (
            myAssignedIncidents.map((inc) => {
              const dist = currentUser.currentLocation
                ? calculateDistanceMeters(currentUser.currentLocation, inc.location)
                : 120;
              const eta = estimateEtaMinutes(dist);

              return (
                <div
                  key={inc.id}
                  className="bg-[#030712] border-2 border-amber-500 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(245,158,11,0.25)] space-y-3 cyber-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-mono font-bold text-[10px] border border-red-500/50">
                          {inc.severity}
                        </span>
                        <span className="text-cyan-400 font-mono">#{inc.id}</span>
                      </div>
                      <h3 className="font-extrabold text-base text-white mt-1">{inc.title}</h3>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/50 font-mono font-bold">
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs bg-black/60 p-3 rounded-xl border border-slate-800">
                    {inc.description}
                  </p>

                  {/* Navigation Radar Bar */}
                  <div className="bg-black/80 p-3 rounded-xl border border-cyan-500/20 flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <div>
                        <span className="text-slate-500 text-[10px] block">TARGET COORDINATES:</span>
                        <span className="font-bold text-white text-xs font-sans">{inc.locationName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400">DISTANCE: {formatDistance(dist)}</span>
                      <p className="font-bold text-emerald-400 text-xs">ESTIMATED ARRIVAL: ~{eta} MIN</p>
                    </div>
                  </div>

                  {/* Progressive Status Action Pipeline */}
                  <div className="flex items-center gap-2 pt-2 font-mono">
                    {inc.status === 'ASSIGNED' && (
                      <button
                        onClick={() => handleUpdateStatus(inc.id, 'RESPONDER_EN_ROUTE')}
                        className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition"
                      >
                        TRANSMIT: EN ROUTE TO TARGET
                      </button>
                    )}
                    {inc.status === 'RESPONDER_EN_ROUTE' && (
                      <button
                        onClick={() => handleUpdateStatus(inc.id, 'RESPONDER_ARRIVED')}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition"
                      >
                        TRANSMIT: ARRIVED ON SCENE
                      </button>
                    )}
                    {inc.status === 'RESPONDER_ARRIVED' && (
                      <button
                        onClick={() => handleUpdateStatus(inc.id, 'IN_PROGRESS')}
                        className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-black rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] transition"
                      >
                        TRANSMIT: MITIGATION IN PROGRESS
                      </button>
                    )}
                    {(inc.status === 'IN_PROGRESS' || inc.status === 'RESPONDER_ARRIVED') && (
                      <button
                        onClick={() => handleUpdateStatus(inc.id, 'RESOLVED')}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition"
                      >
                        TRANSMIT: MISSION RESOLVED & CLEAR
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Nearby Radar */}
      {activeTab === 'nearby' && (
        <div className="space-y-3">
          {nearbyUnassignedIncidents.length === 0 ? (
            <div className="bg-[#030712] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 cyber-card font-mono">
              <Radio className="w-10 h-10 text-cyan-400 mx-auto mb-2 animate-pulse" />
              <p>NO UNASSIGNED DISTRESS SIGNALS IN 600M SECTOR PERIMETER.</p>
            </div>
          ) : (
            nearbyUnassignedIncidents.map((inc) => {
              const dist = currentUser.currentLocation
                ? calculateDistanceMeters(currentUser.currentLocation, inc.location)
                : 250;

              return (
                <div
                  key={inc.id}
                  className="bg-[#030712] border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-4 shadow-xl space-y-2.5 transition cyber-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            inc.severity === 'CRITICAL'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {inc.severity}
                        </span>
                        <span className="text-cyan-400 font-mono">#{inc.id}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white mt-1">{inc.title}</h4>
                    </div>

                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                      {formatDistance(dist)} away
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs">{inc.description}</p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {inc.locationName}
                    </span>

                    <button
                      onClick={() => handleAcceptTask(inc.id)}
                      className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black font-mono font-bold rounded-xl shadow-lg transition flex items-center gap-1.5"
                    >
                      <span>ACCEPT MISSION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 3: Crowd Flow Directives */}
      {activeTab === 'crowd_flow' && (
        <div className="bg-[#030712] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 cyber-card">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Compass className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-sm text-white font-mono">ACTIVE CROWD FLOW MARSHALLING DIRECTIVES</h3>
              <p className="text-[11px] text-slate-400 font-mono">C4ISR Live Tactical Queue Guidance</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentEvent.zones.map((zone) => (
              <div
                key={zone.id}
                className="bg-black/60 border border-slate-800 rounded-xl p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{zone.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      zone.riskLevel === 'CRITICAL'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : zone.riskLevel === 'HIGH_RISK'
                        ? 'bg-orange-950 text-orange-300 border border-orange-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {zone.riskLevel} ({zone.densityPercentage}% DENSITY)
                  </span>
                </div>

                <p className="text-slate-300 text-xs">{zone.aiExplanation}</p>

                {zone.recommendations && (
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 space-y-1 font-mono">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                      TACTICAL MARSHAL PROTOCOL:
                    </span>
                    <ul className="text-[11px] text-slate-300 space-y-0.5 font-sans">
                      {zone.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-cyan-400">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
