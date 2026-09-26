'use client'

import { motion } from 'framer-motion'

interface StatusBadgeProps {
    status: 'live' | 'building' | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const isLive = status === 'live'
    const isBuilding = status === 'building'

    // Dynamic color tokens for modern 3D look
    const config = isLive
        ? {
            text: 'text-emerald-700 dark:text-emerald-300',
            border: 'border-emerald-500/25 dark:border-emerald-400/30',
            bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
            shadow:
                'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_4px_rgba(16,185,129,0.12),0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_8px_rgba(16,185,129,0.2)]',
            ledBg: 'bg-emerald-500',
            ledGlow: 'bg-emerald-400 shadow-[0_0_8px_1px_rgba(16,185,129,0.8)]',
            pulseBorder: 'border-emerald-400',
            label: 'Live'
        }
        : isBuilding
            ? {
                text: 'text-amber-700 dark:text-amber-300',
                border: 'border-amber-500/25 dark:border-amber-400/30',
                bg: 'bg-amber-500/10 dark:bg-amber-950/40',
                shadow:
                    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_4px_rgba(245,158,11,0.12),0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_8px_rgba(245,158,11,0.2)]',
                ledBg: 'bg-amber-500',
                ledGlow: 'bg-amber-400 shadow-[0_0_8px_1px_rgba(245,158,11,0.8)]',
                pulseBorder: 'border-amber-400',
                label: 'Building'
            }
            : {
                text: 'text-zinc-600 dark:text-zinc-400',
                border: 'border-zinc-300 dark:border-zinc-700/80',
                bg: 'bg-zinc-200/50 dark:bg-zinc-800/50',
                shadow:
                    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
                ledBg: 'bg-zinc-400 dark:bg-zinc-500',
                ledGlow: 'bg-zinc-400',
                pulseBorder: 'border-zinc-400',
                label: status
            }

    return (
        <motion.div
            whileHover={{ y: -1, scale: 1.03 }}
            whileTap={{ y: 0.5, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className={`
        relative select-none shrink-0 inline-flex items-center gap-2
        px-3 py-1.5 rounded-full backdrop-blur-md
        border ${config.border} ${config.bg} ${config.shadow}
        transition-colors duration-300 cursor-default
      `}
        >
            {/* 3D Convex LED Housing */}
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
                {/* Radar wave pulse (for active states) */}
                {(isLive || isBuilding) && (
                    <motion.span
                        animate={{
                            scale: [1, 2.4],
                            opacity: [0.75, 0]
                        }}
                        transition={{
                            duration: isLive ? 1.8 : 2.4,
                            repeat: Infinity,
                            ease: 'easeOut'
                        }}
                        className={`absolute inset-0 rounded-full border ${config.pulseBorder}`}
                    />
                )}

                {/* Outer ambient glow halo */}
                <span
                    className={`absolute w-2.5 h-2.5 rounded-full opacity-60 blur-[2px] ${config.ledGlow}`}
                />

                {/* Raised glossy bead / LED Core */}
                <span
                    className={`
            relative z-10 w-2 h-2 rounded-full ${config.ledBg}
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.4)]
          `}
                />
            </div>

            {/* Label with micro-tracking typography */}
            <span
                className={`
          font-mono text-[10px] font-semibold uppercase tracking-wider
          ${config.text} drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] dark:drop-shadow-none
        `}
            >
                {config.label}
            </span>
        </motion.div>
    )
}