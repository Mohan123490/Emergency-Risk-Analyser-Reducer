'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { Incident, IncidentSeverity, IncidentStatus, UserRole } from '@/types';
import {
  AlertTriangle,
  Flame,
  HeartPulse,
  UserX,
  Users,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Copy,
  Layers,
  ChevronDown,
  Sparkles,
  Search,
  Filter,
  UserCheck
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { calculateDistanceMeters, formatDistance } from '@/lib/geoUtils';
import { findPotentialDuplicates } from '@/lib/matchingEngine';

export const IncidentFeed: React.FC = () => {
  const {
    incidents,
    allUsers,
    updateIncidentStatus,
    assignResponder,
    mergeIncidents,
    dismissIncident
  } = useAppState();

  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);

  // Filter and Priority sort: CRITICAL -> HIGH -> MEDIUM -> LOW
  const filteredIncidents = incidents
    .filter((inc) => {
      if (filterCategory !== 'ALL' && inc.category !== filterCategory) return false;
      if (filterSeverity !== 'ALL' && inc.severity !== filterSeverity) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = inc.title.toLowerCase().includes(q);
        const matchLoc = inc.locationName.toLowerCase().includes(q);
        const matchDesc = inc.description.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchDesc) return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Prioritize active over resolved
      const aActive = a.status !== 'RESOLVED' && a.status !== 'DISMISSED';
      const bActive = b.status !== 'RESOLVED' && b.status !== 'DISMISSED';
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;

      // Severity weight
      const weight = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      const diff = weight[b.severity] - weight[a.severity];
      if (diff !== 0) return diff;

      // Newest first
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const handleOpenAssign = (inc: Incident) => {
    setSelectedIncident(inc);
    setIsAssignModalOpen(true);
  };

  const handleAssign = (responderId: string) => {
    if (!selectedIncident) return;
    assignResponder(selectedIncident.id, responderId);
    setIsAssignModalOpen(false);
  };

  const handleMergeDuplicates = (primaryInc: Incident, duplicateIds: string[]) => {
    mergeIncidents(primaryInc.id, duplicateIds);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3.5 text-xs">
      {/* Header & Live Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-800">
        <div>
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Priority Incident Stream & Triage</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">
              {filteredIncidents.length} Records
            </span>
          </h3>
          <p className="text-[10px] text-slate-400">Automated Multi-Incident Priority Sorting</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sector or keyword..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-1.5 text-white text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
        <button
          onClick={() => {
            setFilterCategory('ALL');
            setFilterSeverity('ALL');
          }}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
            filterCategory === 'ALL' && filterSeverity === 'ALL'
              ? 'bg-sky-600 text-white font-bold'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterSeverity(filterSeverity === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
            filterSeverity === 'CRITICAL'
              ? 'bg-red-600 text-white font-bold'
              : 'bg-red-950/40 text-red-300 border border-red-900/60'
          }`}
        >
          🚨 Critical Only
        </button>
        <button
          onClick={() => setFilterCategory(filterCategory === 'medical_emergency' ? 'ALL' : 'medical_emergency')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
            filterCategory === 'medical_emergency'
              ? 'bg-rose-600 text-white font-bold'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          🩺 Medical
        </button>
        <button
          onClick={() => setFilterCategory(filterCategory === 'dangerous_crowd' ? 'ALL' : 'dangerous_crowd')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
            filterCategory === 'dangerous_crowd'
              ? 'bg-orange-600 text-white font-bold'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          👥 Crowd Crush
        </button>
        <button
          onClick={() => setFilterCategory(filterCategory === 'missing_child' ? 'ALL' : 'missing_child')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
            filterCategory === 'missing_child'
              ? 'bg-amber-600 text-white font-bold'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          👶 Missing Children
        </button>
      </div>

      {/* Incident List */}
      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No incidents match the selected filter criteria.</p>
          </div>
        ) : (
          filteredIncidents.map((inc) => {
            const isCritical = inc.severity === 'CRITICAL';
            const isHigh = inc.severity === 'HIGH';
            const isResolved = inc.status === 'RESOLVED';
            const isMerged = inc.status === 'MERGED';

            // Check potential duplicates
            const nearbyDuplicates = findPotentialDuplicates(inc, incidents);

            return (
              <div
                key={inc.id}
                className={`bg-slate-950 border rounded-2xl p-3.5 sm:p-4 space-y-2.5 transition ${
                  isResolved
                    ? 'border-slate-800 opacity-60'
                    : isCritical
                    ? 'border-red-600/90 bg-red-950/20 shadow-md ring-1 ring-red-500/30'
                    : isHigh
                    ? 'border-orange-600/80 bg-orange-950/10'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isCritical
                          ? 'bg-red-600 text-white animate-pulse'
                          : isHigh
                          ? 'bg-orange-600 text-white'
                          : inc.severity === 'MEDIUM'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {inc.severity}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">#{inc.id}</span>
                    <span className="font-bold text-white text-xs sm:text-sm">{inc.title}</span>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isResolved
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : isMerged
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : 'bg-sky-950 text-sky-300 border border-sky-800'
                    }`}
                  >
                    {inc.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-200 text-xs leading-relaxed">{inc.description}</p>

                {/* Meta details bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {inc.locationName}
                    </span>
                    <span>Affected: <strong className="text-white">{inc.affectedPeopleCount}</strong></span>
                    <span>Reporter: <strong className="text-white">{inc.reporterName}</strong> (Trust {inc.reporterTrustScore}%)</span>
                  </div>

                  <span className="font-mono flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    {new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Duplicate Report Alert Box (Requirement #25) */}
                {nearbyDuplicates.length > 0 && !isMerged && !isResolved && (
                  <div className="bg-purple-950/40 border border-purple-800/80 p-2.5 rounded-xl flex items-center justify-between text-purple-200">
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4 text-purple-400" />
                      <div>
                        <span className="font-bold text-xs block">
                          Potential Duplicate Cluster ({nearbyDuplicates.length} nearby reports within 150m)
                        </span>
                        <span className="text-[10px] text-purple-300">
                          {nearbyDuplicates.map((d) => `#${d.id} (${d.reporterName})`).join(', ')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleMergeDuplicates(inc, nearbyDuplicates.map((d) => d.id))}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow text-[10px] transition whitespace-nowrap"
                    >
                      Merge Reports
                    </button>
                  </div>
                )}

                {/* Assigned Responder info */}
                {inc.assignedResponderName && (
                  <div className="flex items-center justify-between bg-sky-950/40 border border-sky-900/60 px-3 py-1.5 rounded-xl text-sky-300 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                      <span>Assigned to: <strong className="text-white">{inc.assignedResponderName}</strong></span>
                    </span>
                    <span className="font-mono text-[10px] text-sky-400">
                      {inc.assignedResponderRole?.toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Action Pipeline Controls */}
                {!isResolved && !isMerged && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {!inc.assignedResponderName && (
                      <button
                        onClick={() => handleOpenAssign(inc)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow transition text-[11px]"
                      >
                        Assign Responder
                      </button>
                    )}

                    {inc.status === 'REPORTED' && (
                      <button
                        onClick={() => updateIncidentStatus(inc.id, 'VERIFIED', 'Verified by DDMA Operations officer.')}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow transition text-[11px]"
                      >
                        Verify Report
                      </button>
                    )}

                    {inc.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateIncidentStatus(inc.id, 'RESOLVED', 'Control room verified situation cleared.')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition text-[11px]"
                      >
                        Resolve Incident
                      </button>
                    )}

                    <button
                      onClick={() => dismissIncident(inc.id, 'Investigated and flagged as non-emergency or false alarm.')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700 transition text-[11px]"
                    >
                      Dismiss / False Alarm
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Assign Responder Modal */}
      {isAssignModalOpen && selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-sm text-white">Assign Responder to #{selectedIncident.id}</h4>
                <p className="text-[10px] text-slate-400">{selectedIncident.title}</p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Nearby Available Responders:
              </span>
              {allUsers
                .filter((u) => u.role !== 'citizen')
                .map((resp) => {
                  const dist = resp.currentLocation
                    ? calculateDistanceMeters(selectedIncident.location, resp.currentLocation)
                    : 200;

                  return (
                    <button
                      key={resp.id}
                      onClick={() => handleAssign(resp.id)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 hover:bg-sky-950/40 text-left transition"
                    >
                      <div>
                        <span className="font-bold text-white text-xs block">{resp.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Role: {resp.role.toUpperCase()} | Trust: {resp.trustScore}%
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                        {formatDistance(dist)}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
