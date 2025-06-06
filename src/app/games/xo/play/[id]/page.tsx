'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useTheme } from '@/contexts/ThemeContext'
import { themes } from '@/data/themes'
import Link from 'next/link'

/**
 * صفحه بازی دو نفره XO
 * این صفحه امکان بازی XO به صورت دو نفره را فراهم می‌کند
 */
export default function MultiplayerXOPage({ params }: { params: { id: string } }) {
  const { user } = useUser()
  const { theme } = useTheme()
  const [gameSession, setGameSession] = useState<any>(null)
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<'X' | 'O' | null>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playerRole, setPlayerRole] = useState<'X' | 'O' | null>(null)
  const [messages, setMessages] = useState<{ author: string; text: string; timestamp: Date }[]>([])
  const [newMessage, setNewMessage] = useState('')
  
  // شبیه‌سازی دریافت اطلاعات جلسه بازی
  useEffect(() => {
    // در یک پروژه واقعی، این داده‌ها از سرور دریافت می‌شوند
    setTimeout(() => {
      if (!user.isLoggedIn) {
        setError('برای بازی کردن باید وارد سایت شوید')
        setIsLoading(false)
        return
      }
      
      // شبیه‌سازی جلسه بازی
      const session = {
        id: params.id,
        creator: 'علی',
        opponent: 'سارا',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 3600000),
        lastActivity: new Date(),
        board: Array(9).fill(null),
        currentTurn: 'X'
      }
      
      // تعیین نقش بازیکن
      if (user.username === session.creator) {
        setPlayerRole('X')
      } else if (user.username === session.opponent) {
        setPlayerRole('O')
      } else {
        setError('شما جزو بازیکنان این بازی نیستید')
      }
      
      setGameSession(session)
      setBoard(session.board)
      setIsXNext(session.currentTurn === 'X')
      setIsLoading(false)
      
      // شبیه‌سازی پیام‌های چت
      setMessages([
        {
          author: session.creator,
          text: 'سلام! آماده بازی هستی؟',
          timestamp: new Date(Date.now() - 300000)
        },
        {
          author: session.opponent,
          text: 'بله، شروع کنیم!',
          timestamp: new Date(Date.now() - 240000)
        }
      ])
    }, 1000)
  }, [params.id, user])
  
  // بررسی برنده
  const calculateWinner = (squares: ('X' | 'O' | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // سطرها
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // ستون‌ها
      [0, 4, 8], [2, 4, 6],            // قطرها
    ]
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  
  // بررسی مساوی بودن بازی
  const checkDraw = (squares: ('X' | 'O' | null)[]) => {
    return squares.every(square => square !== null)
  }
  
  // مدیریت کلیک روی خانه‌ها
  const handleClick = (index: number) => {
    // اگر بازی تمام شده یا نوبت بازیکن نیست، کاری انجام نده
    if (winner || isDraw || board[index] || 
        (isXNext && playerRole !== 'X') || 
        (!isXNext && playerRole !== 'O')) {
      return
    }
    
    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    
    // بررسی برنده یا مساوی
    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkDraw(newBoard)) {
      setIsDraw(true)
    } else {
      setIsXNext(!isXNext)
    }
    
    // در یک پروژه واقعی، اینجا تغییرات به سرور ارسال می‌شوند
  }
  
  // ارسال پیام چت
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !user.isLoggedIn) return
    
    const message = {
      author: user.username,
      text: newMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    // در یک پروژه واقعی، اینجا پیام به سرور ارسال می‌شود
  }
  
  // فرمت کردن زمان
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  }
  
  // نمایش وضعیت بازی
  const renderStatus = () => {
    if (winner) {
      return (
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-green-800">
            🎉 بازیکن {winner === 'X' ? gameSession?.creator : gameSession?.opponent} برنده شد!
          </p>
        </div>
      )
    } else if (isDraw) {
      return (
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-blue-800">
            🤝 بازی مساوی شد!
          </p>
        </div>
      )
    } else {
      return (
        <div className={`bg-${isXNext ? 'blue' : 'red'}-50 border border-${isXNext ? 'blue' : 'red'}-200 rounded-lg p-4 text-center`}>
          <p className="text-lg">
            نوبت: <span className="font-bold">{isXNext ? 'X' : 'O'}</span> (
            {isXNext ? gameSession?.creator : gameSession?.opponent})
          </p>
          {((isXNext && playerRole === 'X') || (!isXNext && playerRole === 'O')) && (
            <p className="text-sm mt-2 text-green-600">
              نوبت شماست!
            </p>
          )}
        </div>
      )
    }
  }
  
  // نمایش صفحه در حال بارگذاری
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">در حال بارگذاری بازی...</p>
        </div>
      </div>
    )
  }
  
  // نمایش خطا
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 mb-4">{error}</p>
        <Link 
          href="/games/xo/sessions"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          بازگشت به لیست بازی‌ها
        </Link>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* اطلاعات بازی */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-bold mb-4">اطلاعات بازی</h3>
          
          <div className="space-y-2">
            <p>
              <span className="font-bold">شناسه بازی:</span> {params.id}
            </p>
            <p>
              <span className="font-bold">بازیکن X:</span> {gameSession?.creator}
              {playerRole === 'X' && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">شما</span>}
            </p>
            <p>
              <span className="font-bold">بازیکن O:</span> {gameSession?.opponent}
              {playerRole === 'O' && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">شما</span>}
            </p>
            <p>
              <span className="font-bold">شروع بازی:</span> {gameSession?.createdAt.toLocaleTimeString('fa-IR')}
            </p>
          </div>
        </div>
        
        {/* وضعیت بازی */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-bold mb-4">وضعیت بازی</h3>
          {renderStatus()}
        </div>
        
        {/* چت بازی */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-80">
          <h3 className="text-xl font-bold mb-2">گفتگوی بازی</h3>
          
          <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded p-3">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">هنوز پیامی ارسال نشده است.</p>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg ${
                      msg.author === user.username 
                        ? 'bg-blue-100 mr-auto ml-4' 
                        : 'bg-gray-100 ml-auto mr-4'
                    } max-w-[80%]`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm">{msg.author}</span>
                      <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 transition"
            >
              ارسال
            </button>
          </form>
        </div>
      </div>
      
      {/* صفحه بازی */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-center">بازی دوز (XO)</h3>
          
          <div className="flex flex-col items-center">
            {/* جدول بازی */}
            <div className={`grid grid-cols-3 gap-2 ${theme.boardBorder}`}>
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="w-20 h-20 flex items-center justify-center text-3xl font-bold rounded shadow border-2 hover:opacity-90 transition"
                  style={{
                    backgroundColor: theme.tileBackground,
                    color: theme.textColor,
                    borderColor: theme.borderColor,
                    cursor: (winner || isDraw || 
                            (isXNext && playerRole !== 'X') || 
                            (!isXNext && playerRole !== 'O') || 
                            board[index]) ? 'not-allowed' : 'pointer'
                  }}
                >
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
            
            {/* راهنمای بازی */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg w-full">
              <h4 className="font-bold mb-2">راهنمای بازی:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>بازیکن X (نفر اول) با علامت X بازی می‌کند</li>
                <li>بازیکن O (نفر دوم) با علامت O بازی می‌کند</li>
                <li>بازیکنان به نوبت خانه‌های خالی را انتخاب می‌کنند</li>
                <li>اولین بازیکنی که موفق شود سه علامت خود را در یک ردیف، ستون یا قطر قرار دهد، برنده است</li>
                <li>اگر تمام خانه‌ها پر شوند و هیچ بازیکنی برنده نشود، بازی مساوی می‌شود</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}