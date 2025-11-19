// @component ThemeToggle - Бутон за смяна на тема (default / neon)
'use client';
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'default' | 'neon';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    const saved = localStorage.getItem('swingme-theme') as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('swingme-theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => prev === 'default' ? 'neon' : 'default');

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600/60 hover:bg-purple-600 text-white text-sm font-medium transition"
      aria-label="Смяна на тема"
    >
      {theme === 'default' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {theme === 'default' ? 'Неон' : 'Стандарт'}
    </button>
  );
}
