'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Users, Bell } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Начало' },
    { href: '/messages', icon: MessageSquare, label: 'Съобщения' },
    { href: '/contacts', icon: Users, label: 'Контакти' },
    { href: '/notifications', icon: Bell, label: 'Известия' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            SwingMe
          </Link>
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
