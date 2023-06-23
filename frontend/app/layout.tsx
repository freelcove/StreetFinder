import './globals.css'
import { Inter } from 'next/font/google'
import AuthSession from '../provider/AuthProvider'
import Script from 'next/script';

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
          <Script
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID}&submodules=panorama`}
            strategy="beforeInteractive"
          />
        </AuthSession>
      </body>
    </html>
  )
}
