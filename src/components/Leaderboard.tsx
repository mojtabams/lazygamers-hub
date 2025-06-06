'use client'

import { getTopUsers, User } from '@/data/users'
import { useState, useEffect } from 'react'

interface LeaderboardProps {
  limit?: number;
  showTitle?: boolean;
}

/**
 * کامپوننت جدول امتیازات
 * این کامپوننت لیست کاربران برتر را نمایش می‌دهد
 */
export default function Leaderboard({ limit = 10, showTitle = true }: LeaderboardProps) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // دریافت کاربران برتر
    const topUsers = getTopUsers(limit)
    setUsers(topUsers)
  }, [limit])

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      {showTitle && (
        <h2 className="text-2xl font-bold mb-4 text-center">جدول امتیازات</h2>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-right">رتبه</th>
              <th className="py-3 px-6 text-right">نام کاربری</th>
              <th className="py-3 px-6 text-right">امتیاز</th>
              <th className="py-3 px-6 text-right">بازی‌ها</th>
              <th className="py-3 px-6 text-right">برد</th>
              <th className="py-3 px-6 text-right">باخت</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {users.map((user, index) => (
              <tr 
                key={user.id} 
                className={`border-b border-gray-200 hover:bg-gray-50 ${
                  index < 3 ? 'font-bold' : ''
                }`}
              >
                <td className="py-3 px-6 text-right">
                  <div className="flex items-center">
                    <span className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-2
                      ${index === 0 ? 'bg-yellow-400 text-white' : 
                        index === 1 ? 'bg-gray-300 text-gray-800' : 
                        index === 2 ? 'bg-yellow-700 text-white' : 'bg-gray-100'}
                    `}>
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-right">{user.username}</td>
                <td className="py-3 px-6 text-right font-bold">{user.score}</td>
                <td className="py-3 px-6 text-right">{user.gamesPlayed}</td>
                <td className="py-3 px-6 text-right text-green-600">{user.wins}</td>
                <td className="py-3 px-6 text-right text-red-600">{user.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}