import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata = {
  title: 'LazyGamers',
  description: 'بازی‌های آنلاین با دوستان',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <Navbar />
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}