// @page SEARCH - Търсене и филтриране на потребители
// URL: http://localhost:3000/search
// Съдържание: Филтри (пол, възраст, град, семейно положение), резултати с grid layout

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, MessageSquare, Star, Users, User, Search, Filter, X } from 'lucide-react';

export default function SearchPage() {
  const router = useRouter();

  // Състояния за навигация
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const [user] = useState({
    name: 'Потребител',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop'
  });

  // Филтри за търсене
  const [filters, setFilters] = useState({
    gender: '',
    ageFrom: '',
    ageTo: '',
    city: '',
    lookingFor: '',
    withPhotosOnly: false,
    relationshipStatus: '',
  });

  const [searchResults, setSearchResults] = useState([
    { 
      id: 1, 
      name: 'Мария Иванова', 
      age: 28, 
      city: 'София', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      bio: 'Обичам пътуванията и новите приключения',
      relationshipStatus: 'Необвързан/а',
      gender: 'Жена'
    },
    { 
      id: 2, 
      name: 'Петър Георгиев', 
      age: 32, 
      city: 'Пловдив', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      bio: 'Спортист и любител на природата',
      relationshipStatus: 'В отношения',
      gender: 'Мъж'
    },
    { 
      id: 3, 
      name: 'Елена Димитрова', 
      age: 25, 
      city: 'Варна', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Любител на изкуството и музиката',
      relationshipStatus: 'Необвързан/а',
      gender: 'Жена'
    },
    { 
      id: 4, 
      name: 'Иван Петров', 
      age: 35, 
      city: 'София', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      bio: 'IT специалист, обичам технологиите',
      relationshipStatus: 'Необвързан/а',
      gender: 'Мъж'
    },
  ]);

  const [filteredResults, setFilteredResults] = useState(searchResults);

  const handleFilterChange = (field: string, value: any) => {
    // Валидация за възраст
    if (field === 'ageFrom') {
      const age = parseInt(value);
      if (value !== '' && age < 18) {
        value = '18'; // Коригира към минимум 18
      }
    }
    if (field === 'ageTo') {
      const age = parseInt(value);
      if (value !== '' && age < 18) {
        value = '18'; // Коригира към минимум 18
      }
      if (value !== '' && age > 68) {
        value = '68'; // Коригира към максимум 68
      }
    }
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    let results = [...searchResults];

    // Филтър по пол
    if (filters.gender) {
      results = results.filter(user => user.gender === filters.gender);
    }

    // Филтър по възраст
    if (filters.ageFrom) {
      results = results.filter(user => user.age >= parseInt(filters.ageFrom));
    }
    if (filters.ageTo) {
      results = results.filter(user => user.age <= parseInt(filters.ageTo));
    }

    // Филтър по град
    if (filters.city) {
      results = results.filter(user => user.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    // Филтър по семейно положение
    if (filters.relationshipStatus) {
      results = results.filter(user => user.relationshipStatus === filters.relationshipStatus);
    }

    setFilteredResults(results);
  };

  const handleClearFilters = () => {
    setFilters({
      gender: '',
      ageFrom: '',
      ageTo: '',
      city: '',
      lookingFor: '',
      withPhotosOnly: false,
      relationshipStatus: '',
    });
    setFilteredResults(searchResults);
  };

  const handleLogout = () => {
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
                <span className="text-xs text-gray-300 mt-1">Съобщения</span>
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
                    </div>
                  </>
                )}
              </div>

              {/* Известия */}
              <div className="flex flex-col items-center relative cursor-pointer group">
                <div className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{unreadNotifications}</span>
                  )}
                  <Star className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-gray-300 mt-1">Известия</span>
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
              <div
                className="flex flex-col items-center cursor-pointer relative group"
                onClick={() => setIsMenuOpen((v) => !v)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="w-7 h-7 flex flex-col justify-center items-center p-2 rounded-lg transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110">
                  <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
                <span className="text-xs text-gray-300 mt-1">Меню</span>
                {isMenuOpen && (
                  <div className="absolute right-0 top-10 min-w-[180px] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl py-2 z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition"
                      onClick={() => { setIsMenuOpen(false); router.push('/dashboard'); }}
                    >Начало</button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/30 transition"
                      onClick={() => { setIsMenuOpen(false); router.push('/profile'); }}
                    >Управление на профила</button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600/30 transition"
                      onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    >Изход</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Съдържание */}
        <div className="flex-grow relative z-20 py-8">
          <div className="max-w-7xl mx-auto px-4">
            
            <h1 className="text-3xl font-bold text-white mb-6">Търсене на потребители</h1>

            <div className="grid lg:grid-cols-4 gap-6">
              
              {/* Филтри - Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Филтри
                    </h2>
                    <button 
                      onClick={handleClearFilters}
                      className="text-purple-300 hover:text-white text-sm flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Изчисти
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Пол */}
                    <div>
                      <label className="block text-purple-300 text-sm mb-2">Пол</label>
                      <select 
                        value={filters.gender}
                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 [&>option]:bg-slate-900 [&>option]:text-white"
                      >
                        <option value="">Всички</option>
                        <option value="Мъж">Мъж</option>
                        <option value="Жена">Жена</option>
                        <option value="Двойка">Двойка</option>
                      </select>
                    </div>

                    {/* Възраст от-до */}
                    <div>
                      <label className="block text-purple-300 text-sm mb-2">Възраст</label>
                      <div className="flex gap-2">
                        <input 
                          type="number"
                          placeholder="От"
                          min="18"
                          max="68"
                          value={filters.ageFrom}
                          onChange={(e) => handleFilterChange('ageFrom', e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                        />
                        <input 
                          type="number"
                          placeholder="До"
                          min="18"
                          max="68"
                          value={filters.ageTo}
                          onChange={(e) => handleFilterChange('ageTo', e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>

                    {/* Град */}
                    <div>
                      <label className="block text-purple-300 text-sm mb-2">Град</label>
                      <input 
                        type="text"
                        placeholder="Въведете град..."
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    {/* Да търсят */}
                    <div>
                      <label className="block text-purple-300 text-sm mb-2">Да търсят</label>
                      <select 
                        value={filters.lookingFor}
                        onChange={(e) => handleFilterChange('lookingFor', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 [&>option]:bg-slate-900 [&>option]:text-white"
                      >
                        <option value="">Всички</option>
                        <option value="Приятелства">Приятелства</option>
                        <option value="Връзка">Връзка</option>
                        <option value="Забавления">Забавления</option>
                        <option value="Swinging">Swinging</option>
                      </select>
                    </div>

                    {/* Семейно положение */}
                    <div>
                      <label className="block text-purple-300 text-sm mb-2">Семейно положение</label>
                      <select 
                        value={filters.relationshipStatus}
                        onChange={(e) => handleFilterChange('relationshipStatus', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white focus:outline-none focus:border-purple-400 [&>option]:bg-slate-900 [&>option]:text-white"
                      >
                        <option value="">Всички</option>
                        <option value="Необвързан/а">Необвързан/а</option>
                        <option value="В отношения">В отношения</option>
                        <option value="Женен/омъжена">Женен/омъжена</option>
                        <option value="Разведен/а">Разведен/а</option>
                      </select>
                    </div>

                    {/* Само профили със снимки */}
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id="withPhotos"
                        checked={filters.withPhotosOnly}
                        onChange={(e) => handleFilterChange('withPhotosOnly', e.target.checked)}
                        className="w-4 h-4 rounded border-purple-400/30 bg-white/10 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="withPhotos" className="text-purple-300 text-sm cursor-pointer">
                        Само профили със снимки
                      </label>
                    </div>

                    {/* Бутон за търсене */}
                    <button 
                      onClick={handleSearch}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition mt-6"
                    >
                      <Search className="w-4 h-4" />
                      Търси
                    </button>
                  </div>
                </div>
              </div>

              {/* Резултати */}
              <div className="lg:col-span-3">
                <div className="mb-4">
                  <p className="text-white text-lg">
                    Намерени <span className="font-bold text-purple-300">{filteredResults.length}</span> потребители
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredResults.map((result) => (
                    <div key={result.id} className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                      <div className="relative h-64">
                        <img 
                          src={result.avatar} 
                          alt={result.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{result.name}, {result.age}</h3>
                          <p className="text-purple-300 text-sm">📍 {result.city}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-purple-200 text-sm mb-3">{result.bio}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-300 text-xs">{result.relationshipStatus}</span>
                          <button 
                            onClick={() => router.push(`/profile/${result.id}`)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition"
                          >
                            Виж профил
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-purple-300 text-lg">Няма намерени резултати. Опитайте с други филтри.</p>
                  </div>
                )}
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
