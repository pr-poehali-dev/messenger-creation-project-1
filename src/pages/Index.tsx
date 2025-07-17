import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  time: string;
  isRead: boolean;
  sender: string;
  avatar: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  type: 'user' | 'group' | 'channel';
}

const Index = () => {
  const [currentHoliday, setCurrentHoliday] = useState<string>('default');
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const getHoliday = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    if (month === 12 && day >= 20) return 'newyear';
    if (month === 2 && day === 14) return 'valentine';
    if (month === 5 && day === 9) return 'victory';
    return 'default';
  };

  useEffect(() => {
    setCurrentHoliday(getHoliday());
  }, []);

  const chats: Chat[] = [
    {
      id: 1,
      name: 'Алексей Космонавт',
      avatar: '🚀',
      lastMessage: 'Привет! Как дела в космосе?',
      time: '14:30',
      unreadCount: 2,
      type: 'user'
    },
    {
      id: 2,
      name: 'Команда Поехали',
      avatar: '👥',
      lastMessage: 'Новый релиз готов к запуску!',
      time: '12:15',
      unreadCount: 0,
      type: 'group'
    },
    {
      id: 3,
      name: 'Новости IT',
      avatar: '📡',
      lastMessage: 'Последние новости технологий',
      time: '10:45',
      unreadCount: 5,
      type: 'channel'
    },
    {
      id: 4,
      name: 'Мама',
      avatar: '❤️',
      lastMessage: 'Не забудь покушать!',
      time: '09:20',
      unreadCount: 1,
      type: 'user'
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: 'Привет! Как дела в космосе?',
      time: '14:25',
      isRead: true,
      sender: 'Алексей Космонавт',
      avatar: '🚀'
    },
    {
      id: 2,
      text: 'Все отлично! Запускаем новый проект 🚀',
      time: '14:27',
      isRead: false,
      sender: 'Юра',
      avatar: '👨‍🚀'
    },
    {
      id: 3,
      text: 'Звучит круто! Расскажи подробнее',
      time: '14:30',
      isRead: false,
      sender: 'Алексей Космонавт',
      avatar: '🚀'
    }
  ];

  const getHolidayElements = () => {
    const elements = [];
    for (let i = 0; i < 20; i++) {
      let emoji = '⭐';
      let animation = 'animate-float';
      
      if (currentHoliday === 'newyear') {
        emoji = '❄️';
        animation = 'animate-snowfall';
      } else if (currentHoliday === 'valentine') {
        emoji = '❤️';
        animation = 'animate-heartbeat';
      } else if (currentHoliday === 'victory') {
        emoji = '🎖️';
        animation = 'animate-float';
      }
      
      elements.push(
        <div
          key={i}
          className={`fixed text-2xl ${animation} pointer-events-none opacity-30`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {emoji}
        </div>
      );
    }
    return elements;
  };

  const getThemeColors = () => {
    switch (currentHoliday) {
      case 'newyear':
        return 'bg-gradient-to-br from-blue-100 to-white';
      case 'valentine':
        return 'bg-gradient-to-br from-pink-100 to-red-50';
      case 'victory':
        return 'bg-gradient-to-br from-red-100 to-orange-50';
      default:
        return 'bg-gradient-to-br from-messenger-turquoise/10 to-messenger-blue/10';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeColors()} relative overflow-hidden`}>
      {getHolidayElements()}
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-messenger-turquoise/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-messenger-coral to-messenger-turquoise rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">NikMessenger</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="w-4 h-4 mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                Контакты
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sidebar with Chats */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-messenger-turquoise/20 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>Чаты</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-messenger-coral/10 border-messenger-coral/20">
                      <Icon name="Users" className="w-4 h-4 mr-1" />
                      Группа
                    </Button>
                    <Button size="sm" variant="outline" className="bg-messenger-blue/10 border-messenger-blue/20">
                      <Icon name="Radio" className="w-4 h-4 mr-1" />
                      Канал
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input
                    placeholder="Поиск чатов..."
                    className="border-messenger-turquoise/20 focus:border-messenger-turquoise"
                  />
                  <ScrollArea className="h-96">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-messenger-turquoise/10 ${
                          activeChat === chat.id ? 'bg-messenger-turquoise/20' : ''
                        }`}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        <Avatar className="w-12 h-12 mr-3">
                          <AvatarFallback className="bg-messenger-coral/20 text-lg">
                            {chat.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-messenger-coral text-white ml-2">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs">
                              {chat.type === 'user' ? 'Личный' : chat.type === 'group' ? 'Группа' : 'Канал'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {activeChat ? (
              <Card className="bg-white/80 backdrop-blur-sm border-messenger-turquoise/20 shadow-lg h-[600px] flex flex-col">
                <CardHeader className="pb-3 border-b border-messenger-turquoise/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-messenger-coral/20 text-lg">
                          {chats.find(c => c.id === activeChat)?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {chats.find(c => c.id === activeChat)?.name}
                        </h3>
                        <p className="text-sm text-messenger-turquoise">онлайн</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Phone" className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Video" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'Юра' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md ${message.sender === 'Юра' ? 'order-2' : 'order-1'}`}>
                            <div className={`p-3 rounded-lg ${
                              message.sender === 'Юра' 
                                ? 'bg-messenger-coral text-white' 
                                : 'bg-messenger-turquoise/10 text-gray-800'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">{message.time}</span>
                                {message.sender === 'Юра' && (
                                  <div className="flex items-center space-x-1">
                                    <Icon 
                                      name="Check" 
                                      className={`w-3 h-3 ${message.isRead ? 'text-messenger-blue' : 'text-gray-400'}`} 
                                    />
                                    <Icon 
                                      name="Check" 
                                      className={`w-3 h-3 -ml-1 ${message.isRead ? 'text-messenger-blue' : 'text-gray-400'}`} 
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {message.sender !== 'Юра' && (
                            <Avatar className="w-8 h-8 mr-2 order-1">
                              <AvatarFallback className="bg-messenger-coral/20 text-sm">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                
                <div className="p-4 border-t border-messenger-turquoise/20">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Icon name="Paperclip" className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Напишите сообщение..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border-messenger-turquoise/20 focus:border-messenger-turquoise"
                    />
                    <Button size="sm" className="bg-messenger-coral hover:bg-messenger-coral/80">
                      <Icon name="Send" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-messenger-turquoise/20 shadow-lg h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Icon name="MessageCircle" className="w-24 h-24 text-messenger-turquoise mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Выберите чат</h3>
                  <p className="text-gray-600">Выберите чат из списка, чтобы начать общение</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-messenger-turquoise/20 shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <Icon name="UserPlus" className="w-12 h-12 text-messenger-coral mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Добавить контакт</h3>
            <p className="text-sm text-gray-600">Найдите друзей и коллег</p>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-messenger-turquoise/20 shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <Icon name="Users" className="w-12 h-12 text-messenger-blue mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Создать группу</h3>
            <p className="text-sm text-gray-600">Общайтесь с несколькими людьми</p>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-messenger-turquoise/20 shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
            <Icon name="Radio" className="w-12 h-12 text-messenger-purple mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Создать канал</h3>
            <p className="text-sm text-gray-600">Делитесь новостями с подписчиками</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;