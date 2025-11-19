'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ProfileCard from '@/components/ProfileCard';
import { mockUsers } from '@/lib/data';
import { User } from '@/lib/types';

export default function Home() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());

  const handleLike = (userId: string) => {
    setLikedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, liked: !user.liked } : user
      )
    );
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Открий нови познанства
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Разгледай профили и намери своя партньор
            </p>
          </div>
          
          {/* Responsive grid: 2 columns on mobile, 3 on tablet, 4 on desktop, 5 on very large screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {users.map((user) => (
              <ProfileCard key={user.id} user={user} onLike={handleLike} />
            ))}
          </div>

          {likedUsers.size > 0 && (
            <div className="fixed bottom-8 right-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
              <p className="font-medium">
                {likedUsers.size} {likedUsers.size === 1 ? 'харесване' : 'харесвания'}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
