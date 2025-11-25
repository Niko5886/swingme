// @page HOME - Начална страница за нерегистрирани потребители
// URL: http://localhost:3000/
// Съдържание: Hero секция, регистрация, ценови планове, features, footer

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Users, Lock, MessageCircle, Search, Star } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTerminationOpen, setIsTerminationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [forumToast, setForumToast] = useState(false);
  const [eventsToast, setEventsToast] = useState(false);
  const [clubsToast, setClubsToast] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  
  const [signupData, setSignupData] = useState({ email: '', password: '', termsAccepted: false, ageConfirmed: false });
  const [signupError, setSignupError] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [hoverPlanIndex, setHoverPlanIndex] = useState<number | null>(null);
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);
  const planHoverTimer = useRef<number | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Свържете се с хиляди потребители';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!forumToast) return;
    const t = setTimeout(() => setForumToast(false), 3000);
    return () => clearTimeout(t);
  }, [forumToast]);

  useEffect(() => {
    if (!eventsToast) return;
    const t = setTimeout(() => setEventsToast(false), 3000);
    return () => clearTimeout(t);
  }, [eventsToast]);

  useEffect(() => {
    if (!clubsToast) return;
    const t = setTimeout(() => setClubsToast(false), 3000);
    return () => clearTimeout(t);
  }, [clubsToast]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanMouseEnter = (index: number) => {
    setHoverPlanIndex(index);
    planHoverTimer.current = window.setTimeout(() => {
      setActivePlanIndex(index);
    }, 2000);
  };

  const handlePlanMouseLeave = () => {
    setHoverPlanIndex(null);
    setActivePlanIndex(null);
    if (planHoverTimer.current) {
      clearTimeout(planHoverTimer.current);
      planHoverTimer.current = null;
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupData.termsAccepted || !signupData.ageConfirmed) {
      setSignupError('Моля, приемете всички условия');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSignupOpen(false);
        // Насочваме към страница за създаване на профил
        router.push('/profile/create');
      } else {
        setSignupError(data.error || 'Грешка при регистрация');
      }
    } catch (error) {
      setSignupError('Грешка при свързване със сървъра');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoginOpen(false);
        // Насочваме към dashboard
        router.push('/dashboard');
      } else {
        setLoginError(data.error || 'Грешка при влизане');
      }
    } catch (error) {
      setLoginError('Грешка при свързване със сървъра');
    }
  };

  // Примерни профили
  const profiles = [
    {
      id: 1,
      name: 'Ева, 28',
      location: 'София',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      status: 'online',
      bio: 'Обичам приключенията и спонтанните срещи. Търся хора със сходни интереси за дискретни моменти.',
      interests: 'Пътувания, Танци, Фитнес',
      lookingFor: 'Дискретни срещи, Нови преживявания'
    },
    {
      id: 2,
      name: 'Мария, 26',
      location: 'Пловдив',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      status: 'online',
      bio: 'Енергична и отворена към нови хора. Ценя автентичността и дискретността.',
      interests: 'Музика, Изкуство, Кулинария',
      lookingFor: 'Приятелства, Забавления'
    },
    {
      id: 3,
      name: 'Александра, 31',
      location: 'Варна',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      status: 'offline',
      bio: 'Професионалистка с вкус към луксозния живот. Търся качествени срещи.',
      interests: 'Мода, Вино, Плаж',
      lookingFor: 'Луксозни преживявания'
    },
    {
      id: 4,
      name: 'Йелена, 29',
      location: 'Бургас',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
      status: 'online',
      bio: 'Свободен дух с любов към морето. Харесвам спонтанността и страстта.',
      interests: 'Йога, Плуване, Медитация',
      lookingFor: 'Релакс, Нови познанства'
    },
    {
      id: 5,
      name: 'Виктория, 27',
      location: 'София',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      status: 'online',
      bio: 'Амбициозна и любопитна. Винаги готова за ново предизвикателство.',
      interests: 'Бизнес, Нощен живот, Спорт',
      lookingFor: 'Интелигентни разговори'
    },
    {
      id: 6,
      name: 'Даниела, 30',
      location: 'Русе',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      status: 'online',
      bio: 'Романтична душа с желание за истински връзки. Ценя искреността.',
      interests: 'Четене, Кино, Природа',
      lookingFor: 'Дълбоки връзки'
    },
    {
      id: 7,
      name: 'Симона, 25',
      location: 'Стара Загора',
      image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
      status: 'offline',
      bio: 'Млада и жизнена. Обичам да се забавлявам и да срещам интересни хора.',
      interests: 'Парти, Мода, Пътешествия',
      lookingFor: 'Забавления, Приключения'
    },
    {
      id: 8,
      name: 'Николай Стоянов, 36',
      location: 'Русе',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
      status: 'online',
      bio: 'Спортист и предприемач. Ценя дискретността и качествените моменти.',
      interests: 'Спорт, Пътувания, Бизнес',
      lookingFor: 'Приключения, Нови познанства'
    },
  ];

  const features = [
    {
      icon: Heart,
      title: 'Намерете вашата двойка',
      description: 'Свържете се с хиляди единствени личности в търсене на същото като вас'
    },
    {
      icon: MessageCircle,
      title: 'Безопасна комуникация',
      description: 'Шифрована преписка и верификуван профил за ваша безопасност'
    },
    {
      icon: Search,
      title: 'Умни филтри',
      description: 'Намерете точно това, което желаете, с напредналото търсене'
    },
    {
      icon: Lock,
      title: 'Сигурност',
      description: 'Ваша информация остава поверителна и защитена'
    },
    {
      icon: Users,
      title: 'Дискретни среща',
      description: 'Намерете дискретни срещи с хора в близост до вас'
    },
    {
      icon: Star,
      title: 'Премиум услуги',
      description: 'Отключете напредналите функции с премиум членство'
    },
  ];

  return (
    <>
      {/* Фонова снимка - фиксирана */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/swingme3.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2
        }}
      />
      {/* Полу-прозрачен слой за по-добра четливост */}
      <div 
        className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80"
        style={{ zIndex: -1 }}
      />
      
    <div className="min-h-screen relative flex flex-col pb-8">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-red-500 fill-red-500 animate-[heartbeat_1.5s_ease-in-out_infinite]" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">SwingMe</span>
          </div>
          {/* removed static top links: За нас / Преглед / Цени per request */}
          <div className="hidden md:flex gap-8 text-white/80" />
          <div className="flex gap-2 sm:gap-3">
            <Link href="/login" className="px-3 sm:px-6 py-2 text-sm sm:text-base text-white hover:text-purple-400 transition font-medium">
              Вход
            </Link>
            <Link href="/register" className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
              Регистрация
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight min-h-[9rem] sm:min-h-[12rem] lg:min-h-[14rem]">
                {typedText.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-2">
                    {word.split('').map((char, charIndex) => {
                      const globalIndex = typedText.slice(0, typedText.indexOf(word)).length + charIndex;
                      return (
                        <span
                          key={charIndex}
                          className="inline-block animate-[fadeInUp_0.4s_ease-out_forwards] text-white"
                          style={{ 
                            animationDelay: `${globalIndex * 0.1}s`,
                            opacity: 0,
                            textShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(236, 72, 153, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h1>
              <p className="text-lg sm:text-xl text-purple-200 leading-relaxed">
                SwingMe е най-дискретната платформа за възрастни за намиране на частни срещи и новите приключения. Свържете се с хиляди люде в търсене на същото като вас.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="px-6 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition transform hover:scale-105 text-sm sm:text-base"
                >
                  Начало сега
                </button>
                <button 
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 sm:px-8 py-3 border border-purple-400 text-purple-300 hover:bg-purple-400/10 rounded-lg font-semibold transition text-sm sm:text-base"
                >
                  Научи повече
                </button>
              </div>
            </div>

            {/* Дясна страна - Активни членове */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 p-4 backdrop-blur">
                <div className="text-center mb-3">
                  <p className="text-purple-300 text-lg font-semibold">Хиляди активни членове</p>
                </div>
                
                {/* Мини профили grid */}
                <div className="grid grid-cols-2 gap-3">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      onClick={() => setSelectedProfile(profile.id)}
                      className="group relative overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${profile.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      <div className="relative h-40 flex flex-col justify-end p-3 text-white">
                        <div className="flex items-center gap-1 mb-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              profile.status === 'online' ? 'bg-green-400' : 'bg-red-400'
                            }`}
                          ></div>
                          <span className="text-xs">{profile.status === 'online' ? 'Онлайн' : 'Офлайн'}</span>
                        </div>
                        <h3 className="text-sm font-bold">{profile.name}</h3>
                        <p className="text-purple-300 text-xs">{profile.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Функции */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Защо да изберете SwingMe?</h2>
            <p className="text-purple-200 text-lg">Най-дискретната и безопасна платформа за възрастни</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-6 hover:border-purple-400/50 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-purple-200">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Цени */}
      <section id="pricing" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Членски планове</h2>
            <p className="text-purple-200 text-lg">Изберете план, който отговаря на ваши потребности</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '0.00 лв', features: ['Профилна страница', 'Преглед на членове', '5 харесвания на ден'] },
              { name: 'Premium', price: '9.99 лв', period: '/месец', features: ['Всичко от базова', 'Oграничени харесвания', 'Виж кой те е посетил (Ограничено)', 'Oграничени лични съобщения', 'Скрита последна активност'] },
              { name: 'VIP', price: '24.99 лв', period: '/месец', features: ['Всичко от премиум', 'VIP значка','Не ограничени харесвания','Виж кой те посещава', 'Приоритетна поддръжка', 'Не ограничени лични съобщения', 'Скрита последна активност'] },
            ].map((plan, index) => (
              <div
                key={index}
                onMouseEnter={() => handlePlanMouseEnter(index)}
                onMouseLeave={handlePlanMouseLeave}
                className={`relative group rounded-xl p-6 cursor-pointer transition-all duration-300 bg-gradient-to-br from-purple-500/60 to-pink-500/60 shadow-xl ${
                  hoverPlanIndex === index ? 'scale-105' : ''
                } ${
                  activePlanIndex === index ? 'ring-4 ring-purple-400 scale-110 z-10' : ''
                }`}
              >
                {/* Overlay for hover effect */}
                {hoverPlanIndex === index && (
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl transition-opacity duration-300 pointer-events-none ${
                      activePlanIndex === index ? 'opacity-70' : 'opacity-40'
                    }`}
                  />
                )}
                {/* content with relative positioning */}
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-purple-200 ml-2 text-sm">{plan.period}</span>}
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-purple-100 text-sm">
                        <span className="text-green-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="w-full py-2 rounded-lg font-semibold transition text-sm bg-white text-purple-600 hover:bg-purple-50 mt-auto"
                  >
                    Изберете сега
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA футър */}
      <section className="py-16 sm:py-24 border-t border-purple-500/20 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Готови ли сте да намерите вашия идеален партньор?
          </h2>
          <p className="text-purple-200 text-lg mb-8">
            Присъединете се към хиляди членове в търсене на същото като вас. Напълно дискретно и безопасно.
          </p>
          <button
            onClick={() => setIsSignupOpen(true)}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition transform hover:scale-105 inline-block"
          >
            Регистрирайте се безплатно
          </button>
        </div>
      </section>


      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-md w-full border border-purple-500/30 p-8">
            <button
              onClick={() => setIsSignupOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Регистрирайте се</h2>

            {signupError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4">
                {signupError}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Парола</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={signupData.termsAccepted}
                  onChange={(e) => setSignupData({ ...signupData, termsAccepted: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-purple-200">
                  Съгласен/согласна съм с <button type="button" onClick={() => setIsTermsOpen(true)} className="text-purple-400 hover:text-purple-300 underline">Условията</button> и <button type="button" onClick={() => setIsPrivacyOpen(true)} className="text-purple-400 hover:text-purple-300 underline">Политиката за приватност</button>
                </label>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="age"
                  checked={signupData.ageConfirmed}
                  onChange={(e) => setSignupData({ ...signupData, ageConfirmed: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="age" className="text-sm text-purple-200">
                  Потвърждавам, че съм 18+ години
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition mt-6"
              >
                Регистрирайте се
              </button>

              <p className="text-center text-purple-300 text-sm">
                Вече имате акаунт? <button type="button" onClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} className="text-purple-400 hover:text-purple-300 font-semibold">Влезте</button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-md w-full border border-purple-500/30 p-8">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Влезте в акаунта си</h2>

            {loginError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Парола</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition mt-6"
              >
                Влезте
              </button>

              <p className="text-center text-purple-300 text-sm">
                Нямате акаунт? <button type="button" onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} className="text-purple-400 hover:text-purple-300 font-semibold">Регистрирайте се</button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal - показва се само за нерегистрирани */}
      {selectedProfile !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-2xl w-full border border-purple-500/30 relative overflow-hidden">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 z-10 text-purple-300 hover:text-white bg-black/30 rounded-full p-2"
            >
              ✕
            </button>

            {(() => {
              const profile = profiles.find(p => p.id === selectedProfile);
              if (!profile) return null;

              return (
                <>
                  {/* Профилна снимка */}
                  <div className="relative h-80">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${profile.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                  </div>

                  {/* Информация за профила */}
                  <div className="p-8 relative">
                    {/* Заглавие */}
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span>{profile.location}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${profile.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span className="text-sm">{profile.status === 'online' ? 'Онлайн' : 'Офлайн'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Замъглена информация с Lock иконка */}
                    <div className="space-y-4 relative">
                      {/* Overlay за замъгляване */}
                      <div className="absolute inset-0 backdrop-blur-md bg-purple-900/20 z-10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">Регистрирайте се за пълен достъп</h3>
                          <p className="text-purple-200 mb-6">Вижте пълния профил и свържете се с {profile.name.split(',')[0]}</p>
                          <button
                            onClick={() => {
                              setSelectedProfile(null);
                              setIsSignupOpen(true);
                            }}
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
                          >
                            Регистрирайте се сега
                          </button>
                        </div>
                      </div>

                      {/* Замъглено съдържание */}
                      <div className="filter blur-sm pointer-events-none select-none">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">За мен</h3>
                          <p className="text-purple-200">{profile.bio}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Интереси</h3>
                          <p className="text-purple-200">{profile.interests}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Търся</h3>
                          <p className="text-purple-200">{profile.lookingFor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button
              onClick={() => setIsTermsOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Условия за ползване</h2>
            <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>1. Приемане на Условията и Обхват</strong><br/>Тези Условия за ползване („Условия“) представляват правно обвързващо споразумение между Вас (Потребителя) и [Име на Компанията], оператор на платформата („Ние“ или „Компанията“). Използвайки Услугата, Вие приемате тези Условия, включително нашата Политика за поверителност и Политика за бисквитките, които са неразделна част от споразумението.</p>
              <p><strong>2. Изисквания за Членство и Гаранции</strong><br/>Възраст: Трябва да сте навършили 18 години.<br/>Отговорност за профила: Вие гарантирате, че няма да споделяте или използвате чужд акаунт.<br/>Лична гаранция: Вие гарантирате, че не сте осъждан/а, нито сте обект на съдебно разпореждане, свързано с нападение, насилие, сексуално неправомерно поведение или тормоз. Ние си запазваме правото да извършваме проверки на криминално минало, използвайки публични регистри.</p>
              <p><strong>3. Потребителско Съдържание и Забранени Дейности</strong><br/>Вашето Съдържание: Вие носите изключителна отговорност за Вашето Съдържание (снимки, текстове, видеоклипове), което публикувате.<br/>Забранено поведение: Строго се забранява всяка форма на тормоз, сплашване, изпращане на спам, разпространение на злонамерени кодове или създаване на фалшиви профили (inauthentic behaviour).<br/>Модерация: Ние не поемаме задължение да наблюдаваме активно съдържанието, но си запазваме правото по наша преценка да премахваме всяко съдържание, което нарушава тези Условия.</p>
              <p><strong>4. Права върху Интелектуалната Собственост</strong><br/>Лиценз към Компанията: С публикуването на Вашето Съдържание, Вие предоставяте на Компанията световен, безвъзмезден, прехвърляем и сублицензируем лиценз да хоства, възпроизвежда, променя, публично показва и разпространява Вашето Съдържание с цел опериране и промотиране на Услугите.<br/>Нашата Собственост: Всички елементи на Услугата, които не са Ваше Съдържание (софтуер, търговски марки, интерфейси), са собственост на Компанията.</p>
              <p><strong>5. Абонаменти, Плащания и Право на Отказ</strong><br/>Окончателност: Всички покупки на абонаменти и Виртуални Артикули са окончателни и невъзстановими. Прехвърляне или продажба е забранено.<br/>Възстановяване: Допуска се единствено при смърт или трайна неработоспособност. При прекратен акаунт поради нарушение няма право на възстановяване.<br/>Отпадане на Правото на Отказ (ЕИП): При незабавен достъп Вие се съгласявате изпълнението да започне веднага и губите 14-дневното право на отказ (чл. 57, т. 13 ЗЗП).</p>
              <p><strong>6. Ограничаване на Отговорността</strong><br/>Отказ от гаранции: Услугата се предоставя „както е“. Не гарантираме поведението или съвместимостта на други потребители.<br/>Лимит: Общата финансова отговорност към Вас няма да надвишава по-голямата сума от (А) 100 USD или (Б) сумата платена през последните 24 месеца.<br/>Обезщетение: Вие се съгласявате да обезщетите Компанията за претенции свързани с Вашето Съдържание, използване или нарушение.</p>
              <p><strong>7. Разрешаване на Спорове и Приложимо Право</strong><br/>Право: Българско право.<br/>Юрисдикция (ЕИП): Потребители от ЕИП/Обединеното кралство/Швейцария могат да предявят иск пред местните съдилища.<br/>Алтернативно разрешаване: Може да се използва Платформата за онлайн разрешаване на спорове на Европейската комисия.</p>
              <p><strong>8. Промени и Прекратяване</strong><br/>Промени: Запазваме правото да обновяваме Условията. Уведомяваме при съществени промени. Продължаващото използване след публикация = съгласие.<br/>Прекратяване: Може да прекратите акаунта си по всяко време. Можем да го прекратим при нарушение.</p>
              <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}
      {/* Privacy / Data Protection Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Идентификационни данни и защита на личните данни</h2>
            <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>1. Регламент и Политика за Поверителност</strong><br/>Приложимост: Използването на Услугата се урежда от нашата Политика за поверителност, която е неразделна част от тези Условия. Ние се придържаме към изискванията на GDPR (Общия регламент за защита на данните) на ЕС.</p>
              <p>Събирани данни: Събираме и обработваме данни като възраст, пол, местоположение и контактна информация (имейл / телефон) за предоставяне на Услугата, подобряване на съвпаденията и гарантиране сигурността на акаунта.</p>
              <p><strong>2. Сигурност на Акаунта и Забранени Дейности</strong><br/>Отговорност: Вие носите отговорност за сигурността на Вашия профил и парола.<br/>Забрана за споделяне: Не е позволено да споделяте или използвате акаунт на друго лице. Вие отговаряте за всички действия извършени чрез него.<br/>Измамно поведение: Забранено е манипулативно или измамно поведение, включително създаване на фалшиви профили или опити за измама.</p>
              <p><strong>3. Достъп и Разкриване на Данни</strong><br/>Законово изискване: Запазваме правото да осъществяваме достъп, съхраняваме и разкриваме акаунт информация и Съдържание когато това е законово изискване или добросъвестно необходимо за:<br/>• Спазване на правни процедури.<br/>• Прилагане на Условията.<br/>• Отговор на искове за нарушени права на трети страни.<br/>• Защита на правата, собствеността или личната безопасност на Компанията или други лица.<br/>• Разследване, предотвратяване или предприемане на мерки срещу незаконна дейност или предполагаема измама.</p>
              <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}
      {/* Termination / Cancellation Modal */}
      {isTerminationOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button
              onClick={() => setIsTerminationOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Прекратяване на договори</h2>
            <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>1. Право на Прекратяване от Потребителя</strong><br/>Доброволно прекратяване: Можете да прекратите акаунта си по всяко време чрез функцията „Изтриване на акаунт“ в настройките.<br/>Управление на абонаменти: Ако сте закупили абонамент чрез външна услуга (Apple ID / Google Play), Вие носите отговорност да анулирате автоматичното подновяване в съответния акаунт.</p>
              <p><strong>2. Прекратяване от Страна на Компанията</strong><br/>Принудително прекратяване: Запазваме правото да спрем или прекратим акаунта незабавно при нарушение на Условията, включително злоупотреба или измамно поведение.<br/>Без възстановяване: При прекратяване поради нарушение няма право на възстановяване на суми за платени абонаменти или неизползвани виртуални артикули.</p>
              <p><strong>3. Право на Отказ от Платени Услуги (ЕИП)</strong><br/>14-дневен срок за отказ: Потребителите от ЕИП по принцип имат право да се откажат от договора в 14-дневен срок.<br/>Отпадане на правото: При покупка на цифрово съдържание/услуги с незабавен достъп Вие изрично се съгласявате изпълнението да започне веднага и така губите правото си на отказ (чл. 57, т. 13 ЗЗП).<br/>Забележка: Нужно е изрично съгласие чрез отметка или утвърдителен акт при плащане.</p>
              <p><strong>4. Възстановяване на Суми (Refunds)</strong><br/>Окончателност: Всички покупки на виртуални артикули и абонаменти са окончателни и невъзстановими освен при изключения.<br/>Смърт / трайна неработоспособност: При такива случаи имате право на пропорционално възстановяване за неизползвания период.<br/>Външни услуги: Възстановявания за абонаменти през Apple ID или Google Play се управляват от съответните платформи – свържете се директно с тях.</p>
              <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}
      {/* Support & Help Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button
              onClick={() => setIsSupportOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Помощ и поддръжка</h2>
            <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>Секция: Помощ и Поддръжка, Разрешаване на Спорове и Жалби</strong></p>
              <p><strong>1. Контакти и Обща Поддръжка</strong><br/>Център за Помощ: За най-бързо разрешаване на често срещани проблеми (акаунт, плащания, технически) използвайте нашия онлайн Център за Помощ [линк] или формата за заявки към обслужване на клиенти.<br/>Официален адрес за кореспонденция: [добавете адрес].</p>
              <p><strong>2. Докладване на Съдържание и Поведение</strong><br/>Механизъм за докладване (Notice and Action): Осигуряваме леснодостъпен механизъм за докладване на незаконно съдържание или съдържание/поведение нарушаващо Условията (тормоз, злоупотреби, фалшиви профили).<br/>Решения по модерация (DSA): При премахване или ограничаване на достъп Ви уведомяваме с мотиви. Имате право на вътрешно обжалване съгласно Регламента за цифровите услуги (DSA).</p>
              <p><strong>3. Разрешаване на Спорове и Права на Потребителите от ЕИП</strong><br/>Приложимо право и юрисдикция: Българско право.<br/>Права (ЕИП): Като потребител от ЕИП / Обединеното кралство / Швейцария можете: (а) да търсите защита пред съдилищата по местопребиваване; (б) да подадете жалба до местния регулаторен орган; (в) да използвате сертифицирани органи за извънсъдебно разрешаване (DSA).<br/>ODR Платформа: Можете да използвате платформата за онлайн разрешаване на спорове на Европейската комисия (ODR). Не сме задължени, но можем по избор да участваме.</p>
              <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}
      {/* Forum toast */}
      {forumToast && (
        <div
          aria-live="polite"
          className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]"
        >
          <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
            <MessageCircle className="w-5 h-5 text-purple-300 mt-0.5" />
            <div className="text-sm text-purple-100">
              В момента работим по създаването му ....
            </div>
            <button
              onClick={() => setForumToast(false)}
              className="ml-2 text-purple-300 hover:text-white"
              aria-label="Затвори"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Events toast */}
      {eventsToast && (
        <div
          aria-live="polite"
          className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]"
        >
          <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
            <Star className="w-5 h-5 text-purple-300 mt-0.5" />
            <div className="text-sm text-purple-100">
              В момента няма информация за налижаващи събития ...
            </div>
            <button
              onClick={() => setEventsToast(false)}
              className="ml-2 text-purple-300 hover:text-white"
              aria-label="Затвори"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Clubs toast */}
      {clubsToast && (
        <div
          aria-live="polite"
          className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]"
        >
          <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
            <Users className="w-5 h-5 text-purple-300 mt-0.5" />
            <div className="text-sm text-purple-100">
              Търсим легални такива ....
            </div>
            <button
              onClick={() => setClubsToast(false)}
              className="ml-2 text-purple-300 hover:text-white"
              aria-label="Затвори"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 p-3 sm:p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-md border border-purple-400/30"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
    </>
  );
}
