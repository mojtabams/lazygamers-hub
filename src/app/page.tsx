


'use client'

/**
 * صفحه اصلی LazyGamers
 * این صفحه خوشامدگویی به کاربر و نمایش لیست بازی‌های موجود را برعهده دارد
 * همچنین شامل بخش‌های جدول امتیازات، گفتگوی زنده و انجمن می‌باشد
 */

import Link from 'next/link';
import Image from 'next/image';
import Leaderboard from '@/components/Leaderboard';
import LiveChat from '@/components/LiveChat';
import ForumPreview from '@/components/ForumPreview';
import { useUser } from '@/contexts/UserContext';

// ✅ تعریف ساختار داده برای بازی‌ها
interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
}

// ✅ لیست بازی‌های موجود
const games: Game[] = [
  {
    id: 'xo',
    title: 'دوز (XO)',
    description: 'بازی دوز کلاسیک - نوبتی X یا O بگذارید و برنده شوید!',
    image: '/assets/games/xo-thumbnail.svg',
    path: '/games/xo'
  },
  // در آینده بازی‌های بیشتری اضافه خواهند شد
];

export default function HomePage() {
  const { user } = useUser();

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      {/* ✅ بخش خوشامدگویی */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">🎮 LazyGamers Hub</h1>
        <p className="mt-4 text-lg text-gray-600">به دنیای بازی‌های آنلاین خوش اومدی!</p>

        {user.isLoggedIn && (
          <p className="mt-2 text-blue-600 font-medium">
            خوش آمدی، {user.username}! آماده‌ای بازی کنی؟
          </p>
        )}
      </section>

      {/* ✅ بخش بازی‌ها */}
      <section className="w-full max-w-6xl mb-12">
        <h2 className="text-2xl font-bold mb-6">بازی‌های ما</h2>

        {/* ✅ نمایش کارت‌های بازی به صورت گرید */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <Link href={game.path} key={game.id} className="transform transition-transform hover:scale-105">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full">
                {/* ✅ تصویر بازی */}
                <div className="relative h-48 bg-gray-200">
                  {/* اگر تصویر موجود نباشد، یک پس‌زمینه خاکستری نمایش داده می‌شود */}
                  {game.image && (
                    <Image 
                      src={game.image} 
                      alt={game.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* ✅ اطلاعات بازی */}
                <div className="p-4">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <p className="mt-2 text-gray-600">{game.description}</p>
                  <div className="mt-4 text-blue-600 font-medium">بازی کنید &rarr;</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ بخش‌های اضافی در یک گرید دو ستونه */}
      <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ✅ ستون اول: جدول امتیازات و انجمن */}
        <div className="space-y-8">
          {/* ✅ جدول امتیازات */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">برترین بازیکنان</h2>
              <Link href="/leaderboard" className="text-blue-500 hover:text-blue-700 transition">
                مشاهده همه &rarr;
              </Link>
            </div>
            <Leaderboard limit={5} showTitle={false} />
          </div>

          {/* ✅ انجمن */}
          <div>
            <ForumPreview limit={3} />
          </div>
        </div>

        {/* ✅ ستون دوم: گفتگوی زنده */}
        <div>
          <LiveChat />
        </div>
      </section>
    </main>
  );
}
