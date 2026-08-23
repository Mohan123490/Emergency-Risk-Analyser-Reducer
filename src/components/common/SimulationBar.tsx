'use client';

import React from 'react';
import { useAppState } from '@/context/AppStateContext';
import { Play, RotateCcw, Zap, Terminal, Activity, ShieldAlert } from 'lucide-react';

export const SimulationBar: React.FC = () => {
  const { triggerSimulationScenario, resetSimulation, activeScenarioName } = useAppState();

  const scenarios = [
    {
      id: 1,
      code: 'SURGE-CRUSH',
      title: '1. Gate-3 Surge Crush',
      subtitle: 'Density 97%, Velocity 0.08 m/s, Exit B Blocked, Red Siren Alert',
      color: 'hover:border-red-500 hover:bg-red-950/40 text-red-400 border-red-900/50'
    },
    {
      id: 2,
      code: 'RECON-MATCH',
      title: '2. Missing Person Recon',
      subtitle: 'Fuzzy AI Visual Matching & 94% Biometric/Clothing Match',
      color: 'hover:border-amber-500 hover:bg-amber-950/40 text-amber-400 border-amber-900/50'
    },
    {
      id: 3,
      code: 'MEDEVAC-ALS',
      title: '3. Medevac ALS Dispatch',
      subtitle: 'Heatstroke Collapse + Priority Ambulance KL-08 Dispatch',
      color: 'hover:border-rose-500 hover:bg-rose-950/40 text-rose-400 border-rose-900/50'
    },
    {
      id: 4,
      code: 'INTERCEPT',
      title: '4. Security Intercept',
      subtitle: 'Snatching Cluster -> Police Patrol Rapid Cordon',
      color: 'hover:border-indigo-500 hover:bg-indigo-950/40 text-indigo-400 border-indigo-900/50'
    },
    {
      id: 5,
      code: 'DISASTER-RED',
      title: '5. Global Disaster Mode',
      subtitle: 'Multi-Sector Emergency Evacuation Directive',
      color: 'hover:border-red-600 hover:bg-red-900/60 text-red-300 border-red-700/60'
    }
  ];

  return (
    <div className="bg-[#030712] border-b border-cyan-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current animate-pulse" />
              TACTICAL SCENARIO INJECTION
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">
              Live mission crisis triggers:
            </span>
          </div>

          {/* Scenario Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => triggerSimulationScenario(sc.id)}
                title={sc.subtitle}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 border transition shadow-sm ${sc.color}`}
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>{sc.title}</span>
              </button>
            ))}

            {/* Reset Drill Button */}
            <button
              onClick={resetSimulation}
              title="Flush current drill and restore baseline telemetry"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-500 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>FLUSH</span>
            </button>
          </div>
        </div>

        {/* Active Scenario Indicator */}
        {activeScenarioName && (
          <div className="mt-1.5 py-1 px-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl flex items-center justify-between text-xs font-mono text-cyan-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-bold uppercase tracking-wider text-cyan-400">ACTIVE DRILL:</span>
              <span className="text-white">{activeScenarioName}</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono hidden sm:inline">
              TELEMETRY LOGGED TO C4ISR MATRIX
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
