'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { MissingPersonCase } from '@/types';
import {
  UserX,
  UserCheck,
  Search,
  Sparkles,
  Camera,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Plus
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

export const MissingPersonSection: React.FC = () => {
  const { incidents, reportIncident, currentUser, currentEvent, reuniteMissingPerson, t } = useAppState();

  const [activeTab, setActiveTab] = useState<'browse' | 'report_missing' | 'report_found'>('browse');

  // Form states
  const [personName, setPersonName] = useState('');
  const [age, setAge] = useState<number>(6);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [clothing, setClothing] = useState('');
  const [locationSeen, setLocationSeen] = useState('Near Food Court / Swaraj Round');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // Extract all missing person cases from incidents
  const missingCases: MissingPersonCase[] = incidents
    .filter((inc) => inc.missingPersonDetails)
    .map((inc) => inc.missingPersonDetails!);

  const handleSimulatePhoto = (type: 'child' | 'elderly') => {
    if (type === 'child') {
      setPhotoUrl('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80');
    } else {
      setPhotoUrl('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80');
    }
    soundFX.playAlertChime();
  };

  const handleCreateCase = (caseType: 'MISSING' | 'FOUND') => {
    const isMissing = caseType === 'MISSING';
    const caseId = `mp-${Date.now().toString().slice(-4)}`;

    const newCase: MissingPersonCase = {
      id: caseId,
      incidentId: `inc-${Date.now().toString().slice(-4)}`,
      caseType,
      personName: personName.trim() || (isMissing ? 'Missing Child' : 'Unidentified Found Person'),
      age,
      gender,
      clothingDescription: clothing.trim() || 'Blue shirt, dark shorts',
      lastKnownLocationName: locationSeen,
      lastKnownCoordinates: currentUser.currentLocation || currentEvent.center,
      timeLastSeen: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      photoUrl: photoUrl || undefined,
      guardianName: currentUser.name,
      guardianPhoneMasked: currentUser.mobile.slice(0, 7) + ' •••••',
      verificationStatus: 'VERIFIED',
      privacyMasked: true,
      matchScore: 92
    };

    reportIncident({
      category: isMissing ? 'missing_child' : 'found_child',
      title: `${isMissing ? t.missingPerson.reportMissing : t.missingPerson.reportFound}: ${newCase.personName} (${age}yo)`,
      description: `${isMissing ? 'Reported missing' : 'Found and safeguarded'}: ${clothing}. Last seen near ${locationSeen}.`,
      severity: 'HIGH',
      locationName: locationSeen,
      photoUrl: photoUrl || undefined,
      missingPersonDetails: newCase
    });

    soundFX.playSuccessChime();
    setActiveTab('browse');
    setPersonName('');
    setClothing('');
    setPhotoUrl(null);
  };

  return (
    <div className="bg-[#030712] border border-cyan-500/30 rounded-3xl p-4 sm:p-5 text-xs space-y-4 shadow-xl cyber-card font-sans">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">{t.missingPerson.title}</h3>
            <p className="text-[11px] text-slate-400">{t.missingPerson.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
              activeTab === 'browse'
                ? 'bg-cyan-500 text-black shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.missingPerson.activeTab} ({missingCases.length})
          </button>
          <button
            onClick={() => setActiveTab('report_missing')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
              activeTab === 'report_missing'
                ? 'bg-amber-600 text-black shadow'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.missingPerson.reportMissing}</span>
          </button>
          <button
            onClick={() => setActiveTab('report_found')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
              activeTab === 'report_found'
                ? 'bg-emerald-600 text-black shadow'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.missingPerson.reportFound}</span>
          </button>
        </div>
      </div>

      {/* View Mode: Browse Cases */}
      {activeTab === 'browse' && (
        <div className="space-y-3">
          {missingCases.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No active missing or found person cases currently reported.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {missingCases.map((c) => {
                const isFound = c.caseType === 'FOUND';
                const isReunited = c.verificationStatus === 'REUNITED';

                return (
                  <div
                    key={c.id}
                    className={`bg-black/70 border rounded-2xl p-4 space-y-3 transition ${
                      isReunited
                        ? 'border-emerald-500/80 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : isFound
                        ? 'border-emerald-500/50'
                        : 'border-amber-500/50'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {c.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={c.photoUrl}
                            alt={c.personName}
                            className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/40 shadow-md"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-lg">
                            {c.personName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{c.personName}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                isReunited
                                  ? 'bg-emerald-900 text-emerald-300'
                                  : isFound
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                                  : 'bg-amber-950 text-amber-300 border border-amber-500'
                              }`}
                            >
                              {isReunited ? 'REUNITED' : isFound ? 'FOUND' : 'MISSING'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {t.missingPerson.age}: <span className="text-white font-bold">{c.age} yrs</span> | {t.missingPerson.gender}: {c.gender}
                          </p>
                        </div>
                      </div>

                      {/* AI Match Badge */}
                      {c.matchScore && !isReunited && (
                        <div className="bg-cyan-950/80 border border-cyan-500/50 px-2 py-1 rounded-xl text-right">
                          <span className="text-[10px] text-cyan-300 font-mono flex items-center gap-1 font-bold">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            {c.matchScore}% MATCH
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Clothing Description */}
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <span className="text-slate-500 font-bold">{t.missingPerson.clothes}: </span>
                      {c.clothingDescription}
                    </div>

                    {/* Location & Time */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {c.lastKnownLocationName}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {c.timeLastSeen}
                      </span>
                    </div>

                    {/* Quick Reunite Action if Match Exists */}
                    {c.matchedCaseId && !isReunited && (
                      <div className="pt-1">
                        <button
                          onClick={() => reuniteMissingPerson('mp-1002', 'mp-1008')}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl transition shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5 uppercase"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.missingPerson.reuniteBtn}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* View Mode: Report Missing or Found Person */}
      {(activeTab === 'report_missing' || activeTab === 'report_found') && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateCase(activeTab === 'report_missing' ? 'MISSING' : 'FOUND');
          }}
          className="space-y-3.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1 text-xs">
                {t.missingPerson.name}
              </label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="e.g. Aarav Menon"
                className="w-full bg-black border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-bold mb-1 text-xs">{t.missingPerson.age}</label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 6)}
                  className="w-full bg-black border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1 text-xs">{t.missingPerson.gender}</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE' | 'OTHER')}
                  className="w-full bg-black border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1 text-xs">{t.missingPerson.clothes}</label>
            <input
              type="text"
              value={clothing}
              onChange={(e) => setClothing(e.target.value)}
              placeholder="e.g. Blue shirt, yellow shorts, sandals"
              className="w-full bg-black border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1 text-xs">{t.missingPerson.lastSeen}</label>
              <input
                type="text"
                value={locationSeen}
                onChange={(e) => setLocationSeen(e.target.value)}
                placeholder="e.g. Food Court Stall #14"
                className="w-full bg-black border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 text-xs">{t.missingPerson.attachPhoto}</label>
              <button
                type="button"
                onClick={() => handleSimulatePhoto('child')}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                  photoUrl
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-black border-slate-800 text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>{photoUrl ? '📷 Photo Attached' : `📷 ${t.missingPerson.attachPhoto}`}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('browse')}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-2.5 font-black text-black rounded-xl shadow-lg transition uppercase tracking-wide ${
                activeTab === 'report_missing'
                  ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30'
              }`}
            >
              {activeTab === 'report_missing' ? t.missingPerson.submitMissing : t.missingPerson.submitFound}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
