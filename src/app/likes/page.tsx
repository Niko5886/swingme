// @page LIKES - Моите харесвания
// URL: /likes
// Съдържание: Списък с профили, които са харесали потребителя, с дата и час

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  User, 
  Search, 
  Filter,
  Clock,
  MapPin,
  Eye,
  MessageSquare,
  Star,
  ArrowLeft,
  Calendar
} from 'lucide-react';

type LikeProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  avatar: string;
  bio: string;
  isOnline: boolean;
  likedAt: Date;
  isVerified?: boolean;
  isPremium?: boolean;
};

export default function LikesPage() {
  const router = useRouter();
  
  const [user] = useState({ 
    id: 'me',
    name: 'SexSpiel_2022', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' 
  });

  // Mock данни за харесали профили
  const [likes, setLikes] = useState<LikeProfile[]>([
    {
      id: '1',
      name: 'Мария',
      age: 28,
      city: 'София',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Обичам пътешествия и нови преживявания ✈️',
      isOnline: true,
      likedAt: new Date(Date.now() - 1000 * 60 * 15), // преди 15 минути
      isVerified: true,
      isPremium: true
    },
    {
      id: '2',
      name: 'Елена',
      age: 31,
      city: 'Пловдив',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'В търсене на интересни срещи и приятелства 💫',
      isOnline: false,
      likedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // преди 2 часа
      isVerified: true,
      isPremium: false
    },
    {
      id: '3',
      name: 'Александра',
      age: 26,
      city: 'Варна',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
      bio: 'Обожавам танците и забавленията 🎵',
      isOnline: true,
      likedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // преди 5 часа
      isVerified: false,
      isPremium: false
    },
    {
      id: '4',
      name: 'Ивана и Петър',
      age: 35,
      city: 'Бургас',
      avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
      bio: 'Динамична двойка в търсене на приключения ❤️',
      isOnline: false,
      likedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // преди 1 ден
      isVerified: true,
      isPremium: true
    },
    {
      id: '5',
      name: 'Кристина',
      age: 29,
      city: 'София',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      bio: 'Спортна и активна, търся забавление 🏋️‍♀️',
      isOnline: true,
      likedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // преди 2 дни
      isVerified: false,
      isPremium: false
    },
    {
      id: '6',
      name: 'Даниела',
      age: 33,
      city: 'Варна',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      bio: 'Харесвам новото и различното 🌟',
      isOnline: false,
      likedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // преди 3 дни
      isVerified: true,
      isPremium: false
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterOnline, setFilterOnline] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');
  const [selectedProfile, setSelectedProfile] = useState<LikeProfile | null>(null);

  // Форматиране на време
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'сега';
    if (diffMins < 60) return `преди ${diffMins} мин`;
    if (diffHours < 24) return `преди ${diffHours} час${diffHours > 1 ? 'а' : ''}`;
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `преди ${diffDays} дни`;
    
    return date.toLocaleDateString('bg-BG', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFullDateTime = (date: Date): string => {
    return date.toLocaleString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Филтриране и сортиране
  const filteredLikes = likes
    .filter(like => {
      const matchesSearch = like.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           like.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOnline = !filterOnline || like.isOnline;
      return matchesSearch && matchesOnline;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return b.likedAt.getTime() - a.likedAt.getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  const handleLikeBack = (profileId: string) => {
    // TODO: Implement like back functionality
    console.log('Liked back:', profileId);
  };

  const handleSendMessage = (profileId: string) => {
    // TODO: Navigate to messages with this user
    router.push(`/messages?user=${profileId}`);
  };

  const handleViewProfile = (profile: LikeProfile) => {
    router.push(`/user/${profile.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-red-500 fill-red-500" />
            <span className="text-xl sm:text-2xl font-bold text-white">SwingMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-purple-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/search" className="text-purple-300 hover:text-white transition">
              Търсене
            </Link>
            <Link href="/messages" className="text-purple-300 hover:text-white transition">
              Съобщения
            </Link>
            <Link href="/profile" className="text-purple-300 hover:text-white transition">
              Профил
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer hover:border-purple-400 transition"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.back()}
              className="text-purple-300 hover:text-white transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              Моите харесвания
            </h1>
          </div>
          <p className="text-purple-200 text-lg">
            {filteredLikes.length} {filteredLikes.length === 1 ? 'човек те е харесал' : 'души те харесват'}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="text"
                  placeholder="Търси по име или град..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterOnline(!filterOnline)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filterOnline
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-900/50 border border-purple-500/30 text-purple-300 hover:border-purple-400'
                }`}
              >
                Онлайн
              </button>
              <button
                onClick={() => setSortBy(sortBy === 'recent' ? 'name' : 'recent')}
                className="px-4 py-3 bg-slate-900/50 border border-purple-500/30 text-purple-300 hover:border-purple-400 rounded-lg transition"
                title={sortBy === 'recent' ? 'Сортирано по дата' : 'Сортирано по име'}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Likes Grid */}
        {filteredLikes.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-12 text-center">
            <Heart className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchQuery || filterOnline ? 'Няма резултати' : 'Все още няма харесвания'}
            </h3>
            <p className="text-purple-200">
              {searchQuery || filterOnline 
                ? 'Опитайте с други филтри'
                : 'Когато някой те харесае, ще го видиш тук'
              }
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLikes.map((profile) => (
              <div
                key={profile.id}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-400/50 transition group"
              >
                {/* Profile Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  
                  {/* Online Status */}
                  {profile.isOnline && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Онлайн
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {profile.isVerified && (
                      <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        ✓ Проверен
                      </div>
                    )}
                    {profile.isPremium && (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> VIP
                      </div>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Profile Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center gap-1 text-purple-200 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {profile.city}
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-4">
                  <p className="text-purple-200 text-sm mb-3 line-clamp-2">
                    {profile.bio}
                  </p>

                  {/* Time Info */}
                  <div className="flex items-center gap-2 text-purple-300 text-xs mb-4 pb-4 border-b border-purple-500/20">
                    <Clock className="w-4 h-4" />
                    <span>Харесал/а те {formatTimeAgo(profile.likedAt)}</span>
                  </div>

                  {/* Full Date/Time on Hover */}
                  <div className="text-purple-400 text-xs mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatFullDateTime(profile.likedAt)}
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleViewProfile(profile)}
                      className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition text-sm flex items-center justify-center gap-1"
                      title="Виж профил"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLikeBack(profile.id)}
                      className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition text-sm flex items-center justify-center gap-1"
                      title="Харесай обратно"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => handleSendMessage(profile.id)}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm flex items-center justify-center gap-1"
                      title="Изпрати съобщение"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProfile(null)}>
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-2xl w-full border border-purple-500/30 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-96">
              <img
                src={selectedProfile.avatar}
                alt={selectedProfile.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
              >
                ✕
              </button>
              {selectedProfile.isOnline && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Онлайн
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {selectedProfile.name}, {selectedProfile.age}
                  </h2>
                  <div className="flex items-center gap-2 text-purple-300">
                    <MapPin className="w-4 h-4" />
                    {selectedProfile.city}
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedProfile.isVerified && (
                    <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      ✓ Проверен
                    </div>
                  )}
                  {selectedProfile.isPremium && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> VIP
                    </div>
                  )}
                </div>
              </div>

              <p className="text-purple-200 mb-4">{selectedProfile.bio}</p>

              <div className="bg-purple-900/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Харесал/а те {formatTimeAgo(selectedProfile.likedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 text-xs">
                  <Calendar className="w-4 h-4" />
                  {formatFullDateTime(selectedProfile.likedAt)}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleLikeBack(selectedProfile.id);
                    setSelectedProfile(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Харесай обратно
                </button>
                <button
                  onClick={() => {
                    handleSendMessage(selectedProfile.id);
                    setSelectedProfile(null);
                  }}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Изпрати съобщение
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-purple-500/20 z-50">
        <div className="flex justify-around items-center py-3 px-4">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-purple-300 hover:text-white transition">
            <Heart className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link href="/search" className="flex flex-col items-center gap-1 text-purple-300 hover:text-white transition">
            <Search className="w-6 h-6" />
            <span className="text-xs">Търсене</span>
          </Link>
          
          <Link href="/messages" className="flex flex-col items-center gap-1 text-purple-300 hover:text-white transition">
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs">Съобщения</span>
          </Link>
          
          <Link href="/profile" className="flex flex-col items-center gap-1 text-purple-300 hover:text-white transition">
            <User className="w-6 h-6" />
            <span className="text-xs">Профил</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
