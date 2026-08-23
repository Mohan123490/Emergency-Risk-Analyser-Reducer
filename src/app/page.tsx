'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { Header } from '@/components/common/Header';
import { SimulationBar } from '@/components/common/SimulationBar';
import { AudioSirenAlert } from '@/components/common/AudioSirenAlert';
import { MobileOtpModal } from '@/components/common/MobileOtpModal';
import { AuditLogDrawer } from '@/components/common/AuditLogDrawer';

import { CitizenHome } from '@/components/citizen/CitizenHome';
import { VolunteerDashboard } from '@/components/volunteer/VolunteerDashboard';
import { MedicalResponderView } from '@/components/responder/MedicalResponderView';
import { PoliceResponderView } from '@/components/responder/PoliceResponderView';
import { AdminControlRoom } from '@/components/admin/AdminControlRoom';
import { Smartphone, Monitor } from 'lucide-react';

export default function Home() {
  const { currentUser } = useAppState();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [isMobileFrameMode, setIsMobileFrameMode] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* 1. Header with Role Switcher & Event Selector */}
      <Header
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuditLogs={() => setIsAuditDrawerOpen(true)}
      />

      {/* 2. Simulation Bar with 5 Hackathon Demo Triggers */}
      <SimulationBar />

      {/* 3. Main Dynamic Content Area based on Active Role */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6">
        {/* Mobile Viewport Toggle for Citizen Mode */}
        {currentUser.role === 'citizen' && (
          <div className="flex items-center justify-end mb-3">
            <button
              onClick={() => setIsMobileFrameMode(!isMobileFrameMode)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 text-xs font-semibold transition"
            >
              {isMobileFrameMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span>{isMobileFrameMode ? 'Expand to Desktop View' : 'Simulate Mobile Frame'}</span>
            </button>
          </div>
        )}

        {/* View Router */}
        {currentUser.role === 'citizen' && (
          <div className={isMobileFrameMode ? 'max-w-md mx-auto bg-slate-950 border-4 border-slate-800 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden' : ''}>
            <CitizenHome />
          </div>
        )}

        {currentUser.role === 'volunteer' && <VolunteerDashboard />}
        {currentUser.role === 'medical' && <MedicalResponderView />}
        {currentUser.role === 'police' && <PoliceResponderView />}
        {currentUser.role === 'admin' && <AdminControlRoom />}
      </div>

      {/* 4. Global Critical Audio/Visual Siren Alert */}
      <AudioSirenAlert />

      {/* 5. Modals & Drawers */}
      <MobileOtpModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <AuditLogDrawer
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-3 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SURAKSHA 360 • Distributed Public Safety & Crowd Intelligence Network (Kerala Edition)</span>
          <span className="font-mono text-[10px] text-slate-600">Built for Kerala Festivals, Stadiums & Pilgrimages</span>
        </div>
      </footer>
    </main>
  );
}
