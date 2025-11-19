export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  avatar: string;
  interests: string[];
  liked?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'message' | 'match';
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Contact {
  id: string;
  userId: string;
  user: User;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}
