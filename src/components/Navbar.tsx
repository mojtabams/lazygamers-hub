
'use client'

import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';
import LoginForm from './LoginForm';

/**
 * کامپوننت نوار ناوبری اصلی سایت
 * شامل لینک به صفحات مختلف مثل خانه و بازی‌ها
 * در layout.tsx فراخوانی شده و در تمام صفحات دیده می‌شود
 */
export default function Navbar() {
  const { user, logout } = useUser();
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <>
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* لینک‌های اصلی */}
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-blue-300 transition">خانه</Link></li>
            <li><Link href="/games" className="hover:text-blue-300 transition">بازی‌ها</Link></li>
            <li><Link href="/leaderboard" className="hover:text-blue-300 transition">جدول امتیازات</Link></li>
            <li><Link href="/forum" className="hover:text-blue-300 transition">انجمن</Link></li>
          </ul>

          {/* بخش کاربر */}
          <div className="flex items-center space-x-4">
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/profile"
                  className="text-sm hover:text-blue-300 transition"
                >
                  <span className="mr-1">👤</span>
                  {user.username}
                </Link>
                <button 
                  onClick={logout}
                  className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginForm(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                ورود
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* فرم ورود */}
      {showLoginForm && !user.isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowLoginForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}
