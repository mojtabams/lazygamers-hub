'use client';

import React from 'react';

interface GameActionsProps {
  onFire: () => void;
  onNextTurn: () => void;
}

// 🧩 این کامپوننت دکمه‌های "شلیک" و "نوبت بعدی" را نمایش می‌دهد
// 🎮 این دکمه‌ها برای کنترل حرکات بازیکن در بازی استفاده می‌شوند
export default function GameActions({ onFire, onNextTurn }: GameActionsProps) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={onFire}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        شلیک 🚀
      </button>
      <button
        onClick={onNextTurn}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        نوبت بعدی 🔁
      </button>
    </div>
  );
}
