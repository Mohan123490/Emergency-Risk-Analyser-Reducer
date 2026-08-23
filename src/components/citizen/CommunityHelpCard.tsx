'use client';

import React from 'react';
import { useAppState } from '@/context/AppStateContext';
import { Incident } from '@/types';
import { HeartHandshake, CheckCircle2, Users, MapPin, ArrowRight } from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

interface CommunityHelpCardProps {
  incident: Incident;
}

export const CommunityHelpCard: React.FC<CommunityHelpCardProps> = ({ incident }) => {
  const { currentUser, joinCommunityHelp } = useAppState();

  const isAlreadyHelping = incident.communityHelpersAssigned?.includes(currentUser.id);

  return (
    <div className="bg-gradient-to-r from-sky-950/80 to-slate-900 border border-sky-800/80 rounded-2xl p-4 shadow-lg space-y-3 text-xs">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
            <HeartHandshake className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wide">
              COMMUNITY ASSISTANCE REQUEST
            </span>
            <h4 className="font-bold text-sm text-white">{incident.title}</h4>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
          <Users className="w-3 h-3 text-sky-400" />
          {incident.communityHelpersAssigned?.length || 0} Citizens Helping
        </span>
      </div>

      <p className="text-slate-200 text-xs leading-relaxed bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
        {incident.communityHelpTask ||
          'Volunteers are requesting nearby citizens to assist in keeping space clear and providing calm direction until emergency squads arrive.'}
      </p>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>{incident.locationName}</span>
        </div>

        <button
          onClick={() => joinCommunityHelp(incident.id)}
          disabled={isAlreadyHelping}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold transition shadow ${
            isAlreadyHelping
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-600/30'
          }`}
        >
          {isAlreadyHelping ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>You Are Assisting</span>
            </>
          ) : (
            <>
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>I Can Help</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
