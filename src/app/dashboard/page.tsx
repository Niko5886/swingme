// @page DASHBOARD - главна страница след логин
// URL: /dashboard
// Описание: преглед на профили, съобщения, контакти, модали и тостове

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, MessageSquare, Users, Star, User, Search, Settings, Heart as HeartIcon } from 'lucide-react';

import TermsModal from '@/components/modals/TermsModal';
import PrivacyModal from '@/components/modals/PrivacyModal';
import TerminationModal from '@/components/modals/TerminationModal';
import SupportModal from '@/components/modals/SupportModal';
import ForumToast from '@/components/toasts/ForumToast';
import EventsToast from '@/components/toasts/EventsToast';
import ClubsToast from '@/components/toasts/ClubsToast';

type UserCard = {
  id: string;
  name: string;
  city?: string;
  bio?: string;
  avatar?: string;
};

type Message = {
  id: number;
  from: string;
  text: string;
  time: string;
  unread?: boolean;
};

type Contact = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
};

export default function DashboardPage() {
  const router = useRouter();

  // Състояния
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name?: string; avatar?: string } | null>({ name: 'SexSpiel_2022' });
  const [users, setUsers] = useState<UserCard[]>([]);
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // UI toggles
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Modals
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTerminationOpen, setIsTerminationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Notifications
  const [notifications] = useState([
    { id: 1, type: 'like', user: 'Ани_93', avatar: '👩', time: 'Преди 5 мин', text: 'хареса твоя профил' },
    { id: 2, type: 'new', user: 'Иван_М', avatar: '👨', time: 'Преди 10 мин', text: 'нов потребител в района' },
    { id: 3, type: 'like', user: 'Мария_Sofia', avatar: '👩', time: 'Преди 30 мин', text: 'хареса твоя профил' },
    { id: 4, type: 'match', user: 'Георги_Пл', avatar: '👨', time: 'Преди 1 час', text: 'имате съвпадение' },
    { id: 5, type: 'view', user: 'Елена_Varna', avatar: '👩', time: 'Преди 2 часа', text: 'видя твоя профил' }
  ]);

  // Toasts
  const [forumToast, setForumToast] = useState(false);
  const [eventsToast, setEventsToast] = useState(false);
  const [clubsToast, setClubsToast] = useState(false);

  // Mock fetches
  useEffect(() => {
    setLoading(true);
    // Профили - разширен списък за grid демонстрация
    setUsers([
      {
        id: '1',
        name: 'Мария, 28',
        city: 'София',
        bio: 'Обичам пътешествия и нови преживявания ✈️',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop'
      },
      {
        id: '2',
        name: 'Иван и Елена, 35',
        city: 'Пловдив',
        bio: 'Динамична двойка, търсим позитивни хора 💫',
        avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=600&fit=crop'
      },
      {
        id: '3',
        name: 'Николай, 32',
        city: 'Варна',
        bio: 'Спортист, обичам морето и добрата компания 🌊',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'
      },
      {
        id: '4',
        name: 'Стефани, 24',
        city: 'Бургас',
        bio: 'Весела, отворена за нови познанства 🌸',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=600&fit=crop'
      },
      {
        id: '5',
        name: 'Александър, 30',
        city: 'София',
        bio: 'Спортист и любител на природата 🏔️',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop'
      },
      {
        id: '6',
        name: 'Виктория, 26',
        city: 'Пловдив',
        bio: 'Артистична душа 🎨',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop'
      },
      {
        id: '7',
        name: 'Петър, 29',
        city: 'Варна',
        bio: 'Музикант и мечтател 🎸',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop'
      },
      {
        id: '8',
        name: 'Десислава, 27',
        city: 'София',
        bio: 'Фитнес ентусиаст 💪',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop'
      },
      {
        id: '9',
        name: 'Георги, 33',
        city: 'Бургас',
        bio: 'Предприемач и пътешественик ✈️',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop'
      },
      {
        id: '10',
        name: 'Анна, 25',
        city: 'Пловдив',
        bio: 'Йога инструктор 🧘‍♀️',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop'
      },
      {
        id: '11',
        name: 'Димитър, 31',
        city: 'Варна',
        bio: 'Професионален готвач 👨‍🍳',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=600&fit=crop'
      },
      {
        id: '12',
        name: 'Калина, 29',
        city: 'София',
        bio: 'Фотограф и креативна личност 📸',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop'
      },
      {
        id: '13',
        name: 'Мила, 28',
        city: 'София',
        bio: 'Танцьорка и любител на изкуството 💃',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop'
      },
      {
        id: '14',
        name: 'Радина, 26',
        city: 'Бургас',
        bio: 'Модел и обичам морето 🌊',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop'
      },
      {
        id: '15',
        name: 'Кристина, 30',
        city: 'Пловдив',
        bio: 'Стилист и модна консултантка 👗',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=600&fit=crop'
      }
    ]);

    // Съобщения
    setMessages([
      { id: 1, from: 'Мария', text: 'Здравей! Как си?', time: '10:30', unread: true },
      { id: 2, from: 'Иван', text: 'Благодаря за съобщението', time: '09:15', unread: true },
      { id: 3, from: 'Елена', text: 'Ще се видим ли днес?', time: 'Вчера', unread: true },
      { id: 4, from: 'Николай', text: 'Супер беше снощи!', time: '2 дни', unread: false },
      { id: 5, from: 'Стефани', text: 'Кога си свободна?', time: '3 дни', unread: false }
    ]);
    setUnreadMessages(3);

    // Контакти
    setContacts([
      { id: '1', name: 'Мария', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', isOnline: true, lastSeen: 'онлайн' },
      { id: '2', name: 'Иван и Елена', avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=100&h=100&fit=crop', isOnline: false, lastSeen: 'преди 10м' },
      { id: '3', name: 'Петя', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop', isOnline: true, lastSeen: 'онлайн' },
      { id: '4', name: 'Георги', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isOnline: false, lastSeen: 'преди 2ч' }
    ]);

    setLoading(false);
  }, []);

  const handleLike = (id: string) => {
    setLikedUsers(new Set([...likedUsers, id]));
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    // Демонстрация – просто затваряме
    setReplyText('');
    setSelectedMessage(null);
    alert('Съобщението е изпратено (демо)');
  };

  const handleLogout = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Зареждане...</div>
      </div>
    );
  }

  return (
    <>
      {/* Фонова снимка */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/designer.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80" style={{ zIndex: -1 }} />

      <div className="min-h-screen relative flex flex-col">
        {/* Навигация */}
        <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-[heartbeat_1.5s_ease-in-out_infinite]" />
              <span className="text-2xl font-bold text-white">SwingMe</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              {/* Съобщения */}
              <div className="flex items-center relative cursor-pointer group">
                <div onClick={() => setIsMessagesOpen(!isMessagesOpen)} className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{unreadMessages}</span>
                  )}
                  <MessageSquare className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Етикет премахнат за изравняване на височината */}
                {isMessagesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMessagesOpen(false)} />
                    <div className="fixed sm:absolute right-0 top-12 sm:top-12 w-full sm:w-80 max-w-md bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto mx-2 sm:mx-0" onMouseLeave={() => setIsMessagesOpen(false)}>
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Последни съобщения</h3>
                      </div>
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 ${m.unread ? 'bg-purple-600/20' : ''}`}
                          onClick={() => {
                            if (m.unread) setUnreadMessages((u) => Math.max(0, u - 1));
                            m.unread = false;
                            setSelectedMessage(m);
                            setIsMessagesOpen(false);
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-white font-semibold text-sm">{m.from}</span>
                            <span className="text-purple-300 text-xs">{m.time}</span>
                          </div>
                          <p className="text-purple-200 text-xs mt-1 truncate">{m.text}</p>
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="px-4 py-6 text-center text-purple-300 text-sm">Няма съобщения</div>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* Известия */}
              <div className="flex items-center relative cursor-pointer group">
                <div onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded px-1.5">{unreadNotifications}</span>
                  )}
                  <Star className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <div className="fixed sm:absolute right-0 top-12 sm:top-12 w-full sm:w-80 max-w-md bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto mx-2 sm:mx-0" onMouseLeave={() => setIsNotificationsOpen(false)}>
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Известия</h3>
                      </div>
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-pink-400 font-bold text-lg">12</div>
                            <div className="text-purple-300 text-xs">харесвания</div>
                          </div>
                          <div>
                            <div className="text-blue-400 font-bold text-lg">8</div>
                            <div className="text-purple-300 text-xs">нови</div>
                          </div>
                          <div>
                            <div className="text-green-400 font-bold text-lg">34</div>
                            <div className="text-purple-300 text-xs">посещения</div>
                          </div>
                        </div>
                      </div>
                      {notifications.map((notif) => (
                        <div key={notif.id} className="px-4 py-3 hover:bg-purple-500/10 border-b border-purple-500/10 cursor-pointer transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{notif.avatar}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm font-medium truncate">{notif.user}</div>
                              <div className="text-purple-300 text-xs">{notif.text}</div>
                              <div className="text-purple-400 text-xs mt-1">{notif.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="px-4 py-2 text-center">
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                          Виж всички известия
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Контакти */}
              <div className="flex items-center relative cursor-pointer group">
                <div onClick={() => setIsContactsOpen(!isContactsOpen)} className="p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Users className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Етикет премахнат */}
                {isContactsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsContactsOpen(false)} />
                    <div className="fixed sm:absolute right-0 top-12 sm:top-12 w-full sm:w-80 max-w-md bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto mx-2 sm:mx-0" onMouseLeave={() => setIsContactsOpen(false)}>
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Контакти ({contacts.length})</h3>
                      </div>
                      {contacts.map((c) => (
                        <div key={c.id} className="px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 flex items-center gap-3">
                          <div className="relative">
                            <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                            {c.isOnline && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm">{c.name}</div>
                            <div className="text-purple-300 text-xs">{c.lastSeen}</div>
                          </div>
                        </div>
                      ))}
                      {contacts.length === 0 && (<div className="px-4 py-6 text-center text-purple-300 text-sm">Няма контакти</div>)}
                    </div>
                  </>
                )}
              </div>
              {/* Профил */}
              <div
                onClick={() => router.push('/profile')}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-purple-600/80 to-pink-600/80 border border-purple-500/40 shadow-lg rounded px-2 sm:px-3 py-1 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 max-w-[100px] sm:max-w-none"
              >
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop'} alt="profile" className="w-6 sm:w-8 h-6 sm:h-8 rounded object-cover flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-white truncate">{user?.name}</span>
              </div>
              {/* Меню */}
              <div className="flex items-center cursor-pointer relative group">
                <div 
                  className="w-7 h-7 flex flex-col justify-center items-center p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110"
                  onClick={() => setIsMenuOpen((v) => !v)}
                >
                  <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
                {/* Етикет премахнат */}
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                    <div className="fixed sm:absolute right-0 sm:right-0 top-12 sm:top-10 w-full sm:w-auto min-w-[180px] max-w-xs bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 mx-2 sm:mx-0">
                      <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition" onClick={() => { setIsMenuOpen(false); router.push('/settings'); }}>Управление на профила</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition" onClick={() => { setIsMenuOpen(false); router.push('/events/create'); }}>Създаване на Event</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600/30 transition" onClick={() => { setIsMenuOpen(false); handleLogout(); }}>Излизане от профила</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Основно съдържание */}
        <div className="flex-grow">
          <div className="flex gap-4 lg:gap-8 px-2 sm:px-4 py-6 sm:py-8 lg:py-12">
            {/* Сайдбар - скрит на мобилни */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-6 sticky top-20">
                <ul className="space-y-3">
                  <li>
                    <Link href="/profile" className="text-white hover:text-purple-300 flex items-center gap-2 transition">
                      <User className="w-4 h-4" /> Моят профил
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" className="text-white hover:text-purple-300 flex items-center gap-2 transition">
                      <Search className="w-4 h-4" /> Търсене
                    </Link>
                  </li>
                  <li>
                    <Link href="/messages" className="text-white hover:text-purple-300 flex items-center gap-2 transition">
                      <MessageSquare className="w-4 h-4" /> Съобщения
                    </Link>
                  </li>
                  <li>
                    <Link href="/likes" className="text-white hover:text-purple-300 flex items-center gap-2 transition">
                      <HeartIcon className="w-4 h-4" /> Моите лайкове
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="text-white hover:text-purple-300 flex items-center gap-2 transition">
                      <Settings className="w-4 h-4" /> Настройки
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Grid на профили */}
            <div className="flex-1 max-w-7xl w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => router.push(`/user/${user.id}`)}
                  >
                    {/* Снимка на фона */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${user.avatar})` }}
                    />
                    
                    {/* Градиент overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Hover actions - бутони за харесване и съобщение */}
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 md:opacity-0 transition-opacity duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(user.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          likedUsers.has(user.id)
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/90 hover:bg-pink-500 text-gray-800 hover:text-white'
                        }`}
                      >
                        <HeartIcon className="w-4 h-4" fill={likedUsers.has(user.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUserId(user.id);
                          setShowMessageModal(true);
                        }}
                        className="w-8 h-8 bg-white/90 hover:bg-purple-500 text-gray-800 hover:text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Информация на профила */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="text-sm font-bold mb-0.5">{user.name}</h3>
                      {user.city && (
                        <p className="text-purple-300 text-xs flex items-center gap-1">
                          📍 {user.city}
                        </p>
                      )}
                      {user.bio && (
                        <p className="text-gray-300 text-[10px] mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Статистики */}
              {/* Статистики премахнати по заявка */}
            </div>
          </div>
        </div>

      </div>

      {/* Modals (компонентни) */}
      <TermsModal open={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal open={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TerminationModal open={isTerminationOpen} onClose={() => setIsTerminationOpen(false)} />
      <SupportModal open={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      {/* Toasts */}
      <ForumToast show={forumToast} onClose={() => setForumToast(false)} />
      <EventsToast show={eventsToast} onClose={() => setEventsToast(false)} />
      <ClubsToast show={clubsToast} onClose={() => setClubsToast(false)} />

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMessage(null)}>
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-2xl w-full border border-purple-500/30 p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 text-purple-300 hover:text-white text-2xl">✕</button>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-purple-500/20">
              <img src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop`} alt={selectedMessage.from} className="w-16 h-16 rounded-full object-cover border-2 border-purple-500" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{selectedMessage.from}</h2>
                <p className="text-purple-300 text-sm">{selectedMessage.time}</p>
              </div>
              {selectedMessage.unread && <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Ново</span>}
            </div>
            <div className="mb-6">
              <p className="text-white text-lg leading-relaxed">{selectedMessage.text}</p>
            </div>
            <div className="border-t border-purple-500/20 pt-4">
              <textarea
                placeholder="Напишете отговор..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition resize-none"
                rows={3}
              />
              <div className="flex gap-3 mt-3">
                <button onClick={handleSendReply} disabled={!replyText.trim()} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <MessageSquare className="w-4 h-4" /> Изпрати отговор
                </button>
                <button onClick={() => setSelectedMessage(null)} className="px-6 py-2 border border-purple-400 text-purple-300 hover:bg-purple-400/10 rounded-lg font-semibold transition">
                  Затвори
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

