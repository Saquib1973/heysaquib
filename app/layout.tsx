import type { Metadata } from 'next'
import { rampart, amiko, happymonkey } from '../public/utils/fonts'
import './globals.css'
import Footer from '@/components/footer-component'
import Header from '@/components/header-component'
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/react'
export const metadata: Metadata = {
  title: 'Hey! Saquib ☺️',
  description: 'Welcome to the portfolio site of Saquib Ali.',
  icons: {
    icon: '/assets/logo.png',
  },
}


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ViewTransitions>
        <body
          className={`${rampart.variable} ${amiko.variable} ${happymonkey.variable} font-amiko bg-white-1 dark:bg-black-1 dark:text-white antialiased mx-auto max-w-4xl transition`}
        >
          <Analytics />
          <Header />
          <>{children}</>
          <Footer />
        </body>
      </ViewTransitions>
    </html>
  )
}
