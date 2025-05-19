import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'LazyGamers',
  description: 'بازی‌های آنلاین با دوستان',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}