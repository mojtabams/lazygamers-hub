'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'

/**
 * لایوت صفحه بازی XO
 * این لایوت شامل منوی جانبی برای دسترسی به بخش‌های مختلف بازی است
 */
export default function XOLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('game')
  
  // تب‌های موجود در صفحه بازی
  const tabs = [
    { id: 'game', name: 'بازی', path: '/games/xo' },
    { id: 'sessions', name: 'بازی‌های فعال', path: '/games/xo/sessions' },
    { id: 'chat', name: 'گفتگو', path: '/games/xo/chat' },
    { id: 'forum', name: 'انجمن', path: '/games/xo/forum' },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر بازی */}
      <div className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">بازی دوز (XO)</h1>
            <Link href="/games" className="text-sm bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition">
              بازگشت به لیست بازی‌ها
            </Link>
          </div>
          
          {/* نوار تب‌ها */}
          <div className="flex mt-6 border-b border-blue-500">
            {tabs.map(tab => (
              <Link 
                key={tab.id}
                href={tab.path}
                className={`px-4 py-2 mr-2 rounded-t transition ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 font-bold' 
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* محتوای اصلی */}
      <div className="container mx-auto p-4">
        {!user.isLoggedIn && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-yellow-800">
              برای دسترسی به تمام امکانات بازی، لطفاً وارد سایت شوید.
            </p>
          </div>
        )}
        
        {children}
      </div>
    </div>
  )
}