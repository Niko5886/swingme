'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { mockNotifications } from '@/lib/data';
import { Notification } from '@/lib/types';
import { Heart, MessageSquare, Users, Check } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-6 h-6 text-pink-600" />;
      case 'message':
        return <MessageSquare className="w-6 h-6 text-blue-600" />;
      case 'match':
        return <Users className="w-6 h-6 text-green-600" />;
    }
  };

  const getIconBg = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'bg-pink-100 dark:bg-pink-900';
      case 'message':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'match':
        return 'bg-green-100 dark:bg-green-900';
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Известия
              </h1>
              {unreadCount > 0 && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {unreadCount} непрочетени известия
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
              >
                <Check className="w-4 h-4" />
                <span>Маркирай всички</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${
                  !notification.read ? 'border-l-4 border-pink-600' : ''
                }`}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-full ${getIconBg(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white font-medium mb-1">
                        {notification.content}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {notification.timestamp.toLocaleDateString('bg-BG', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <Check className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Няма известия
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
