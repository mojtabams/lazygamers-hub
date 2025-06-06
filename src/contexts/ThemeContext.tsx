
'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { themes } from '@/data/themes'

// تعریف نوع برای تم و کانتکست
type ThemeType = typeof themes.default
type ThemeContextType = {
  theme: ThemeType;
  setActiveTheme: (themeName: keyof typeof themes) => void;
}

const defaultContextValue: ThemeContextType = {
  theme: themes.default,
  setActiveTheme: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultContextValue)

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeThemeName, setActiveThemeName] = useState<keyof typeof themes>('default')
  const [theme, setTheme] = useState<ThemeType>(themes.default)

  // تغییر تم با تغییر نام تم فعال
  useEffect(() => {
    setTheme(themes[activeThemeName])

    // ذخیره تم در localStorage برای حفظ انتخاب کاربر
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTheme', activeThemeName)
    }
  }, [activeThemeName])

  // خواندن تم از localStorage در هنگام بارگذاری
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('activeTheme') as keyof typeof themes | null
      if (savedTheme && themes[savedTheme]) {
        setActiveThemeName(savedTheme)
      }
    }
  }, [])

  const setActiveTheme = (themeName: keyof typeof themes) => {
    if (themes[themeName]) {
      setActiveThemeName(themeName)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
