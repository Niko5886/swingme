// @component ClubsToast - Тост: Свингър клубове (търсене)
'use client';
import React from 'react';
import { Users } from 'lucide-react';

interface ClubsToastProps { show: boolean; onClose: () => void; }

export default function ClubsToast({ show, onClose }: ClubsToastProps) {
  if (!show) return null;
  return (
    <div aria-live="polite" className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]">
      <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
        <Users className="w-5 h-5 text-purple-300 mt-0.5" />
        <div className="text-sm text-purple-100">Търсим лицензирани клубове...</div>
        <button onClick={onClose} className="ml-2 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
      </div>
    </div>
  );
}
