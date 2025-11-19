'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, LogOut, MessageSquare, Heart as HeartIcon, User, Settings, Search, Lock, Users, Star } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(74);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);
  
  // Modals and toasts от page.tsx
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTerminationOpen, setIsTerminationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [forumToast, setForumToast] = useState(false);
  const [eventsToast, setEventsToast] = useState(false);
  const [clubsToast, setClubsToast] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchUsers();
    fetchMessages();
    fetchContacts();
  }, []);

  // Toast auto-hide effects от page.tsx
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

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.status === 401) {
        // За сега използваме mock данни
        setUser({
          name: 'Нов потребител',
          email: 'user@swingme.com',
          subscription: { plan: 'free' }
        });
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error('Profile fetch error:', err);
      // Fallback към mock данни
      setUser({
        name: 'Нов потребител',
        email: 'user@swingme.com',
        subscription: { plan: 'free' }
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users?page=1');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Users fetch error:', err);
      // Mock данни за демо
      setUsers([
        {
          id: '1',
          name: 'Мария, 26',
          city: 'София',
          bio: 'Обичам приключенията и новите запознанства 💕',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop'
        },
        {
          id: '2',
          name: 'Иван и Елена, 30-28',
          city: 'Пловдив',
          bio: 'Двойка търси забавления и нови преживявания ❤️',
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
          bio: 'Веселa, отворена за нови познанства 🌸',
          avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=600&fit=crop'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages?limit=15');
      const data = await response.json();
      setMessages(data.messages || []);
      setUnreadMessages(data.unreadCount || 0);
    } catch (err) {
      console.error('Messages fetch error:', err);
      // Mock данни за демо
      setMessages([
        { id: 1, from: 'Мария', text: 'Здравей! Как си?', time: '10:30', unread: true },
        { id: 2, from: 'Иван', text: 'Благодаря за съобщението', time: '09:15', unread: true },
        { id: 3, from: 'Елена', text: 'Ще се видим ли днес?', time: 'Вчера', unread: true },
        { id: 4, from: 'Николай', text: 'Супер беше снощи!', time: '2 дни', unread: false },
        { id: 5, from: 'Стефани', text: 'Кога си свободна?', time: '3 дни', unread: false }
      ]);
      setUnreadMessages(3);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (err) {
      console.error('Contacts fetch error:', err);
      // Mock данни за демо
      setContacts([
        { id: '1', name: 'Мария', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', isOnline: true, lastSeen: 'онлайн' },
        { id: '2', name: 'Иван и Елена', avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=100&h=100&fit=crop', isOnline: false, lastSeen: 'преди 10м' },
        { id: '3', name: 'Петя', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop', isOnline: true, lastSeen: 'онлайн' },
        { id: '4', name: 'Георги', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isOnline: false, lastSeen: 'преди 2ч' },
        { id: '5', name: 'Ани', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', isOnline: true, lastSeen: 'онлайн' },
        { id: '6', name: 'Стефан', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', isOnline: false, lastSeen: 'вчера' },
        { id: '7', name: 'Виктория', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', isOnline: true, lastSeen: 'онлайн' },
        { id: '8', name: 'Димитър', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', isOnline: false, lastSeen: 'преди 30м' }
      ]);
    }
  };

  const handleLike = async (userId: string) => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likedUserId: userId }),
      });

      if (response.ok) {
        setLikedUsers((prev) => new Set([...prev, userId]));
        // Преминаване на следващия профил
        if (currentIndex < users.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handlePass = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: selectedMessage.fromId,
          text: replyText,
        }),
      });

      if (response.ok) {
        // Успешно изпратено
        setReplyText('');
        setSelectedMessage(null);
        // Показваме toast за успех
        alert('Съобщението е изпратено успешно!');
        // Презареждаме съобщенията
        fetchMessages();
      } else {
        alert('Грешка при изпращане на съобщението');
      }
    } catch (error) {
      console.error('Send reply error:', error);
      alert('Грешка при свързване със сървъра');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Зареждане...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">Трябва да сте автентифицирани</p>
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Влезте тук
          </Link>
        </div>
      </div>
    );
  }

  const currentUser = users.length > 0 ? users[currentIndex] : null;

  return (
    <>
      {/* Фонова снимка - фиксирана */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/designer.png')",
          backgroundSize: '67%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="min-h-screen relative flex flex-col z-10">
        {/* Полу-прозрачен слой за по-добра четливост */}
        <div 
          className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900/55 via-purple-900/60 to-slate-900/55 z-10 pointer-events-none"
        />
        {/* Навигация */}
        <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            {/* Лого */}
            <div className="flex items-center gap-3">
              <Heart className="w-7 h-7 text-red-500 fill-red-500 animate-[heartbeat_1.5s_ease-in-out]" />
              <span className="text-xl font-bold text-white tracking-wide">SwingMe</span>
            </div>

            {/* Икони и профил */}
            <div className="flex items-center gap-8">
              {/* Съобщения */}
              <div className="flex flex-col items-center relative cursor-pointer group">
                <div onClick={() => setIsMessagesOpen(!isMessagesOpen)} className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{unreadMessages}</span>
                  )}
                  <MessageSquare className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-gray-300 mt-1">Съобщения</span>
                {isMessagesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMessagesOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto" onMouseLeave={() => setIsMessagesOpen(false)}>
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Последни съобщения</h3>
                      </div>
                      {messages.length > 0 ? (
                        messages.map((msg) => (
                          <div key={msg.id} className={`px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 ${msg.unread ? 'bg-purple-600/20' : ''}`} onClick={() => { 
                            if (msg.unread) {
                              setUnreadMessages(prev => Math.max(0, prev - 1));
                              msg.unread = false;
                            }
                            setSelectedMessage(msg); 
                            setIsMessagesOpen(false); 
                          }}>
                            <div className="flex justify-between items-start">
                              <span className="text-white font-semibold text-sm">{msg.from}</span>
                              <span className="text-purple-300 text-xs">{msg.time}</span>
                            </div>
                            <p className="text-purple-200 text-xs mt-1 truncate">{msg.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-purple-300 text-sm">Няма съобщения</div>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* Notifications */}
              <div className="flex flex-col items-center relative group cursor-pointer" onClick={() => {
                if (unreadNotifications > 0) {
                  setUnreadNotifications(prev => Math.max(0, prev - 1));
                }
              }}>
                <div className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded px-1.5">{unreadNotifications}</span>
                  )}
                  <Star className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-gray-300 mt-1">Известия</span>
              </div>
              {/* Contacts */}
              <div className="flex flex-col items-center relative cursor-pointer group">
                <div onClick={() => setIsContactsOpen(!isContactsOpen)} className="p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Users className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-gray-300 mt-1">Контакти</span>
                {isContactsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsContactsOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto" onMouseLeave={() => setIsContactsOpen(false)}>
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Контакти ({contacts.length})</h3>
                      </div>
                      {contacts.length > 0 ? (
                        contacts.map((contact) => (
                          <div key={contact.id} className="px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 flex items-center gap-3">
                            <div className="relative">
                              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                              {contact.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-semibold text-sm">{contact.name}</div>
                              <div className="text-purple-300 text-xs">{contact.lastSeen}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-purple-300 text-sm">Няма контакти</div>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* Профил + username */}
              <div className="flex items-center gap-2 bg-gradient-to-br from-purple-600/80 to-pink-600/80 border border-purple-500/40 shadow-lg rounded px-2 py-1 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105">
                <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"} alt="profile" className="w-8 h-8 rounded object-cover" />
                <span className="text-white text-sm font-semibold">{user?.name || "SexSpiel_2022"}</span>
              </div>
              {/* Меню икона */}
              <div
                className="flex flex-col items-center cursor-pointer relative group"
                onClick={() => setIsMenuOpen((v) => !v)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="w-7 h-7 flex flex-col justify-center items-center p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110">
                  <span
                    className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                  ></span>
                </div>
                <span className="text-xs text-gray-300 mt-1">Меню</span>
                {isMenuOpen && (
                  <div className="absolute right-0 top-10 min-w-[180px] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition"
                      onClick={() => { setIsMenuOpen(false); router.push('/profile'); }}
                    >Управление на профила</button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition"
                      onClick={() => { setIsMenuOpen(false); router.push('/events/create'); }}
                    >Създаване на Event</button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600/30 transition"
                      onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    >Излизане от профила</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

      {/* Основно съдържание */}
      <div className="flex-grow">
        <div className="flex gap-8 px-4 py-12">
          {/* Сайдбар */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-6 sticky top-20">
              <h3 className="text-white font-bold mb-4">Бързи линкове</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/profile" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Моят профил
                  </Link>
                </li>
                <li>
                  <Link href="/messages" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Съобщения
                  </Link>
                </li>
                <li>
                  <Link href="/likes" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                    <HeartIcon className="w-4 h-4" />
                    Моите лайкове
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Настройки
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Карта за избор */}
          <div className="flex-1 max-w-4xl">
            {currentUser && users.length > 0 ? (
              <div className="space-y-6">
                {/* Карта */}
                <div className="relative h-96 rounded-xl overflow-hidden cursor-pointer group">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">{currentUser.name}</h2>
                    {currentUser.city && <p className="text-purple-300 mb-3">📍 {currentUser.city}</p>}
                    {currentUser.bio && <p className="text-purple-200 text-sm line-clamp-2">{currentUser.bio}</p>}
                  </div>
                </div>

                {/* Действия */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handlePass}
                    className="px-8 py-3 border border-purple-400 text-purple-300 hover:bg-purple-400/10 rounded-lg font-semibold transition"
                  >
                    Прескочи
                  </button>
                  <button
                    onClick={() => handleLike(currentUser.id)}
                    disabled={likedUsers.has(currentUser.id)}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:bg-purple-600/50 flex items-center gap-2"
                  >
                    <HeartIcon className="w-5 h-5 fill-white" />
                    Харесай
                  </button>
                  <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Съобщение
                  </button>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-center">
                    <p className="text-purple-300 text-sm">Лайкове</p>
                    <p className="text-white text-2xl font-bold">{likedUsers.size}</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-center">
                    <p className="text-purple-300 text-sm">Преглед</p>
                    <p className="text-white text-2xl font-bold">{currentIndex + 1}</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-center">
                    <p className="text-purple-300 text-sm">Всичко</p>
                    <p className="text-white text-2xl font-bold">{users.length}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            {/* Колона 1 */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Правна информация</h4>
              <ul className="space-y-1.5 text-purple-300 text-xs">
                <li><button onClick={() => setIsTermsOpen(true)} className="hover:text-purple-400 text-left w-full">Условия за ползване</button></li>
                <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-purple-400 text-left w-full">Идентификационни данни и защита на личните данни</button></li>
                <li><button onClick={() => setIsTerminationOpen(true)} className="hover:text-purple-400 text-left w-full">Прекратяване на договори тук</button></li>
              </ul>
            </div>
            {/* Колона 2 */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Поддръжка</h4>
              <ul className="space-y-1.5 text-purple-300 text-xs">
                <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-purple-400 text-left w-full">Помощ и поддръжка</button></li>
                <li><button onClick={() => setForumToast(true)} className="hover:text-purple-400 text-left w-full">Еротичен форум</button></li>
              </ul>
            </div>
            {/* Колона 3 */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Общност</h4>
              <ul className="space-y-1.5 text-purple-300 text-xs">
                <li><button onClick={() => setEventsToast(true)} className="hover:text-purple-400 text-left w-full">Събития</button></li>
                <li><button onClick={() => setClubsToast(true)} className="hover:text-purple-400 text-left w-full">Свингър клубове</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 pt-4 text-center text-purple-300 text-xs">
            <div className="flex items-center justify-center gap-2">
              <p>&copy; 2025 SwingMe. Всички права запазени.</p>
              <span className="text-purple-500">|</span>
              <p>Powered by N.Stoyanov</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button onClick={() => setIsTermsOpen(false)} className="absolute top-4 right-4 text-purple-300 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold text-white mb-6">Условия за ползване</h2>
            <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>1. Приемане на Условията и Обхват</strong><br/>Тези Условия за ползване („Условия") представляват правно обвързващо споразумение между Вас (Потребителя) и [Име на Компанията], оператор на платформата („Ние" или „Компанията"). Използвайки Услугата, Вие приемате тези Условия, включително нашата Политика за поверителност и Политика за бисквитките, които са неразделна част от споразумението.</p>
              <p><strong>2. Изисквания за Членство и Гарантии</strong><br/>Възраст: Трябва да сте навършили 18 години.<br/>Отговорност за профила: Вие гарантирате, че няма да споделяте или използвате чужд акаунт.<br/>Лична гаранция: Вие гарантирате, че не сте осъждан/а, нито сте обект на съдебно разпореждане, свързано с нападение, насилие, сексуално неправомерно поведение или тормоз. Ние си запазваме правото да извършваме проверки на криминално минало, използвайки публични регистри.</p>
              <p><strong>3. Потребителско Съдържание и Забранени Дейности</strong><br/>Вашето Съдържание: Вие носите изключителна отговорност за Вашето Съдържание (снимки, текстове, видеоклипове), което публикувате.<br/>Забранено поведение: Строго се забранява всяка форма на тормоз, сплашване, изпращане на спам, разпространение на злонамерени кодове или създаване на фалшиви профили (inauthentic behaviour).<br/>Модерация: Ние не поемаме задължение да наблюдаваме активно съдържанието, но си запазваме правото по наша преценка да премахваме всяко съдържание, което нарушава тези Условия.</p>
              <p><strong>4. Права върху Интелектуалната Собственост</strong><br/>Лиценз към Компанията: С публикуването на Вашето Съдържание, Вие предоставяте на Компанията световен, безвъзмезден, прехвърляем и сублицензируем лиценз да хоства, възпроизвежда, променя, публично показва и разпространява Вашето Съдържание с цел опериране и промотиране на Услугите.<br/>Нашата Собственост: Всички елементи на Услугата, които не са Ваше Съдържание (софтуер, търговски марки, интерфейси), са собственост на Компанията.</p>
              <p><strong>5. Абонаменти, Плащания и Право на Отказ</strong><br/>Окончателност: Всички покупки на абонаменти и Виртуални Артикули са окончателни и невъзстановими. Прехвърляне или продажба е забранено.<br/>Възстановяване: Допуска се единствено при смърт или трайна неработоспособност. При прекратен акаунт поради нарушение няма право на възстановяване.<br/>Отпадане на Правото на Отказ (ЕИП): При незабавен достъп Вие се съгласявате изпълнението да започне веднага и губите 14-дневното право на отказ (чл. 57, т. 13 ЗЗП).</p>
              <p><strong>6. Ограничаване на Отговорността</strong><br/>Отказ от гаранции: Услугата се предоставя „както е". Не гарантираме поведението или съвместимостта на други потребители.<br/>Лимит: Общата финансова отговорност към Вас няма да надвишава по-голямата сума от (А) 100 USD или (Б) сумата платена през последните 24 месеца.<br/>Обезщетение: Вие се съгласявате да обезщетите Компанията за претенции свързани с Вашето Съдържание, използване или нарушение.</p>
              <p><strong>7. Разрешаване на Спорове и Приложимо Право</strong><br/>Право: Българско право.<br/>Юрисдикция (ЕИП): Потребители от ЕИП/Обединеното кралство/Швейцария могат да предявят иск пред местните съдилища.<br/>Алтернативно разрешаване: Може да се използва Платформата за онлайн разрешаване на спорове на Европейската комисия.</p>
              <p><strong>8. Промени и Прекратяване</strong><br/>Промени: Запазваме правото да обновяваме Условията. Уведомяваме при съществени промени. Продължаващото използване след публикация = съгласие.<br/>Прекратяване: Може да прекратите акаунта си по всяко време. Можем да го прекратим при нарушение.</p>
              <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-4 right-4 text-purple-300 hover:text-white">✕</button>
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

      {/* Termination Modal */}
      {isTerminationOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button onClick={() => setIsTerminationOpen(false)} className="absolute top-4 right-4 text-purple-300 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold text-white mb-6">Прекратяване на договори</h2>
            <div className="text-purple-200 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong>1. Право на Прекратяване от Потребителя</strong><br/>Доброволно прекратяване: Можете да прекратите акаунта си по всяко време чрез функцията „Изтриване на акаунт" в настройките.<br/>Управление на абонаменти: Ако сте закупили абонамент чрез външна услуга (Apple ID / Google Play), Вие носите отговорност да анулирате автоматичното подновяване в съответния акаунт.</p>
              <p><strong>2. Прекратяване от Страна на Компанията</strong><br/>Принудително прекратяване: Запазваме правото да спрем или прекратим акаунта незабавно при нарушение на Условията, включително злоупотреба или измамно поведение.<br/>Без възстановяване: При прекратяване поради нарушение няма право на възстановяване на суми за платени абонаменти или неизползвани виртуални артикули.</p>
              <p><strong>3. Право на Отказ от Платени Услуги (ЕИП)</strong><br/>14-дневен срок за отказ: Потребителите от ЕИП по принцип имат право да се откажат от договора в 14-дневен срок.<br/>Отпадане на правото: При покупка на цифрово съдържание/услуги с незабавен достъп Вие изрично се съгласявате изпълнението да започне веднага и така губите правото си на отказ (чл. 57, т. 13 ЗЗП).<br/>Забележка: Нужно е изрично съгласие чрез отметка или утвърдителен акт при плащане.</p>
              <p><strong>4. Възстановяване на Суми (Refunds)</strong><br/>Окончателност: Всички покупки на виртуални артикули и абонаменти са окончателни и невъзстановими освен при изключения.<br/>Смърт / трайна неработоспособност: При такива случаи имате право на пропорционално възстановяване за неизползвания период.<br/>Външни услуги: Възстановявания за абонаменти през Apple ID или Google Play се управляват от съответните платформи – свържете се директно с тях.</p>
              <p className="text-xs text-purple-400">Последна актуализация: 2025</p>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-3xl w-full border border-purple-500/30 p-8 relative">
            <button onClick={() => setIsSupportOpen(false)} className="absolute top-4 right-4 text-purple-300 hover:text-white">✕</button>
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

      {/* Forum Toast */}
      {forumToast && (
        <div aria-live="polite" className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]">
          <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
            <MessageSquare className="w-5 h-5 text-purple-300 mt-0.5" />
            <div className="text-sm text-purple-100">В момента работим по създаването му ....</div>
            <button onClick={() => setForumToast(false)} className="ml-2 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
          </div>
        </div>
      )}

      {/* Events Toast */}
      {eventsToast && (
        <div aria-live="polite" className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]">
          <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
            <Star className="w-5 h-5 text-purple-300 mt-0.5" />
            <div className="text-sm text-purple-100">В момента няма информация за налижаващи събития ...</div>
            <button onClick={() => setEventsToast(false)} className="ml-2 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
          </div>
        </div>
      )}

      {/* Clubs Toast */}
      {clubsToast && (
        <div aria-live="polite" className="fixed bottom-4 right-4 z-[60] animate-[slide-in_0.2s_ease-out]">
          <div className="flex items-start gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 px-4 py-3 shadow-2xl backdrop-blur">
            <Users className="w-5 h-5 text-purple-300 mt-0.5" />
            <div className="text-sm text-purple-100">Търсим легални такива ....</div>
            <button onClick={() => setClubsToast(false)} className="ml-2 text-purple-300 hover:text-white" aria-label="Затвори">✕</button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMessage(null)}>
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-2xl w-full border border-purple-500/30 p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 text-purple-300 hover:text-white text-2xl">
              ✕
            </button>
            
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-purple-500/20">
              <img src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop`} alt={selectedMessage.from} className="w-16 h-16 rounded-full object-cover border-2 border-purple-500" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{selectedMessage.from}</h2>
                <p className="text-purple-300 text-sm">{selectedMessage.time}</p>
              </div>
              {selectedMessage.unread && (
                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Ново</span>
              )}
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
                <button 
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageSquare className="w-4 h-4" />
                  Изпрати отговор
                </button>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-2 border border-purple-400 text-purple-300 hover:bg-purple-400/10 rounded-lg font-semibold transition"
                >
                  Затвори
                </button>
              </div>
            </div>
          </div>
        </div>
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
