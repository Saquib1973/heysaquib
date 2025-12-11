'use client'

import { useThemeStore } from '@/lib/stores/themeStore'
import { headerLinks } from '@/lib/header-links'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Arrow from './svg/Arrow'
import Moon from './svg/Moon'
import Open from './svg/Open'
import Sun from './svg/Sun'

const ThemeToggleIcon = ({ theme, size = 20 }: { theme: string | null, size?: number }) => (
    <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
            {theme === 'dark' ? (
                <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Moon />
                </motion.div>
            ) : (
                <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Sun />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

const MobileThemeToggle = ({ theme, toggleTheme }: { theme: string | null, toggleTheme: () => void }) => {
    const isDark = theme === 'dark'
    return (
        <button
            onClick={toggleTheme}
            className={`
                relative h-8 w-14 rounded-full p-1 transition-colors duration-300 focus:outline-none 
                border border-transparent
                ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-200 border-gray-300'}
            `}
            aria-label="Switch Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    x: isDark ? 24 : 0,
                    backgroundColor: isDark ? '#18181b' : '#ffffff'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-6 w-6 rounded-full shadow-md flex items-center justify-center relative z-10"
            >
                <ThemeToggleIcon theme={theme} size={14} />
            </motion.div>
        </button>
    )
}


const menuContainerVariants: Variants = {
    closed: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
    open: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
}

const linkItemVariants: Variants = {
    closed: { x: -10, opacity: 0 },
    open: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    }
}


const Navbar = () => {
    const [theme, setTheme] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const pathname = usePathname()
    const router = useRouter()

    const showBackButton = (pathname.startsWith('/projects/') && pathname !== '/projects/') ||
        (pathname.startsWith('/blogs/') && pathname !== '/blogs/')

    const resumeLink = headerLinks.find(link => link.name === 'Resume')

    useEffect(() => {
        const currTheme = localStorage.getItem('sacube.theme') ?? 'light'
        setTheme(currTheme)
        document.documentElement.classList.toggle('dark', currTheme === 'dark')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('sacube.theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            const timer = setTimeout(() => { document.body.style.overflow = 'unset' }, 300)
            return () => clearTimeout(timer)
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <motion.header
                className={`
                    sticky top-0 z-50 w-full transition-all duration-300 border-b
                    ${isScrolled
                        ? 'bg-white-1 dark:bg-black-1 backdrop-blur-xl border-gray-200 dark:border-white/10'
                        : 'bg-transparent border-transparent'
                    }
                `}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
            >
                <div className="max-w-5xl mx-auto px-4 md:px-0 h-14 flex items-center justify-between md:justify-start md:gap-6">

                    {/* Left: Controls */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <button
                                onClick={showBackButton ? () => router.back() : () => setIsMobileMenuOpen(true)}
                                className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                aria-label={showBackButton ? "Go Back" : "Open Menu"}
                            >
                                {showBackButton ? (
                                    <Arrow className="-rotate-[135deg] w-6 h-6 text-gray-800 dark:text-gray-200" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                                )}
                            </button>
                        </div>

                        {/* Resume Shortcut (Mobile) */}
                        <div className="md:hidden">
                            {resumeLink && (
                                <Link
                                    href={resumeLink.href}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide bg-gray-100 dark:bg-white/10 rounded-full active:scale-95 transition-transform"
                                >
                                    <span>Resume</span>
                                    <Open className="w-3 h-3 opacity-60" />
                                </Link>
                            )}
                        </div>

                        {/* Desktop Back Button */}
                        <div className="hidden md:block">
                            {showBackButton && (
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                >
                                    <Arrow className="-rotate-[135deg] w-4 h-4" />
                                    Back
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Center: Desktop Nav */}
                    {/* Now sits naturally next to the Left Controls because of md:justify-start */}
                    <nav className="hidden md:flex items-center gap-1">
                        {!showBackButton && headerLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.name === 'Resume' ? '_blank' : undefined}
                                    className={`
                                        relative px-4 py-1.5 text-sm font-medium transition-colors duration-300
                                        ${isActive
                                            ? 'text-gray-900 dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="flex items-center gap-1.5 relative z-10">
                                        {link.name}
                                        {link.name === 'Resume' && !link.logo && <Open />}
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right: Desktop Theme Toggle */}
                    {/* Added `ml-auto` to push this specific element to the far right */}
                    <div className="hidden md:block ml-auto">
                        <button
                            onClick={toggleTheme}
                            className="rounded-full  hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            <ThemeToggleIcon theme={theme} size={20} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* --- MOBILE MENU OVERLAY --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
                        />

                        {/* Menu Container */}
                        <motion.nav
                            key="mobile-menu"
                            variants={menuContainerVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="
                                fixed top-20 left-4 right-8 bottom-auto z-[70]
                                w-auto max-w-sm mx-auto
                                flex flex-col overflow-hidden rounded-[2rem]
                                shadow-2xl
                                border border-white/20 dark:border-white/10
                                bg-white/80 dark:bg-black/80
                                backdrop-blur-3xl backdrop-saturate-150
                                md:hidden will-change-transform
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col p-6">
                                {/* Menu Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 -mr-2 rounded-full bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
                                        aria-label="Close Menu"
                                    >
                                        <X className="w-5 h-5 text-gray-800 dark:text-white" />
                                    </button>
                                </div>

                                {/* Menu Links */}
                                <div className="flex flex-col gap-6 mb-8">
                                    {headerLinks.map((link) => {
                                        const isActive = pathname === link.href
                                        return (
                                            <motion.div key={link.name} variants={linkItemVariants}>
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`
                                                        group flex items-center gap-4 text-2xl font-semibold tracking-tight transition-colors
                                                        ${isActive
                                                            ? 'text-gray-900 dark:text-white'
                                                            : 'text-gray-600 dark:text-gray-400'
                                                        }
                                                    `}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="mobile-indicator"
                                                            className="p-1 rounded-full text-white dark:text-black bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                                                        >
                                                            <ArrowRight />
                                                        </motion.div>
                                                    )}
                                                    <span>{link.name}</span>
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {/* Mobile Theme Toggle (Pill) */}
                                <motion.div
                                    variants={linkItemVariants}
                                    className="pt-6 mt-2 border-t border-gray-200/20 dark:border-white/10"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Appearance
                                        </span>
                                        <MobileThemeToggle theme={theme} toggleTheme={toggleTheme} />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar