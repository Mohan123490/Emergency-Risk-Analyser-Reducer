'use client';

import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { KERALA_EVENTS } from '@/data/keralaEvents';
import { UserRole } from '@/types';
import { SupportedLanguage } from '@/lib/translations';
import {
  Shield,
  AlertTriangle,
  Radio,
  Volume2,
  VolumeX,
  Flame,
  Clock,
  User,
  HeartPulse,
  Award,
  ChevronDown,
  Cpu,
  Wifi,
  Lock,
  Terminal,
  Activity,
  Globe
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenAuditLogs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, onOpenAuditLogs }) => {
  const {
    currentEvent,
    currentUser,
    switchRole,
    switchEvent,
    disasterMode,
    toggleDisasterMode,
    incidents,
    currentLanguage,
    setLanguage,
    t
  } = useAppState();

  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' IST'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = soundFX.toggleMute();
    setIsMuted(next);
  };

  const criticalCount = incidents.filter(
    (i) => i.severity === 'CRITICAL' && i.status !== 'RESOLVED' && i.status !== 'DISMISSED'
  ).length;

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ml', label: 'മലയാളം', flag: '🌴' },
    { code: 'ta', label: 'தமிழ்', flag: '🛕' }
  ];

  const roles: { role: UserRole; label: string; icon: React.ReactNode; activeStyle: string }[] = [
    { role: 'citizen', label: t.roles.citizen, icon: <User className="w-3.5 h-3.5" />, activeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' },
    { role: 'volunteer', label: t.roles.volunteer, icon: <Award className="w-3.5 h-3.5" />, activeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
    { role: 'medical', label: t.roles.medical, icon: <HeartPulse className="w-3.5 h-3.5" />, activeStyle: 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
    { role: 'police', label: t.roles.police, icon: <Shield className="w-3.5 h-3.5" />, activeStyle: 'bg-indigo-500/20 text-indigo-300 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
    { role: 'admin', label: t.roles.admin, icon: <Radio className="w-3.5 h-3.5" />, activeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/20 text-slate-100 shadow-2xl">
      {/* Top Cyber Telemetry Line */}
      <div className="bg-black/90 border-b border-cyan-950/60 px-3 sm:px-6 py-0.5 flex items-center justify-between text-[10px] font-mono text-slate-400 tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            SURAKSHA TACTICAL GRID: ONLINE
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline flex items-center gap-1 text-cyan-400">
            <Cpu className="w-3 h-3" /> MULTILINGUAL AI: {currentLanguage.toUpperCase()}
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline flex items-center gap-1 text-slate-400">
            <Wifi className="w-3 h-3 text-emerald-400" /> LATENCY: 9ms
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            DEFCON 2
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-white font-bold">{timeStr}</span>
        </div>
      </div>

      {/* Disaster Override Ticker */}
      {disasterMode && (
        <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-white px-4 py-1.5 flex items-center justify-between text-xs font-mono font-black tracking-widest animate-pulse border-b border-red-500">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 animate-bounce" />
            <span>⚠️ TACTICAL ALERT: GLOBAL DISASTER PROTOCOL ACTIVE</span>
          </div>
          <button
            onClick={toggleDisasterMode}
            className="bg-black/50 hover:bg-black/80 text-white px-2.5 py-0.5 rounded border border-white/30 text-xs transition uppercase font-mono"
          >
            Deactivate
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Cyber Brand Title & Sector Selector */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-black border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Shield className="w-5 h-5 text-cyan-400" />
              {criticalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border border-black animate-ping"></span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-base tracking-widest bg-gradient-to-r from-cyan-400 via-teal-200 to-sky-400 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-mono font-bold uppercase tracking-wider">
                  KERALA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans tracking-tight leading-none mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Event / Sector Dropdown */}
          <div className="relative group">
            <select
              value={currentEvent.id}
              onChange={(e) => switchEvent(e.target.value)}
              className="appearance-none bg-slate-950 hover:bg-slate-900 text-cyan-200 text-xs font-sans font-bold py-1.5 pl-3 pr-7 rounded-xl border border-cyan-500/30 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
            >
              {KERALA_EVENTS.map((evt) => (
                <option key={evt.id} value={evt.id} className="bg-slate-950 text-white">
                  ⬢ {evt.name.length > 28 ? evt.name.slice(0, 26) + '...' : evt.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Tactical Role Switcher */}
        <div className="flex items-center gap-1 bg-black/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full font-sans">
          {roles.map((r) => {
            const isActive = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => switchRole(r.role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all whitespace-nowrap ${
                  isActive
                    ? `${r.activeStyle} scale-[1.02]`
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Language Switcher & Controls */}
        <div className="flex items-center gap-2">
          {/* Prominent Multilingual Toggle: English / Malayalam / Tamil */}
          <div className="flex items-center bg-black p-1 rounded-xl border border-cyan-500/40 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-cyan-400 mx-1.5 hidden sm:inline" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition font-sans ${
                  currentLanguage === lang.code
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute' : 'Mute'}
            className={`p-2 rounded-xl border transition ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/60 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenAuditLogs}
            title="System Logs"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 text-slate-300 rounded-xl text-xs font-mono border border-slate-800 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] hidden sm:inline">LOGS</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-950 hover:bg-slate-900 border border-cyan-500/30 rounded-xl text-xs font-mono transition"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-[11px] text-black">
              {currentUser.name.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="font-bold text-white text-xs leading-tight">
                {currentUser.name.length > 13 ? currentUser.name.slice(0, 11) + '..' : currentUser.name}
              </p>
              <p className="text-[9px] text-emerald-400 leading-none font-mono">
                {currentUser.trustScore}%
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
