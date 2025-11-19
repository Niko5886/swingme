'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { mockContacts } from '@/lib/data';
import { Contact } from '@/lib/types';
import { MessageSquare, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ContactsPage() {
  const [contacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Моите контакти
            </h1>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Търси контакт..."
              className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={contact.user.avatar}
                      alt={contact.user.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {contact.user.name}, {contact.user.age}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {contact.user.location}
                          </div>
                        </div>
                        {contact.unreadCount > 0 && (
                          <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      {contact.lastMessage && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 truncate">
                          {contact.lastMessage}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {contact.user.interests.slice(0, 3).map((interest, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-3 mt-4">
                        <Link
                          href="/messages"
                          className="flex items-center space-x-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Съобщение</span>
                        </Link>
                        <button className="p-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Няма намерени контакти
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
