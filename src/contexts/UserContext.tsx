'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// تعریف نوع برای کاربر و کانتکست
type User = {
  username: string;
  isLoggedIn: boolean;
}

type UserContextType = {
  user: User;
  login: (username: string) => void;
  logout: () => void;
}

const defaultUser: User = {
  username: '',
  isLoggedIn: false
}

const defaultContextValue: UserContextType = {
  user: defaultUser,
  login: () => {},
  logout: () => {}
}

const UserContext = createContext<UserContextType>(defaultContextValue)

export const useUser = () => useContext(UserContext)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)

  // بارگذاری اطلاعات کاربر از localStorage در هنگام شروع
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('خطا در بازیابی اطلاعات کاربر:', error)
          localStorage.removeItem('user')
        }
      }
    }
  }, [])

  // ذخیره اطلاعات کاربر در localStorage هنگام تغییر
  useEffect(() => {
    if (typeof window !== 'undefined' && user.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  // تابع ورود کاربر
  const login = (username: string) => {
    if (!username.trim()) return
    
    setUser({
      username,
      isLoggedIn: true
    })
  }

  // تابع خروج کاربر
  const logout = () => {
    setUser(defaultUser)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}