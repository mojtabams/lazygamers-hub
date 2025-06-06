import React from 'react'
import TicTacToeGame from '@/components/games/xo/TicTacToeGame'

export default function XOPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <TicTacToeGame />
    </main>
  )
}