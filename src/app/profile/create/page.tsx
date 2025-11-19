'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

export default function CreateProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [profileData, setProfileData] = useState({
    // Стъп 1: Основна информация
    weAre: '', // 'couple' | 'single_male' | 'single_female'
    bio: '',
    birthDate: '',
    city: '',
    
    // Стъп 2: Физическите характеристики
    height: '',
    weight: '',
    bodyType: '', // 'slim' | 'athletic' | 'average' | 'curvy' | 'muscular'
    tattoos: '', // 'none' | 'yes'
    piercings: '', // 'none' | 'yes'
    
    // Стъп 3: Допълнителна информация
    languages: [] as string[],
    maritalStatus: '', // 'single' | 'married' | 'divorced' | 'in_relationship'
    lookingFor: [] as string[], // Что сте тук за
    interests: [] as string[],
    fetishes: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setProfileData((prev) => {
      const arr = prev[field as keyof typeof prev] as string[];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    for (let i = 0; i < Math.min(files.length, 6 - images.length); i++) {
      const file = files[i];
      images.push(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviews((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
    setImages([...images]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setError('');

    if (step === 1) {
      if (!profileData.weAre) {
        setError('Моля, изберете тип профил');
        return;
      }
      if (!profileData.city) {
        setError('Моля, въведете град');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!profileData.height || !profileData.weight || !profileData.bodyType) {
        setError('Моля, попълнете всички физически характеристики');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Изпращане на данни към сървър
      setSuccess('✓ Профилът е успешно създаден!');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError('Възникна грешка при запазване на профила');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-purple-400 fill-purple-400" />
          <span className="text-2xl font-bold text-white">SwingMe</span>
        </Link>

        {/* Card */}
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Създайте вашия профил</h1>
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition ${
                    s <= step ? 'bg-purple-500' : 'bg-purple-500/30'
                  }`}
                />
              ))}
            </div>
            <p className="text-purple-300 text-sm mt-2">Стъп {step} от 3</p>
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* СТЪП 1: Основна информация */}
            {step === 1 && (
              <>
                {/* Снимки */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-3 text-sm">
                    Качване на снимки (максимум 6) *
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {imagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${idx}`}
                          className="w-full h-32 object-cover rounded-lg border border-purple-400/30"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 6 && (
                      <label className="border-2 border-dashed border-purple-400/50 rounded-lg p-4 cursor-pointer hover:border-purple-400 transition flex flex-col items-center justify-center">
                        <Upload className="w-6 h-6 text-purple-400 mb-2" />
                        <span className="text-xs text-purple-300">Добави снимка</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Ние сме */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Ние сме *</label>
                  <select
                    name="weAre"
                    value={profileData.weAre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Изберете опция...</option>
                    <option value="couple" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Двойка</option>
                    <option value="single_male" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Мъж</option>
                    <option value="single_female" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Жена</option>
                  </select>
                </div>

                {/* За мен / За нас */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">За мен / За нас</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    placeholder="Разказвайте за себе си..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition h-24 resize-none"
                  />
                </div>

                {/* Град */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Град / Местност *</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    placeholder="София, Пловдив..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                  />
                </div>

                {/* Дата на раждане */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Дата на раждане</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={profileData.birthDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                  />
                </div>
              </>
            )}

            {/* СТЪП 2: Физически характеристики */}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {/* Височина */}
                  <div>
                    <label className="block text-purple-300 font-semibold mb-2 text-sm">Височина (см) *</label>
                    <input
                      type="number"
                      name="height"
                      value={profileData.height}
                      onChange={handleChange}
                      placeholder="170"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                    />
                  </div>

                  {/* Тегло */}
                  <div>
                    <label className="block text-purple-300 font-semibold mb-2 text-sm">Тегло (кг) *</label>
                    <input
                      type="number"
                      name="weight"
                      value={profileData.weight}
                      onChange={handleChange}
                      placeholder="75"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                    />
                  </div>
                </div>

                {/* Телосложение */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Телосложение *</label>
                  <select
                    name="bodyType"
                    value={profileData.bodyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Изберете опция...</option>
                    <option value="slim" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Слабо</option>
                    <option value="athletic" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Атлетично</option>
                    <option value="average" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Средно</option>
                    <option value="curvy" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Пълно</option>
                    <option value="muscular" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Мускулно</option>
                  </select>
                </div>

                {/* Татуси */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Татуси</label>
                  <select
                    name="tattoos"
                    value={profileData.tattoos}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Изберете опция...</option>
                    <option value="none" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Няма</option>
                    <option value="yes" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Да</option>
                  </select>
                </div>

                {/* Пиърсинги */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Пиърсинги</label>
                  <select
                    name="piercings"
                    value={profileData.piercings}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Изберете опция...</option>
                    <option value="none" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Няма</option>
                    <option value="yes" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Да</option>
                  </select>
                </div>
              </>
            )}

            {/* СТЪП 3: Допълнителна информация */}
            {step === 3 && (
              <>
                {/* Говорими езици */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-3 text-sm">Говорими езици</label>
                  <div className="space-y-2">
                    {['Български', 'Английски', 'Русски', 'Немски', 'Испански'].map((lang) => (
                      <label key={lang} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.languages.includes(lang)}
                          onChange={() => handleMultiSelect('languages', lang)}
                          className="w-4 h-4 rounded bg-purple-600 border-purple-400 cursor-pointer"
                        />
                        <span className="text-purple-100">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Семейно положение */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-2 text-sm">Семейно положение</label>
                  <select
                    name="maritalStatus"
                    value={profileData.maritalStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Изберете опция...</option>
                    <option value="single" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Самотен/на</option>
                    <option value="in_relationship" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>В отношение</option>
                    <option value="married" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Женен/та</option>
                    <option value="divorced" style={{ backgroundColor: '#1e1b4b', color: '#e9d5ff' }}>Разведен/а</option>
                  </select>
                </div>

                {/* Тук сам за */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-3 text-sm">Тук съм за:</label>
                  <div className="space-y-2">
                    {['Развлечение', 'Срещи', 'Отношение', 'Дружба'].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.lookingFor.includes(option)}
                          onChange={() => handleMultiSelect('lookingFor', option)}
                          className="w-4 h-4 rounded bg-purple-600 border-purple-400 cursor-pointer"
                        />
                        <span className="text-purple-100">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Харесвания */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-3 text-sm">Харесвания</label>
                  <div className="space-y-2">
                    {['Нощни излазди', 'Пътешествия', 'Спорт', 'Мода', 'Музика'].map((interest) => (
                      <label key={interest} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.interests.includes(interest)}
                          onChange={() => handleMultiSelect('interests', interest)}
                          className="w-4 h-4 rounded bg-purple-600 border-purple-400 cursor-pointer"
                        />
                        <span className="text-purple-100">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Фетиши */}
                <div>
                  <label className="block text-purple-300 font-semibold mb-3 text-sm">Фетиши</label>
                  <textarea
                    placeholder="Опишете вашите фетиши (опционално)..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition h-20 resize-none"
                    onChange={(e) => setProfileData((prev) => ({ ...prev, fetishes: [e.target.value] }))}
                  />
                </div>
              </>
            )}

            {/* Навигация */}
            <div className="flex gap-4 pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 bg-slate-600/50 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
                >
                  Назад
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition"
                >
                  Напред
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Запазване...' : 'Запази профил'}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-purple-300 text-sm mt-6">
            Вече имате профил?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Влезте тук
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
