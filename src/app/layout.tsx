import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'

export const metadata = {
  title: 'LazyGamers',
  description: 'بازی‌های آنلاین با دوستان',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <Navbar />
        <UserProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
