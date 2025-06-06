'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { themes } from '@/data/themes'

// ✅ این کامپوننت وظیفه‌ی نمایش بازی XO را برعهده دارد
export default function TicTacToeGame() {
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameHistory, setGameHistory] = useState<{
    x: number,
    o: number,
    ties: number
  }>({ x: 0, o: 0, ties: 0 })

  const { theme, setActiveTheme } = useTheme()

  // ✅ مشخص کردن مقدار نماد فعلی بازیکن
  const currentSymbol = isXNext ? 'X' : 'O'

  // ✅ ریست کردن بازی
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }, [])

  // ✅ بررسی برنده - بهینه‌سازی شده با useMemo
  const calculateWinner = useCallback((squares: ('X' | 'O' | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // سطرها
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // ستون‌ها
      [0, 4, 8], [2, 4, 6],            // قطرها
    ] as const
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }, [])

  // ✅ مدیریت کلیک روی خانه‌ها
  const handleClick = useCallback((index: number) => {
    // اگر خانه پر باشد یا بازی تمام شده باشد، کاری انجام نده
    if (board[index] || calculateWinner(board)) return

    const newBoard = [...board]
    newBoard[index] = currentSymbol
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }, [board, calculateWinner, currentSymbol])

  // ✅ بررسی وضعیت بازی (برنده یا مساوی)
  const winner = useMemo(() => calculateWinner(board), [board, calculateWinner])

  // ✅ بررسی مساوی بودن بازی (تمام خانه‌ها پر شده باشند و برنده‌ای نباشد)
  const isDraw = useMemo(() => {
    return !winner && board.every(cell => cell !== null)
  }, [board, winner])

  // ✅ بررسی اینکه آیا بازی در حال انجام است یا خیر
  const isGameInProgress = useMemo(() => {
    return !winner && !isDraw && board.some(cell => cell !== null)
  }, [winner, isDraw, board])

  // ✅ به‌روزرسانی تاریخچه بازی وقتی بازی تمام می‌شود
  useEffect(() => {
    // ✅ اگر برنده‌ای وجود داشته باشد، امتیاز آن بازیکن را افزایش می‌دهیم
    if (winner) {
      setGameHistory(prev => ({
        ...prev,
        [winner.toLowerCase()]: prev[winner.toLowerCase() as 'x' | 'o'] + 1
      }))
      // ✅ کمی تاخیر قبل از ریست خودکار بازی
      const timer = setTimeout(() => resetGame(), 2000)
      return () => clearTimeout(timer)
    } 
    // ✅ اگر بازی مساوی شده باشد، امتیاز مساوی‌ها را افزایش می‌دهیم
    else if (isDraw) {
      setGameHistory(prev => ({
        ...prev,
        ties: prev.ties + 1
      }))
      // ✅ کمی تاخیر قبل از ریست خودکار بازی
      const timer = setTimeout(() => resetGame(), 2000)
      return () => clearTimeout(timer)
    }
  }, [winner, isDraw, resetGame])

  return (
    <div className={`flex flex-col items-center justify-center gap-6 p-6 ${theme.background} min-h-screen`}>
      {/* ✅ انتخاب تم */}
      <div className="flex gap-3 mb-2">
        <button 
          onClick={() => setActiveTheme('default')}
          className={`px-3 py-1 rounded-md ${theme === themes.default ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          تم روشن
        </button>
        <button 
          onClick={() => setActiveTheme('dark')}
          className={`px-3 py-1 rounded-md ${theme === themes.dark ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          تم تیره
        </button>
      </div>

      {/* ✅ نمایش امتیازات */}
      <div className="flex gap-8 text-center">
        <div className="px-4 py-2 bg-blue-100 rounded-lg">
          <div className="font-bold">X</div>
          <div className="text-xl">{gameHistory.x}</div>
        </div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          <div className="font-bold">مساوی</div>
          <div className="text-xl">{gameHistory.ties}</div>
        </div>
        <div className="px-4 py-2 bg-red-100 rounded-lg">
          <div className="font-bold">O</div>
          <div className="text-xl">{gameHistory.o}</div>
        </div>
      </div>

      {/* ✅ نمایش نوبت یا برنده */}
      <div className="text-xl font-bold p-2 rounded-md" style={{ color: theme.textColor }}>
        {winner
          ? `🎉 برنده: ${winner}`
          : isDraw
            ? `🤝 بازی مساوی شد!`
            : `نوبت بازیکن: ${currentSymbol}`}
      </div>

      {/* ✅ جدول بازی */}
      <div className={`grid grid-cols-3 gap-2 ${theme.boardBorder}`}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 flex items-center justify-center text-3xl font-bold rounded shadow border-2 hover:opacity-90 transition"
            style={{
              backgroundColor: theme.tileBackground,
              color: theme.textColor,
              borderColor: theme.borderColor
            }}
          >
            {/* ✅ نمایش نماد بازیکن با آیکون */}
            {cell && (
              <img 
                src={cell === 'X' ? theme.XAsset : theme.OAsset} 
                alt={cell} 
                className="w-12 h-12 object-contain"
              />
            )}
          </button>
        ))}
      </div>

      {/* ✅ دکمه شروع مجدد - فقط زمانی نمایش داده می‌شود که بازی در حال انجام نباشد */}
      {!isGameInProgress && (
        <button 
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          شروع مجدد بازی
        </button>
      )}
    </div>
  )
}
