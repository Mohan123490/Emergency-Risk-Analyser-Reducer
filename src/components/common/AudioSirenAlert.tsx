'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { AlertOctagon, Volume2, VolumeX, X, Compass, CheckCircle2, XCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { voiceAssistant } from '@/lib/speechVoice';

export const AudioSirenAlert: React.FC = () => {
  const { alerts, dismissAlert, currentLanguage, t } = useAppState();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const criticalAlert = alerts.find((a) => a.isActive && a.level === 'RED');

  if (!criticalAlert) return null;

  const handleReadAloud = () => {
    if (isSpeaking) {
      voiceAssistant.stop();
      setIsSpeaking(false);
    } else {
      const instructions = criticalAlert.actionInstructions.whatToDo.join('. ');
      const speechText = `${t.alerts.criticalAlert}! ${criticalAlert.title}. ${criticalAlert.message}. ${t.alerts.whatToDo}: ${instructions}. ${criticalAlert.actionInstructions.safeDirection || ''}`;
      voiceAssistant.speak(speechText, currentLanguage);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 9000);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[500px] z-50 animate-bounce-short font-sans">
      <div className="bg-[#030712]/98 backdrop-blur-xl border-2 border-red-500 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.7)] overflow-hidden siren-glow text-white cyber-card">
        {/* Cyber Emergency Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-800 to-black px-4 py-3 flex items-center justify-between border-b border-red-500/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-black/60 border border-red-400 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-black bg-red-950 px-2 py-0.5 rounded border border-red-500/50 text-red-200">
                {t.alerts.criticalAlert}
              </span>
              <h3 className="font-black text-sm leading-tight text-white mt-0.5">
                {criticalAlert.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleReadAloud}
              title={t.sos.readAloud}
              className={`p-2 rounded-xl border transition ${
                isSpeaking ? 'bg-cyan-500 text-black border-cyan-300 animate-pulse' : 'bg-black/40 hover:bg-black/80 border-red-500/40'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => dismissAlert(criticalAlert.id)}
              title="Close"
              className="p-2 bg-black/40 hover:bg-black/80 rounded-xl border border-red-500/40 transition"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 space-y-3 text-xs">
          <p className="text-slate-100 font-bold leading-relaxed bg-red-950/40 p-3 rounded-2xl border border-red-800/60 text-xs sm:text-sm">
            {criticalAlert.message}
          </p>

          {/* Tactical Actionable Instructions (DOs and DONTs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
            {/* What to do */}
            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black mb-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.alerts.whatToDo}</span>
              </div>
              <ul className="space-y-1 text-slate-200 text-[11px] font-medium">
                {criticalAlert.actionInstructions.whatToDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What NOT to do */}
            <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 text-rose-400 font-black mb-1.5 text-xs">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{t.alerts.whatNotToDo}</span>
              </div>
              <ul className="space-y-1 text-slate-200 text-[11px] font-medium">
                {criticalAlert.actionInstructions.whatNotToDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Safe Direction Vector */}
          {criticalAlert.actionInstructions.safeDirection && (
            <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-500/50 p-3 rounded-2xl text-cyan-200">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400 animate-spin shrink-0" style={{ animationDuration: '6s' }} />
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold block font-mono">{t.alerts.safeCorridor}</span>
                  <span className="font-bold text-xs sm:text-sm text-white">{criticalAlert.actionInstructions.safeDirection}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400 shrink-0" />
            </div>
          )}

          {/* Voice Assistance Banner */}
          <button
            onClick={handleReadAloud}
            className="w-full py-2 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? 'Speaking Instructions...' : `🔊 ${t.sos.readAloud}`}</span>
          </button>

          {/* Acknowledge Button */}
          <button
            onClick={() => dismissAlert(criticalAlert.id)}
            className="w-full py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.5)] transition text-xs sm:text-sm uppercase tracking-wide"
          >
            {t.alerts.acknowledgeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
