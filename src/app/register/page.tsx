'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birthDate: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Проверка на username при въвеждане
    if (name === 'username') {
      checkUsername(value);
    }
  };

  // Проверка дали потребителското име е валидно (локално във браузъра)
  const checkUsername = (username: string) => {
    setUsernameError('');
    setUsernameAvailable(null);

    if (!username || username.trim().length === 0) {
      return;
    }

    if (username.length < 3) {
      setUsernameError('Минимум 3 символа');
      setUsernameAvailable(false);
      return;
    }

    if (username.length > 20) {
      setUsernameError('Максимум 20 символа');
      setUsernameAvailable(false);
      return;
    }

    // Позволяване на английски букви, кирилица (български), цифри, тире и долни черти
    if (!/^[a-zA-Z0-9а-яёА-ЯЁ_-]+$/.test(username)) {
      setUsernameError('Букви, цифри, тире и долни черти');
      setUsernameAvailable(false);
      return;
    }

    // Ако всичко е валидно, потребителското име е свободно
    setUsernameAvailable(true);
  };

  // Проверка на възраста
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = e.target.value;
    setFormData((prev) => ({ ...prev, birthDate }));

    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      if (age < 18) {
        setAgeError('❌ За съжаление, трябва да сте минимум 18 години за да се регистрирате.');
        setFormData((prev) => ({ ...prev, birthDate: '' }));
        setAgreeTerms(false);
        setIsAdult(false);
      } else {
        setAgeError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация
    if (!formData.fullName.trim() || !formData.username.trim()) {
      setError('Моля, въведете име, фамилия и потребителско име');
      return;
    }

    if (!usernameAvailable) {
      setError('Потребителското име не е свободно или е невалидно');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Моля, въведете валиден имейл адрес');
      return;
    }

    if (formData.password.length < 8) {
      setError('Паролата трябва да е минимум 8 символа');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Паролите не съвпадат');
      return;
    }

    if (!formData.gender) {
      setError('Моля, изберете пол/тип профил');
      return;
    }

    if (!formData.birthDate) {
      setError('Моля, въведете дата на раждане');
      return;
    }

    if (ageError) {
      setError(ageError);
      return;
    }

    if (!agreeTerms || !isAdult) {
      setError('Трябва да приемете условията и да потвърдите възрастта си');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          username: formData.username,
          birthDate: formData.birthDate,
          gender: formData.gender,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Възникна грешка при регистрацията');
        return;
      }

      setSuccess('✓ Регистрацията е успешна! Пренасочване към профил...');
      setTimeout(() => router.push('/profile/create'), 2000);
    } catch (err) {
      setError('Възникна грешка при комуникацията със сървъра');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-purple-400 fill-purple-400" />
          <span className="text-2xl font-bold text-white">SwingMe</span>
        </Link>

        {/* Card */}
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Регистрирайте се</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-600/20 border border-red-500/50 text-red-200 rounded-lg text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-600/20 border border-green-500/50 text-green-200 rounded-lg text-sm flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Име и Фамилия */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Име и Фамилия *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Иван Петров"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                required
              />
            </div>

            {/* Потребителско име */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Потребителско име *</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="ivann_2025"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border transition ${
                    usernameAvailable === true
                      ? 'border-green-500/50 focus:border-green-400'
                      : usernameAvailable === false
                      ? 'border-red-500/50 focus:border-red-400'
                      : 'border-purple-400/30 focus:border-purple-400'
                  } text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/20`}
                  required
                />
                {usernameAvailable === true && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 text-xl">
                    ✓
                  </div>
                )}
                {usernameAvailable === false && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 text-xl">
                    ✕
                  </div>
                )}
              </div>
              {usernameError && (
                <div className="mt-2 p-3 bg-red-600/20 border border-red-500/50 text-red-200 rounded-lg text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {usernameError}
                </div>
              )}
              {usernameAvailable === true && (
                <div className="mt-2 p-3 bg-green-600/20 border border-green-500/50 text-green-200 rounded-lg text-xs flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Потребителското име е свободно!
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Email адрес *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ivan@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                required
              />
            </div>

            {/* Дата на раждане */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Дата на раждане (18+) *</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleBirthDateChange}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                  .toISOString()
                  .split('T')[0]}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                required
              />
              {ageError && (
                <div className="mt-2 p-3 bg-red-600/20 border border-red-500/50 text-red-200 rounded-lg text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {ageError}
                </div>
              )}
            </div>

            {/* Пол/Тип профил - ПОПРАВЕНО */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Пол / Тип профил *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition appearance-none cursor-pointer font-medium"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23c084fc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
                required
              >
                <option value="" className="bg-slate-900 text-purple-300">
                  -- Изберете --
                </option>
                <option value="male" className="bg-slate-900 text-white font-medium">
                  👨 Мъж
                </option>
                <option value="female" className="bg-slate-900 text-white font-medium">
                  👩 Жена
                </option>
                <option value="couple" className="bg-slate-900 text-white font-medium">
                  👫 Двойка
                </option>
              </select>
            </div>

            {/* Парола */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Парола (минимум 8 символа) *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                required
              />
            </div>

            {/* Потвърди парола */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 text-sm">Потвърди парола *</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                required
              />
            </div>

            {/* Условия */}
            <div className="space-y-3 mt-6">
              <label className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-lg cursor-pointer hover:bg-purple-500/20 transition">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4"
                  disabled={ageError !== ''}
                />
                <span className="text-xs text-purple-200">
                  Съгласен/согласна съм с{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                    Условията на ползване
                  </a>
                  {' '}и{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                    Политиката за приватност
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-lg cursor-pointer hover:bg-purple-500/20 transition">
                <input
                  type="checkbox"
                  checked={isAdult}
                  onChange={(e) => setIsAdult(e.target.checked)}
                  className="mt-1 w-4 h-4"
                  disabled={ageError !== ''}
                />
                <span className="text-xs text-purple-200">
                  Потвърждавам, че съм 18+ години
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || ageError !== ''}
              className={`w-full py-3 rounded-lg font-bold transition text-white mt-6 ${
                loading || ageError !== ''
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95'
              }`}
            >
              {loading ? 'Регистрирање...' : 'Регистрирайте се'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-300 text-sm">
              Вече имате акаунт?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                Влезте
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <Link href="/" className="text-center text-purple-400 hover:text-purple-300 text-sm block">
              ← Назад към начало
            </Link>
          </div>
        </div>

        <p className="text-center text-purple-400/50 text-xs mt-6">
          🔒 Вашите лични данни са защитени и никога няма да бъдат споделени.
        </p>
      </div>
    </div>
  );
}
