// @component PrivacyModal - Модал: Защита на личните данни
'use client';
import React from 'react';

interface PrivacyModalProps { open: boolean; onClose: () => void; }

export default function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
        <h2 className="text-2xl font-bold text-white mb-6">Защита на личните данни</h2>
        <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-sm">
          <p><strong>GDPR</strong>: Спазваме европейските стандарти за защита на данните.</p>
          <p><strong>Събирани данни</strong>: Възраст, пол, местоположение, контактни данни – за персонализация и сигурност.</p>
          <p><strong>Сигурност</strong>: Вие отговаряте за паролата си. Забранено е споделяне на акаунт.</p>
          <p><strong>Разкриване</strong>: Данни се разкриват единствено при законово изискване или защита от злоупотреби.</p>
          <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
        </div>
      </div>
    </div>
  );
}
