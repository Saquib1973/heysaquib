'use client'
import { headerLinks } from '@/lib/header-links'
import { Link } from 'next-view-transitions'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import Moon from './svg/Moon'
import Open from './svg/Open'
import Sun from './svg/Sun'
import Arrow from './svg/Arrow'
import { AnimatePresence, motion, Variants } from 'framer-motion'

const navVariants: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
}

const Header = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const isProjectDetailPage = pathname.startsWith('/projects/') && pathname !== '/projects/'
  const isBlogDetailPage = pathname.startsWith('/blogs/') && pathname !== '/blogs/'
  const showBackButton = isProjectDetailPage || isBlogDetailPage
  const {
    handlePlayPause,
    isPlaying,
    tracks,
    showPlayer,
    setShowPlayer,
    currentTrackIndex,
    closePlayer,
  } = useAudioPlayer()

  useEffect(() => {
    const currTheme = localStorage.getItem('sacube.theme') ?? 'light'
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

  const [horizontal, setHorizontal] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setHorizontal(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handlePlayerToggle = () => {
    if (isPlaying) {
      handlePlayPause()
      closePlayer()
    } else {
      setShowPlayer(!showPlayer)
    }
  }

  const handleBackClick = () => {
    router.back()
  }

  const handleMobileNavigation = (href: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      router.push(href)
    }, 500)
  }

  return (
    <div
      className={`flex border-b transition bg-white-1 dark:bg-black-1 ${
        horizontal > 10 ? 'border-gray-0  ' : 'border-transparent'
      } mb-1 dark:border-black-0 justify-between items-center sticky top-0 left-0 z-50 h-fit font-neue p-3 md:p-4`}
    >
      {/* Mobile: show Back on detail pages, hamburger elsewhere */}
      <div className="md:hidden">
        {showBackButton ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            title="Go back"
            aria-label="Go back"
          >
            <Arrow className="-rotate-[135deg] w-5 h-5" />
            <span className="text-sm">Back</span>
          </motion.button>
        ) : (
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center justify-center w-8 h-8 transition-colors"
            aria-label="Open menu"
            title="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex gap-2 tracking-wide md:gap-4 max-sm:text-sm max-md:hidden">
        <AnimatePresence mode='wait'>

        {
        showBackButton ? (

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
            title="Go back"
          >
            <Arrow className="-rotate-[135deg] w-5 h-5" />
            <span className="inline">Back</span>
          </motion.button>
        ) : (
          headerLinks.map((link, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <Link
                href={link.href}
                target={link.name === 'Resume' ? '_blank' : undefined}
                className={`flex gap-1 justify-center items-center transition-all duration-300 ease-in-out ${
                  pathname === link.href
                    ? 'text-yellow-600 dark:text-yellow-4'
                    : ''
                }`}
                title={link.name}
              >
                {link.name}
                {link.name === 'Resume' && !link.logo && <Open />}
              </Link>
              </motion.div>
            )
          })
        )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        {/* Music player toggle button */}
        <button
          onClick={handlePlayerToggle}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
            showPlayer
              ? 'bg-yellow-400 text-black'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label={showPlayer ? 'Hide player' : 'Show player'}
          title={showPlayer ? 'Hide player' : 'Show player'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 transition-all duration-300 ${
              isPlaying ? 'text-yellow-600 animate-pulse' : ''
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            />
          </svg>
        </button>

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-screen w-full bg-white-1 dark:bg-black-1 flex flex-col items-start pt-[80px] gap-6 px-6 z-[60] md:hidden"
          >
            {/* Close button inside sidebar */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 transition-colors hover:text-gray-800 dark:hover:text-gray-100"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {showBackButton ? (
              <motion.button
                variants={linkVariants}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleBackClick()
                }}
                className="text-3xl font-medium hover:text-yellow-600 dark:hover:text-yellow-4 transition-colors flex items-center gap-3"
              >
                <Arrow className="-rotate-[135deg] w-6 h-6" />
                <span>Back</span>
              </motion.button>
            ) : (
              headerLinks.map((link, index) => (
                <motion.div key={index} variants={linkVariants}>
                  {link.name === 'Resume' ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-medium hover:text-yellow-600 dark:hover:text-yellow-4 transition-colors flex items-center gap-2"
                    >
                      {link.name}
                      <Open />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleMobileNavigation(link.href)}
                      className={`text-3xl font-medium hover:text-yellow-600 dark:hover:text-yellow-4 transition-colors ${
                        pathname === link.href ? 'text-yellow-600 dark:text-yellow-4' : ''
                      }`}
                    >
                      {link.name}
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
