// @component TerminationModal - Модал: Прекратяване на договори
'use client';
import React from 'react';

interface TerminationModalProps { open: boolean; onClose: () => void; }

export default function TerminationModal({ open, onClose }: TerminationModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
        <h2 className="text-2xl font-bold text-white mb-6">Прекратяване</h2>
        <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-sm">
          <p><strong>Доброволно прекратяване</strong>: Можете да изтриете акаунта си по всяко време.</p>
          <p><strong>Принудително</strong>: При нарушение може да бъде блокиран без възстановяване.</p>
          <p><strong>Право на отказ</strong>: Може да отпадне при незабавен достъп до цифрово съдържание.</p>
          <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
        </div>
      </div>
    </div>
  );
}
