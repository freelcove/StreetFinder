import './globals.css'
import { Inter } from 'next/font/google'
import AuthSession from './provider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Street Finder',
  description: 'Not Street Fighter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          {children}
        </AuthSession>
        </body>
    </html>
  )
}
