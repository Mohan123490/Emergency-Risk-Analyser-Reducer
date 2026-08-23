'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { TacticalMap } from './TacticalMap';
import { IncidentFeed } from './IncidentFeed';
import { CrowdRiskPanel } from './CrowdRiskPanel';
import { MissingPersonsManager } from './MissingPersonsManager';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import {
  Radio,
  Layers,
  Activity,
  AlertOctagon,
  Flame,
  Users,
  Car,
  HeartPulse,
  UserX,
  Clock,
  ShieldAlert,
  Send,
  Sparkles,
  BarChart3,
  Compass,
  Cpu,
  Zap,
  Crosshair
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

export const AdminControlRoom: React.FC = () => {
  const {
    currentEvent,
    incidents,
    ambulances,
    allUsers,
    disasterMode,
    toggleDisasterMode,
    broadcastCustomAlert
  } = useAppState();

  const [activeAdminTab, setActiveAdminTab] = useState<'map' | 'incidents' | 'crowd' | 'missing' | 'analytics'>('map');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);
  const [customAlertTitle, setCustomAlertTitle] = useState<string>('');
  const [customAlertMsg, setCustomAlertMsg] = useState<string>('');
  const [customAlertLevel, setCustomAlertLevel] = useState<'YELLOW' | 'ORANGE' | 'RED'>('ORANGE');

  // KPI Calculations
  const activeIncidents = incidents.filter((i) => i.status !== 'RESOLVED' && i.status !== 'DISMISSED');
  const criticalIncidents = activeIncidents.filter((i) => i.severity === 'CRITICAL');
  const highRiskZones = currentEvent.zones.filter((z) => z.riskLevel === 'CRITICAL' || z.riskLevel === 'HIGH_RISK');
  const activeResponders = allUsers.filter((u) => u.role !== 'citizen');
  const activeAmbulances = ambulances.filter((a) => a.status === 'AVAILABLE' || a.status === 'DISPATCHED');
  const missingCases = incidents.filter((i) => i.missingPersonDetails && i.status !== 'RESOLVED');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAlertTitle || !customAlertMsg) return;

    broadcastCustomAlert({
      title: customAlertTitle,
      message: customAlertMsg,
      level: customAlertLevel,
      severity: customAlertLevel === 'RED' ? 'CRITICAL' : 'HIGH'
    });

    setIsBroadcastModalOpen(false);
    setCustomAlertTitle('');
    setCustomAlertMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 text-xs font-sans">
      {/* 1. Master Control Room KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 font-mono">
        {/* Total Active */}
        <div className="bg-[#030712] border border-cyan-500/30 p-3 rounded-2xl shadow-xl space-y-1 cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-cyan-300">ACTIVE LOGS</span>
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-xl font-black text-white">{activeIncidents.length}</p>
          <span className="text-[10px] text-cyan-400/80">C4ISR Stream</span>
        </div>

        {/* Critical Incidents */}
        <div className="bg-[#030712] border border-red-500/60 p-3 rounded-2xl shadow-xl space-y-1 cyber-card">
          <div className="flex items-center justify-between text-red-400">
            <span className="text-[10px] uppercase font-bold">CODE RED</span>
            <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <p className="text-xl font-black text-red-400">{criticalIncidents.length}</p>
          <span className="text-[10px] text-red-400/80">Immediate triage</span>
        </div>

        {/* High Risk Zones */}
        <div className="bg-[#030712] border border-orange-500/60 p-3 rounded-2xl shadow-xl space-y-1 cyber-card">
          <div className="flex items-center justify-between text-orange-400">
            <span className="text-[10px] uppercase font-bold">RISK ZONES</span>
            <Activity className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-black text-orange-400">{highRiskZones.length}</p>
          <span className="text-[10px] text-orange-400/80">{currentEvent.zones.length} Sectors</span>
        </div>

        {/* Active Responders */}
        <div className="bg-[#030712] border border-amber-500/40 p-3 rounded-2xl shadow-xl space-y-1 cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-amber-300">RESPONDERS</span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-xl font-black text-amber-400">{activeResponders.length}</p>
          <span className="text-[10px] text-slate-500">Marshals/Units</span>
        </div>

        {/* Ambulances */}
        <div className="bg-[#030712] border border-rose-500/40 p-3 rounded-2xl shadow-xl space-y-1 cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-rose-300">MEDEVAC</span>
            <Car className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <p className="text-xl font-black text-rose-400">{activeAmbulances.length}</p>
          <span className="text-[10px] text-slate-500">ALS/BLS Fleet</span>
        </div>

        {/* Missing Persons */}
        <div className="bg-[#030712] border border-cyan-500/30 p-3 rounded-2xl shadow-xl space-y-1 cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-cyan-300">RECON DESK</span>
            <UserX className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-xl font-black text-cyan-300">{missingCases.length}</p>
          <span className="text-[10px] text-slate-500">Fuzzy Match AI</span>
        </div>

        {/* Avg Response Time */}
        <div className="bg-[#030712] border border-emerald-500/40 p-3 rounded-2xl shadow-xl space-y-1 col-span-2 sm:col-span-1 cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-emerald-300">MITIGATION ETA</span>
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">2.4m</p>
          <span className="text-[10px] text-emerald-400">Telemetry benchmark</span>
        </div>
      </div>

      {/* 2. Control Room Navigation Bar & Master Actions */}
      <div className="bg-[#030712] border border-cyan-500/20 rounded-2xl p-2.5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-2.5 font-mono cyber-card">
        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveAdminTab('map')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              activeAdminTab === 'map'
                ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>TACTICAL GIS RADAR</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('incidents')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              activeAdminTab === 'incidents'
                ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>INCIDENT QUEUE ({activeIncidents.length})</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('crowd')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              activeAdminTab === 'crowd'
                ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>CROWD INTELLIGENCE AI</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('missing')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              activeAdminTab === 'missing'
                ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>MISSING RECON</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              activeAdminTab === 'analytics'
                ? 'bg-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>TELEMETRY MATRIX</span>
          </button>
        </div>

        {/* Global Overrides */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Send className="w-3.5 h-3.5" />
            <span>BROADCAST DIRECTIVE</span>
          </button>

          <button
            onClick={toggleDisasterMode}
            className={`px-3.5 py-1.5 rounded-xl font-black transition flex items-center gap-1.5 shadow uppercase tracking-wider ${
              disasterMode
                ? 'bg-red-600 text-white animate-pulse shadow-[0_0_25px_rgba(239,68,68,0.7)]'
                : 'bg-red-950/70 hover:bg-red-900/90 text-red-300 border border-red-600'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{disasterMode ? 'DISASTER MODE ACTIVE' : 'DISASTER OVERRIDE'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Display View */}
      <div>
        {activeAdminTab === 'map' && <TacticalMap />}
        {activeAdminTab === 'incidents' && <IncidentFeed />}
        {activeAdminTab === 'crowd' && <CrowdRiskPanel />}
        {activeAdminTab === 'missing' && <MissingPersonsManager />}
        {activeAdminTab === 'analytics' && <AnalyticsDashboard />}
      </div>

      {/* Broadcast Custom Alert Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono">
          <div className="bg-[#030712] border border-indigo-500/40 rounded-2xl w-full max-w-md p-5 shadow-[0_0_40px_rgba(99,102,241,0.3)] space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-indigo-400" />
                <h4 className="font-bold text-sm text-white uppercase tracking-wider">BROADCAST TACTICAL DIRECTIVE</h4>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1 text-[11px]">DIRECTIVE HEADER</label>
                <input
                  type="text"
                  value={customAlertTitle}
                  onChange={(e) => setCustomAlertTitle(e.target.value)}
                  placeholder="e.g. CONGESTION ADVISORY // GATE 3"
                  className="w-full bg-black border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 text-[11px]">ALERT CLASSIFICATION</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { lvl: 'YELLOW' as const, label: '01. Caution' },
                    { lvl: 'ORANGE' as const, label: '02. High Risk' },
                    { lvl: 'RED' as const, label: '03. Code-Red' }
                  ].map((l) => (
                    <button
                      key={l.lvl}
                      type="button"
                      onClick={() => setCustomAlertLevel(l.lvl)}
                      className={`py-1.5 rounded-lg border font-bold text-center transition ${
                        customAlertLevel === l.lvl
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-200 shadow'
                          : 'bg-black border-slate-800 text-slate-400'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 text-[11px]">ACTIONABLE INSTRUCTIONS</label>
                <textarea
                  rows={3}
                  value={customAlertMsg}
                  onChange={(e) => setCustomAlertMsg(e.target.value)}
                  placeholder="Provide explicit directions on what citizens should execute and avoid..."
                  className="w-full bg-black border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-indigo-400"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-lg transition uppercase tracking-wider"
                >
                  TRANSMIT TO GEO-FENCE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
