'use client';

import React from 'react';
import { useAppState } from '@/context/AppStateContext';
import { MissingPersonCase } from '@/types';
import {
  UserX,
  UserCheck,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  Heart
} from 'lucide-react';
import { matchMissingPerson } from '@/lib/matchingEngine';

export const MissingPersonsManager: React.FC = () => {
  const { incidents, verifyMissingPersonCase, reuniteMissingPerson } = useAppState();

  const missingCases: MissingPersonCase[] = incidents
    .filter((i) => i.missingPersonDetails && i.missingPersonDetails.caseType === 'MISSING')
    .map((i) => i.missingPersonDetails!);

  const foundCases: MissingPersonCase[] = incidents
    .filter((i) => i.missingPersonDetails && i.missingPersonDetails.caseType === 'FOUND')
    .map((i) => i.missingPersonDetails!);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <span>Missing & Found Person Reconciliation Desk</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[10px] font-bold">
                {missingCases.length} Missing / {foundCases.length} Found
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Automated Fuzzy Matching (Age, Clothing, Proximity)</p>
          </div>
        </div>
      </div>

      {/* Matching Grid Matrix */}
      <div className="space-y-4">
        {missingCases.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No active missing person cases reported.</p>
          </div>
        ) : (
          missingCases.map((miss) => {
            const isReunited = miss.verificationStatus === 'REUNITED';

            // Check match against found cases
            const potentialMatches = foundCases.map((f) => ({
              foundCase: f,
              match: matchMissingPerson(miss, f)
            }));

            return (
              <div
                key={miss.id}
                className={`bg-slate-950 border rounded-2xl p-4 space-y-3 transition ${
                  isReunited ? 'border-emerald-800/80 bg-emerald-950/20' : 'border-amber-800/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {miss.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={miss.photoUrl}
                        alt={miss.personName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-base">
                        {miss.personName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">{miss.personName}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isReunited
                              ? 'bg-emerald-900 text-emerald-300'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {isReunited ? 'REUNITED' : 'MISSING'}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Age: <strong className="text-white">{miss.age} yrs</strong> | Gender: {miss.gender} | Guardian: {miss.guardianName} ({miss.guardianPhoneMasked})
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Reported: {miss.timeLastSeen}
                  </span>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-slate-400 font-semibold">Clothing & Features: </span>
                  {miss.clothingDescription}
                </div>

                {/* Match Suggestions */}
                {!isReunited && potentialMatches.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-slate-900">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Match Recommendation:
                    </span>

                    {potentialMatches.map(({ foundCase, match }) => (
                      <div
                        key={foundCase.id}
                        className="bg-sky-950/40 border border-sky-800/80 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">
                              Found Person Case #{foundCase.id} ({foundCase.personName})
                            </span>
                            <span className="px-2 py-0.5 rounded bg-sky-900 text-sky-200 font-mono text-[10px] font-bold">
                              {match.score}% MATCH SCORE
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1">
                            {match.matchReasons.join(' • ')}
                          </p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            📍 Current Location: {foundCase.lastKnownLocationName}
                          </span>
                        </div>

                        <button
                          onClick={() => reuniteMissingPerson(miss.id, foundCase.id)}
                          className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verify Match & Complete Reunion</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
