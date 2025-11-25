// @page USER PROFILE - Подробна страница за потребител
// URL: http://localhost:3000/user/[id]
// Съдържание: Пълна информация за профила

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Heart, MessageSquare, X, MapPin, Briefcase, GraduationCap, Users, Target, Calendar, Info, Star, Menu, Bell, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Пълна база данни с профили
const profilesDatabase: Record<string, {
  id: string;
  name: string;
  age: number;
  city: string;
  gender: string;
  education: string;
  maritalStatus: string;
  hobbies: string[];
  profession: string;
  lookingFor: string;
  bio: string;
  avatar: string;
  photos: string[];
  isOnline: boolean;
}> = {
  '1': {
    id: '1',
    name: 'Мария',
    age: 28,
    city: 'София',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Свободна',
    hobbies: ['Пътувания', 'Фотография', 'Йога'],
    profession: 'Маркетинг мениджър',
    lookingFor: 'Търся интересни хора за приятелство и повече',
    bio: 'Обичам пътешествия и нови преживявания ✈️',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '2': {
    id: '2',
    name: 'Иван и Елена',
    age: 35,
    city: 'Пловдив',
    gender: 'Двойка',
    education: 'Висше',
    maritalStatus: 'Женени',
    hobbies: ['Танци', 'Спорт', 'Пътувания'],
    profession: 'Предприемачи',
    lookingFor: 'Търсим двойки и сингъли за приятелства и нови преживявания',
    bio: 'Динамична двойка, търсим позитивни хора 💫',
    avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=500&h=600&fit=crop'
    ],
    isOnline: false
  },
  '3': {
    id: '3',
    name: 'Николай',
    age: 32,
    city: 'Варна',
    gender: 'Мъж',
    education: 'Висше',
    maritalStatus: 'Свободен',
    hobbies: ['Плуване', 'Фитнес', 'Ветроходство'],
    profession: 'IT специалист',
    lookingFor: 'Търся интересни жени за приключения',
    bio: 'Спортист, обичам морето и добрата компания 🌊',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '4': {
    id: '4',
    name: 'Стефани',
    age: 24,
    city: 'Бургас',
    gender: 'Жена',
    education: 'Средно',
    maritalStatus: 'Свободна',
    hobbies: ['Музика', 'Танци', 'Плаж'],
    profession: 'Барман',
    lookingFor: 'Отворена за нови познанства и забавления',
    bio: 'Весела, отворена за нови познанства 🌸',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '5': {
    id: '5',
    name: 'Александър',
    age: 30,
    city: 'София',
    gender: 'Мъж',
    education: 'Висше',
    maritalStatus: 'Разведен',
    hobbies: ['Планинарство', 'Колоездене', 'Фотография'],
    profession: 'Архитект',
    lookingFor: 'Търся дискретни срещи с интересни жени',
    bio: 'Спортист и любител на природата 🏔️',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop'
    ],
    isOnline: false
  },
  '6': {
    id: '6',
    name: 'Виктория',
    age: 26,
    city: 'Пловдив',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Свободна',
    hobbies: ['Рисуване', 'Музика', 'Театър'],
    profession: 'Графичен дизайнер',
    lookingFor: 'Търся креативни души за приятелство',
    bio: 'Артистична душа 🎨',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '7': {
    id: '7',
    name: 'Петър',
    age: 29,
    city: 'Варна',
    gender: 'Мъж',
    education: 'Висше',
    maritalStatus: 'Свободен',
    hobbies: ['Музика', 'Концерти', 'Кино'],
    profession: 'Музикант',
    lookingFor: 'Търся вдъхновяващи жени',
    bio: 'Музикант и мечтател 🎸',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop'
    ],
    isOnline: false
  },
  '8': {
    id: '8',
    name: 'Десислава',
    age: 27,
    city: 'София',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Свободна',
    hobbies: ['Фитнес', 'Здравословно хранене', 'Спа'],
    profession: 'Фитнес инструктор',
    lookingFor: 'Търся активни и спортни хора',
    bio: 'Фитнес ентусиаст 💪',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '9': {
    id: '9',
    name: 'Георги',
    age: 33,
    city: 'Бургас',
    gender: 'Мъж',
    education: 'Висше',
    maritalStatus: 'Разведен',
    hobbies: ['Пътешествия', 'Бизнес', 'Яхти'],
    profession: 'Предприемач',
    lookingFor: 'Търся успешни жени за приключения',
    bio: 'Предприемач и пътешественик ✈️',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop'
    ],
    isOnline: false
  },
  '10': {
    id: '10',
    name: 'Анна',
    age: 25,
    city: 'Пловдив',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Свободна',
    hobbies: ['Йога', 'Медитация', 'Природа'],
    profession: 'Йога инструктор',
    lookingFor: 'Търся хармония и споделени моменти',
    bio: 'Йога инструктор 🧘‍♀️',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '11': {
    id: '11',
    name: 'Димитър',
    age: 31,
    city: 'Варна',
    gender: 'Мъж',
    education: 'Специализирано',
    maritalStatus: 'Свободен',
    hobbies: ['Готвене', 'Виноделие', 'Ресторанти'],
    profession: 'Шеф-готвач',
    lookingFor: 'Търся ценители на кулинарията',
    bio: 'Професионален готвач 👨‍🍳',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '12': {
    id: '12',
    name: 'Калина',
    age: 29,
    city: 'София',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Свободна',
    hobbies: ['Фотография', 'Пътувания', 'Изкуство'],
    profession: 'Фотограф',
    lookingFor: 'Търся креативни и артистични души',
    bio: 'Фотограф и креативна личност 📸',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop'
    ],
    isOnline: false
  },
  '13': {
    id: '13',
    name: 'Мила',
    age: 28,
    city: 'София',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Свободна',
    hobbies: ['Танци', 'Изкуство', 'Мода'],
    profession: 'Танцьорка',
    lookingFor: 'Търся страстни и енергични хора',
    bio: 'Танцьорка и любител на изкуството 💃',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '14': {
    id: '14',
    name: 'Радина',
    age: 26,
    city: 'Бургас',
    gender: 'Жена',
    education: 'Средно',
    maritalStatus: 'Свободна',
    hobbies: ['Плаж', 'Мода', 'Фотография'],
    profession: 'Модел',
    lookingFor: 'Отворена за интересни срещи',
    bio: 'Модел и обичам морето 🌊',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop'
    ],
    isOnline: true
  },
  '15': {
    id: '15',
    name: 'Кристина',
    age: 30,
    city: 'Пловдив',
    gender: 'Жена',
    education: 'Висше',
    maritalStatus: 'Разведена',
    hobbies: ['Мода', 'Шопинг', 'Пътувания'],
    profession: 'Стилист',
    lookingFor: 'Търся стилни и успешни мъже',
    bio: 'Стилист и модна консултантка 👗',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=600&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=600&fit=crop'
    ],
    isOnline: false
  }
};

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [profile, setProfile] = useState<typeof profilesDatabase[string] | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId && profilesDatabase[userId]) {
      setProfile(profilesDatabase[userId]);
    } else {
      // Ако профилът не съществува, връщаме към dashboard
      router.push('/dashboard');
    }
  }, [userId, router]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Зареждане...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-red-500 fill-red-500" />
            <Link href="/dashboard" className="text-xl sm:text-2xl font-bold text-white hover:text-purple-300 transition">
              SwingMe
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div ref={notificationsRef} className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-purple-300 hover:text-white transition"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {isNotificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur rounded-xl border border-purple-500/30 shadow-2xl z-50">
                    <div className="p-4 border-b border-purple-500/20">
                      <h3 className="text-white font-semibold">Известия</h3>
                    </div>
                    <div className="p-2 max-h-96 overflow-y-auto">
                      <div className="p-3 hover:bg-purple-500/10 rounded-lg cursor-pointer">
                        <p className="text-purple-100 text-sm">12 нови харесвания</p>
                        <p className="text-purple-300 text-xs mt-1">Преди 5 минути</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                <ChevronDown className="w-4 h-4 text-white" />
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur rounded-xl border border-purple-500/30 shadow-2xl z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-purple-100 hover:bg-purple-500/10 transition"
                    >
                      Моят профил
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 text-purple-100 hover:bg-purple-500/10 transition"
                    >
                      Управление на профила
                    </Link>
                    <button
                      onClick={() => router.push('/')}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-purple-500/10 transition"
                    >
                      Изход
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Съдържание */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 text-purple-300 hover:text-white transition flex items-center gap-2"
        >
          ← Назад
        </button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Лява колона - Основна информация */}
          <div className="md:col-span-1 space-y-6">
            {/* Главна снимка */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 p-6 backdrop-blur">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full aspect-square object-cover rounded-xl cursor-pointer"
                  onClick={() => setSelectedPhoto(profile.avatar)}
                />
                {profile.isOnline && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">Онлайн</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white mt-4">{profile.name}, {profile.age}</h1>
              <p className="text-purple-300 flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4" />
                {profile.city}
              </p>

              {/* Действия */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                  {isLiked ? 'Харесан' : 'Харесай'}
                </button>
                <button
                  onClick={() => router.push('/messages')}
                  className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Съобщение
                </button>
              </div>
            </div>

            {/* Кратка информация */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 p-6 backdrop-blur">
              <h2 className="text-xl font-bold text-white mb-4">Информация</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-400">Пол</p>
                    <p className="text-white">{profile.gender}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-400">Години</p>
                    <p className="text-white">{profile.age} години</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-400">Семейно положение</p>
                    <p className="text-white">{profile.maritalStatus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-400">Образование</p>
                    <p className="text-white">{profile.education}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-400">Професия</p>
                    <p className="text-white">{profile.profession}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Дясна колона - Детайли */}
          <div className="md:col-span-2 space-y-6">
            {/* За мен */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 p-6 backdrop-blur">
              <h2 className="text-xl font-bold text-white mb-4">За мен</h2>
              <p className="text-purple-100 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Какво търся */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 p-6 backdrop-blur">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-300" />
                Какво търся в сайта
              </h2>
              <p className="text-purple-100 leading-relaxed">{profile.lookingFor}</p>
            </div>

            {/* Хобита */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 p-6 backdrop-blur">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-300" />
                Хобита и интереси
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-100 rounded-full text-sm transition"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            {/* Галерия */}
            {profile.photos.length > 1 && (
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-4">Галерия</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {profile.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Снимка ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                      onClick={() => setSelectedPhoto(photo)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модал за снимка */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-purple-300 transition"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedPhoto}
            alt="Пълен размер"
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
