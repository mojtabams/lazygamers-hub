'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'

/**
 * کامپوننت فرم ورود کاربر
 * این کامپوننت یک فرم ساده برای ورود کاربر با نام کاربری ارائه می‌دهد
 */
export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const { login } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // بررسی اعتبار نام کاربری
    if (!username.trim()) {
      setError('لطفاً نام کاربری را وارد کنید')
      return
    }
    
    // ورود کاربر
    login(username)
    setUsername('')
    setError('')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">ورود به سایت</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="نام کاربری خود را وارد کنید"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          ورود
        </button>
      </form>
      
      <p className="mt-4 text-sm text-gray-600 text-center">
        فقط نام کاربری خود را وارد کنید تا وارد سایت شوید.
      </p>
    </div>
  )
}