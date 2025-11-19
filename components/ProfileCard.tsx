'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import { Heart, MapPin, Info } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  onLike: (userId: string) => void;
}

export default function ProfileCard({ user, onLike }: ProfileCardProps) {
  const [isLiked, setIsLiked] = useState(user.liked || false);
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(user.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={handleLike}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
            isLiked
              ? 'bg-pink-600 text-white scale-110'
              : 'bg-white/90 text-gray-700 hover:bg-pink-100'
          }`}
        >
          <Heart
            className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}, {user.age}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Info className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-3 space-y-2">
            <p className="text-gray-700 dark:text-gray-300 text-sm">{user.bio}</p>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
