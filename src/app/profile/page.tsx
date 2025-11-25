// @page PROFILE - Моят профил и управление на данни
// URL: http://localhost:3000/profile
// Съдържание: Редакция на лична информация, качване на снимки, управление на приятелства

'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, User, Upload, X, Settings, LogOut, UserMinus, Camera, Edit2, Save, MapPin, Calendar, Mail, Phone, MessageSquare, Star, Users, Menu } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Състояния за навигация
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(74);
  
  const [messages] = useState([
    { id: 1, from: 'Мария', text: 'Здравей! Как си?', time: 'преди 5 мин', unread: true },
    { id: 2, from: 'Петър', text: 'Благодаря за съобщението', time: 'преди 1 час', unread: false },
  ]);

  const [contacts] = useState([
    { id: 1, name: 'Елена', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop', online: true, lastSeen: 'онлайн' },
    { id: 2, name: 'Иван', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop', online: false, lastSeen: 'преди 10 мин' },
  ]);

  const [notifications] = useState([
    { id: 1, type: 'like', user: 'Мария, 28', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop', time: 'преди 5 мин', text: 'харесва твоя профил' },
    { id: 2, type: 'like', user: 'Александра, 31', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop', time: 'преди 15 мин', text: 'харесва твоя профил' },
    { id: 3, type: 'new_user', user: 'Кристина, 29', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop', time: 'преди 1 час', text: 'нов потребител в София' },
    { id: 4, type: 'match', user: 'Елена, 26', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop', time: 'преди 2 часа', text: 'взаимно харесване! 💕' },
    { id: 5, type: 'view', user: 'Ивана, 32', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop', time: 'преди 3 часа', text: 'посети твоя профил' },
  ]);

  const [user] = useState({
    name: 'Николай',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop'
  });
  
  // Състояния за профила
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Николай Стоянов',
    email: 'nikola@swingme.com',
    phone: '+359 888 123 456',
    age: '28',
    city: 'София',
    bio: 'Обичам да пътувам, да опознавам нови хора и да се забавлявам. Търся интересни приключения и нови познанства.',
    interests: 'Пътуване, спорт, музика, изкуство',
    lookingFor: 'Приятелства и забавления',
  });

  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
  ]);

  const [friends, setFriends] = useState([
    { id: 1, name: 'Мария Иванова', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', status: 'online' },
    { id: 2, name: 'Петър Георгиев', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', status: 'offline' },
    { id: 3, name: 'Елена Димитрова', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', status: 'online' },
    { id: 4, name: 'Иван Петров', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', status: 'offline' },
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Тук би трябвало да запазите данните към backend
    console.log('Запазени данни:', profileData);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Симулация на качване на снимка
      const newPhotoUrl = URL.createObjectURL(files[0]);
      setPhotos(prev => [...prev, newPhotoUrl]);
    }
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFriend = (friendId: number) => {
    setFriendToDelete(friendId);
    setShowDeleteConfirm(true);
  };

  const confirmRemoveFriend = () => {
    if (friendToDelete !== null) {
      setFriends(prev => prev.filter(f => f.id !== friendToDelete));
      setShowDeleteConfirm(false);
      setFriendToDelete(null);
    }
  };

  const handleLogout = () => {
    // Логика за изход
    router.push('/');
  };

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
      
      <div className="min-h-screen relative flex flex-col z-10">
        {/* Полу-прозрачен слой */}
        <div 
          className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80 pointer-events-none"
          style={{ zIndex: -1 }}
        />

        {/* Навигация */}
        <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Лого */}
            <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition">
              <Heart className="w-7 h-7 text-red-500 fill-red-500 animate-[heartbeat_1.5s_ease-in-out_infinite]" />
              <span className="text-xl font-bold text-white tracking-wide">SwingMe</span>
            </Link>

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
                <Link href="/messages" className="text-xs text-gray-300 mt-1 hover:text-purple-300 transition">Съобщения</Link>
                {isMessagesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMessagesOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Последни съобщения</h3>
                      </div>
                      {messages.map((msg) => (
                        <div key={msg.id} className={`px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 ${msg.unread ? 'bg-purple-600/20' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-white font-semibold text-sm">{msg.from}</span>
                            <span className="text-purple-300 text-xs">{msg.time}</span>
                          </div>
                          <p className="text-purple-200 text-xs line-clamp-2">{msg.text}</p>
                        </div>
                      ))}
                      <Link href="/messages" className="block px-4 py-3 text-center text-purple-300 hover:text-white hover:bg-purple-600/30 text-sm font-medium transition">
                        Виж всички съобщения →
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Известия */}
              <div className="flex flex-col items-center relative cursor-pointer group">
                <div onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{unreadNotifications}</span>
                  )}
                  <Star className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-gray-300 mt-1">Известия</span>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 border-b border-purple-500/20">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold text-sm">Известия</h3>
                          <span className="text-purple-300 text-xs">{notifications.length} нови</span>
                        </div>
                      </div>
                      
                      {/* Статистика */}
                      <div className="px-4 py-3 bg-purple-900/20 border-b border-purple-500/20">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-purple-400 text-xs">Харесвания</div>
                            <div className="text-white font-bold text-lg">12</div>
                          </div>
                          <div>
                            <div className="text-purple-400 text-xs">Нови</div>
                            <div className="text-white font-bold text-lg">8</div>
                          </div>
                          <div>
                            <div className="text-purple-400 text-xs">Посещения</div>
                            <div className="text-white font-bold text-lg">34</div>
                          </div>
                        </div>
                      </div>

                      {notifications.map((notif) => (
                        <div key={notif.id} className="px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 transition">
                          <div className="flex gap-3">
                            <img src={notif.avatar} alt={notif.user} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="text-white font-semibold text-sm">{notif.user}</span>
                                <span className="text-purple-300 text-xs whitespace-nowrap">{notif.time}</span>
                              </div>
                              <p className="text-purple-200 text-xs">{notif.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="px-4 py-3 text-center border-t border-purple-500/20">
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition">
                          Виж всички известия
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Контакти */}
              <div className="flex flex-col items-center relative cursor-pointer group">
                <div onClick={() => setIsContactsOpen(!isContactsOpen)} className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Users className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-gray-300 mt-1">Контакти</span>
                {isContactsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsContactsOpen(false)} />
                    <div className="absolute right-0 top-12 w-72 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <h3 className="text-white font-semibold text-sm">Контакти</h3>
                      </div>
                      {contacts.map((contact) => (
                        <div key={contact.id} className="px-4 py-3 hover:bg-purple-600/30 cursor-pointer border-b border-purple-500/10 flex items-center gap-3">
                          <div className="relative">
                            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm">{contact.name}</div>
                            <div className="text-purple-300 text-xs">{contact.lastSeen}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Профил + username */}
              <div 
                onClick={() => router.push('/profile')}
                className="flex items-center gap-2 bg-gradient-to-br from-purple-600/80 to-pink-600/80 border border-purple-500/40 shadow-lg rounded px-2 py-1 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
              >
                <img src={user?.avatar} alt="profile" className="w-8 h-8 rounded object-cover" />
                <span className="text-white text-sm font-semibold">{user?.name}</span>
              </div>

              {/* Меню икона */}
              <div className="flex flex-col items-center cursor-pointer relative group">
                <div 
                  className="w-7 h-7 flex flex-col justify-center items-center p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110"
                  onClick={() => setIsMenuOpen((v) => !v)}
                >
                  <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
                <span className="text-xs text-gray-300 mt-1">Меню</span>
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                    <div className="absolute right-0 top-10 min-w-[180px] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition"
                        onClick={() => { setIsMenuOpen(false); router.push('/dashboard'); }}
                      >Начало</button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition"
                        onClick={() => { setIsMenuOpen(false); router.push('/settings'); }}
                      >Управление на профила</button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600/30 transition"
                        onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                      >Изход</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Съдържание */}
        <div className="flex-grow relative z-20 py-8">
          <div className="max-w-6xl mx-auto px-4 space-y-6">
            
            {/* Заглавие */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Моят профил</h1>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Редактирай
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    <Save className="w-4 h-4" />
                    Запази
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                  >
                    Откажи
                  </button>
                </div>
              )}
            </div>

            {/* Основна информация и Снимки - Grid layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Основна информация */}
              <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 h-full">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Основна информация
                </h2>
                <div className="space-y-3 overflow-y-auto max-h-[600px]">
                  {/* Име */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Име</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white font-semibold">{profileData.name}</p>
                    )}
                  </div>

                  {/* Възраст */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Възраст</label>
                    {isEditing ? (
                      <input 
                        type="number"
                        value={profileData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        {profileData.age} години
                      </p>
                    )}
                  </div>

                  {/* Град */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Град</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        {profileData.city}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Email</label>
                    {isEditing ? (
                      <input 
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white font-semibold flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        {profileData.email}
                      </p>
                    )}
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Телефон</label>
                    {isEditing ? (
                      <input 
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-400" />
                        {profileData.phone}
                      </p>
                    )}
                  </div>

                  {/* Търся */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Търся</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={profileData.lookingFor}
                        onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white font-semibold">{profileData.lookingFor}</p>
                    )}
                  </div>

                  {/* Биография */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">За мен</label>
                    {isEditing ? (
                      <textarea 
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 resize-none"
                      />
                    ) : (
                      <p className="text-white">{profileData.bio}</p>
                    )}
                  </div>

                  {/* Интереси */}
                  <div>
                    <label className="block text-purple-300 text-sm mb-1">Интереси</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={profileData.interests}
                        onChange={(e) => handleInputChange('interests', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <p className="text-white">{profileData.interests}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Снимки */}
              <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Моите снимки
                  </h2>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Качи
                  </button>
                  <input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[600px]">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Снимка ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-purple-500/30"
                      />
                      <button 
                        onClick={() => handleDeletePhoto(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Приятелства */}
            <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Моите приятели ({friends.length})
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 bg-white/5 border border-purple-400/20 rounded-lg hover:bg-white/10 transition">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={friend.avatar} 
                          alt={friend.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                        />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{friend.name}</p>
                        <p className="text-purple-300 text-xs">{friend.status === 'online' ? 'Онлайн' : 'Офлайн'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition"
                      title="Премахни приятелство"
                    >
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 py-2 mt-auto relative z-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-black text-xs">&copy; 2025 SwingMe. Всички права запазени. | Powered by N.Stoyanov</p>
          </div>
        </footer>
      </div>

      {/* Confirmation Modal за изтриване на приятел */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-md w-full border border-purple-500/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Потвърждение</h3>
            <p className="text-purple-200 mb-6">Сигурни ли сте, че искате да премахнете това приятелство?</p>
            <div className="flex gap-3">
              <button 
                onClick={confirmRemoveFriend}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
              >
                Да, премахни
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
              >
                Откажи
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.15); }
          20% { transform: scale(1); }
          30% { transform: scale(1.15); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
