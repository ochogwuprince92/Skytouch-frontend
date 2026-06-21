import React, { useState } from 'react';
import {
  Search,
  Send,
  MoreVertical,
  Paperclip,
  Check,
  CheckCheck } from
'lucide-react';
const MOCK_CONVERSATIONS = [
{
  id: 1,
  name: 'John Doe',
  role: 'Senior Frontend Developer',
  avatar:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  lastMessage:
  'Hi Sarah, thanks for reaching out! I am very excited about the opportunity.',
  time: '10:15 AM',
  unread: 1,
  online: true
},
{
  id: 2,
  name: 'Alice Smith',
  role: 'Product Manager',
  avatar:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  lastMessage: 'Here is the portfolio you requested.',
  time: 'Yesterday',
  unread: 0,
  online: false
}];

const MOCK_MESSAGES = [
{
  id: 1,
  senderId: 'me',
  text: 'Hi John, thanks for applying to the Senior Frontend Developer role at TechNova.',
  time: '10:00 AM',
  isMe: true,
  status: 'read'
},
{
  id: 2,
  senderId: 1,
  text: 'Hi Sarah, thanks for reaching out! I am very excited about the opportunity.',
  time: '10:15 AM',
  isMe: false
}];

export function EmployerMessagesPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CONVERSATIONS[0]);
  const [messageText, setMessageText] = useState('');
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-slate-200 h-[calc(100vh-8rem)] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col h-full">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Candidate Messages
          </h2>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18} />
            
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((chat) =>
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-primary-50' : 'hover:bg-slate-50'}`}>
            
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover" />
                
                  {chat.online &&
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full"></span>
                }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 text-sm truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-1">
                    {chat.role}
                  </p>
                  <p className="text-sm text-slate-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 &&
              <div className="w-5 h-5 bg-danger rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {chat.unread}
                  </div>
              }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 flex-col h-full bg-slate-50/50">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              className="w-10 h-10 rounded-full object-cover" />
            
            <div>
              <h3 className="font-bold text-slate-900">{activeChat.name}</h3>
              <p className="text-sm text-slate-500">{activeChat.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm font-bold text-primary bg-primary-50 px-4 py-2 rounded-xl hover:bg-primary-100 transition-colors">
              View Profile
            </button>
            <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_MESSAGES.map((msg) =>
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            
              <div
              className={`max-w-[70%] ${msg.isMe ? 'order-1' : 'order-2'}`}>
              
                <div
                className={`p-3 rounded-2xl ${msg.isMe ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}>
                
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div
                className={`flex items-center gap-1 mt-1 text-xs text-slate-500 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                
                  <span>{msg.time}</span>
                  {msg.isMe &&
                <span className="text-primary">
                      {msg.status === 'read' ?
                  <CheckCheck size={14} /> :

                  <Check size={14} />
                  }
                    </span>
                }
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-xl transition-colors">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            
            <button className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors shadow-soft">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>);

}