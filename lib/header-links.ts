import type { ReactElement, ReactNode } from 'react'

interface HeaderLink {
  name: string
  href: string
}

export const headerLinks: HeaderLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs', href: '/blogs' },
  {
    name: 'Resume',
    href: 'https://drive.google.com/file/d/1a5tBPdkgfUi3My75upcW69VVQD8RPjwD/view',
  },
]
