'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/contexts/UserContext'

// تعریف ساختار پیام
interface ChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
}

interface LiveChatProps {
  roomId?: string; // شناسه اتاق گفتگو (برای گفتگوهای مختص به یک بازی)
  title?: string;
}

/**
 * کامپوننت گفتگوی زنده
 * این کامپوننت یک چت باکس برای گفتگوی زنده بین کاربران ارائه می‌دهد
 */
export default function LiveChat({ roomId = 'general', title = 'گفتگوی عمومی' }: LiveChatProps) {
  const { user } = useUser()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // شبیه‌سازی دریافت پیام‌های قبلی
  useEffect(() => {
    // در یک پروژه واقعی، این داده‌ها از سرور دریافت می‌شوند
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        username: 'سیستم',
        text: 'به گفتگوی زنده خوش آمدید!',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        username: 'علی',
        text: 'سلام به همه!',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        username: 'سارا',
        text: 'کسی برای بازی XO هست؟',
        timestamp: new Date(Date.now() - 900000)
      }
    ]
    
    setMessages(initialMessages)
  }, [roomId])

  // اسکرول به آخرین پیام
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ارسال پیام جدید
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !user.isLoggedIn) return
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      username: user.username,
      text: newMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
  }

  // فرمت کردن زمان
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full flex flex-col h-96">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      
      {/* بخش پیام‌ها */}
      <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded p-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">هنوز پیامی ارسال نشده است.</p>
        ) : (
          <div className="space-y-3">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`p-2 rounded-lg ${
                  msg.username === user.username 
                    ? 'bg-blue-100 mr-auto ml-4' 
                    : 'bg-gray-100 ml-auto mr-4'
                } max-w-[80%]`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{msg.username}</span>
                  <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* فرم ارسال پیام */}
      {user.isLoggedIn ? (
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 transition"
          >
            ارسال
          </button>
        </form>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-center">
          برای ارسال پیام، لطفاً وارد سایت شوید.
        </div>
      )}
    </div>
  )
}