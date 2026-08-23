'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { AmbulanceUnit, IncidentStatus } from '@/types';
import {
  HeartPulse,
  Car,
  Activity,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  Send,
  PhoneCall,
  User,
  AlertOctagon,
  Sparkles,
  Hospital,
  Zap
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { calculateDistanceMeters, formatDistance } from '@/lib/geoUtils';

export const MedicalResponderView: React.FC = () => {
  const {
    incidents,
    ambulances,
    currentUser,
    currentEvent,
    dispatchAmbulance,
    updateIncidentStatus
  } = useAppState();

  const medicalIncidents = incidents.filter(
    (i) =>
      (i.category === 'medical_emergency' || i.category === 'ambulance_required' || i.medicalDetails) &&
      i.status !== 'RESOLVED' &&
      i.status !== 'DISMISSED'
  );

  return (
    <div className="max-w-5xl mx-auto space-y-4 text-xs font-sans">
      {/* Header & Triage Statistics */}
      <div className="bg-gradient-to-r from-rose-950/80 via-[#030712] to-[#030712] border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl cyber-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-white">EMERGENCY MEDEVAC COMMAND CONSOLE</h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                  TRIAGE LEVEL 1
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono">
                Doctor / Trauma Lead: <span className="text-white font-semibold">{currentUser.name}</span> | Sector: {currentEvent.medicalStations[0]?.name}
              </p>
            </div>
          </div>

          {/* KPI Counters */}
          <div className="flex items-center gap-2 font-mono">
            <div className="bg-black/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-20">
              <span className="text-[10px] text-slate-500 block">TRIAGE QUEUE</span>
              <span className="text-lg font-black text-rose-400">{medicalIncidents.length}</span>
            </div>
            <div className="bg-black/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-20">
              <span className="text-[10px] text-slate-500 block">ALS READY</span>
              <span className="text-lg font-black text-emerald-400">
                {ambulances.filter((a) => a.status === 'AVAILABLE').length}/{ambulances.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambulance Fleet Status Bar */}
      <div className="bg-[#030712] border border-cyan-500/20 rounded-2xl p-4 shadow-xl space-y-3 cyber-card">
        <div className="flex items-center justify-between font-mono">
          <span className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
            <Car className="w-4 h-4 text-cyan-400" />
            ACTIVE AMBULANCE & MEDEVAC FLEET TELEMETRY
          </span>
          <span className="text-[10px] text-cyan-400 font-mono">GPS TELEMETRY STREAM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {ambulances.map((amb) => (
            <div
              key={amb.id}
              className={`p-3 rounded-xl border transition ${
                amb.status === 'DISPATCHED'
                  ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-black/60 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-xs text-white block font-mono">{amb.plateNumber}</span>
                  <span className="text-[10px] text-slate-400">{amb.equipmentLevel}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    amb.status === 'AVAILABLE'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-500 animate-pulse'
                  }`}
                >
                  {amb.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 mt-1 border-t border-slate-900 font-mono">
                <span>Driver: {amb.driverName}</span>
                <span className="text-cyan-400">ETA: {amb.etaMinutes} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Medical Emergencies Triage Queue */}
      <div className="space-y-3">
        <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-rose-400" />
          <span>ACTIVE CASUALTY TRIAGE & EVACUATION QUEUE</span>
        </h3>

        {medicalIncidents.length === 0 ? (
          <div className="bg-[#030712] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 cyber-card font-mono">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <p className="font-bold text-white">ALL CASUALTY REPORTS STABILIZED & CLEARED</p>
            <p className="text-xs text-slate-500 mt-0.5">Continuous medical monitoring active.</p>
          </div>
        ) : (
          medicalIncidents.map((inc) => {
            const dist = currentUser.currentLocation
              ? calculateDistanceMeters(currentUser.currentLocation, inc.location)
              : 280;

            return (
              <div
                key={inc.id}
                className="bg-[#030712] border-2 border-rose-600 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(244,63,94,0.25)] space-y-3 cyber-card"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold text-[10px] border border-red-500/50">
                        {inc.severity}
                      </span>
                      <span className="text-cyan-400">#{inc.id}</span>
                      <span className="text-rose-400 font-bold text-xs">{inc.locationName}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-white mt-1">{inc.title}</h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/50 font-mono font-bold">
                    {inc.status}
                  </span>
                </div>

                <p className="text-slate-200 text-xs bg-black/60 p-3 rounded-xl border border-slate-800">
                  {inc.description}
                </p>

                {/* Patient Triage Vitals Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/80 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">REPORTER NODE</span>
                    <span className="font-semibold text-white">{inc.reporterName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">AFFECTED COUNT</span>
                    <span className="font-semibold text-white">{inc.affectedPeopleCount} Person</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">RADAR PROXIMITY</span>
                    <span className="font-semibold text-cyan-400">{formatDistance(dist)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">MEDEVAC UNIT</span>
                    <span className="font-semibold text-emerald-400">
                      {inc.ambulanceAssigned ? inc.ambulanceAssigned.plateNumber.split(' ')[0] : 'PENDING DISPATCH'}
                    </span>
                  </div>
                </div>

                {/* Dispatch & Resolution Controls */}
                <div className="flex flex-wrap items-center gap-2 pt-2 font-mono">
                  {!inc.ambulanceAssigned ? (
                    <button
                      onClick={() => dispatchAmbulance(inc.id)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 transition uppercase tracking-wider"
                    >
                      <Car className="w-4 h-4" />
                      <span>DISPATCH NEAREST ALS MEDEVAC UNIT</span>
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateIncidentStatus(inc.id, 'RESPONDER_ARRIVED', 'Medevac paramedic arrived at casualty position.')
                        }
                        className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-xl transition"
                      >
                        PARAMEDICS ON SCENE
                      </button>
                      <button
                        onClick={() =>
                          updateIncidentStatus(inc.id, 'IN_PROGRESS', 'Patient stabilized on stretcher with oxygen.')
                        }
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition"
                      >
                        TREATMENT IN PROGRESS
                      </button>
                      <button
                        onClick={() =>
                          updateIncidentStatus(
                            inc.id,
                            'RESOLVED',
                            'Patient transferred to District Hospital. Vitals stable.'
                          )
                        }
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl transition"
                      >
                        HOSPITAL HANDOVER COMPLETE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
