// @page MESSAGES - Страница за съобщения
// URL: /messages
// Съдържание: Списък с разговори и чат интерфейс

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  MessageSquare, 
  Users, 
  Star, 
  User, 
  Search, 
  Settings, 
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  ArrowLeft,
  Check,
  CheckCheck
} from 'lucide-react';

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  isOnline: boolean;
};

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isSent: boolean;
};

export default function MessagesPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [user] = useState({ 
    id: 'me',
    name: 'SexSpiel_2022', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' 
  });

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Мария, 28',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      lastMessage: 'Здравей! Как си? 😊',
      lastMessageTime: 'преди 5 мин',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Иван и Елена',
      avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
      lastMessage: 'Благодаря за съобщението!',
      lastMessageTime: 'преди 1 час',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Александра, 31',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      lastMessage: 'Кога можем да се видим?',
      lastMessageTime: 'преди 3 часа',
      unread: 1,
      isOnline: true
    },
    {
      id: '4',
      name: 'Петър, 35',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      lastMessage: 'Звучи интересно!',
      lastMessageTime: 'вчера',
      unread: 0,
      isOnline: false
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      text: 'Здравей! Видях профила ти и ми хареса много 😊',
      timestamp: '10:30',
      isRead: true,
      isSent: true
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Здравей! Благодаря! И твоят профил е много интересен',
      timestamp: '10:32',
      isRead: true,
      isSent: true
    },
    {
      id: '3',
      senderId: '1',
      text: 'Бихме ли могли да поговорим малко повече?',
      timestamp: '10:35',
      isRead: true,
      isSent: true
    },
    {
      id: '4',
      senderId: 'me',
      text: 'Разбира се! За какво искаш да говорим?',
      timestamp: '10:36',
      isRead: true,
      isSent: true
    },
    {
      id: '5',
      senderId: '1',
      text: 'Как си? 😊',
      timestamp: '12:45',
      isRead: false,
      isSent: true
    },
  ]);

  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      isSent: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Update conversation's last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: messageText, lastMessageTime: 'сега', unread: 0 }
          : conv
      )
    );
  };

  const handleSelectConversation = (convId: string) => {
    setSelectedConversation(convId);
    
    // Mark messages as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === convId 
          ? { ...conv, unread: 0 }
          : conv
      )
    );

    // Load messages for this conversation (mock data for now)
    if (convId === '1') {
      setMessages([
        {
          id: '1',
          senderId: '1',
          text: 'Здравей! Видях профила ти и ми хареса много 😊',
          timestamp: '10:30',
          isRead: true,
          isSent: true
        },
        {
          id: '2',
          senderId: 'me',
          text: 'Здравей! Благодаря! И твоят профил е много интересен',
          timestamp: '10:32',
          isRead: true,
          isSent: true
        },
        {
          id: '3',
          senderId: '1',
          text: 'Бихме ли могли да поговорим малко повече?',
          timestamp: '10:35',
          isRead: true,
          isSent: true
        },
        {
          id: '4',
          senderId: 'me',
          text: 'Разбира се! За какво искаш да говорим?',
          timestamp: '10:36',
          isRead: true,
          isSent: true
        },
        {
          id: '5',
          senderId: '1',
          text: 'Как си? 😊',
          timestamp: '12:45',
          isRead: false,
          isSent: true
        },
      ]);
    } else {
      setMessages([
        {
          id: '1',
          senderId: convId,
          text: 'Здравей!',
          timestamp: '09:00',
          isRead: true,
          isSent: true
        },
        {
          id: '2',
          senderId: 'me',
          text: 'Здрасти! Как си?',
          timestamp: '09:05',
          isRead: true,
          isSent: true
        },
      ]);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

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
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid md:grid-cols-3 h-full">
            {/* Conversations List */}
            <div className={`border-r border-purple-500/20 flex flex-col ${isMobileView && selectedConversation ? 'hidden' : ''}`}>
              {/* Header */}
              <div className="p-4 border-b border-purple-500/20">
                <h2 className="text-xl font-bold text-white mb-3">Съобщения</h2>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <input
                    type="text"
                    placeholder="Търси разговор..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`p-4 border-b border-purple-500/10 cursor-pointer transition ${
                      selectedConversation === conv.id 
                        ? 'bg-purple-600/30' 
                        : 'hover:bg-purple-600/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={conv.avatar} 
                          alt={conv.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conv.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-white font-semibold text-sm truncate">
                            {conv.name}
                          </h3>
                          <span className="text-purple-300 text-xs whitespace-nowrap ml-2">
                            {conv.lastMessageTime}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className="text-purple-200 text-xs truncate flex-1">
                            {conv.lastMessage}
                          </p>
                          {conv.unread > 0 && (
                            <span className="ml-2 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`md:col-span-2 flex flex-col ${isMobileView && !selectedConversation ? 'hidden' : ''}`}>
              {selectedConversation && selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-purple-500/20 flex items-center justify-between bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      {isMobileView && (
                        <button
                          onClick={() => setSelectedConversation(null)}
                          className="text-purple-300 hover:text-white transition mr-2"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                      )}
                      
                      <div className="relative">
                        <img 
                          src={selectedConv.avatar} 
                          alt={selectedConv.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConv.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-white font-semibold">{selectedConv.name}</h3>
                        <p className="text-purple-300 text-xs">
                          {selectedConv.isOnline ? 'Онлайн' : 'Офлайн'}
                        </p>
                      </div>
                    </div>

                    <button className="text-purple-300 hover:text-white transition">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-2xl ${
                            msg.senderId === 'me'
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-700/50 text-purple-100'
                          }`}
                        >
                          <p className="text-sm break-words">{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">{msg.timestamp}</span>
                            {msg.senderId === 'me' && (
                              msg.isRead ? (
                                <CheckCheck className="w-3 h-3 text-blue-400" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-purple-500/20 bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-purple-300 hover:text-white transition p-2"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      
                      <button
                        type="button"
                        className="text-purple-300 hover:text-white transition p-2"
                      >
                        <Smile className="w-5 h-5" />
                      </button>

                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Напишете съобщение..."
                        className="flex-1 px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                      />

                      <button
                        type="submit"
                        disabled={!messageText.trim()}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-purple-300">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Изберете разговор, за да започнете чат</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
          
          <Link href="/messages" className="flex flex-col items-center gap-1 text-white transition">
            <div className="relative">
              <MessageSquare className="w-6 h-6 fill-purple-600" />
              {totalUnread > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </div>
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
