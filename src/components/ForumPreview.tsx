'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// تعریف ساختار تاپیک
interface ForumTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastReply: {
    author: string;
    date: Date;
  };
  category: 'general' | 'games' | 'support' | 'suggestions';
}

interface ForumPreviewProps {
  limit?: number;
}

/**
 * کامپوننت پیش‌نمایش انجمن
 * این کامپوننت آخرین تاپیک‌های انجمن را نمایش می‌دهد
 */
export default function ForumPreview({ limit = 5 }: ForumPreviewProps) {
  const [topics, setTopics] = useState<ForumTopic[]>([])

  // شبیه‌سازی دریافت تاپیک‌ها
  useEffect(() => {
    // در یک پروژه واقعی، این داده‌ها از سرور دریافت می‌شوند
    const sampleTopics: ForumTopic[] = [
      {
        id: '1',
        title: 'راهنمای شروع بازی XO',
        author: 'علی',
        replies: 12,
        views: 156,
        lastReply: {
          author: 'سارا',
          date: new Date(Date.now() - 3600000)
        },
        category: 'games'
      },
      {
        id: '2',
        title: 'پیشنهاد اضافه کردن بازی شطرنج',
        author: 'محمد',
        replies: 8,
        views: 94,
        lastReply: {
          author: 'رضا',
          date: new Date(Date.now() - 7200000)
        },
        category: 'suggestions'
      },
      {
        id: '3',
        title: 'مشکل در ورود به سایت',
        author: 'فاطمه',
        replies: 3,
        views: 42,
        lastReply: {
          author: 'علی',
          date: new Date(Date.now() - 14400000)
        },
        category: 'support'
      },
      {
        id: '4',
        title: 'معرفی خود به جامعه',
        author: 'حسین',
        replies: 15,
        views: 203,
        lastReply: {
          author: 'مریم',
          date: new Date(Date.now() - 28800000)
        },
        category: 'general'
      },
      {
        id: '5',
        title: 'نظرسنجی: کدام بازی بعدی اضافه شود؟',
        author: 'زهرا',
        replies: 24,
        views: 312,
        lastReply: {
          author: 'امیر',
          date: new Date(Date.now() - 43200000)
        },
        category: 'suggestions'
      },
      {
        id: '6',
        title: 'استراتژی‌های پیشرفته در بازی XO',
        author: 'امیر',
        replies: 7,
        views: 89,
        lastReply: {
          author: 'نیلوفر',
          date: new Date(Date.now() - 86400000)
        },
        category: 'games'
      }
    ]
    
    setTopics(sampleTopics.slice(0, limit))
  }, [limit])

  // فرمت کردن تاریخ
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) {
      return 'کمتر از یک ساعت پیش'
    } else if (diffHours < 24) {
      return `${diffHours} ساعت پیش`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} روز پیش`
    }
  }

  // نمایش رنگ دسته‌بندی
  const getCategoryColor = (category: ForumTopic['category']) => {
    switch (category) {
      case 'general':
        return 'bg-gray-500'
      case 'games':
        return 'bg-blue-500'
      case 'support':
        return 'bg-red-500'
      case 'suggestions':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  // نمایش نام دسته‌بندی
  const getCategoryName = (category: ForumTopic['category']) => {
    switch (category) {
      case 'general':
        return 'عمومی'
      case 'games':
        return 'بازی‌ها'
      case 'support':
        return 'پشتیبانی'
      case 'suggestions':
        return 'پیشنهادات'
      default:
        return 'عمومی'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">آخرین موضوعات انجمن</h2>
        <Link href="/forum" className="text-blue-500 hover:text-blue-700 transition">
          مشاهده همه &rarr;
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-right">موضوع</th>
              <th className="py-3 px-6 text-right">نویسنده</th>
              <th className="py-3 px-6 text-right">پاسخ‌ها</th>
              <th className="py-3 px-6 text-right">آخرین پاسخ</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {topics.map(topic => (
              <tr key={topic.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-right">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor(topic.category)}`}></span>
                    <Link href={`/forum/${topic.id}`} className="font-medium hover:text-blue-500 transition">
                      {topic.title}
                    </Link>
                    <span className="text-xs bg-gray-200 rounded px-2 py-1 ml-2">
                      {getCategoryName(topic.category)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-right">{topic.author}</td>
                <td className="py-3 px-6 text-right">{topic.replies}</td>
                <td className="py-3 px-6 text-right">
                  <div className="flex flex-col">
                    <span>{topic.lastReply.author}</span>
                    <span className="text-xs text-gray-500">{formatDate(topic.lastReply.date)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}