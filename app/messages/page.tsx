'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { mockMessages, mockUsers } from '@/lib/data';
import { Message } from '@/lib/types';
import { Send, Smile } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser] = useState(mockUsers[1]); // Иван Георгиев

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: selectedUser.id,
      content: newMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-pink-600 text-white p-4 flex items-center space-x-4">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="font-bold text-lg">{selectedUser.name}</h2>
                <p className="text-pink-100 text-sm">Онлайн</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 h-[500px] overflow-y-auto">
              {messages.map((message) => {
                const isCurrentUser = message.senderId === 'current-user';
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString('bg-BG', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Smile className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Напиши съобщение..."
                  className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
