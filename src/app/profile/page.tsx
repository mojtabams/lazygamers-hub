'use client'

import { useUser } from '@/contexts/UserContext'
import { findUserByUsername } from '@/data/users'
import { useState, useEffect } from 'react'
import Link from 'next/link'

/**
 * صفحه پروفایل کاربر
 * این صفحه اطلاعات کاربر و آمار بازی‌های او را نمایش می‌دهد
 */
export default function ProfilePage() {
  const { user, logout } = useUser()
  const [userStats, setUserStats] = useState<any>(null)
  const [recentGames, setRecentGames] = useState<any[]>([])
  
  // دریافت اطلاعات کاربر
  useEffect(() => {
    if (user.isLoggedIn) {
      // جستجوی کاربر در داده‌های نمونه
      const userInfo = findUserByUsername(user.username)
      
      if (userInfo) {
        setUserStats(userInfo)
        
        // شبیه‌سازی دریافت بازی‌های اخیر
        setRecentGames([
          {
            id: '1',
            game: 'XO',
            opponent: 'سارا',
            result: 'win',
            date: new Date(Date.now() - 86400000)
          },
          {
            id: '2',
            game: 'XO',
            opponent: 'محمد',
            result: 'loss',
            date: new Date(Date.now() - 172800000)
          },
          {
            id: '3',
            game: 'XO',
            opponent: 'رضا',
            result: 'draw',
            date: new Date(Date.now() - 259200000)
          }
        ])
      }
    }
  }, [user])
  
  // فرمت کردن تاریخ
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR')
  }
  
  // نمایش نتیجه بازی
  const renderResult = (result: string) => {
    switch (result) {
      case 'win':
        return <span className="text-green-600 font-bold">برد</span>
      case 'loss':
        return <span className="text-red-600 font-bold">باخت</span>
      case 'draw':
        return <span className="text-gray-600 font-bold">مساوی</span>
      default:
        return <span>-</span>
    }
  }
  
  // اگر کاربر وارد نشده باشد
  if (!user.isLoggedIn) {
    return (
      <main className="container mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">دسترسی محدود شده</h1>
          <p className="mb-4">برای مشاهده پروفایل خود، لطفاً وارد سایت شوید.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            بازگشت
          </button>
        </div>
      </main>
    )
  }
  
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">پروفایل کاربری</h1>
      
      {/* اطلاعات کاربر */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            {userStats && (
              <p className="text-gray-600 mt-1">
                رتبه: <span className="font-bold text-blue-600">{userStats.id}</span>
              </p>
            )}
          </div>
          
          <button 
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            خروج از حساب کاربری
          </button>
        </div>
        
        {userStats && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.score}</div>
              <div className="text-gray-600">امتیاز کل</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.wins}</div>
              <div className="text-gray-600">برد</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{userStats.losses}</div>
              <div className="text-gray-600">باخت</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-600">{userStats.draws}</div>
              <div className="text-gray-600">مساوی</div>
            </div>
          </div>
        )}
      </div>
      
      {/* بازی‌های اخیر */}
      <h2 className="text-2xl font-bold mb-4">بازی‌های اخیر</h2>
      
      {recentGames.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">هنوز هیچ بازی انجام نداده‌اید.</p>
          <Link 
            href="/games" 
            className="mt-2 inline-block text-blue-500 hover:text-blue-700 transition"
          >
            مشاهده لیست بازی‌ها
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-right">بازی</th>
                <th className="py-3 px-6 text-right">حریف</th>
                <th className="py-3 px-6 text-right">نتیجه</th>
                <th className="py-3 px-6 text-right">تاریخ</th>
                <th className="py-3 px-6 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {recentGames.map(game => (
                <tr key={game.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right font-medium">{game.game}</td>
                  <td className="py-3 px-6 text-right">{game.opponent}</td>
                  <td className="py-3 px-6 text-right">{renderResult(game.result)}</td>
                  <td className="py-3 px-6 text-right">{formatDate(game.date)}</td>
                  <td className="py-3 px-6 text-right">
                    <Link 
                      href={`/games/xo/replay/${game.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                    >
                      بازپخش
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* بخش تنظیمات */}
      <h2 className="text-2xl font-bold mt-8 mb-4">تنظیمات حساب کاربری</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          در این نسخه از سایت، امکان تغییر تنظیمات حساب کاربری وجود ندارد.
          در نسخه‌های آینده، امکان تغییر نام کاربری، تصویر پروفایل و سایر تنظیمات اضافه خواهد شد.
        </p>
      </div>
    </main>
  )
}