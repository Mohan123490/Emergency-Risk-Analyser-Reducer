'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { IncidentCategory, IncidentSeverity } from '@/types';
import {
  X,
  AlertTriangle,
  Flame,
  HeartPulse,
  UserX,
  UserCheck,
  ShieldAlert,
  Users,
  Car,
  HelpCircle,
  Camera,
  Mic,
  MapPin,
  Send,
  Sparkles,
  Lock,
  Radio,
  Crosshair,
  Volume2
} from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';
import { voiceAssistant } from '@/lib/speechVoice';

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: IncidentCategory;
}

export const IncidentReportModal: React.FC<IncidentReportModalProps> = ({
  isOpen,
  onClose,
  preselectedCategory
}) => {
  const { reportIncident, currentEvent, currentUser, currentLanguage, t } = useAppState();

  const [category, setCategory] = useState<IncidentCategory>(preselectedCategory || 'medical_emergency');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<IncidentSeverity>('HIGH');
  const [affectedCount, setAffectedCount] = useState<number>(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const [audioRecorded, setAudioRecorded] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('Near Gate 3 / Main Pathway');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories: { cat: IncidentCategory; label: string; icon: React.ReactNode; defaultSeverity: IncidentSeverity; color: string }[] = [
    { cat: 'medical_emergency', label: t.categories.medical_emergency, icon: <HeartPulse className="w-5 h-5 text-rose-400" />, defaultSeverity: 'CRITICAL', color: 'border-rose-500/60 bg-rose-950/20' },
    { cat: 'ambulance_required', label: t.categories.ambulance_required, icon: <Car className="w-5 h-5 text-red-400" />, defaultSeverity: 'CRITICAL', color: 'border-red-500/60 bg-red-950/20' },
    { cat: 'missing_child', label: t.categories.missing_child, icon: <UserX className="w-5 h-5 text-amber-400" />, defaultSeverity: 'HIGH', color: 'border-amber-500/60 bg-amber-950/20' },
    { cat: 'found_child', label: t.categories.found_child, icon: <UserCheck className="w-5 h-5 text-emerald-400" />, defaultSeverity: 'HIGH', color: 'border-emerald-500/60 bg-emerald-950/20' },
    { cat: 'dangerous_crowd', label: t.categories.dangerous_crowd, icon: <Users className="w-5 h-5 text-orange-400" />, defaultSeverity: 'CRITICAL', color: 'border-orange-500/60 bg-orange-950/20' },
    { cat: 'crowd_blockage', label: t.categories.crowd_blockage, icon: <Users className="w-5 h-5 text-amber-400" />, defaultSeverity: 'MEDIUM', color: 'border-amber-500/60 bg-amber-950/20' },
    { cat: 'theft', label: t.categories.theft, icon: <ShieldAlert className="w-5 h-5 text-indigo-400" />, defaultSeverity: 'MEDIUM', color: 'border-indigo-500/60 bg-indigo-950/20' },
    { cat: 'fight', label: t.categories.fight, icon: <AlertTriangle className="w-5 h-5 text-rose-400" />, defaultSeverity: 'HIGH', color: 'border-rose-500/60 bg-rose-950/20' },
    { cat: 'fire', label: t.categories.fire, icon: <Flame className="w-5 h-5 text-red-500" />, defaultSeverity: 'CRITICAL', color: 'border-red-500/60 bg-red-950/20' },
    { cat: 'accident', label: t.categories.accident, icon: <Car className="w-5 h-5 text-orange-400" />, defaultSeverity: 'HIGH', color: 'border-orange-500/60 bg-orange-950/20' },
    { cat: 'suspicious_activity', label: t.categories.suspicious_activity, icon: <Lock className="w-5 h-5 text-purple-400" />, defaultSeverity: 'MEDIUM', color: 'border-purple-500/60 bg-purple-950/20' },
    { cat: 'infrastructure_damage', label: t.categories.infrastructure_damage, icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />, defaultSeverity: 'MEDIUM', color: 'border-yellow-500/60 bg-yellow-950/20' },
    { cat: 'road_blocked', label: t.categories.road_blocked, icon: <Car className="w-5 h-5 text-blue-400" />, defaultSeverity: 'MEDIUM', color: 'border-blue-500/60 bg-blue-950/20' },
    { cat: 'person_trapped', label: t.categories.person_trapped, icon: <Users className="w-5 h-5 text-rose-400" />, defaultSeverity: 'CRITICAL', color: 'border-rose-500/60 bg-rose-950/20' },
    { cat: 'disaster', label: t.categories.disaster, icon: <Flame className="w-5 h-5 text-red-600" />, defaultSeverity: 'CRITICAL', color: 'border-red-600/60 bg-red-950/30' },
    { cat: 'other', label: t.categories.other, icon: <HelpCircle className="w-5 h-5 text-slate-400" />, defaultSeverity: 'LOW', color: 'border-slate-700 bg-slate-900' }
  ];

  const handleSelectCategory = (cat: IncidentCategory, defSev: IncidentSeverity, label: string) => {
    setCategory(cat);
    setSeverity(defSev);
    soundFX.playAlertChime();
  };

  const handleSimulatePhoto = () => {
    const mockPhotos: Record<string, string> = {
      medical_emergency: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
      dangerous_crowd: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&auto=format&fit=crop&q=80',
      missing_child: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80',
      theft: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80'
    };
    setPhotoPreview(mockPhotos[category] || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&auto=format&fit=crop&q=80');
    soundFX.playAlertChime();
  };

  const handleToggleVoice = () => {
    if (!isRecordingAudio) {
      setIsRecordingAudio(true);
      setTimeout(() => {
        setIsRecordingAudio(false);
        setAudioRecorded(true);
        soundFX.playSuccessChime();
      }, 2000);
    } else {
      setIsRecordingAudio(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedTitle = title.trim() || `${categories.find((c) => c.cat === category)?.label || 'Emergency'} (${locationName})`;

    reportIncident({
      category,
      title: generatedTitle,
      description: description.trim() || 'Immediate assistance requested by citizen.',
      severity,
      affectedPeopleCount: affectedCount,
      locationName,
      location: currentUser.currentLocation || currentEvent.center,
      photoUrl: photoPreview || undefined,
      mediaType: photoPreview ? 'photo' : audioRecorded ? 'voice' : 'text'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-[#030712] border-2 border-cyan-500/40 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] text-slate-100 my-auto cyber-card">
        {/* Cyber Header */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-black px-5 py-4 flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-black text-sm sm:text-base text-white tracking-wide uppercase">
                {t.reportModal.title}
              </h2>
              <p className="text-xs text-cyan-300 font-medium">{t.reportModal.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
          {/* GPS Auto-Capture Indicator */}
          <div className="bg-black/80 p-3 rounded-2xl border border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Crosshair className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <div>
                <span className="text-[10px] text-slate-400 block font-mono font-bold">{t.reportModal.gpsLocked}</span>
                <span className="font-bold text-white text-xs sm:text-sm">
                  {locationName}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
              📍 GPS ON
            </span>
          </div>

          {/* 1. Category Selection */}
          <div>
            <label className="block text-cyan-300 font-bold mb-2 text-xs sm:text-sm">
              {t.reportModal.step1}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
              {categories.map((c) => {
                const isSelected = category === c.cat;
                return (
                  <button
                    key={c.cat}
                    type="button"
                    onClick={() => handleSelectCategory(c.cat, c.defaultSeverity, c.label)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center font-bold transition gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105'
                        : `${c.color} text-slate-200 hover:border-cyan-400 hover:text-white`
                    }`}
                  >
                    {c.icon}
                    <span className="text-[11px] leading-tight line-clamp-2">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Urgency Selector */}
          <div>
            <label className="block text-cyan-300 font-bold mb-1.5 text-xs">
              {t.reportModal.step2}
            </label>
            <div className="grid grid-cols-4 gap-2 font-mono">
              {[
                { level: 'LOW' as IncidentSeverity, label: 'LOW' },
                { level: 'MEDIUM' as IncidentSeverity, label: 'MEDIUM' },
                { level: 'HIGH' as IncidentSeverity, label: 'URGENT' },
                { level: 'CRITICAL' as IncidentSeverity, label: 'CRITICAL 🚨' }
              ].map((sev) => (
                <button
                  key={sev.level}
                  type="button"
                  onClick={() => setSeverity(sev.level)}
                  className={`py-2 rounded-xl border font-bold text-center transition text-xs ${
                    severity === sev.level
                      ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105'
                      : 'bg-black/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Landmark & Description */}
          <div className="space-y-2.5">
            <div>
              <label className="block text-slate-300 font-bold mb-1 text-xs">
                {t.reportModal.step3}
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder={t.reportModal.landmarkPlaceholder}
                className="w-full bg-black border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
              />
            </div>
            <div>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.reportModal.descPlaceholder}
                className="w-full bg-black border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>
          </div>

          {/* Photo & Voice Notes Attachment */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleSimulatePhoto}
              className={`py-3 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                photoPreview
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-black/60 border-slate-800 text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>{photoPreview ? t.reportModal.photoAdded : `📷 ${t.reportModal.addPhoto}`}</span>
            </button>
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`py-3 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                isRecordingAudio
                  ? 'bg-red-950 border-red-500 text-red-300 animate-pulse'
                  : audioRecorded
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-black/60 border-slate-800 text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Mic className="w-4 h-4 text-rose-400" />
              <span>
                {isRecordingAudio
                  ? t.reportModal.recording
                  : audioRecorded
                  ? t.reportModal.voiceSaved
                  : `🎤 ${t.reportModal.voiceMemo}`}
              </span>
            </button>
          </div>

          {/* Photo Preview */}
          {photoPreview && (
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 h-24 bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setPhotoPreview(null)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white hover:bg-black"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Big Transmit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2 transition uppercase tracking-wider"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? t.reportModal.submitting : t.reportModal.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
