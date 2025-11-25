// @page SETTINGS - Настройки на акаунта
// URL: /settings
// Съдържание: Промяна на парола/имейл, езикови настройки, видимост, деактивиране/изтриване на акаунт

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  User, 
  Search, 
  MessageSquare,
  ArrowLeft,
  Lock,
  Mail,
  Globe,
  Eye,
  EyeOff,
  Trash2,
  UserX,
  Save,
  Check,
  AlertTriangle,
  Shield,
  Bell,
  Moon,
  Sun
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  
  const [user] = useState({ 
    id: 'me',
    name: 'SexSpiel_2022', 
    email: 'user@swingme.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' 
  });

  // Security Settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [newEmail, setNewEmail] = useState(user.email);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  // Language Settings
  const [language, setLanguage] = useState('bg');
  const [languageSuccess, setLanguageSuccess] = useState('');

  // Privacy Settings
  const [showInSearch, setShowInSearch] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showLastActive, setShowLastActive] = useState(false);
  const [showDistance, setShowDistance] = useState(true);
  const [allowMessages, setAllowMessages] = useState('everyone'); // 'everyone', 'matches', 'none'
  const [privacySuccess, setPrivacySuccess] = useState('');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [matchNotifications, setMatchNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [notificationSuccess, setNotificationSuccess] = useState('');

  // Theme Settings
  const [theme, setTheme] = useState('dark'); // 'dark', 'light'

  // Account Deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Моля, въведете текущата парола');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Новата парола трябва да е поне 6 символа');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Паролите не съвпадат');
      return;
    }

    try {
      // TODO: API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordSuccess('Паролата е сменена успешно!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (error) {
      setPasswordError('Грешка при смяна на паролата');
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');

    if (!newEmail || !newEmail.includes('@')) {
      setEmailError('Моля, въведете валиден имейл адрес');
      return;
    }

    try {
      // TODO: API call to change email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailSuccess('Имейлът е променен успешно! Моля, потвърдете новия имейл.');
      setTimeout(() => setEmailSuccess(''), 3000);
    } catch (error) {
      setEmailError('Грешка при промяна на имейла');
    }
  };

  const handleLanguageChange = async (newLang: string) => {
    setLanguage(newLang);
    setLanguageSuccess('');

    try {
      // TODO: API call to save language preference
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLanguageSuccess('Езикът е променен успешно!');
      setTimeout(() => setLanguageSuccess(''), 3000);
    } catch (error) {
      console.error('Error changing language');
    }
  };

  const handlePrivacySettings = async () => {
    setPrivacySuccess('');

    try {
      // TODO: API call to save privacy settings
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPrivacySuccess('Настройките са запазени успешно!');
      setTimeout(() => setPrivacySuccess(''), 3000);
    } catch (error) {
      console.error('Error saving privacy settings');
    }
  };

  const handleNotificationSettings = async () => {
    setNotificationSuccess('');

    try {
      // TODO: API call to save notification settings
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotificationSuccess('Настройките са запазени успешно!');
      setTimeout(() => setNotificationSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving notification settings');
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      // TODO: API call to deactivate account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page
      router.push('/?deactivated=true');
    } catch (error) {
      console.error('Error deactivating account');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'ИЗТРИЙ') {
      return;
    }

    try {
      // TODO: API call to delete account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page
      router.push('/?deleted=true');
    } catch (error) {
      console.error('Error deleting account');
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
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
              <Shield className="w-8 h-8 text-purple-500" />
              Настройки
            </h1>
          </div>
          <p className="text-purple-200 text-lg">
            Управление на акаунта и настройки за поверителност
          </p>
        </div>

        {/* Security Settings */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-purple-400" />
            Сигурност
          </h2>

          {/* Change Password */}
          <form onSubmit={handlePasswordChange} className="mb-6">
            <h3 className="text-lg font-semibold text-purple-200 mb-3">Промяна на парола</h3>
            
            {passwordError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                {passwordSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Текуща парола</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition pr-12"
                    placeholder="Въведете текуща парола"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Нова парола</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition pr-12"
                    placeholder="Въведете нова парола (мин. 6 символа)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Потвърдете нова парола</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition pr-12"
                    placeholder="Потвърдете новата парола"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Запази паролата
              </button>
            </div>
          </form>

          {/* Change Email */}
          <form onSubmit={handleEmailChange} className="pt-6 border-t border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-200 mb-3">Промяна на имейл адрес</h3>
            
            {emailError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
                {emailError}
              </div>
            )}

            {emailSuccess && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                {emailSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Нов имейл адрес</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Запази имейла
              </button>
            </div>
          </form>
        </div>

        {/* Language Settings */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            Езикови настройки
          </h2>

          {languageSuccess && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              {languageSuccess}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => handleLanguageChange('bg')}
              className={`w-full p-4 rounded-lg border transition text-left flex items-center justify-between ${
                language === 'bg'
                  ? 'bg-purple-600/30 border-purple-400 text-white'
                  : 'bg-slate-900/50 border-purple-500/30 text-purple-200 hover:border-purple-400'
              }`}
            >
              <span className="font-medium">🇧🇬 Български</span>
              {language === 'bg' && <Check className="w-5 h-5 text-purple-400" />}
            </button>

            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full p-4 rounded-lg border transition text-left flex items-center justify-between ${
                language === 'en'
                  ? 'bg-purple-600/30 border-purple-400 text-white'
                  : 'bg-slate-900/50 border-purple-500/30 text-purple-200 hover:border-purple-400'
              }`}
            >
              <span className="font-medium">🇬🇧 English</span>
              {language === 'en' && <Check className="w-5 h-5 text-purple-400" />}
            </button>

            <button
              onClick={() => handleLanguageChange('de')}
              className={`w-full p-4 rounded-lg border transition text-left flex items-center justify-between ${
                language === 'de'
                  ? 'bg-purple-600/30 border-purple-400 text-white'
                  : 'bg-slate-900/50 border-purple-500/30 text-purple-200 hover:border-purple-400'
              }`}
            >
              <span className="font-medium">🇩🇪 Deutsch</span>
              {language === 'de' && <Check className="w-5 h-5 text-purple-400" />}
            </button>
          </div>
        </div>

        {/* Privacy & Visibility Settings */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-purple-400" />
            Настройки за видимост
          </h2>

          {privacySuccess && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              {privacySuccess}
            </div>
          )}

          <div className="space-y-4">
            {/* Show in Search */}
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Покажи профила в търсенето</h3>
                <p className="text-purple-300 text-sm mt-1">Другите потребители могат да намерят профила ти</p>
              </div>
              <button
                onClick={() => setShowInSearch(!showInSearch)}
                className={`relative w-14 h-8 rounded-full transition ${
                  showInSearch ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    showInSearch ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Show Online Status */}
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Покажи онлайн статус</h3>
                <p className="text-purple-300 text-sm mt-1">Показвай зелена точка когато си онлайн</p>
              </div>
              <button
                onClick={() => setShowOnlineStatus(!showOnlineStatus)}
                className={`relative w-14 h-8 rounded-full transition ${
                  showOnlineStatus ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    showOnlineStatus ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Show Last Active */}
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Покажи последна активност</h3>
                <p className="text-purple-300 text-sm mt-1">Показвай кога си бил/а активен/на последно</p>
              </div>
              <button
                onClick={() => setShowLastActive(!showLastActive)}
                className={`relative w-14 h-8 rounded-full transition ${
                  showLastActive ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    showLastActive ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Show Distance */}
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Покажи разстояние</h3>
                <p className="text-purple-300 text-sm mt-1">Показвай разстоянието до другите потребители</p>
              </div>
              <button
                onClick={() => setShowDistance(!showDistance)}
                className={`relative w-14 h-8 rounded-full transition ${
                  showDistance ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    showDistance ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Message Permissions */}
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <h3 className="text-white font-medium mb-3">Кой може да ти изпраща съобщения</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="messages"
                    checked={allowMessages === 'everyone'}
                    onChange={() => setAllowMessages('everyone')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-purple-200">Всички потребители</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="messages"
                    checked={allowMessages === 'matches'}
                    onChange={() => setAllowMessages('matches')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-purple-200">Само взаимни харесвания</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="messages"
                    checked={allowMessages === 'none'}
                    onChange={() => setAllowMessages('none')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-purple-200">Никой</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePrivacySettings}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Запази настройките
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="w-6 h-6 text-purple-400" />
            Известия
          </h2>

          {notificationSuccess && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              {notificationSuccess}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Имейл известия</h3>
                <p className="text-purple-300 text-sm mt-1">Получавай известия на имейл</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-14 h-8 rounded-full transition ${
                  emailNotifications ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    emailNotifications ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Известия за харесвания</h3>
                <p className="text-purple-300 text-sm mt-1">Когато някой те харесае</p>
              </div>
              <button
                onClick={() => setMatchNotifications(!matchNotifications)}
                className={`relative w-14 h-8 rounded-full transition ${
                  matchNotifications ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    matchNotifications ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Известия за съобщения</h3>
                <p className="text-purple-300 text-sm mt-1">Когато получиш ново съобщение</p>
              </div>
              <button
                onClick={() => setMessageNotifications(!messageNotifications)}
                className={`relative w-14 h-8 rounded-full transition ${
                  messageNotifications ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    messageNotifications ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleNotificationSettings}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Запази настройките
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-6 h-6 text-purple-400" /> : <Sun className="w-6 h-6 text-purple-400" />}
            Тема
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border transition ${
                theme === 'dark'
                  ? 'bg-purple-600/30 border-purple-400'
                  : 'bg-slate-900/50 border-purple-500/30 hover:border-purple-400'
              }`}
            >
              <Moon className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <div className="text-white font-medium">Тъмна</div>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border transition ${
                theme === 'light'
                  ? 'bg-purple-600/30 border-purple-400'
                  : 'bg-slate-900/50 border-purple-500/30 hover:border-purple-400'
              }`}
            >
              <Sun className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <div className="text-white font-medium">Светла</div>
            </button>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-gradient-to-br from-slate-800/50 to-red-900/30 backdrop-blur-md border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            Управление на акаунта
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-purple-500/20">
              <h3 className="text-white font-medium mb-2">Деактивирай акаунта</h3>
              <p className="text-purple-300 text-sm mb-3">
                Временно скрий профила си. Можеш да го активираш отново по всяко време.
              </p>
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                <UserX className="w-5 h-5" />
                Деактивирай акаунта
              </button>
            </div>

            <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
              <h3 className="text-white font-medium mb-2">Изтрий акаунта</h3>
              <p className="text-red-200 text-sm mb-3">
                Това действие е необратимо! Всички данни ще бъдат изтрити завинаги.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Изтрий акаунта
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowDeactivateModal(false)}>
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-2xl max-w-md w-full border border-orange-500/30 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Деактивиране на акаунт</h2>
              <p className="text-purple-200">
                Сигурен ли си, че искаш да деактивираш акаунта си? Профилът ти ще бъде скрит, но можеш да го активираш отново по всяко време.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
              >
                Отказ
              </button>
              <button
                onClick={handleDeactivateAccount}
                className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
              >
                Деактивирай
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-gradient-to-br from-slate-900 to-red-900 rounded-xl shadow-2xl max-w-md w-full border border-red-500/30 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Изтриване на акаунт</h2>
              <p className="text-red-200 mb-4">
                Това действие е <strong>необратимо</strong>! Всички данни, съобщения, снимки и контакти ще бъдат изтрити завинаги.
              </p>
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4">
                <p className="text-red-200 text-sm mb-2">
                  За да потвърдиш, напиши <strong>ИЗТРИЙ</strong> в полето по-долу:
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-red-500/30 rounded-lg text-white placeholder-red-300/50 focus:outline-none focus:border-red-400 transition"
                  placeholder="ИЗТРИЙ"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
              >
                Отказ
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'ИЗТРИЙ'}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-900/50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
              >
                Изтрий завинаги
              </button>
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
