import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { amiko, happymonkey, neue, rampart, zalando } from '../public/utils/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saquib Ali - Portfolio',
  description: 'Saquib Ali is a software engineer and a designer.',
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
          className={`${rampart.variable} ${amiko.variable} ${happymonkey.variable} ${zalando.variable} ${neue.variable} font-zalando bg-white-1 dark:bg-black-1 dark:text-white antialiased transition`}
        >
          <ThemeProvider>
            <Analytics />
            {children}
          </ThemeProvider>
        </body>
      </ViewTransitions>
    </html >
  )
}
