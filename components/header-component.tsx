'use client'
import { headerLinks } from '@/lib/header-links'
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react'
import Moon from './svg/Moon'
import Sun from './svg/Sun'
import Resume from './svg/Resume'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const pathname = usePathname();

  useEffect(() => {
    const currTheme = localStorage.getItem('sacube.theme') || 'light'
    setTheme(currTheme)

    if (currTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('sacube.theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="flex border-b transition bg-white-1 dark:bg-black-1 border-gray-0 mb-1 dark:border-black-0 justify-between items-center sticky top-0 left-0 z-50 h-fit font-happymonkey p-3 md:p-4">
      <div className="flex gap-2 font-light md:font-semibold tracking-wide md:gap-4 max-sm:text-sm">
        {headerLinks.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.href}
              className={`${
                pathname === link.href
                  ? 'text-yellow-600 dark:text-yellow-4'
                  : ''
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </div>
      <button onClick={toggleTheme}>
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
    </div>
  )
}

export default Header
