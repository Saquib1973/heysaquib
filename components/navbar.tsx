'use client'

import { Theme, useThemeStore } from '@/stores/themeStore'
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

const ThemeToggleIcon = ({ theme, size = 18 }: { theme: Theme, size?: number }) => (
    <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
            {theme === 'dark' ? (
                <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    <Moon />
                </motion.div>
            ) : (
                <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    <Sun />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

const MobileThemeToggle = ({ theme, toggleTheme }: { theme: Theme, toggleTheme: () => void }) => {
    const isDark = theme === 'dark'
    return (
        <button
            onClick={toggleTheme}
            className={`
                relative h-7 w-12 rounded-full p-0.5 transition-colors duration-300 focus:outline-none 
                border backdrop-blur-md
                ${isDark
                    ? 'bg-zinc-800/90 border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.5)]'
                    : 'bg-zinc-200/90 border-black/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.06)]'
                }
            `}
            aria-label="Switch Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    x: isDark ? 20 : 0,
                    backgroundColor: isDark ? '#18181b' : '#ffffff'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-5 w-5 rounded-full flex items-center justify-center relative z-10 border border-black/5 dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
            >
                <ThemeToggleIcon theme={theme} size={13} />
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
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
}

const linkItemVariants: Variants = {
    closed: { x: -8, opacity: 0 },
    open: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.25, ease: "easeOut" }
    }
}

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const theme = useThemeStore((state) => state.theme)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    const pathname = usePathname()
    const router = useRouter()

    const showBackButton = (pathname.startsWith('/projects/') && pathname !== '/projects/') ||
        (pathname.startsWith('/blogs/') && pathname !== '/blogs/')

    const resumeLink = headerLinks.find(link => link.name === 'Resume')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        handleScroll()
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
                    sticky top-0 z-[100] w-full flex justify-center pointer-events-none transition-all duration-300 ease-out
                    ${isScrolled ? 'pt-3 px-4 md:px-8' : 'pt-2 px-4 md:px-0'}
                `}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
            >
                {/* Outer wrapper: smoothly transitions width on scroll */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    className={`
                        w-full flex items-center justify-between transition-all duration-500 ease-out
                        ${isScrolled ? 'max-w-4xl' : 'max-w-5xl'}
                    `}
                >
                    {/* ============================================================== */}
                    {/* DESKTOP: LEFT 3D LIQUID GLASS NAV PILL                         */}
                    {/* ============================================================== */}
                    <div className="hidden md:flex items-center">
                        <div
                            className={`
                                pointer-events-auto transition-all duration-300 ease-out flex items-center gap-1.5
                                rounded-full backdrop-blur-2xl backdrop-saturate-200
                                ${isScrolled
                                    ? `px-4 py-2 bg-white/75 dark:bg-zinc-800/35
                                       border border-black/[0.08] dark:border-white/[0.16]
                                       shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.05)]
                                       dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.5)]`
                                    : `px-3.5 py-1.5 bg-white/30 dark:bg-zinc-900/20
                                       border border-black/[0.04] dark:border-white/[0.08]
                                       shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.5)]
                                       dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]`
                                }
                            `}
                        >
                            {/* Back Button */}
                            {showBackButton && (
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center gap-2 text-sm font-normal px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-black/5 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                >
                                    <Arrow className="-rotate-[135deg] w-4 h-4" />
                                    Back
                                </button>
                            )}

                            {/* Nav Items */}
                            {!showBackButton && headerLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        target={link.name === 'Resume' ? '_blank' : undefined}
                                        className={`
                                            relative px-4 py-2 text-sm font-normal transition-colors duration-300 rounded-full
                                            ${isActive
                                                ? 'text-gray-900 dark:text-white font-medium'
                                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                            }
                                        `}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="
                                                    absolute inset-0 rounded-full -z-10 backdrop-blur-md
                                                    bg-white/90 dark:bg-white/15
                                                    border border-black/[0.08] dark:border-white/20
                                                    shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(0,0,0,0.05)]
                                                    dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_0_rgba(0,0,0,0.3)]
                                                "
                                                transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                                            />
                                        )}
                                        <span className="flex items-center gap-1.5 relative z-10">
                                            {link.name}
                                            {link.name === 'Resume' && !link.logo && <ArrowRight className='text-black dark:text-white size-4 -rotate-45' />}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* ============================================================== */}
                    {/* DESKTOP: RIGHT 3D LIQUID GLASS THEME PILL                      */}
                    {/* ============================================================== */}
                    <div className="hidden md:flex items-center">
                        <div
                            className={`
                                pointer-events-auto transition-all duration-300 ease-out flex items-center justify-center
                                rounded-full backdrop-blur-2xl backdrop-saturate-200
                                ${isScrolled
                                    ? `p-1.5 bg-white/75 dark:bg-zinc-800/35
                                       border border-black/[0.08] dark:border-white/[0.16]
                                       shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.05)]
                                       dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.5)]`
                                    : `p-1 bg-white/30 dark:bg-zinc-900/20
                                       border border-black/[0.04] dark:border-white/[0.08]
                                       shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.5)]
                                       dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]`
                                }
                            `}
                        >
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center p-0 shrink-0"
                                aria-label="Toggle Theme"
                            >
                                <ThemeToggleIcon theme={theme} size={19} />
                            </button>
                        </div>
                    </div>

                    {/* ============================================================== */}
                    {/* MOBILE: SIDE-BY-SIDE 3D LIQUID GLASS PILLS                     */}
                    {/* ============================================================== */}
                    <div className="md:hidden flex items-center gap-2.5 pointer-events-auto">
                        {/* Hamburger Button Pill */}
                        <div
                            className={`
                                flex items-center justify-center rounded-full transition-all duration-300
                                backdrop-blur-2xl backdrop-saturate-200
                                ${isScrolled
                                    ? `bg-white/80 dark:bg-zinc-800/35
                                       border border-black/[0.08] dark:border-white/[0.16]
                                       shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.9)]
                                       dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.5)]`
                                    : `bg-white/40 dark:bg-zinc-900/30
                                       border border-black/[0.05] dark:border-white/[0.08]
                                       shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6)]
                                       dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)]`
                                }
                            `}
                        >
                            <button
                                onClick={showBackButton ? () => router.back() : () => setIsMobileMenuOpen(true)}
                                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                aria-label={showBackButton ? "Go Back" : "Open Menu"}
                            >
                                {showBackButton ? (
                                    <Arrow className="-rotate-[135deg] w-5 h-5 text-gray-800 dark:text-gray-200" />
                                ) : (
                                    <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                                )}
                            </button>
                        </div>

                        {/* Resume Pill */}
                        {resumeLink && (
                            <div
                                className={`
                                    flex items-center rounded-full transition-all duration-300
                                    backdrop-blur-2xl backdrop-saturate-200
                                    ${isScrolled
                                        ? `bg-white/80 dark:bg-zinc-800/35
                                           border border-black/[0.08] dark:border-white/[0.16]
                                           shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.9)]
                                           dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.5)]`
                                        : `bg-white/40 dark:bg-zinc-900/30
                                           border border-black/[0.05] dark:border-white/[0.08]
                                           shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6)]
                                           dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)]`
                                    }
                                `}
                            >
                                <Link
                                    href={resumeLink.href}
                                    target="_blank"
                                    className="h-11 flex items-center gap-2 px-5 text-sm font-semibold uppercase tracking-wider rounded-full active:scale-95 transition-transform"
                                >
                                    <span>Resume</span>
                                    <Open className="w-3.5 h-3.5 opacity-60" />
                                </Link>
                            </div>
                        )}
                    </div>

                </motion.div>
            </motion.header>

            {/* --- 3D LIQUID GLASS MOBILE MENU OVERLAY --- */}
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
                            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[110] md:hidden"
                        />

                        {/* Menu Container */}
                        <motion.nav
                            key="mobile-menu"
                            variants={menuContainerVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="
                                fixed top-20 left-4 right-8 bottom-auto z-[120]
                                w-auto max-w-sm mx-auto
                                flex flex-col overflow-hidden rounded-[2rem]
                                backdrop-blur-3xl backdrop-saturate-200
                                bg-white/85 dark:bg-zinc-900/60
                                border border-black/[0.08] dark:border-white/[0.18]
                                shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95)]
                                dark:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)]
                                md:hidden will-change-transform
                            "
                        >
                            {/* Glass Specular Top Highlight line */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/25 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col p-6">
                                {/* Menu Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 -mr-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-black/5 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
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
                                                            className="p-1 rounded-full text-white dark:text-black bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6),inset_0_1px_1px_rgba(255,255,255,0.8)]"
                                                        >
                                                            <ArrowRight className="w-4 h-4" />
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
                                    className="pt-6 mt-2 border-t border-gray-200/50 dark:border-white/10 flex items-center justify-between"
                                >
                                    <span className="text-sm font-normal text-gray-700 dark:text-gray-300">
                                        Appearance
                                    </span>
                                    <MobileThemeToggle theme={theme} toggleTheme={toggleTheme} />
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