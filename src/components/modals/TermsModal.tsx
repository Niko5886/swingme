// @component TermsModal - Модал: Условия за ползване
// Пропсове: open (boolean), onClose (function)
'use client';
import React from 'react';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsModal({ open, onClose }: TermsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white"
          aria-label="Затвори"
        >✕</button>
        <h2 className="text-2xl font-bold text-white mb-6">Условия за ползване</h2>
        <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-sm">
          <p><strong>1. Приемане на Условията и Обхват</strong><br/>Тези Условия за ползване („Условия“) представляват правно обвързващо споразумение между Вас (Потребителя) и [Име на Компанията]. Използвайки Услугата, Вие приемате тези Условия.</p>
          <p><strong>2. Изисквания за Членство</strong><br/>Трябва да сте навършили 18 години. Не споделяйте акаунта си. Запазваме право за проверки.</p>
          <p><strong>3. Потребителско Съдържание</strong><br/>Вие отговаряте за публикуваното съдържание. Забранени: тормоз, спам, злонамерен код, фалшиви профили.</p>
          <p><strong>4. Интелектуална Собственост</strong><br/>Предоставяте лиценз за хостване и показване на съдържанието Ви с цел функциониране на услугата.</p>
          <p><strong>5. Абонаменти и Плащания</strong><br/>Покупките са окончателни. Възстановяване само при изключения (смърт/трайна неработоспособност).</p>
          <p><strong>6. Ограничаване на Отговорността</strong><br/>Услугата е „както е“. Финансова отговорност е ограничена.</p>
          <p><strong>7. Спорове</strong><br/>Приложимо право: Българско. Възможност за алтернативно разрешаване на спорове.</p>
          <p><strong>8. Промени</strong><br/>Промени в условията се публикуват. Продължаващото ползване = приемане.</p>
          <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
        </div>
      </div>
    </div>
  );
}
