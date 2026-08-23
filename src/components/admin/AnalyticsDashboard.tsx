'use client';

import React from 'react';
import { useAppState } from '@/context/AppStateContext';
import { BarChart3, TrendingUp, Clock, CheckCircle2, Users, ShieldAlert, Award } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { incidents, allUsers, currentEvent } = useAppState();

  const totalReports = incidents.length;
  const resolvedCount = incidents.filter((i) => i.status === 'RESOLVED').length;
  const criticalCount = incidents.filter((i) => i.severity === 'CRITICAL').length;
  const activeVolunteers = allUsers.filter((u) => u.role === 'volunteer').length;

  const categoryCounts: Record<string, number> = {};
  incidents.forEach((i) => {
    categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Event Safety Analytics & Performance Intelligence</h3>
            <p className="text-[10px] text-slate-400">Real-time Triage Resolution & Volunteer Velocity</p>
          </div>
        </div>
      </div>

      {/* KPI Top Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-500 text-[10px] block">AVG RESPONSE TIME</span>
          <span className="text-xl font-black text-emerald-400 font-mono">2.4 mins</span>
          <span className="text-[10px] text-emerald-500 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 38% faster than benchmark
          </span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-500 text-[10px] block">RESOLUTION RATE</span>
          <span className="text-xl font-black text-sky-400 font-mono">
            {totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0}%
          </span>
          <span className="text-[10px] text-slate-400">{resolvedCount} of {totalReports} resolved</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-500 text-[10px] block">VOLUNTEER MOBILIZATION</span>
          <span className="text-xl font-black text-amber-400 font-mono">94.2%</span>
          <span className="text-[10px] text-slate-400">{activeVolunteers} active marshals</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-500 text-[10px] block">DUPLICATE CLUSTER SAVING</span>
          <span className="text-xl font-black text-purple-400 font-mono">68%</span>
          <span className="text-[10px] text-slate-400">Merged multi-user reports</span>
        </div>
      </div>

      {/* Incident Category Distribution Bar Chart */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <h4 className="font-bold text-xs text-white uppercase tracking-wider">
          Incident Categories Distribution
        </h4>

        <div className="space-y-2">
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const percentage = totalReports > 0 ? (count / totalReports) * 100 : 0;
            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300 capitalize">
                    {cat.replace(/_/g, ' ')}
                  </span>
                  <span className="font-mono text-slate-400">
                    {count} reports ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                    style={{ width: `${Math.max(5, percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zone Capacity & Response Heat Breakdown */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <h4 className="font-bold text-xs text-white uppercase tracking-wider">
          Sector Crowd Load & Risk Timeline
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentEvent.zones.map((z) => (
            <div key={z.id} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-xs truncate">{z.name.split('—')[0]}</span>
                <span className="font-mono text-[10px] text-sky-400 font-bold">
                  {z.densityPercentage}% Density
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Pop: {z.currentPopulation.toLocaleString()} | Flow: {z.movementSpeed} m/s | Risk: {z.riskScore}/100
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
