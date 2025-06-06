'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'

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
  pinned: boolean;
}

/**
 * صفحه انجمن بازی XO
 * این صفحه تاپیک‌های مربوط به بازی XO را نمایش می‌دهد
 */
export default function XOForumPage() {
  const { user } = useUser()
  const [topics, setTopics] = useState<ForumTopic[]>([])
  
  // شبیه‌سازی دریافت تاپیک‌ها
  useEffect(() => {
    // در یک پروژه واقعی، این داده‌ها از سرور دریافت می‌شوند
    const sampleTopics: ForumTopic[] = [
      {
        id: '1',
        title: 'راهنمای شروع بازی XO برای مبتدیان',
        author: 'علی',
        replies: 12,
        views: 156,
        lastReply: {
          author: 'سارا',
          date: new Date(Date.now() - 3600000)
        },
        pinned: true
      },
      {
        id: '2',
        title: 'استراتژی‌های پیشرفته برای برنده شدن در XO',
        author: 'محمد',
        replies: 8,
        views: 94,
        lastReply: {
          author: 'رضا',
          date: new Date(Date.now() - 7200000)
        },
        pinned: true
      },
      {
        id: '3',
        title: 'نظرسنجی: کدام استراتژی در XO بهتر است؟',
        author: 'فاطمه',
        replies: 15,
        views: 120,
        lastReply: {
          author: 'حسین',
          date: new Date(Date.now() - 14400000)
        },
        pinned: false
      },
      {
        id: '4',
        title: 'مشکل در پیدا کردن حریف مناسب',
        author: 'زهرا',
        replies: 3,
        views: 42,
        lastReply: {
          author: 'علی',
          date: new Date(Date.now() - 28800000)
        },
        pinned: false
      },
      {
        id: '5',
        title: 'پیشنهاد: اضافه کردن قابلیت چت صوتی حین بازی',
        author: 'امیر',
        replies: 7,
        views: 68,
        lastReply: {
          author: 'مریم',
          date: new Date(Date.now() - 86400000)
        },
        pinned: false
      }
    ]
    
    // مرتب‌سازی تاپیک‌ها: ابتدا پین‌شده‌ها، سپس بر اساس آخرین پاسخ
    const sortedTopics = [...sampleTopics].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return b.lastReply.date.getTime() - a.lastReply.date.getTime()
    })
    
    setTopics(sortedTopics)
  }, [])
  
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
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">انجمن بازی XO</h2>
        
        {user.isLoggedIn ? (
          <Link 
            href="/games/xo/forum/new-topic" 
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
          به انجمن بازی XO خوش آمدید! اینجا می‌توانید درباره استراتژی‌ها، تکنیک‌ها و تجربیات خود در بازی XO گفتگو کنید.
        </p>
      </div>
      
      {/* لیست تاپیک‌ها */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-right">موضوع</th>
              <th className="py-3 px-6 text-right">نویسنده</th>
              <th className="py-3 px-6 text-right">پاسخ‌ها</th>
              <th className="py-3 px-6 text-right">بازدیدها</th>
              <th className="py-3 px-6 text-right">آخرین پاسخ</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {topics.map(topic => (
              <tr key={topic.id} className={`border-b border-gray-200 hover:bg-gray-50 ${topic.pinned ? 'bg-yellow-50' : ''}`}>
                <td className="py-3 px-6 text-right">
                  <div className="flex items-center">
                    {topic.pinned && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded mr-2">
                        مهم
                      </span>
                    )}
                    <Link 
                      href={`/games/xo/forum/topic/${topic.id}`} 
                      className="font-medium hover:text-blue-500 transition"
                    >
                      {topic.title}
                    </Link>
                  </div>
                </td>
                <td className="py-3 px-6 text-right">{topic.author}</td>
                <td className="py-3 px-6 text-right">{topic.replies}</td>
                <td className="py-3 px-6 text-right">{topic.views}</td>
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
      
      {/* قوانین انجمن */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">قوانین انجمن</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>با احترام با یکدیگر رفتار کنید</li>
          <li>از به اشتراک گذاشتن اطلاعات شخصی خودداری کنید</li>
          <li>از موضوعات مرتبط با بازی XO صحبت کنید</li>
          <li>قبل از ایجاد موضوع جدید، جستجو کنید تا از تکراری بودن آن جلوگیری شود</li>
        </ul>
      </div>
    </div>
  )
}