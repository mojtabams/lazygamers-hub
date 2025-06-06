'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'

// تعریف ساختار دسته‌بندی
interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  posts: number;
  color: string;
}

/**
 * صفحه انجمن
 * این صفحه دسته‌بندی‌های انجمن را نمایش می‌دهد
 */
export default function ForumPage() {
  const { user } = useUser()
  
  // دسته‌بندی‌های انجمن
  const categories: ForumCategory[] = [
    {
      id: 'general',
      name: 'گفتگوی عمومی',
      description: 'بحث و گفتگو درباره موضوعات عمومی و معرفی اعضا',
      topics: 24,
      posts: 156,
      color: 'bg-gray-500'
    },
    {
      id: 'games',
      name: 'بازی‌ها',
      description: 'بحث درباره بازی‌های موجود، استراتژی‌ها و راهنماها',
      topics: 42,
      posts: 312,
      color: 'bg-blue-500'
    },
    {
      id: 'support',
      name: 'پشتیبانی',
      description: 'سوالات فنی، گزارش مشکلات و درخواست کمک',
      topics: 18,
      posts: 87,
      color: 'bg-red-500'
    },
    {
      id: 'suggestions',
      name: 'پیشنهادات',
      description: 'پیشنهاد بازی‌های جدید و ویژگی‌های سایت',
      topics: 31,
      posts: 203,
      color: 'bg-green-500'
    }
  ]

  return (
    <main className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">انجمن LazyGamers</h1>
        
        {user.isLoggedIn ? (
          <Link 
            href="/forum/new-topic" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            ایجاد موضوع جدید
          </Link>
        ) : (
          <div className="text-sm text-gray-600">
            برای ایجاد موضوع جدید، لطفاً وارد سایت شوید
          </div>
        )}
      </div>
      
      {/* توضیحات انجمن */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p>
          به انجمن LazyGamers خوش آمدید! اینجا می‌توانید درباره بازی‌ها گفتگو کنید، سوالات خود را مطرح کنید و با سایر بازیکنان ارتباط برقرار کنید.
          لطفاً قوانین انجمن را رعایت کنید و با احترام با یکدیگر رفتار کنید.
        </p>
      </div>
      
      {/* دسته‌بندی‌های انجمن */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 divide-y">
          {categories.map(category => (
            <div key={category.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start">
                <div className={`w-3 h-3 rounded-full mt-2 ${category.color}`}></div>
                <div className="ml-3 flex-1">
                  <Link 
                    href={`/forum/category/${category.id}`}
                    className="text-xl font-bold hover:text-blue-500 transition"
                  >
                    {category.name}
                  </Link>
                  <p className="text-gray-600 mt-1">{category.description}</p>
                  
                  <div className="flex mt-2 text-sm text-gray-500">
                    <div className="mr-4">
                      <span className="font-bold">{category.topics}</span> موضوع
                    </div>
                    <div>
                      <span className="font-bold">{category.posts}</span> پست
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* آمار انجمن */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">آمار انجمن</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-2xl font-bold">115</div>
            <div className="text-gray-600">موضوعات</div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-2xl font-bold">758</div>
            <div className="text-gray-600">پست‌ها</div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-2xl font-bold">42</div>
            <div className="text-gray-600">کاربران فعال</div>
          </div>
        </div>
      </div>
    </main>
  )
}