"use client";

import React, { useState } from "react";

// Компактен футър (Вариант A): една линия + модали при клик
export function FixedFooter() {
  const [showLegal, setShowLegal] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
          <nav className="hidden md:block text-[13px] text-purple-200">
            <ul className="flex items-center divide-x divide-purple-400/40">
              <li>
                <button
                  type="button"
                  onClick={() => setShowLegal(true)}
                  className="px-4 hover:text-white transition"
                >
                  Правна информация
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowSupport(true)}
                  className="px-4 hover:text-white transition"
                >
                  Поддръжка
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowCommunity(true)}
                  className="px-4 hover:text-white transition"
                >
                  Общност
                </button>
              </li>
              <li className="px-4 text-purple-300 text-[11px]">Powered by N.Stoyanov</li>
            </ul>
          </nav>
        </div>
      </footer>

      {showLegal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-3xl rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900 to-purple-900 p-8 shadow-2xl">
            <button
              onClick={() => setShowLegal(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
              aria-label="Затвори"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Правна информация</h2>
            <div className="text-sm text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>Условия за ползване</strong> – използването на платформата означава приемане на актуалните условия. Нарушения водят до ограничаване или прекратяване на достъпа.</p>
              <p><strong>Лични данни</strong> – обработваме минимално необходимите данни (имейл, възраст, местоположение) според GDPR. Може да поискате изтриване или корекция.</p>
              <p><strong>Прекратяване</strong> – можете да изтриете акаунта по всяко време. При злоупотреба си запазваме право на незабавно прекратяване без възстановяване на платени услуги.</p>
              <p className="text-xs text-purple-400">Актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}

      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-3xl rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900 to-purple-900 p-8 shadow-2xl">
            <button
              onClick={() => setShowSupport(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
              aria-label="Затвори"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Поддръжка</h2>
            <div className="text-sm text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>Помощ</strong> – използвайте центъра за често задавани въпроси и форма за контакт за технически или акаунт проблеми.</p>
              <p><strong>Докладване</strong> – всяко подозрително или нарушаващо съдържание може да бъде докладвано чрез вграден механизъм за модерация.</p>
              <p><strong>Спорове</strong> – споровете се решават по приложимото българско право; възможност за алтернативно решаване (ODR) при нужда.</p>
              <p className="text-xs text-purple-400">Актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}

      {showCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-3xl rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900 to-purple-900 p-8 shadow-2xl">
            <button
              onClick={() => setShowCommunity(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
              aria-label="Затвори"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Общност</h2>
            <div className="text-sm text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>Етика</strong> – уважение, доброволност и дискретност са основни принципи. Тормоз и манипулация са забранени.</p>
              <p><strong>Събития</strong> – предстоящите офлайн/онлайн събития ще се публикуват тук. Засега няма активни.</p>
              <p><strong>Клубове</strong> – списъкът със сертифицирани свинг клубове е в подготовка; работим по легалната проверка.</p>
              <p className="text-xs text-purple-400">Актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FixedFooter;