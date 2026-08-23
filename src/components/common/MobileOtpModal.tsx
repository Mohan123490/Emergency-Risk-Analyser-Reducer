'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { UserRole } from '@/types';
import { X, Smartphone, ShieldCheck, Check, Lock, User, Eye, EyeOff, Sparkles, Terminal, Key } from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

interface MobileOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileOtpModal: React.FC<MobileOtpModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUserProfile, switchRole } = useAppState();

  const [step, setStep] = useState<'profile' | 'phone' | 'otp'>('profile');
  const [mobileInput, setMobileInput] = useState(currentUser.mobile);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [otpInput, setOtpInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);
  const [isCommunityHelper, setIsCommunityHelper] = useState(currentUser.isCommunityHelper);
  const [showFullPhone, setShowFullPhone] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileInput || mobileInput.length < 10) return;
    setStep('otp');
    soundFX.playAlertChime();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === '123456' || otpInput.length >= 4) {
      updateCurrentUserProfile({
        name: nameInput,
        mobile: mobileInput,
        role: selectedRole,
        isCommunityHelper,
        verified: true
      });
      switchRole(selectedRole);
      soundFX.playSuccessChime();
      onClose();
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name: nameInput,
      role: selectedRole,
      isCommunityHelper
    });
    switchRole(selectedRole);
    soundFX.playSuccessChime();
    onClose();
  };

  const maskPhone = (phone: string) => {
    if (showFullPhone) return phone;
    if (phone.length < 8) return phone;
    return phone.slice(0, 7) + ' •••••';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#030712] border border-cyan-500/40 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 font-mono">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-black px-5 py-4 flex items-center justify-between border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center">
              <Key className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white tracking-wider">TACTICAL AUTHENTICATION MESH</h2>
              <p className="text-[10px] text-cyan-400">Mobile OTP & Cryptographic Profile Node</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {step === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              {/* User Node Info */}
              <div className="flex items-center gap-3 bg-black/70 p-3.5 rounded-xl border border-cyan-500/20 shadow-inner">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-lg text-black shadow-lg">
                  {nameInput.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white font-sans">{nameInput}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      TRUST: {currentUser.trustScore}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                    <span>{maskPhone(currentUser.mobile)}</span>
                    <button
                      type="button"
                      onClick={() => setShowFullPhone(!showFullPhone)}
                      className="text-slate-400 hover:text-cyan-400"
                    >
                      {showFullPhone ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                    <span className="text-[10px] text-emerald-400">[ENCRYPTED]</span>
                  </div>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 text-[11px] tracking-wide">OPERATOR / USER ALIAS</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-black border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 text-[11px] tracking-wide">ASSIGNED SYSTEM CLEARANCE</label>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  {[
                    { role: 'citizen' as UserRole, label: '01. Citizen Public' },
                    { role: 'volunteer' as UserRole, label: '02. Registered Marshal' },
                    { role: 'medical' as UserRole, label: '03. Med-Corps Triage' },
                    { role: 'police' as UserRole, label: '04. Police Security' },
                    { role: 'admin' as UserRole, label: '05. C4ISR Control' }
                  ].map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={`py-2 px-2.5 rounded-xl border text-left font-bold transition text-[11px] ${
                        selectedRole === r.role
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-black/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Community Helper Mode Toggle */}
              <div className="bg-black/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-sans">
                <div>
                  <span className="font-bold text-slate-200 text-xs block font-mono">COMMUNITY ASSISTANCE PARTICIPANT</span>
                  <span className="text-[10px] text-slate-400">Receive proximity-filtered civilian assistance requests</span>
                </div>
                <input
                  type="checkbox"
                  checked={isCommunityHelper}
                  onChange={(e) => setIsCommunityHelper(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-black border-slate-700 cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700 transition"
                >
                  RE-AUTHENTICATE OTP
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-black font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition"
                >
                  SAVE PROFILE
                </button>
              </div>
            </form>
          )}

          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-bold text-sm text-white tracking-wider">ENTER SECURE MOBILE NUMBER</h3>
                <p className="text-slate-400 text-[11px] font-sans">Dispatching encrypted one-time verification token</p>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 text-[11px]">TELEPHONE NUMBER</label>
                <input
                  type="tel"
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value)}
                  placeholder="+91 98470 12345"
                  className="w-full bg-black border border-cyan-500/40 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setStep('profile')}
                  className="flex-1 py-2.5 bg-slate-900 text-slate-300 font-bold rounded-xl border border-slate-700"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition"
                >
                  TRANSMIT OTP
                </button>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Lock className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-bold text-sm text-white tracking-wider">INPUT CRYPTOGRAPHIC TOKEN</h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  Transmitted to {mobileInput} (Mock Token: <span className="font-mono text-emerald-400 font-bold">123456</span>)
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="1 2 3 4 5 6"
                  className="w-full bg-black border border-emerald-500/50 rounded-xl px-3 py-2.5 text-center text-white font-mono text-xl tracking-[0.4em] focus:outline-none focus:border-emerald-400"
                  autoFocus
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex-1 py-2.5 bg-slate-900 text-slate-300 font-bold rounded-xl border border-slate-700"
                >
                  CHANGE
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition"
                >
                  VERIFY NODE
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
