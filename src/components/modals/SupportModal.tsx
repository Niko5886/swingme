// @component SupportModal - Модал: Помощ и поддръжка
'use client';
import React from 'react';

interface SupportModalProps { open: boolean; onClose: () => void; }

export default function SupportModal({ open, onClose }: SupportModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
        <h2 className="text-2xl font-bold text-white mb-6">Помощ и поддръжка</h2>
        <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-sm">
          <p><strong>Контакти</strong>: Използвайте формата за заявки или официалния адрес.</p>
          <p><strong>Докладване</strong>: Наличие на механизъм за сигнализиране на злоупотреби.</p>
          <p><strong>Спорове</strong>: Възможност за алтернативно разрешаване.</p>
          <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
        </div>
      </div>
    </div>
  );
}
