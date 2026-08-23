'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { IncidentReportModal } from './IncidentReportModal';
import { MissingPersonSection } from './MissingPersonSection';
import { CommunityHelpCard } from './CommunityHelpCard';
import { CitizenSafetyMap } from './CitizenSafetyMap';
import { IncidentCategory } from '@/types';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Flame,
  HeartPulse,
  Users,
  Compass,
  PhoneCall,
  UserX,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  CheckCircle2,
  Bell,
  Radio,
  Zap,
  Activity,
  Volume2,
  VolumeX
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { voiceAssistant } from '@/lib/speechVoice';

export const CitizenHome: React.FC = () => {
  const { currentEvent, currentUser, incidents, reportIncident, disasterMode, currentLanguage, t } = useAppState();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<IncidentCategory | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'overview' | 'missing' | 'my_reports'>('overview');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Derive Overall Sector Event Safety Status
  const criticalCount = incidents.filter(
    (i) => i.severity === 'CRITICAL' && i.status !== 'RESOLVED' && i.status !== 'DISMISSED'
  ).length;
  const highRiskZones = currentEvent.zones.filter((z) => z.riskLevel === 'CRITICAL' || z.riskLevel === 'HIGH_RISK');

  let overallStatus: 'SAFE' | 'CAUTION' | 'HIGH RISK' | 'CRITICAL' = 'SAFE';
  if (disasterMode || criticalCount >= 2 || currentEvent.zones.some((z) => z.riskLevel === 'CRITICAL')) {
    overallStatus = 'CRITICAL';
  } else if (criticalCount === 1 || highRiskZones.length > 0) {
    overallStatus = 'HIGH RISK';
  } else if (incidents.some((i) => i.status !== 'RESOLVED')) {
    overallStatus = 'CAUTION';
  }

  const statusConfig = {
    SAFE: {
      color: 'from-emerald-950/80 via-[#030712] to-[#030712]',
      borderColor: 'border-emerald-500/50',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      title: t.safetyStatus.safe,
      subtitle: t.safetyStatus.safeDesc,
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />
    },
    CAUTION: {
      color: 'from-amber-950/80 via-[#030712] to-[#030712]',
      borderColor: 'border-amber-500/50',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      title: t.safetyStatus.caution,
      subtitle: t.safetyStatus.cautionDesc,
      icon: <AlertTriangle className="w-8 h-8 text-amber-400 animate-pulse" />
    },
    'HIGH RISK': {
      color: 'from-orange-950/80 via-[#030712] to-[#030712]',
      borderColor: 'border-orange-500/60',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.4)]',
      title: t.safetyStatus.highRisk,
      subtitle: t.safetyStatus.highRiskDesc,
      icon: <AlertTriangle className="w-8 h-8 text-orange-400 animate-pulse" />
    },
    CRITICAL: {
      color: 'from-red-950 via-rose-950/90 to-[#030712]',
      borderColor: 'border-red-500',
      badgeBg: 'bg-red-600 text-white font-black shadow-[0_0_30px_rgba(239,68,68,0.7)]',
      title: t.safetyStatus.critical,
      subtitle: t.safetyStatus.criticalDesc,
      icon: <AlertOctagon className="w-8 h-8 text-red-400 animate-bounce" />
    }
  }[overallStatus];

  const handleOpenReport = (cat?: IncidentCategory) => {
    setPreselectedCategory(cat);
    setIsReportModalOpen(true);
    soundFX.playAlertChime();
  };

  const handleVoiceReadout = () => {
    if (isPlayingVoice) {
      voiceAssistant.stop();
      setIsPlayingVoice(false);
    } else {
      const speechText = `${statusConfig.title}. ${statusConfig.subtitle}. ${currentEvent.name}. ${t.sos.subtitle}`;
      voiceAssistant.speak(speechText, currentLanguage);
      setIsPlayingVoice(true);
      setTimeout(() => setIsPlayingVoice(false), 8000);
    }
  };

  const handleQuickSOS = (type: 'medical' | 'stampede' | 'police') => {
    if (type === 'medical') {
      reportIncident({
        category: 'medical_emergency',
        title: `${t.categories.medical_emergency} SOS`,
        description: 'Urgent medical assistance requested at current location.',
        severity: 'CRITICAL',
        affectedPeopleCount: 1,
        locationName: currentEvent.zones[0]?.name || 'Live GPS Location',
        location: currentUser.currentLocation || currentEvent.center
      });
    } else if (type === 'stampede') {
      reportIncident({
        category: 'dangerous_crowd',
        title: `${t.categories.dangerous_crowd} SOS`,
        description: 'Crowd crush / dangerous surge reported by citizen.',
        severity: 'CRITICAL',
        affectedPeopleCount: 20,
        locationName: currentEvent.zones[1]?.name || 'Live GPS Location',
        location: currentUser.currentLocation || currentEvent.center
      });
    } else {
      reportIncident({
        category: 'suspicious_activity',
        title: `${t.categories.theft} SOS`,
        description: 'Security assistance requested by citizen.',
        severity: 'HIGH',
        affectedPeopleCount: 1,
        locationName: currentEvent.zones[2]?.name || 'Live GPS Location',
        location: currentUser.currentLocation || currentEvent.center
      });
    }
  };

  const myReports = incidents.filter((i) => i.reporterId === currentUser.id);
  const communityIncidents = incidents.filter(
    (i) => i.communityHelpRequested && i.status !== 'RESOLVED' && i.status !== 'DISMISSED'
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4 font-sans">
      {/* 1. Main Highly-Accessible Safety Status Banner */}
      <div
        className={`bg-gradient-to-r ${statusConfig.color} border-2 ${statusConfig.borderColor} rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 cyber-card ${
          overallStatus === 'CRITICAL' ? 'siren-glow' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-black/70 border border-white/15 flex items-center justify-center shadow-lg shrink-0">
              {statusConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-black border ${statusConfig.badgeBg}`}>
                  {statusConfig.title}
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">
                  📍 {currentEvent.city}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-bold mt-1.5 leading-snug">
                {statusConfig.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {/* Voice Read Aloud Button for non-educated/illiterate users */}
            <button
              onClick={handleVoiceReadout}
              title={t.sos.readAloud}
              className={`px-4 py-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                isPlayingVoice
                  ? 'bg-cyan-500 text-black border-cyan-400 animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  : 'bg-black/60 hover:bg-black/90 text-cyan-300 border-cyan-500/40 shadow'
              }`}
            >
              {isPlayingVoice ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span>{isPlayingVoice ? 'Speaking...' : `🔊 ${t.sos.readAloud}`}</span>
            </button>

            {/* Big Primary Report Button */}
            <button
              onClick={() => handleOpenReport()}
              className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm rounded-2xl shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2 transition transform active:scale-95 uppercase tracking-wider"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>{t.sos.reportBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 1-Tap Emergency SOS Bar with Big Visual Icons (For Easy Public Accessibility) */}
      <div className="bg-[#030712] border-2 border-cyan-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl text-xs cyber-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-wide flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 fill-current" />
              {t.sos.title}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.sos.subtitle}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
            GPS READY 📍
          </span>
        </div>

        {/* Big 3 Emergency Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Medical */}
          <button
            onClick={() => handleQuickSOS('medical')}
            className="flex items-center sm:flex-col items-center justify-start sm:justify-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-rose-950/80 via-black to-black border-2 border-rose-600/80 hover:border-rose-400 text-white transition hover:bg-rose-900/40 shadow-lg text-left sm:text-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-500 flex items-center justify-center text-rose-400 shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-rose-200 block">{t.sos.medical}</span>
              <span className="text-xs text-rose-300/80">{t.sos.medicalSub}</span>
            </div>
          </button>

          {/* Crowd Crush */}
          <button
            onClick={() => handleQuickSOS('stampede')}
            className="flex items-center sm:flex-col items-center justify-start sm:justify-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-orange-950/80 via-black to-black border-2 border-orange-600/80 hover:border-orange-400 text-white transition hover:bg-orange-900/40 shadow-lg text-left sm:text-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-600/30 border border-orange-500 flex items-center justify-center text-orange-400 shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-orange-200 block">{t.sos.crowd}</span>
              <span className="text-xs text-orange-300/80">{t.sos.crowdSub}</span>
            </div>
          </button>

          {/* Police / Security */}
          <button
            onClick={() => handleQuickSOS('police')}
            className="flex items-center sm:flex-col items-center justify-start sm:justify-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-black to-black border-2 border-indigo-600/80 hover:border-indigo-400 text-white transition hover:bg-indigo-900/40 shadow-lg text-left sm:text-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500 flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <PhoneCall className="w-7 h-7" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-indigo-200 block">{t.sos.police}</span>
              <span className="text-xs text-indigo-300/80">{t.sos.policeSub}</span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition ${
            activeTab === 'overview'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          🗺️ {t.map.title}
        </button>
        <button
          onClick={() => setActiveTab('missing')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition ${
            activeTab === 'missing'
              ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>👶 {t.missingPerson.title} ({incidents.filter((i) => i.missingPersonDetails).length})</span>
        </button>
        <button
          onClick={() => setActiveTab('my_reports')}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition ${
            activeTab === 'my_reports'
              ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          📋 {t.missingPerson.activeTab} ({myReports.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Citizen Tactical Safety Map */}
          <CitizenSafetyMap />

          {/* Quick Problem Categories Grid */}
          <div className="bg-[#030712] border border-cyan-500/20 rounded-3xl p-4 sm:p-5 shadow-xl text-xs space-y-3 cyber-card">
            <h4 className="font-bold text-cyan-300 text-xs sm:text-sm uppercase tracking-wider">
              {t.reportModal.step1}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { cat: 'medical_emergency' as IncidentCategory, label: t.categories.medical_emergency, icon: <HeartPulse className="w-5 h-5 text-rose-400" /> },
                { cat: 'missing_child' as IncidentCategory, label: t.categories.missing_child, icon: <UserX className="w-5 h-5 text-amber-400" /> },
                { cat: 'dangerous_crowd' as IncidentCategory, label: t.categories.dangerous_crowd, icon: <Users className="w-5 h-5 text-orange-400" /> },
                { cat: 'theft' as IncidentCategory, label: t.categories.theft, icon: <AlertTriangle className="w-5 h-5 text-indigo-400" /> }
              ].map((item) => (
                <button
                  key={item.cat}
                  onClick={() => handleOpenReport(item.cat)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/60 border border-slate-800 hover:border-cyan-400/60 text-slate-100 hover:bg-cyan-950/20 transition text-left"
                >
                  {item.icon}
                  <span className="font-bold text-xs sm:text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Community Help Cards */}
          {communityIncidents.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-cyan-300 uppercase tracking-wider">
                  🤝 {t.community.title}
                </span>
                <span className="text-[11px] text-slate-400">{t.community.subtitle}</span>
              </div>
              {communityIncidents.map((inc) => (
                <CommunityHelpCard key={inc.id} incident={inc} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Missing & Found Persons Section */}
      {activeTab === 'missing' && <MissingPersonSection />}

      {/* Tab 3: My Reports History */}
      {activeTab === 'my_reports' && (
        <div className="bg-[#030712] border border-slate-800 rounded-3xl p-4 sm:p-5 text-xs space-y-3 shadow-xl cyber-card">
          <h3 className="font-bold text-sm text-white">{t.missingPerson.activeTab}</h3>
          {myReports.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>You have not submitted any reports yet.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {myReports.map((inc) => (
                <div
                  key={inc.id}
                  className="bg-black/70 border border-slate-800 rounded-2xl p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400">#{inc.id}</span>
                      <h4 className="font-bold text-sm text-white">{inc.title}</h4>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        inc.status === 'RESOLVED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : inc.status === 'RESPONDER_EN_ROUTE'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs">{inc.description}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {inc.locationName}
                    </span>
                    <span>
                      {new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Incident Reporting Modal */}
      <IncidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        preselectedCategory={preselectedCategory}
      />
    </div>
  );
};
