'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Възникна грешка при влизането');
        return;
      }

      // Редирект към dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Възникна грешка при комуникацията със сървъра');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-purple-400 fill-purple-400" />
          <span className="text-2xl font-bold text-white">SwingMe</span>
        </Link>

        {/* Card */}
        <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl border border-purple-500/30 p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Влезте в акаунта</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Email адрес</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Парола</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg font-semibold transition mt-6"
            >
              {loading ? 'Влизане...' : 'Вход'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-300">
              Нямате акаунт?{' '}
              <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
                Регистрирайте се
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <Link href="/" className="text-center text-purple-400 hover:text-purple-300 text-sm block">
              ← Назад към начало
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
