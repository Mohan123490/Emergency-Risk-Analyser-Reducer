'use client';

import React from 'react';
import { useAppState } from '@/context/AppStateContext';
import { X, ShieldAlert, Clock, CheckCircle2, User, Activity } from 'lucide-react';

interface AuditLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogDrawer: React.FC<AuditLogDrawerProps> = ({ isOpen, onClose }) => {
  const { auditLogs } = useAppState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border-l border-slate-700 w-full max-w-md h-full flex flex-col shadow-2xl text-slate-100 animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="font-bold text-sm text-white">System Decision & Audit Logs</h2>
              <p className="text-[10px] text-slate-400 font-mono">Immutable Real-Time Telemetry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {auditLogs.map((log) => {
            const time = new Date(log.timestamp).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });

            return (
              <div
                key={log.id}
                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-900/60">
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {time}
                  </span>
                </div>
                <p className="text-slate-200 text-xs font-medium leading-tight pt-1">
                  {log.details}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-0.5">
                  <User className="w-3 h-3 text-slate-500" />
                  <span>Actor: {log.userName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
