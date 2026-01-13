'use client'
import { motion } from 'framer-motion'

export const StaggerSection = ({
    children,
    className = "",
    viewportAmount = 0.2,
    staggerDuration = 0.15,
    delay = 0
}: {
    children: React.ReactNode
    className?: string
    viewportAmount?: number
    staggerDuration?: number
    delay?: number
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: viewportAmount }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDuration,
                        delayChildren: delay,
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const BlurTranslateYItem = ({
    children,
    className = "",
    duration = 1.5
}: {
    children: React.ReactNode
    className?: string
    duration?: number
}) => {
    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                    filter: 'blur(10px)'
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)'
                }
            }}
            transition={{
                type: "spring",
                duration: duration,
                bounce: 0.2,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const BlurTranslateXItem = ({
    children,
    className = "",
    duration = 1.5,
    xOffset = 20 // Positive for right, Negative for left
}: {
    children: React.ReactNode
    className?: string
    duration?: number
    xOffset?: number
}) => {
    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    x: xOffset,
                    scale: 0.95,
                    filter: 'blur(10px)'
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter: 'blur(0px)'
                }
            }}
            transition={{
                type: "spring",
                duration: duration,
                bounce: 0.2,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const BlurItem = ({
    children,
    className = "",
    duration = 1.5
}: {
    children: React.ReactNode
    className?: string
    duration?: number
}) => {
    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    scale: 0.9, // Slightly smaller start scale looks better for static reveals
                    filter: 'blur(10px)'
                },
                visible: {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)'
                }
            }}
            transition={{
                type: "spring",
                duration: duration,
                bounce: 0.2,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}