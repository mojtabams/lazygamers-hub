'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'

// تعریف ساختار جلسه بازی
interface GameSession {
  id: string;
  creator: string;
  opponent: string | null;
  status: 'waiting' | 'in_progress' | 'completed';
  createdAt: Date;
  lastActivity: Date;
}

/**
 * صفحه جلسات بازی XO
 * این صفحه لیست بازی‌های فعال را نمایش می‌دهد و امکان پیوستن به بازی یا ایجاد بازی جدید را فراهم می‌کند
 */
export default function XOSessionsPage() {
  const { user } = useUser()
  const [sessions, setSessions] = useState<GameSession[]>([])
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  
  // شبیه‌سازی دریافت جلسات بازی
  useEffect(() => {
    // در یک پروژه واقعی، این داده‌ها از سرور دریافت می‌شوند
    const sampleSessions: GameSession[] = [
      {
        id: '1',
        creator: 'علی',
        opponent: 'سارا',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 3600000),
        lastActivity: new Date(Date.now() - 600000)
      },
      {
        id: '2',
        creator: 'محمد',
        opponent: null,
        status: 'waiting',
        createdAt: new Date(Date.now() - 1800000),
        lastActivity: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        creator: 'فاطمه',
        opponent: 'رضا',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 7200000),
        lastActivity: new Date(Date.now() - 300000)
      },
      {
        id: '4',
        creator: 'حسین',
        opponent: null,
        status: 'waiting',
        createdAt: new Date(Date.now() - 900000),
        lastActivity: new Date(Date.now() - 900000)
      }
    ]
    
    setSessions(sampleSessions)
  }, [])
  
  // ایجاد جلسه بازی جدید
  const handleCreateSession = () => {
    if (!user.isLoggedIn) return
    
    setIsCreatingSession(true)
    
    // شبیه‌سازی ایجاد جلسه جدید
    setTimeout(() => {
      const newSession: GameSession = {
        id: Date.now().toString(),
        creator: user.username,
        opponent: null,
        status: 'waiting',
        createdAt: new Date(),
        lastActivity: new Date()
      }
      
      setSessions(prev => [newSession, ...prev])
      setIsCreatingSession(false)
    }, 1000)
  }
  
  // پیوستن به جلسه بازی
  const handleJoinSession = (sessionId: string) => {
    if (!user.isLoggedIn) return
    
    // شبیه‌سازی پیوستن به جلسه
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, opponent: user.username, status: 'in_progress' } 
        : session
    ))
  }
  
  // فرمت کردن زمان
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">بازی‌های فعال XO</h2>
      
      {/* دکمه ایجاد بازی جدید */}
      {user.isLoggedIn ? (
        <button 
          onClick={handleCreateSession}
          disabled={isCreatingSession}
          className={`mb-6 px-4 py-2 rounded transition ${
            isCreatingSession 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isCreatingSession ? 'در حال ایجاد بازی...' : 'ایجاد بازی جدید'}
        </button>
      ) : (
        <div className="mb-6 text-sm text-gray-600">
          برای ایجاد بازی جدید، لطفاً وارد سایت شوید
        </div>
      )}
      
      {/* لیست جلسات بازی */}
      {sessions.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">در حال حاضر هیچ بازی فعالی وجود ندارد.</p>
          <p className="mt-2 text-gray-600">اولین بازی را شما ایجاد کنید!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-right">ایجاد کننده</th>
                <th className="py-3 px-6 text-right">حریف</th>
                <th className="py-3 px-6 text-right">وضعیت</th>
                <th className="py-3 px-6 text-right">زمان ایجاد</th>
                <th className="py-3 px-6 text-right">آخرین فعالیت</th>
                <th className="py-3 px-6 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {sessions.map(session => (
                <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right font-medium">{session.creator}</td>
                  <td className="py-3 px-6 text-right">
                    {session.opponent || 'منتظر حریف...'}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      session.status === 'waiting' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : session.status === 'in_progress' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {session.status === 'waiting' 
                        ? 'در انتظار' 
                        : session.status === 'in_progress' 
                          ? 'در حال انجام' 
                          : 'پایان یافته'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">{formatTime(session.createdAt)}</td>
                  <td className="py-3 px-6 text-right">{formatTime(session.lastActivity)}</td>
                  <td className="py-3 px-6 text-right">
                    {session.status === 'waiting' && session.creator !== user.username ? (
                      <button 
                        onClick={() => handleJoinSession(session.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                        disabled={!user.isLoggedIn}
                      >
                        پیوستن
                      </button>
                    ) : session.status === 'in_progress' && (session.creator === user.username || session.opponent === user.username) ? (
                      <Link 
                        href={`/games/xo/play/${session.id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition"
                      >
                        ادامه بازی
                      </Link>
                    ) : session.status === 'in_progress' ? (
                      <Link 
                        href={`/games/xo/watch/${session.id}`}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition"
                      >
                        تماشا
                      </Link>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}