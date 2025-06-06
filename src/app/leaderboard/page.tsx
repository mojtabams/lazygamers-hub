'use client'

import Leaderboard from '@/components/Leaderboard'
import { useUser } from '@/contexts/UserContext'
import { findUserByUsername } from '@/data/users'
import { useEffect, useState } from 'react'

/**
 * صفحه جدول امتیازات
 * این صفحه جدول امتیازات کامل را نمایش می‌دهد و اطلاعات کاربر فعلی را برجسته می‌کند
 */
export default function LeaderboardPage() {
  const { user } = useUser()
  const [userRank, setUserRank] = useState<number | null>(null)

  // یافتن رتبه کاربر فعلی
  useEffect(() => {
    if (user.isLoggedIn) {
      const userInfo = findUserByUsername(user.username)
      if (userInfo) {
        // محاسبه رتبه کاربر
        import('@/data/users').then(({ sampleUsers }) => {
          const sortedUsers = [...sampleUsers].sort((a, b) => b.score - a.score)
          const rank = sortedUsers.findIndex(u => u.username === user.username) + 1
          setUserRank(rank)
        })
      }
    }
  }, [user])

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">جدول امتیازات بازیکنان</h1>
      
      {/* نمایش رتبه کاربر فعلی */}
      {user.isLoggedIn && userRank && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-lg">
            <span className="font-bold">{user.username}</span>، رتبه شما در جدول امتیازات: 
            <span className="font-bold text-blue-600 mx-2">{userRank}</span>
            می‌باشد.
          </p>
        </div>
      )}
      
      {/* جدول امتیازات کامل */}
      <Leaderboard limit={20} />
      
      {/* توضیحات */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">نحوه محاسبه امتیازات</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>برد در هر بازی: <span className="font-bold">+10</span> امتیاز</li>
          <li>باخت در هر بازی: <span className="font-bold">-5</span> امتیاز</li>
          <li>تساوی در هر بازی: <span className="font-bold">+2</span> امتیاز</li>
          <li>بازی روزانه: <span className="font-bold">+1</span> امتیاز</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          امتیازات هر هفته به‌روزرسانی می‌شوند و در پایان هر ماه، به سه نفر برتر جوایزی اهدا خواهد شد.
        </p>
      </div>
    </main>
  )
}