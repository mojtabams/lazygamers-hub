'use client'

import LiveChat from '@/components/LiveChat'

/**
 * صفحه گفتگوی بازی XO
 * این صفحه یک چت اختصاصی برای بازیکنان XO فراهم می‌کند
 */
export default function XOChatPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">گفتگوی بازیکنان XO</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p>
          در این بخش می‌توانید با سایر بازیکنان XO گفتگو کنید، استراتژی‌ها را به اشتراک بگذارید و دوستان جدیدی پیدا کنید.
          لطفاً قوانین گفتگو را رعایت کنید و با احترام با یکدیگر رفتار کنید.
        </p>
      </div>
      
      <LiveChat roomId="xo_game" title="گفتگوی بازی XO" />
    </div>
  )
}